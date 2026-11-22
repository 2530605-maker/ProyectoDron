/**
 * Simulador de Dinámica de Vuelo 6-DOF (Newton-Euler) y Control Multilazo Autónomo
 * Basado en las investigaciones de Kemcha (2024), UNAM (2016), NASA Ames VAERA (2024) y MDPI Drones (2025).
 * 
 * Rol de Ingeniería: Martin (Yulian Martin Silva Cruz)
 * Correcciones y modelos implementados:
 * 1. Cinemática y Dinámica 6-DOF: Inercias con comentarios corregidos (Iyy en Y, Izz en Z).
 * 2. Matriz de rotación coordinada y cuaterniones Euler (Yaw-Pitch-Roll) sin desincronización física-visual.
 * 3. Térmica ascendente con conversión dimensional estricta a Newtons vía modelo de arrastre aerodinámico.
 * 4. Modelo Thevenin electroquímico de batería LiPo 3S (tabla OCV no lineal, polarización RC y resistencia interna por temperatura).
 * 5. Dinámica avanzada de motores brushless 5010 750KV: inercia rotacional de hélices, curva par-velocidad y saturación de ESC a 40A.
 * 6. Control multilazo en cascada (Posición -> Velocidad -> Actitud) con modos Loiter, Waypoints y RTL (Fase T).
 * 7. Efecto suelo (Cheeseman & Bennett), arrastre aerodinámico dependiente de actitud y ráfagas estocásticas de viento.
 */

export class DronePhysicsEngine {
  constructor(droneModel) {
    this.drone = droneModel;

    // =========================================================================
    // PARÁMETROS MECÁNICOS Y AERODINÁMICOS (ZD550 Quadcopter en configuración X)
    // =========================================================================
    this.m = 1.85;       // Masa total en kg (chasis, aviónica, motores, LiPo y tanque)
    this.g = 9.81;       // Aceleración de gravedad (m/s²)
    this.l = 0.275;      // Radio del centro geométrico a cada motor (m)
    this.b = 2.98e-5;    // Coeficiente de empuje aerodinámico nominal (N*s²)
    this.d = 3.2e-7;     // Coeficiente de par de arrastre reactivo (N*m*s²)

    // Momentos de inercia principales (Corregidos formalmente según ejes aeroespaciales)
    this.Ixx = 0.0196;   // Momento de inercia eje X transversal / roll (kg*m²)
    this.Iyy = 0.0382;   // Momento de inercia eje Y vertical / yaw (kg*m²)
    this.Izz = 0.0196;   // Momento de inercia eje Z longitudinal / pitch (kg*m²)

    // Geometría para arrastre y efecto suelo
    this.propRadius = 0.1524; // Radio de hélice 12 pulgadas (0.3048 m / 2 = 0.1524 m)
    this.fuselageAreaPlan = 0.088; // Área proyectada en planta (m²)
    this.fuselageAreaFront = 0.024; // Área proyectada frontal (m²)
    this.cdPlate = 1.15; // Coeficiente de placa plana perpendicular
    this.cdStreamlined = 0.42; // Coeficiente frontal aerodinámico

    // =========================================================================
    // ESTADO CINEMÁTICO INERCIAL (Coordenadas Globales Babylon: Y = Altitud)
    // =========================================================================
    this.position = new BABYLON.Vector3(0, 0.25, 0);
    this.velocity = new BABYLON.Vector3(0, 0, 0);

    // Ángulos de actitud Euler (Radianes)
    this.roll = 0;   // Alabeo (rotación sobre eje Z/avance)
    this.pitch = 0;  // Cabeceo (rotación sobre eje X/lateral)
    this.yaw = 0;    // Guiñada (rotación sobre eje Y/vertical)

    // Velocidades angulares (rad/s)
    this.rollRate = 0;
    this.pitchRate = 0;
    this.yawRate = 0;

    // Cuaternión de rotación para sincronización visual-física 100% coordinada
    this.rotationQuaternion = new BABYLON.Quaternion();

    // =========================================================================
    // SISTEMA DE PROPULSIÓN: MOTORES SUNNYSKY 5010 750KV & HÉLICES 12x4.5
    // =========================================================================
    this.wHover = Math.sqrt((this.m * this.g) / (4 * this.b)); // ~390 rad/s
    this.wMax = 750;     // rad/s (~7,160 RPM a 100% duty)
    this.wMin = 100;     // rad/s (~955 RPM ralentí)
    this.rotorSpeeds = [0, 0, 0, 0]; // Velocidad angular real instantánea de cada rotor (rad/s)
    this.targetRotorSpeeds = [0, 0, 0, 0];

    // Constantes electromecánicas del motor y ESC
    this.kv = 750;                               // RPM / Volt
    this.rm = 0.088;                             // Resistencia por fase interna (Ohms)
    this.kt = 60 / (2 * Math.PI * this.kv);      // Constante de par Kt = 0.01273 N*m/A
    this.escCurrentLimit = 40.0;                 // Saturación de corriente de ESC por canal (A)
    this.propInertia = 4.8e-5;                   // Inercia rotacional de rotor + pala de carbono (kg*m²)

    // =========================================================================
    // MODELO ELECTROQUÍMICO DE BATERÍA LiPo 3S 5000 mAh (THEVENIN ECM)
    // =========================================================================
    this.batteryCapacityAh = 5.0; // 5000 mAh
    this.consumedAmpSeconds = 0;
    this.soc = 1.0;               // State of Charge [0.0 - 1.0]
    this.batteryVoltage = 12.6;   // Voltaje en bornes bajo carga (V)
    this.currentAmps = 0;         // Corriente total demandada (A)
    this.batteryTemp = 25.0;      // Temperatura interna de batería (°C)
    this.vPol = 0.0;              // Caída de polarización en capacitancia RC (V)
    this.rCellNominal = 0.045;    // 0.045 Ohms por celda (total 0.135 Ohms para 3S)

    // =========================================================================
    // ENTORNO ATMOSFÉRICO, TÉRMICAS Y RÁFAGAS
    // =========================================================================
    this.ambientTemp = 25.0;      // Temperatura del aire (°C)
    this.thermalUpdraft = 0;      // Velocidad ascendente convectiva del aire (m/s)
    this.baseWind = new BABYLON.Vector3(1.5, 0, 0.5); // Viento medio
    this.windVector = new BABYLON.Vector3(1.5, 0, 0.5);
    this.simTime = 0;             // Tiempo acumulado de simulación (s)
    this.effectiveB = this.b;     // Coeficiente de empuje ajustado por densidad

    // Carga útil de retardante químico
    this.retardantLevel = 1.0;    // 100%
    this.isSpraying = false;
    this.sprayRate = 0.035;       // Consumo por segundo de aspersión

    // Estado del dron
    this.isArmed = false;
    this.health = 100.0;          // Salud estructural (0 a 100%)
    this.totalDamage = 0;

    // Entradas del piloto
    this.inputThrottle = 0;
    this.inputRoll = 0;
    this.inputPitch = 0;
    this.inputYaw = 0;

    // =========================================================================
    // SISTEMA DE CONTROL MULTILAZO AUTÓNOMO (Fase T)
    // =========================================================================
    // Modos de vuelo: 'MANUAL', 'ALT_HOLD', 'LOITER', 'WAYPOINT', 'RTL'
    this.flightMode = 'MANUAL';

    // PID de Actitud (Lazo Interno)
    this.pidRoll = { kp: 3.5, kd: 0.85, ki: 0.05, integral: 0 };
    this.pidPitch = { kp: 3.5, kd: 0.85, ki: 0.05, integral: 0 };
    this.pidYaw = { kp: 2.2, kd: 0.45, ki: 0.02, integral: 0 };

    // PID de Altitud / Velocidad Vertical (Lazo Medio)
    this.targetAltitude = 0.25;
    this.pidAltitude = { kp: 1.6, ki: 0.12, kd: 0.55, integral: 0 };
    this.pidVerticalVelocity = { kp: 0.35, ki: 0.05, kd: 0.08, integral: 0 };

    // PID de Posición Horizontal y Velocidad (Lazo Externo para Loiter/Waypoints)
    this.targetPosition = new BABYLON.Vector3(0, 0.25, 0);
    this.targetVelocity = new BABYLON.Vector3(0, 0, 0);
    this.pidPosX = { kp: 0.65, ki: 0.01, kd: 0.35, integral: 0 };
    this.pidPosZ = { kp: 0.65, ki: 0.01, kd: 0.35, integral: 0 };
    this.pidVelX = { kp: 0.22, ki: 0.015, kd: 0.06, integral: 0 };
    this.pidVelZ = { kp: 0.22, ki: 0.015, kd: 0.06, integral: 0 };

    // Lista de Waypoints para patrullaje forestal
    this.waypoints = [
      { x: 0, y: 8, z: 0, desc: 'Ascenso inicial de seguridad' },
      { x: -25, y: 12, z: 20, desc: 'Sector Norte (Incendio Alfa)' },
      { x: -40, y: 10, z: -18, desc: 'Sector Oeste (Incendio Bravo)' },
      { x: 30, y: 14, z: 28, desc: 'Sector Este (Incendio Charlie)' },
      { x: 0, y: 6, z: 0, desc: 'Aproximación final a Helipad' }
    ];
    this.currentWaypointIdx = 0;
    this.waypointReachedDist = 3.5;

    // Estado del RTL
    this.rtlStage = 'NONE'; // 'CLIMB', 'TRANSIT', 'DESCENT', 'TOUCHDOWN'

    // Audio Web Audio API
    this.audioCtx = null;
    this.oscillator = null;
    this.gainNode = null;
    this.isAudioStarted = false;
  }

  // =========================================================================
  // GESTIÓN DE AUDIO Y OPERACIONES BÁSICAS
  // =========================================================================
  arm() {
    this.isArmed = true;
    this.initAudio();
    if (this.flightMode === 'LOITER' || this.flightMode === 'ALT_HOLD') {
      this.targetAltitude = Math.max(1.5, this.position.y);
      this.targetPosition.copyFrom(this.position);
    }
  }

  disarm() {
    this.isArmed = false;
    this.inputThrottle = 0;
    this.rotorSpeeds = [0, 0, 0, 0];
    this.targetRotorSpeeds = [0, 0, 0, 0];
    if (this.gainNode && this.audioCtx) {
      this.gainNode.gain.setValueAtTime(0, this.audioCtx.currentTime);
    }
  }

  setFlightMode(mode) {
    this.flightMode = mode;
    if (mode === 'ALT_HOLD' || mode === 'LOITER') {
      this.targetAltitude = Math.max(1.5, this.position.y);
      this.targetPosition.copyFrom(this.position);
      this.targetPosition.y = this.targetAltitude;
    } else if (mode === 'RTL') {
      this.initiateRTL();
    } else if (mode === 'WAYPOINT') {
      this.currentWaypointIdx = 0;
      this.setNextWaypoint();
    }
  }

  initiateRTL() {
    this.flightMode = 'RTL';
    this.rtlStage = (this.position.y < 9.0) ? 'CLIMB' : 'TRANSIT';
    this.targetAltitude = Math.max(10.0, this.position.y);
    this.targetPosition.set(0, this.targetAltitude, 0);
  }

  setNextWaypoint() {
    if (this.currentWaypointIdx < this.waypoints.length) {
      const wp = this.waypoints[this.currentWaypointIdx];
      this.targetPosition.set(wp.x, wp.y, wp.z);
      this.targetAltitude = wp.y;
    } else {
      this.initiateRTL();
    }
  }

  initAudio() {
    if (this.isAudioStarted) return;
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      this.audioCtx = new AudioContext();
      this.oscillator = this.audioCtx.createOscillator();
      this.gainNode = this.audioCtx.createGain();

      this.oscillator.type = 'sawtooth';
      this.oscillator.frequency.setValueAtTime(80, this.audioCtx.currentTime);
      this.gainNode.gain.setValueAtTime(0.001, this.audioCtx.currentTime);

      const filter = this.audioCtx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(450, this.audioCtx.currentTime);

      this.oscillator.connect(filter);
      filter.connect(this.gainNode);
      this.gainNode.connect(this.audioCtx.destination);

      this.oscillator.start();
      this.isAudioStarted = true;
    } catch (e) {
      console.warn('Audio no disponible:', e);
    }
  }

  updateAudio(avgRpm) {
    if (!this.isAudioStarted || !this.gainNode || !this.oscillator) return;
    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
    if (!this.isArmed || avgRpm < 50) {
      this.gainNode.gain.setValueAtTime(0.0001, this.audioCtx.currentTime);
      return;
    }
    const freq = 60 + (avgRpm / 750) * 160;
    const vol = Math.min(0.12, 0.01 + (avgRpm / 750) * 0.1);
    this.oscillator.frequency.setValueAtTime(freq, this.audioCtx.currentTime);
    this.gainNode.gain.setValueAtTime(vol, this.audioCtx.currentTime);
  }

  // =========================================================================
  // MODELO DE BATERÍA THEVENIN REAL (OCV NO LINEAL, RC Y TEMPERATURA)
  // =========================================================================
  getTheveninOcv(soc) {
    const s = Math.max(0, Math.min(1.0, soc));
    // Curva de descarga LiPo calibrada a 1C/10C (Voltaje OCV por celda)
    const socTable = [
      { s: 0.00, v: 3.20 },
      { s: 0.05, v: 3.45 },
      { s: 0.10, v: 3.60 },
      { s: 0.20, v: 3.69 },
      { s: 0.30, v: 3.73 },
      { s: 0.40, v: 3.77 },
      { s: 0.50, v: 3.82 },
      { s: 0.60, v: 3.88 },
      { s: 0.70, v: 3.95 },
      { s: 0.80, v: 4.03 },
      { s: 0.90, v: 4.12 },
      { s: 1.00, v: 4.20 }
    ];

    for (let i = 0; i < socTable.length - 1; i++) {
      if (s >= socTable[i].s && s <= socTable[i + 1].s) {
        const factor = (s - socTable[i].s) / (socTable[i + 1].s - socTable[i].s);
        const cellOcv = socTable[i].v + factor * (socTable[i + 1].v - socTable[i].v);
        return cellOcv * 3.0; // Configuración 3S
      }
    }
    return 12.60;
  }

  updateBatteryModel(dt) {
    // Corriente de consumo total (aviónica 1.4A + motores)
    const avionicsAmps = 1.4;
    let motorAmpsTotal = 0;
    this.rotorSpeeds.forEach(w => {
      const duty = (w - this.wMin) / Math.max(1, this.wMax - this.wMin);
      const motorI = Math.min(this.escCurrentLimit, Math.pow(Math.max(0, duty), 1.7) * 14.5);
      motorAmpsTotal += motorI;
    });

    this.currentAmps = avionicsAmps + motorAmpsTotal;
    this.consumedAmpSeconds += this.currentAmps * dt;

    const totalAmpSeconds = this.batteryCapacityAh * 3600;
    this.soc = Math.max(0, 1.0 - (this.consumedAmpSeconds / totalAmpSeconds));

    // Térmica de batería: Calentamiento Joule (I² * R) y transferencia con el ambiente
    const jouleHeat = Math.pow(this.currentAmps, 2) * (3 * this.rCellNominal) * 0.008;
    const cooling = (this.batteryTemp - this.ambientTemp) * 0.04;
    this.batteryTemp = Math.max(15, this.batteryTemp + (jouleHeat - cooling) * dt);

    // Resistencia interna dinámica corregida por temperatura (0.03 a 0.06 Ohm/celda)
    const tempDev = Math.abs(this.batteryTemp - 25);
    const rCell = this.rCellNominal * (1.0 + 0.016 * tempDev);
    const rPack = rCell * 3.0;

    // Polarización RC de difusión transitoria (Thevenin de 1er orden)
    const rPol = 0.022; // Ohm
    const cPol = 1800;  // Faradios
    const dVpol = ((this.currentAmps * rPol - this.vPol) / (rPol * cPol)) * dt;
    this.vPol += dVpol;

    // Voltaje OCV por tabla y voltaje terminal bajo carga
    const ocv = this.getTheveninOcv(this.soc);
    this.batteryVoltage = Math.max(8.5, ocv - (this.currentAmps * rPack) - this.vPol);
  }

  // =========================================================================
  // MODELO AVANZADO DE MOTORES CON PAR, INERCIA Y SATURACIÓN DE ESC
  // =========================================================================
  updateMotorDynamics(dt, desiredSpeeds) {
    for (let i = 0; i < 4; i++) {
      const currentW = this.rotorSpeeds[i];
      const targetW = Math.max(this.wMin, Math.min(this.wMax, desiredSpeeds[i]));

      // Tensión equivalente demandada por ESC
      const duty = (targetW - this.wMin) / (this.wMax - this.wMin);
      const vApplied = Math.max(0, Math.min(this.batteryVoltage, duty * this.batteryVoltage));

      // Fuerza contraelectromotriz: V_bemf = Ke * omega (Ke = Kt en SI)
      const vBemf = this.kt * currentW;

      // Corriente con saturación de ESC a 40A
      let iMotor = Math.max(0, (vApplied - vBemf) / this.rm);
      iMotor = Math.min(this.escCurrentLimit, iMotor);

      // Par electromagnético neto vs par de arrastre aerodinámico de la hélice
      const tauMotor = this.kt * iMotor;
      const tauAeroDrag = this.d * (currentW ** 2);

      // Ecuación dinámica rotacional: dw/dt = (Tau_m - Tau_drag) / J_prop
      const dOmega = ((tauMotor - tauAeroDrag) / this.propInertia) * dt;

      // Integración numérica
      this.rotorSpeeds[i] = Math.max(0, Math.min(this.wMax, currentW + dOmega));
    }
  }

  // =========================================================================
  // LAZOS DE CONTROL AUTÓNOMO EN CASCADA (Fase T)
  // =========================================================================
  computeAutonomousCommands(dt) {
    if (this.flightMode === 'MANUAL') return;

    // 1. LÓGICA DE MODOS AUTÓNOMOS
    if (this.flightMode === 'RTL') {
      const horizDistToBase = Math.hypot(this.position.x, this.position.z);
      if (this.rtlStage === 'CLIMB') {
        this.targetAltitude = 10.0;
        if (this.position.y >= 9.5) {
          this.rtlStage = 'TRANSIT';
        }
      } else if (this.rtlStage === 'TRANSIT') {
        this.targetPosition.set(0, 10.0, 0);
        this.targetAltitude = 10.0;
        if (horizDistToBase < 1.2) {
          this.rtlStage = 'DESCENT';
        }
      } else if (this.rtlStage === 'DESCENT') {
        this.targetPosition.set(0, 0.25, 0);
        this.targetAltitude = Math.max(0.25, this.position.y - 0.7 * dt);
        if (this.position.y <= 0.35) {
          this.rtlStage = 'TOUCHDOWN';
          this.disarm();
          return;
        }
      }
    } else if (this.flightMode === 'WAYPOINT') {
      const wp = this.waypoints[this.currentWaypointIdx];
      if (wp) {
        const dist = BABYLON.Vector3.Distance(this.position, new BABYLON.Vector3(wp.x, wp.y, wp.z));
        if (dist < this.waypointReachedDist) {
          this.currentWaypointIdx++;
          this.setNextWaypoint();
        }
      }
    }

    // 2. CONTROL HORIZONTAL (X, Z) -> Roll y Pitch deseados
    if (this.flightMode === 'LOITER' || this.flightMode === 'WAYPOINT' || this.flightMode === 'RTL') {
      const errX = this.targetPosition.x - this.position.x;
      const errZ = this.targetPosition.z - this.position.z;

      this.pidPosX.integral = BABYLON.Scalar.Clamp(this.pidPosX.integral + errX * dt, -5, 5);
      this.pidPosZ.integral = BABYLON.Scalar.Clamp(this.pidPosZ.integral + errZ * dt, -5, 5);

      const desiredVelX = BABYLON.Scalar.Clamp(this.pidPosX.kp * errX + this.pidPosX.ki * this.pidPosX.integral - this.pidPosX.kd * this.velocity.x, -5, 5);
      const desiredVelZ = BABYLON.Scalar.Clamp(this.pidPosZ.kp * errZ + this.pidPosZ.ki * this.pidPosZ.integral - this.pidPosZ.kd * this.velocity.z, -5, 5);

      const errVelX = desiredVelX - this.velocity.x;
      const errVelZ = desiredVelZ - this.velocity.z;

      this.pidVelX.integral = BABYLON.Scalar.Clamp(this.pidVelX.integral + errVelX * dt, -2, 2);
      this.pidVelZ.integral = BABYLON.Scalar.Clamp(this.pidVelZ.integral + errVelZ * dt, -2, 2);

      const accelCmdX = this.pidVelX.kp * errVelX + this.pidVelX.ki * this.pidVelX.integral - this.pidVelX.kd * this.velocity.x;
      const accelCmdZ = this.pidVelZ.kp * errVelZ + this.pidVelZ.ki * this.pidVelZ.integral - this.pidVelZ.kd * this.velocity.z;

      // Transformar comandos inerciales al marco de referencia de guiñada del dron
      const cosY = Math.cos(this.yaw);
      const sinY = Math.sin(this.yaw);
      const bodyAccelX = accelCmdX * cosY - accelCmdZ * sinY;
      const bodyAccelZ = accelCmdX * sinY + accelCmdZ * cosY;

      // Inclinación deseada limitada a ±22 grados (0.38 rad)
      this.inputRoll = BABYLON.Scalar.Clamp(bodyAccelX / this.g, -0.38, 0.38) / 0.45;
      this.inputPitch = BABYLON.Scalar.Clamp(bodyAccelZ / this.g, -0.38, 0.38) / 0.45;
      this.inputYaw = 0;
    }

    // 3. CONTROL DE ALTITUD (Y) -> Throttle deseado
    const errAlt = this.targetAltitude - this.position.y;
    this.pidAltitude.integral = BABYLON.Scalar.Clamp(this.pidAltitude.integral + errAlt * dt, -3, 3);
    const desiredVelY = BABYLON.Scalar.Clamp(this.pidAltitude.kp * errAlt + this.pidAltitude.ki * this.pidAltitude.integral - this.pidAltitude.kd * this.velocity.y, -3, 3);

    const errVelY = desiredVelY - this.velocity.y;
    this.pidVerticalVelocity.integral = BABYLON.Scalar.Clamp(this.pidVerticalVelocity.integral + errVelY * dt, -2, 2);
    const throttleAdj = this.pidVerticalVelocity.kp * errVelY + this.pidVerticalVelocity.ki * this.pidVerticalVelocity.integral;

    // Acelerador base nominal de hover (~0.48) + ajuste PID
    const hoverThrottle = 0.48;
    this.inputThrottle = BABYLON.Scalar.Clamp(hoverThrottle + throttleAdj, 0.05, 0.95);
  }

  // =========================================================================
  // BUCLE PRINCIPAL DE INTEGRACIÓN FÍSICA 6-DOF
  // =========================================================================
  update(dt, fireHotspots, treeColliders) {
    if (dt <= 0 || dt > 0.1) dt = 0.016;
    this.simTime += dt;

    // 1. RÁFAGAS DE VIENTO VARIABLES (Espectro turbulento dinámico)
    const gustX = Math.sin(this.simTime * 0.45) * 1.4 + Math.cos(this.simTime * 1.3) * 0.7;
    const gustZ = Math.cos(this.simTime * 0.35) * 1.2 + Math.sin(this.simTime * 1.1) * 0.5;
    this.windVector.set(this.baseWind.x + gustX, 0, this.baseWind.z + gustZ);

    // 2. PROXIMIDAD A INCENDIOS Y ELEVACIÓN TÉRMICA (NASA Ames VAERA)
    let closestFireDist = 999;
    let closestFire = null;
    if (fireHotspots && fireHotspots.length > 0) {
      fireHotspots.forEach(hotspot => {
        const d = BABYLON.Vector3.Distance(this.position, hotspot.position);
        if (d < closestFireDist) {
          closestFireDist = d;
          closestFire = hotspot;
        }
      });
    }

    if (closestFire && closestFireDist < 40 && closestFire.intensity > 0.05) {
      const heatFactor = Math.max(0, 1 - closestFireDist / 40) * closestFire.intensity;
      this.ambientTemp = 25.0 + heatFactor * 95.0; // Hasta 120°C
      this.thermalUpdraft = heatFactor * 5.2;      // Corriente convectiva ascendente en m/s
    } else {
      this.ambientTemp = 25.0;
      this.thermalUpdraft = 0;
    }

    // Densidad del aire en función de temperatura (Ley de los gases ideales)
    const airDensity = 1.225 * (298.15 / (273.15 + this.ambientTemp));
    this.effectiveB = this.b * (airDensity / 1.225);

    // Aspersión de retardante químico
    if (this.isSpraying && this.retardantLevel > 0) {
      this.retardantLevel = Math.max(0, this.retardantLevel - this.sprayRate * dt);
      if (closestFire && closestFireDist < 16 && this.position.y > 0.8 && this.position.y < 20) {
        closestFire.intensity = Math.max(0, closestFire.intensity - 0.35 * dt);
      }
    }

    // 3. SI EL DRON ESTÁ DESARMADO: FÍSICA DE CAÍDA LIBRE / REPOSO
    if (!this.isArmed) {
      this.rotorSpeeds = [0, 0, 0, 0];
      if (this.position.y > 0.25) {
        this.velocity.y -= this.g * dt;
        this.position.y += this.velocity.y * dt;
        if (this.position.y <= 0.25) {
          this.position.y = 0.25;
          this.velocity.set(0, 0, 0);
          this.roll = 0;
          this.pitch = 0;
        }
      }
      this.updateBatteryModel(dt);
      this.updateAudio(0);
      this.syncDroneMesh();
      return;
    }

    // Failsafe de batería crítica (<5% soc): forzar RTL o descenso
    if (this.soc <= 0.05 && this.flightMode !== 'RTL') {
      this.initiateRTL();
    }

    // 4. EJECUTAR AUTONOMÍA Y PID MULTILAZO
    this.computeAutonomousCommands(dt);

    // Mapeo del acelerador a régimen base de rotación
    const baseW = this.wMin + this.inputThrottle * (this.wMax - this.wMin);

    // Bucle PID de Actitud (Lazo Interno)
    const targetRoll = this.inputRoll * 0.45;     // ±25°
    const targetPitch = this.inputPitch * 0.45;
    const targetYawRate = this.inputYaw * 1.6;

    const errRoll = targetRoll - this.roll;
    const errPitch = targetPitch - this.pitch;
    const errYawRate = targetYawRate - this.yawRate;

    this.pidRoll.integral = BABYLON.Scalar.Clamp(this.pidRoll.integral + errRoll * dt, -1, 1);
    this.pidPitch.integral = BABYLON.Scalar.Clamp(this.pidPitch.integral + errPitch * dt, -1, 1);

    const rollCorr = this.pidRoll.kp * errRoll - this.pidRoll.kd * this.rollRate + this.pidRoll.ki * this.pidRoll.integral;
    const pitchCorr = this.pidPitch.kp * errPitch - this.pidPitch.kd * this.pitchRate + this.pidPitch.ki * this.pidPitch.integral;
    const yawCorr = this.pidYaw.kp * errYawRate;

    // Mezclador para configuración Quadcopter X
    const wDesired1 = baseW - pitchCorr - rollCorr + yawCorr;
    const wDesired2 = baseW - pitchCorr + rollCorr - yawCorr;
    const wDesired3 = baseW + pitchCorr + rollCorr + yawCorr;
    const wDesired4 = baseW + pitchCorr - rollCorr - yawCorr;

    // 5. ACTUALIZAR DINÁMICA DE MOTORES CON INERCIA Y ESC
    this.updateMotorDynamics(dt, [wDesired1, wDesired2, wDesired3, wDesired4]);

    // 6. EFECTO SUELO (Cheeseman & Bennett)
    const agl = Math.max(0.04, this.position.y - 0.25);
    let groundEffectFactor = 1.0;
    if (agl < 4.0 * this.propRadius) {
      const ratio = this.propRadius / (4.0 * agl);
      groundEffectFactor = Math.min(1.28, 1.0 / Math.max(0.2, 1.0 - (ratio * ratio)));
    }

    // Empuje individual de cada rotor
    const thrustFactor = this.effectiveB * groundEffectFactor;
    const T1 = thrustFactor * (this.rotorSpeeds[0] ** 2);
    const T2 = thrustFactor * (this.rotorSpeeds[1] ** 2);
    const T3 = thrustFactor * (this.rotorSpeeds[2] ** 2);
    const T4 = thrustFactor * (this.rotorSpeeds[3] ** 2);
    const totalThrust = T1 + T2 + T3 + T4;

    // Momentos de torsión aplicados al cuerpo (Newton-Euler)
    const factorDiag = this.l / Math.SQRT2;
    const torqueRoll = factorDiag * ((T2 + T3) - (T1 + T4));
    const torquePitch = factorDiag * ((T3 + T4) - (T1 + T2));
    const torqueYaw = this.d * ((this.rotorSpeeds[0] ** 2) - (this.rotorSpeeds[1] ** 2) + (this.rotorSpeeds[2] ** 2) - (this.rotorSpeeds[3] ** 2));

    // Aceleraciones angulares con momentos de inercia corregidos
    const dRollRate = torqueRoll / this.Ixx;
    const dPitchRate = torquePitch / this.Izz; // Izz en Z (cabeceo)
    const dYawRate = torqueYaw / this.Iyy;     // Iyy en Y (guiñada vertical)

    this.rollRate += dRollRate * dt;
    this.pitchRate += dPitchRate * dt;
    this.yawRate += dYawRate * dt;

    // Amortiguamiento angular aerodinámico
    this.rollRate *= 0.92;
    this.pitchRate *= 0.92;
    this.yawRate *= 0.90;

    this.roll += this.rollRate * dt;
    this.pitch += this.pitchRate * dt;
    this.yaw += this.yawRate * dt;

    // 7. CINEMÁTICA Y MATRIZ DE ROTACIÓN SIN DESINCRONIZACIÓN
    // Usamos rotación Yaw-Pitch-Roll coordinada
    const rotMatrix = BABYLON.Matrix.RotationYawPitchRoll(this.yaw, this.pitch, this.roll);
    BABYLON.Quaternion.RotationYawPitchRollToRef(this.yaw, this.pitch, this.roll, this.rotationQuaternion);

    // Vector de empuje corporal normalizado [0, 1, 0] proyectado al marco inercial global
    const localUp = new BABYLON.Vector3(0, 1, 0);
    const worldThrustDir = BABYLON.Vector3.TransformNormal(localUp, rotMatrix);
    const thrustX = worldThrustDir.x * totalThrust;
    const thrustY = worldThrustDir.y * totalThrust;
    const thrustZ = worldThrustDir.z * totalThrust;

    // 8. ARRASTRE DINÁMICO SEGÚN ACTITUD Y TÉRMICA ASCENDENTE EN NEWTONS
    // Inclinación neta respecto a la horizontal
    const tiltAngle = Math.acos(BABYLON.Scalar.Clamp(worldThrustDir.y, -1, 1));
    const effectiveCd = this.cdStreamlined * Math.cos(tiltAngle) + this.cdPlate * Math.sin(tiltAngle);
    const effectiveArea = this.fuselageAreaFront * Math.cos(tiltAngle) + this.fuselageAreaPlan * Math.sin(tiltAngle);

    // Arrastre horizontal
    const horizDragX = 0.5 * airDensity * effectiveCd * effectiveArea * this.velocity.x * Math.abs(this.velocity.x);
    const horizDragZ = 0.5 * airDensity * effectiveCd * effectiveArea * this.velocity.z * Math.abs(this.velocity.z);

    // Fuerza aerodinámica de viento horizontal (Newtons)
    const relWindX = this.windVector.x - this.velocity.x;
    const relWindZ = this.windVector.z - this.velocity.z;
    const windForceX = 0.5 * airDensity * effectiveCd * effectiveArea * relWindX * Math.abs(relWindX);
    const windForceZ = 0.5 * airDensity * effectiveCd * effectiveArea * relWindZ * Math.abs(relWindZ);

    // CONVERSIÓN RIGUROSA DE TÉRMICA ASCENDENTE (m/s) A FUERZA (Newtons)
    // Velocidad vertical relativa del aire sobre el fuselaje
    const relVerticalSpeed = this.thermalUpdraft - this.velocity.y;
    // Fuerza de arrastre convectivo ascendente en Newtons
    const thermalForceY = 0.5 * airDensity * this.cdPlate * this.fuselageAreaPlan * relVerticalSpeed * Math.abs(relVerticalSpeed);
    const verticalDampingForce = 0.5 * airDensity * this.cdPlate * this.fuselageAreaPlan * this.velocity.y * Math.abs(this.velocity.y);

    // Aceleración lineal global (Newtons / kg = m/s²)
    const accelX = (thrustX + windForceX - horizDragX) / this.m;
    const accelY = (thrustY - (this.m * this.g) + thermalForceY - verticalDampingForce) / this.m;
    const accelZ = (thrustZ + windForceZ - horizDragZ) / this.m;

    this.velocity.x += accelX * dt;
    this.velocity.y += accelY * dt;
    this.velocity.z += accelZ * dt;

    this.position.x += this.velocity.x * dt;
    this.position.y += this.velocity.y * dt;
    this.position.z += this.velocity.z * dt;

    // 9. COLISIÓN CON EL SUELO Y TREN DE ATERRIZAJE ELÁSTICO
    if (this.position.y <= 0.25) {
      this.position.y = 0.25;
      if (this.velocity.y < -3.2) {
        // Aterrizaje violento -> Daño estructural
        const dmg = Math.abs(this.velocity.y) * 14.0;
        this.applyDamage(dmg, 'Impacto severo contra el suelo');
      }

      // Rebote elástico amortiguado de los patines
      if (this.velocity.y < -0.35) {
        this.velocity.y = -this.velocity.y * 0.22;
      } else {
        this.velocity.y = 0;
      }

      // Fricción superficial con el terreno
      const frictionDamp = Math.max(0, 1.0 - 5.5 * dt);
      this.velocity.x *= frictionDamp;
      this.velocity.z *= frictionDamp;

      // Par estabilizador de apoyo en suelo (alinea roll y pitch a la horizontal)
      this.rollRate += (-this.roll * 10.0 - this.rollRate * 7.0) * dt;
      this.pitchRate += (-this.pitch * 10.0 - this.pitchRate * 7.0) * dt;
      this.roll *= Math.max(0, 1.0 - 8.0 * dt);
      this.pitch *= Math.max(0, 1.0 - 8.0 * dt);
    }

    // 10. DETECCIÓN AVANZADA DE COLISIONES CON ÁRBOLES (6-DOF IMPULSO Y TORQUE)
    if (treeColliders && treeColliders.length > 0) {
      const droneRadius = 0.32;
      for (let t = 0; t < treeColliders.length; t++) {
        const tree = treeColliders[t];
        const dx = this.position.x - tree.x;
        const dz = this.position.z - tree.z;

        // Broadphase rápido AABB
        const maxTreeReach = Math.max(tree.trunkRadius || 0, tree.foliageRadius || 0) + droneRadius + 0.5;
        if (Math.abs(dx) > maxTreeReach || Math.abs(dz) > maxTreeReach) continue;
        if (this.position.y > (tree.totalHeight || 20) + 1.2) continue;

        const distXZ = Math.hypot(dx, dz);

        // Tronco (Cilindro rígido inferior)
        if (this.position.y < tree.trunkHeight) {
          const minDist = tree.trunkRadius + droneRadius;
          if (distXZ < minDist) {
            const nx = dx / (distXZ || 0.001);
            const nz = dz / (distXZ || 0.001);
            this.position.x = tree.x + nx * (minDist + 0.02);
            this.position.z = tree.z + nz * (minDist + 0.02);

            // Descomposición vectorial normal / tangencial
            const vn = this.velocity.x * nx + this.velocity.z * nz;
            if (vn < 0) {
              const vtx = this.velocity.x - vn * nx;
              const vtz = this.velocity.z - vn * nz;

              const restitution = 0.38;
              const friction = 0.35;

              const vnNew = -vn * restitution;
              const vtxNew = vtx * (1.0 - friction);
              const vtzNew = vtz * (1.0 - friction);

              this.velocity.x = vnNew * nx + vtxNew;
              this.velocity.z = vnNew * nz + vtzNew;

              // Transferencia de impulso angular (torque excéntrico al golpear con un brazo)
              const vImpact = Math.abs(vn);
              const impulseMag = this.m * (1.0 + restitution) * vImpact;

              this.rollRate += (nz * impulseMag * 3.2) / this.Ixx;
              this.pitchRate += (-nx * impulseMag * 3.2) / this.Izz;
              this.yawRate += ((nx * nz >= 0 ? 1 : -1) * impulseMag * 2.5) / this.Iyy;

              const dmg = Math.max(6.0, vImpact * 24.0 + Math.hypot(this.velocity.x, this.velocity.z) * 4.0);
              this.applyDamage(dmg, 'Colisión violenta con tronco de árbol');
            }
            break;
          }
        }
        // Copa del árbol (Medio dispersivo viscoso / ramas)
        else if (this.position.y < tree.totalHeight) {
          const foliageMinDist = tree.foliageRadius + droneRadius;
          if (distXZ < foliageMinDist) {
            const foliageDamp = Math.max(0.15, 1.0 - 5.0 * dt);
            this.velocity.x *= foliageDamp;
            this.velocity.z *= foliageDamp;
            this.velocity.y *= Math.max(0.2, 1.0 - 3.2 * dt);

            this.rollRate += (Math.random() - 0.5) * 4.0 * dt;
            this.pitchRate += (Math.random() - 0.5) * 4.0 * dt;

            for (let r = 0; r < 4; r++) {
              this.rotorSpeeds[r] = Math.max(this.wMin, this.rotorSpeeds[r] - 650.0 * dt);
            }

            const currentSpeed = Math.hypot(this.velocity.x, this.velocity.z);
            if (currentSpeed > 1.4) {
              this.applyDamage(currentSpeed * 4.0 * dt, 'Impacto con copa de árbol');
            }
            break;
          }
        }
      }
    }

    // Actualizar batería y audio
    this.updateBatteryModel(dt);
    const avgRpm = (this.rotorSpeeds[0] + this.rotorSpeeds[1] + this.rotorSpeeds[2] + this.rotorSpeeds[3]) / 4;
    this.updateAudio(avgRpm);

    this.syncDroneMesh();
  }

  applyDamage(amount, reason) {
    this.health = Math.max(0, this.health - amount);
    this.totalDamage += amount;
    if (this.onDamageCallback) {
      this.onDamageCallback(this.health, amount, reason);
    }
  }

  // =========================================================================
  // SINCRONIZACIÓN CON LA MALLA 3D BABYLON.JS
  // =========================================================================
  syncDroneMesh() {
    if (!this.drone || !this.drone.root) return;

    this.drone.root.position.copyFrom(this.position);

    // Aplicar cuaternión coordinado exacto
    if (!this.drone.root.rotationQuaternion) {
      this.drone.root.rotationQuaternion = new BABYLON.Quaternion();
    }
    this.drone.root.rotationQuaternion.copyFrom(this.rotationQuaternion);

    // Rotar hélices según velocidad angular real
    if (this.drone.propMeshes) {
      this.drone.propMeshes.forEach((prop, idx) => {
        const speed = (this.rotorSpeeds[idx] || 0) * 0.055;
        const dir = prop.isCw ? 1 : -1;
        prop.node.rotation.y += speed * dir;
      });
    }

    // Indicador LED Pixhawk según estado de aviónica
    if (this.drone.ledMat) {
      if (!this.isArmed) {
        const t = Date.now() * 0.003;
        this.drone.ledMat.emissiveColor.set(0, 0.4 + 0.6 * Math.sin(t), 1.0);
      } else if (this.soc < 0.15 || this.health < 25) {
        const t = Date.now() * 0.015;
        this.drone.ledMat.emissiveColor.set(Math.sin(t) > 0 ? 1 : 0.1, 0, 0);
      } else if (this.flightMode === 'RTL') {
        const t = Date.now() * 0.008;
        this.drone.ledMat.emissiveColor.set(1.0, 0.6 * Math.sin(t), 0);
      } else {
        this.drone.ledMat.emissiveColor.set(0, 1.0, 0.2);
      }
    }
  }

  // =========================================================================
  // TELEMETRÍA COMPLETA Y AJUSTE DE EMPUJE POR TEMPERATURA (effectiveB)
  // =========================================================================
  getTelemetry() {
    return {
      armed: this.isArmed,
      flightMode: this.flightMode,
      health: Math.round(this.health),
      altitude: Math.max(0, this.position.y - 0.25),
      speedKmh: Math.hypot(this.velocity.x, this.velocity.z) * 3.6,
      verticalSpeed: this.velocity.y,
      rollDeg: this.roll * (180 / Math.PI),
      pitchDeg: this.pitch * (180 / Math.PI),
      yawDeg: ((this.yaw * (180 / Math.PI)) % 360 + 360) % 360,
      voltage: this.batteryVoltage,
      current: this.currentAmps,
      soc: this.soc * 100,
      batteryTemp: this.batteryTemp,
      retardant: this.retardantLevel * 100,
      ambientTemp: this.ambientTemp,
      thermalUpdraft: this.thermalUpdraft,
      effectiveB: this.effectiveB,
      rotorRpm: this.rotorSpeeds.map(w => Math.round((w * 60) / (2 * Math.PI))),
      // CORRECCIÓN KOKI: Usar effectiveB dinámico en lugar de b nominal
      thrustN: this.rotorSpeeds.map(w => Number((this.effectiveB * w * w).toFixed(2))),
      position: { x: this.position.x, y: this.position.y, z: this.position.z },
      velocity: { x: this.velocity.x, y: this.velocity.y, z: this.velocity.z }
    };
  }
}
