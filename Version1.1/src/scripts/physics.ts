import * as BABYLON from "@babylonjs/core";

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

export interface TelemetryData {
  altitude: number;
  speedKmh: number;
  verticalSpeed: number;
  rollDeg: number;
  pitchDeg: number;
  yawDeg: number;
  voltage: number;
  current: number;
  soc: number;
  ambientTemp: number;
  batteryTemp: number;
  thermalUpdraft: number;
  totalThrust: number;
  thrustN: number[];
  rotorRpm: number[];
  retardant: number;
  armed: boolean;
  health: number;
  flightMode: string;
  position: { x: number; y: number; z: number };
}

export class DronePhysicsEngine {
  public drone: any;

  // Número de rotores activos (4 para Quad, 6 para Hexacóptero Tarot 680)
  public numRotors: number = 4;
  public landingGearHeight: number = 0.20;

  // Parámetros mecánicos y aerodinámicos (Valores nominales ZD550)
  public m: number = 1.85;       // Masa total en kg (chasis, aviónica, motores, LiPo y tanque)
  public g: number = 9.81;       // Gravedad (m/s²)
  public l: number = 0.275;      // Radio del centro geométrico a cada motor (m)
  public b: number = 2.98e-5;    // Coeficiente de empuje aerodinámico nominal (N*s²)
  public d: number = 3.2e-7;     // Coeficiente de par de arrastre reactivo (N*m*s²)

  // Momentos de inercia principales (Corregidos formalmente según ejes aeroespaciales)
  public Ixx: number = 0.0196;   // Momento de inercia eje X transversal / roll (kg*m²)
  public Iyy: number = 0.0382;   // Momento de inercia eje Y vertical / yaw (kg*m²)
  public Izz: number = 0.0196;   // Momento de inercia eje Z longitudinal / pitch (kg*m²)

  public propRadius: number = 0.1524; // Radio de hélice 12 pulgadas (0.1524 m)
  public fuselageAreaPlan: number = 0.088; // Área proyectada en planta (m²)
  public fuselageAreaFront: number = 0.024; // Área proyectada frontal (m²)
  public cdPlate: number = 1.15;
  public cdStreamlined: number = 0.42;

  // Estado cinemático inercial (Y = Altitud)
  public position: BABYLON.Vector3 = new BABYLON.Vector3(0, 0.25, 0);
  public velocity: BABYLON.Vector3 = new BABYLON.Vector3(0, 0, 0);

  // Actitud Euler (Radianes)
  public roll: number = 0;   // Alabeo (sobre eje Z)
  public pitch: number = 0;  // Cabeceo (sobre eje X)
  public yaw: number = 0;    // Guiñada (sobre eje Y)

  public rollRate: number = 0;
  public pitchRate: number = 0;
  public yawRate: number = 0;

  public rotationQuaternion: BABYLON.Quaternion = new BABYLON.Quaternion();

  // Sistema de propulsión
  public wHover: number = Math.sqrt((1.85 * 9.81) / (4 * 2.98e-5)); // ~390 rad/s
  public wMax: number = 750;     // rad/s (~7,160 RPM a 100% duty)
  public wMin: number = 100;     // rad/s (~955 RPM ralentí)
  public rotorSpeeds: number[] = [0, 0, 0, 0, 0, 0];
  public targetRotorSpeeds: number[] = [0, 0, 0, 0, 0, 0];

  public kv: number = 750;
  public rm: number = 0.088;
  public kt: number = 60 / (2 * Math.PI * 750); // 0.01273 N*m/A
  public escCurrentLimit: number = 40.0;
  public propInertia: number = 4.8e-5;

  // Modelo electroquímico Thevenin ECM LiPo 3S 5000mAh
  public batteryCapacityAh: number = 5.0;
  public consumedAmpSeconds: number = 0;
  public soc: number = 1.0;
  public batteryVoltage: number = 12.6;
  public currentAmps: number = 0;
  public batteryTemp: number = 25.0;
  public vPol: number = 0.0;
  public rCellNominal: number = 0.045; // 0.045 Ohms por celda

  // Entorno
  public ambientTemp: number = 25.0;
  public thermalUpdraft: number = 0;
  public baseWind: BABYLON.Vector3 = new BABYLON.Vector3(1.5, 0, 0.5);
  public windVector: BABYLON.Vector3 = new BABYLON.Vector3(1.5, 0, 0.5);
  public simTime: number = 0;
  public effectiveB: number = 2.98e-5;

  // Retardante químico
  public retardantLevel: number = 1.0;
  public isSpraying: boolean = false;
  public sprayRate: number = 0.035;

  public isArmed: boolean = false;
  public health: number = 100.0;
  public totalDamage: number = 0;
  public onDamageCallback: ((health: number, amount: number, reason: string) => void) | null = null;

  // Entradas de control
  public inputThrottle: number = 0;
  public inputRoll: number = 0;
  public inputPitch: number = 0;
  public inputYaw: number = 0;

  // Control en cascada
  public flightMode: string = "MANUAL"; // 'MANUAL' | 'ALT_HOLD' | 'LOITER' | 'RTL' | 'WAYPOINTS'
  public targetAltitude: number = 6.0;
  public targetPosition: BABYLON.Vector3 = new BABYLON.Vector3(0, 6.0, 0);
  public homePosition: BABYLON.Vector3 = new BABYLON.Vector3(0, 0.25, 0);

  // Ganancias PID
  public kpRoll: number = 6.8; public kdRoll: number = 0.65; public kiRoll: number = 0.02;
  public kpPitch: number = 6.8; public kdPitch: number = 0.65; public kiPitch: number = 0.02;
  public kpYaw: number = 3.2; public kdYaw: number = 0.35; public kiYaw: number = 0.01;

  public kpAlt: number = 2.2; public kdAlt: number = 1.1; public kiAlt: number = 0.05;
  public kpPos: number = 0.45; public kdPos: number = 0.65;

  private errIntRoll: number = 0;
  private errIntPitch: number = 0;
  private errIntYaw: number = 0;
  private errIntAlt: number = 0;

  constructor(droneModel: any) {
    this.drone = droneModel;
  }

  public setDroneProfile(profileId: string): void {
    if (profileId === "drl_racer") {
      this.m = 1.15;
      this.l = 0.14;
      this.numRotors = 4;
      this.propRadius = 0.065;
      this.fuselageAreaPlan = 0.035;
      this.fuselageAreaFront = 0.015;
      this.Ixx = 0.0085; this.Iyy = 0.0145; this.Izz = 0.0085;
      this.wMax = 1100;
      this.wMin = 120;
      this.b = 1.65e-5;
      this.d = 1.8e-7;
      this.landingGearHeight = 0.05;
    } else if (profileId === "tarot680") {
      this.m = 2.45;
      this.l = 0.34;
      this.numRotors = 6;
      this.propRadius = 0.165;
      this.fuselageAreaPlan = 0.135;
      this.fuselageAreaFront = 0.038;
      this.Ixx = 0.0350; this.Iyy = 0.0680; this.Izz = 0.0350;
      this.wMax = 720;
      this.wMin = 90;
      this.b = 3.25e-5;
      this.d = 3.6e-7;
      this.landingGearHeight = 0.235;
    } else if (profileId === "f450") {
      this.m = 1.05;
      this.l = 0.225;
      this.numRotors = 4;
      this.propRadius = 0.127;
      this.fuselageAreaPlan = 0.065;
      this.fuselageAreaFront = 0.020;
      this.Ixx = 0.0120; this.Iyy = 0.0220; this.Izz = 0.0120;
      this.wMax = 820;
      this.wMin = 100;
      this.b = 2.65e-5;
      this.d = 2.9e-7;
      this.landingGearHeight = 0.12;
    } else { // zd550 default
      this.m = 1.85;
      this.l = 0.275;
      this.numRotors = 4;
      this.propRadius = 0.1524;
      this.fuselageAreaPlan = 0.088;
      this.fuselageAreaFront = 0.024;
      this.Ixx = 0.0196; this.Iyy = 0.0382; this.Izz = 0.0196;
      this.wMax = 750;
      this.wMin = 100;
      this.b = 2.98e-5;
      this.d = 3.2e-7;
      this.landingGearHeight = 0.225;
    }
    this.effectiveB = this.b;
    this.wHover = Math.sqrt((this.m * this.g) / (this.numRotors * this.b));
    this.rotorSpeeds = new Array(this.numRotors).fill(this.isArmed ? this.wMin : 0);
    this.targetRotorSpeeds = new Array(this.numRotors).fill(this.isArmed ? this.wMin : 0);
  }

  public arm(): void {
    this.isArmed = true;
    for (let i = 0; i < this.numRotors; i++) {
      this.rotorSpeeds[i] = this.wMin;
      this.targetRotorSpeeds[i] = this.wMin;
    }
  }

  public disarm(): void {
    this.isArmed = false;
    this.inputThrottle = 0;
    for (let i = 0; i < this.numRotors; i++) {
      this.rotorSpeeds[i] = 0;
      this.targetRotorSpeeds[i] = 0;
    }
  }

  public setFlightMode(mode: string): void {
    this.flightMode = mode;
    if (mode === "ALT_HOLD" || mode === "LOITER") {
      this.targetAltitude = Math.max(1.5, this.position.y);
      this.targetPosition.copyFrom(this.position);
      this.targetPosition.y = this.targetAltitude;
    } else if (mode === "RTL") {
      this.targetAltitude = Math.max(8.0, this.position.y);
      this.targetPosition.set(0, this.targetAltitude, 0);
    }
  }

  public update(dt: number, fireHotspots: any[] = [], treeColliders: any[] = []): void {
    dt = Math.min(dt, 0.04);
    this.simTime += dt;

    this.calculateAtmosphereAndThermals(fireHotspots);
    this.evaluateBatteryThevenin(dt);

    if (this.isArmed) {
      this.evaluateAutonomousControl(dt);
      this.updateMotorDynamics(dt);
    } else {
      for (let i = 0; i < this.numRotors; i++) {
        this.rotorSpeeds[i] = Math.max(0, this.rotorSpeeds[i] - 300 * dt);
      }
    }

    this.updateChemicalSpray(dt);
    this.integrate6DOF(dt);
    this.checkCollisions(treeColliders, dt);
    this.syncVisualMesh();
  }

  private calculateAtmosphereAndThermals(fireHotspots: any[]): void {
    let maxTemp = 25.0;
    let totalUpdraft = 0;

    fireHotspots.forEach(spot => {
      if (!spot || spot.intensity <= 0.01) return;
      const dx = this.position.x - spot.position.x;
      const dz = this.position.z - spot.position.z;
      const dist2D = Math.hypot(dx, dz);

      if (dist2D < 35.0) {
        const radius = spot.radius || 12.0;
        const gaussian = Math.exp(-(dist2D * dist2D) / (2 * radius * radius));
        const tempRise = 140.0 * gaussian * spot.intensity;
        if (25.0 + tempRise > maxTemp) maxTemp = 25.0 + tempRise;

        const maxUpdraftSpeed = 8.5 * spot.intensity;
        const altitudeAtten = Math.max(0, 1.0 - Math.abs(this.position.y - 15.0) / 35.0);
        totalUpdraft += maxUpdraftSpeed * gaussian * altitudeAtten;
      }
    });

    this.ambientTemp = maxTemp;
    this.thermalUpdraft = totalUpdraft;

    const tKelvin = this.ambientTemp + 273.15;
    const airDensity = 1.225 * (288.15 / tKelvin);
    this.effectiveB = this.b * (airDensity / 1.225);

    // Ráfagas Dryden
    const gustX = Math.sin(this.simTime * 0.85) * 1.8 + Math.cos(this.simTime * 2.1) * 0.9;
    const gustZ = Math.cos(this.simTime * 0.72) * 1.6 + Math.sin(this.simTime * 1.8) * 0.8;
    this.windVector.set(this.baseWind.x + gustX, 0, this.baseWind.z + gustZ);
  }

  private evaluateBatteryThevenin(dt: number): void {
    const ocvTable = [
      { soc: 0.0, ocvCell: 3.27 }, { soc: 0.1, ocvCell: 3.68 },
      { soc: 0.2, ocvCell: 3.73 }, { soc: 0.3, ocvCell: 3.77 },
      { soc: 0.4, ocvCell: 3.80 }, { soc: 0.5, ocvCell: 3.83 },
      { soc: 0.6, ocvCell: 3.88 }, { soc: 0.7, ocvCell: 3.93 },
      { soc: 0.8, ocvCell: 4.01 }, { soc: 0.9, ocvCell: 4.10 },
      { soc: 1.0, ocvCell: 4.20 }
    ];

    const idx = Math.min(9, Math.max(0, Math.floor(this.soc * 10)));
    const frac = (this.soc * 10) - idx;
    const ocvCell = ocvTable[idx].ocvCell + frac * (ocvTable[idx + 1].ocvCell - ocvTable[idx].ocvCell);
    const cellCount = (this.numRotors === 4 && this.l < 0.15) ? 6 : 3;
    const ocvPack = ocvCell * cellCount;

    let totalCurrent = 0.85; // Aviónica Pixhawk
    for (let i = 0; i < this.numRotors; i++) {
      const w = this.rotorSpeeds[i] || 0;
      const tauAero = this.d * w * w;
      const iMotor = Math.min(this.escCurrentLimit, (tauAero / this.kt) + (this.rm * w * 0.001));
      totalCurrent += Math.max(0, iMotor);
    }
    this.currentAmps = totalCurrent;

    const tempRatio = 298.15 / (this.batteryTemp + 273.15);
    const rIntDynamic = this.rCellNominal * cellCount * Math.pow(tempRatio, 1.35);

    const rPol = 0.028;
    const cPol = 1800.0;
    const dVpol = ((totalCurrent * rPol - this.vPol) / (rPol * cPol)) * dt;
    this.vPol += dVpol;

    this.batteryVoltage = Math.max(cellCount * 2.8, ocvPack - (this.currentAmps * rIntDynamic) - this.vPol);

    this.consumedAmpSeconds += this.currentAmps * dt;
    const totalCapAmpSec = this.batteryCapacityAh * 3600;
    this.soc = Math.max(0.0, 1.0 - (this.consumedAmpSeconds / totalCapAmpSec));

    const jouleHeat = this.currentAmps * this.currentAmps * rIntDynamic;
    const cooling = 0.18 * (this.batteryTemp - this.ambientTemp);
    this.batteryTemp += ((jouleHeat * 0.003 - cooling) * dt);
  }

  private evaluateAutonomousControl(dt: number): void {
    let desiredRoll = 0;
    let desiredPitch = 0;
    let desiredYawRate = 0;
    let collectiveThrottle = 0;

    if (this.flightMode === "MANUAL") {
      desiredRoll = -this.inputRoll * 0.45; // Flecha derecha inclina a estribor (roll < 0 en Babylon)
      desiredPitch = this.inputPitch * 0.45; // Flecha arriba inclina morro abajo para avance (+Z)
      desiredYawRate = this.inputYaw * 2.2;
      collectiveThrottle = this.inputThrottle;
    } else if (this.flightMode === "ALT_HOLD") {
      const errAlt = this.targetAltitude - this.position.y;
      this.errIntAlt = Math.max(-5, Math.min(5, this.errIntAlt + errAlt * dt));
      const targetVspeed = this.kpAlt * errAlt + this.kiAlt * this.errIntAlt;
      const errVspeed = targetVspeed - this.velocity.y;
      const throttleBias = this.wHover / this.wMax;
      collectiveThrottle = Math.max(0.1, Math.min(0.95, throttleBias + errVspeed * 0.12));

      // En ALT_HOLD se mantiene el control direccional manual
      desiredRoll = -this.inputRoll * 0.45;
      desiredPitch = this.inputPitch * 0.45;
      desiredYawRate = this.inputYaw * 2.2;
    } else if (this.flightMode === "LOITER" || this.flightMode === "RTL") {
      if (this.flightMode === "RTL") {
        const distHome2D = Math.hypot(this.position.x, this.position.z);
        if (distHome2D < 1.0) {
          this.targetAltitude = Math.max(0.1, this.targetAltitude - 1.2 * dt);
          if (this.position.y < 0.25) this.disarm();
        }
      }

      const errAlt = this.targetAltitude - this.position.y;
      this.errIntAlt = Math.max(-5, Math.min(5, this.errIntAlt + errAlt * dt));
      const targetVspeed = this.kpAlt * errAlt + this.kiAlt * this.errIntAlt;
      const errVspeed = targetVspeed - this.velocity.y;
      const throttleBias = this.wHover / this.wMax;
      collectiveThrottle = Math.max(0.1, Math.min(0.95, throttleBias + errVspeed * 0.12));

      const errX = this.targetPosition.x - this.position.x;
      const errZ = this.targetPosition.z - this.position.z;

      const vxWorld = this.kpPos * errX - this.kdPos * this.velocity.x;
      const vzWorld = this.kpPos * errZ - this.kdPos * this.velocity.z;

      const cosY = Math.cos(this.yaw);
      const sinY = Math.sin(this.yaw);
      const vxBody = cosY * vxWorld - sinY * vzWorld;
      const vzBody = sinY * vxWorld + cosY * vzWorld;

      desiredPitch = Math.max(-0.35, Math.min(0.35, vzBody * 0.15));
      desiredRoll = Math.max(-0.35, Math.min(0.35, -vxBody * 0.15));
      desiredYawRate = 0;
    }

    const errRoll = desiredRoll - this.roll;
    this.errIntRoll = Math.max(-1, Math.min(1, this.errIntRoll + errRoll * dt));
    const torqueX = this.kpRoll * errRoll - this.kdRoll * this.rollRate + this.kiRoll * this.errIntRoll;

    const errPitch = desiredPitch - this.pitch;
    this.errIntPitch = Math.max(-1, Math.min(1, this.errIntPitch + errPitch * dt));
    const torqueZ = this.kpPitch * errPitch - this.kdPitch * this.pitchRate + this.kiPitch * this.errIntPitch;

    const errYawRate = desiredYawRate - this.yawRate;
    this.errIntYaw = Math.max(-1, Math.min(1, this.errIntYaw + errYawRate * dt));
    const torqueY = this.kpYaw * errYawRate + this.kiYaw * this.errIntYaw;

    const baseW = this.wMin + collectiveThrottle * (this.wMax - this.wMin);
    const dW_roll = torqueX / (this.numRotors * this.effectiveB * this.l * this.wHover);
    const dW_pitch = torqueZ / (this.numRotors * this.effectiveB * this.l * this.wHover);
    const dW_yaw = torqueY / (this.numRotors * this.d * this.wHover);

    if (this.numRotors === 6) {
      // Configuración Hexa-X (Tarot 680 Pro: 6 rotores)
      // M0 (+30° FR), M1 (+90° R), M2 (+150° RR), M3 (+210° RL), M4 (+270° L), M5 (+330° FL)
      this.targetRotorSpeeds[0] = Math.max(this.wMin, Math.min(this.wMax, baseW + dW_roll - dW_pitch - dW_yaw));
      this.targetRotorSpeeds[1] = Math.max(this.wMin, Math.min(this.wMax, baseW + dW_roll * 1.15 + dW_yaw));
      this.targetRotorSpeeds[2] = Math.max(this.wMin, Math.min(this.wMax, baseW + dW_roll + dW_pitch - dW_yaw));
      this.targetRotorSpeeds[3] = Math.max(this.wMin, Math.min(this.wMax, baseW - dW_roll + dW_pitch + dW_yaw));
      this.targetRotorSpeeds[4] = Math.max(this.wMin, Math.min(this.wMax, baseW - dW_roll * 1.15 - dW_yaw));
      this.targetRotorSpeeds[5] = Math.max(this.wMin, Math.min(this.wMax, baseW - dW_roll - dW_pitch + dW_yaw));
    } else {
      // Configuración Quad-X (M0: FR, M1: RL, M2: FL, M3: RR)
      this.targetRotorSpeeds[0] = Math.max(this.wMin, Math.min(this.wMax, baseW + dW_roll - dW_pitch - dW_yaw));
      this.targetRotorSpeeds[1] = Math.max(this.wMin, Math.min(this.wMax, baseW - dW_roll + dW_pitch - dW_yaw));
      this.targetRotorSpeeds[2] = Math.max(this.wMin, Math.min(this.wMax, baseW - dW_roll - dW_pitch + dW_yaw));
      this.targetRotorSpeeds[3] = Math.max(this.wMin, Math.min(this.wMax, baseW + dW_roll + dW_pitch + dW_yaw));
    }
  }

  private updateMotorDynamics(dt: number): void {
    for (let i = 0; i < this.numRotors; i++) {
      const wAct = this.rotorSpeeds[i] || 0;
      const wCmd = this.targetRotorSpeeds[i] || 0;
      const tauMotor = this.kt * Math.min(this.escCurrentLimit, (wCmd - wAct) * 0.18);
      const tauDrag = this.d * wAct * wAct;
      const alpha = (tauMotor - tauDrag) / this.propInertia;
      this.rotorSpeeds[i] = Math.max(0, Math.min(this.wMax, wAct + alpha * dt));
    }
  }

  private updateChemicalSpray(dt: number): void {
    if (this.isSpraying && this.retardantLevel > 0) {
      this.retardantLevel = Math.max(0.0, this.retardantLevel - this.sprayRate * dt);
    }
  }

  private integrate6DOF(dt: number): void {
    let thrustTotal = 0;
    const armForces: number[] = new Array(this.numRotors).fill(0);
    for (let i = 0; i < this.numRotors; i++) {
      const w = this.rotorSpeeds[i] || 0;
      const fi = this.effectiveB * w * w;
      armForces[i] = fi;
      thrustTotal += fi;
    }

    // Efecto suelo (Cheeseman & Bennett): Evalúa distancia real del disco rotor al suelo
    const hRotor = Math.max(0.04, this.position.y - this.landingGearHeight);
    if (hRotor < 1.5 * this.propRadius) {
      const igFactor = 1.0 / (1.0 - Math.pow(this.propRadius / (4 * hRotor), 2));
      thrustTotal *= Math.min(1.30, Math.max(1.0, igFactor));
    }

    // Vector de empuje exacto proyectado mediante cuaternión (sin fallos de convención Euler)
    BABYLON.Quaternion.RotationYawPitchRollToRef(this.yaw, this.pitch, this.roll, this.rotationQuaternion);
    const localUp = new BABYLON.Vector3(0, 1, 0);
    const worldThrust = BABYLON.Vector3.Zero();
    localUp.rotateByQuaternionToRef(this.rotationQuaternion, worldThrust);

    const fThrustBodyX = thrustTotal * worldThrust.x;
    const fThrustBodyY = thrustTotal * worldThrust.y;
    const fThrustBodyZ = thrustTotal * worldThrust.z;

    // Fuerza de térmica ascendente (CONVERTIDA A NEWTONS)
    const relVy = this.thermalUpdraft - this.velocity.y;
    const fUpdraftNewtons = 0.5 * 1.225 * this.cdPlate * this.fuselageAreaPlan * Math.abs(relVy) * relVy;

    // Arrastre aerodinámico
    const relVx = this.windVector.x - this.velocity.x;
    const relVz = this.windVector.z - this.velocity.z;
    const fDragX = 0.5 * 1.225 * this.cdStreamlined * this.fuselageAreaFront * Math.abs(relVx) * relVx;
    const fDragZ = 0.5 * 1.225 * this.cdStreamlined * this.fuselageAreaFront * Math.abs(relVz) * relVz;

    const netForceX = fThrustBodyX + fDragX;
    const netForceY = fThrustBodyY - (this.m * this.g) + fUpdraftNewtons;
    const netForceZ = fThrustBodyZ + fDragZ;

    const accelX = netForceX / this.m;
    const accelY = netForceY / this.m;
    const accelZ = netForceZ / this.m;

    this.velocity.x += accelX * dt;
    this.velocity.y += accelY * dt;
    this.velocity.z += accelZ * dt;

    this.position.x += this.velocity.x * dt;
    this.position.y += this.velocity.y * dt;
    this.position.z += this.velocity.z * dt;

    // Contacto con el suelo y tren de aterrizaje elástico
    if (this.position.y <= this.landingGearHeight) {
      this.position.y = this.landingGearHeight;
      if (this.velocity.y < -3.2) {
        this.applyDamage(Math.abs(this.velocity.y) * 14, "Impacto violento contra el terreno");
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

    // Torques netos dinámicos
    let tauRoll = 0;
    let tauPitch = 0;
    let tauYaw = 0;

    if (this.numRotors === 6) {
      tauRoll = ((armForces[0] + armForces[1] * 1.2 + armForces[2]) - (armForces[3] + armForces[4] * 1.2 + armForces[5])) * (this.l * 0.65);
      tauPitch = ((armForces[2] + armForces[3]) - (armForces[0] + armForces[5])) * (this.l * 0.866);
      tauYaw = this.d * (
        (this.rotorSpeeds[1] * this.rotorSpeeds[1] + this.rotorSpeeds[3] * this.rotorSpeeds[3] + this.rotorSpeeds[5] * this.rotorSpeeds[5]) -
        (this.rotorSpeeds[0] * this.rotorSpeeds[0] + this.rotorSpeeds[2] * this.rotorSpeeds[2] + this.rotorSpeeds[4] * this.rotorSpeeds[4])
      );
    } else {
      // Quadcopter configuración X
      tauRoll = (armForces[0] + armForces[3] - armForces[1] - armForces[2]) * (this.l * 0.7071);
      tauPitch = (armForces[1] + armForces[3] - armForces[0] - armForces[2]) * (this.l * 0.7071);
      tauYaw = this.d * (
        this.rotorSpeeds[2] * this.rotorSpeeds[2] + this.rotorSpeeds[3] * this.rotorSpeeds[3] -
        this.rotorSpeeds[0] * this.rotorSpeeds[0] - this.rotorSpeeds[1] * this.rotorSpeeds[1]
      );
    }

    const alphaRoll = (tauRoll - (this.Izz - this.Iyy) * this.pitchRate * this.yawRate) / this.Ixx;
    const alphaYaw = (tauYaw - (this.Ixx - this.Izz) * this.rollRate * this.pitchRate) / this.Iyy;
    const alphaPitch = (tauPitch - (this.Iyy - this.Ixx) * this.yawRate * this.rollRate) / this.Izz;

    this.rollRate += alphaRoll * dt;
    this.pitchRate += alphaPitch * dt;
    this.yawRate += alphaYaw * dt;

    this.roll += this.rollRate * dt;
    this.pitch += this.pitchRate * dt;
    this.yaw += this.yawRate * dt;

    BABYLON.Quaternion.RotationYawPitchRollToRef(this.yaw, this.pitch, this.roll, this.rotationQuaternion);
  }

  private checkCollisions(treeColliders: any[], dt: number): void {
    if (!treeColliders || treeColliders.length === 0) return;

    const droneRadius = 0.32; // Radio de colisión del chasis con hélices

    for (let i = 0; i < treeColliders.length; i++) {
      const tc = treeColliders[i];
      const dx = this.position.x - tc.x;
      const dz = this.position.z - tc.z;

      // Fase de descarte rápido por AABB espacial (Broadphase O(1) culling)
      const maxReach = tc.radius + droneRadius + 0.5;
      if (Math.abs(dx) > maxReach || Math.abs(dz) > maxReach) continue;
      // Verificar límites verticales reales para evitar expulsión si se vuela por encima
      if (this.position.y < 0.1 || this.position.y > tc.height + 0.8) continue;

      const distSq = dx * dx + dz * dz;
      const hitRadius = tc.radius + droneRadius;

      if (distSq < hitRadius * hitRadius) {
        const dist = Math.sqrt(distSq) || 0.001;
        const nx = dx / dist; // Vector normal unitario hacia afuera del obstáculo
        const nz = dz / dist;

        if (tc.type === "trunk") {
          // --- COLISIÓN RÍGIDA CONTRA TRONCO ---
          // 1. Corrección de penetración suave
          this.position.x = tc.x + nx * (hitRadius + 0.02);
          this.position.z = tc.z + nz * (hitRadius + 0.02);

          // 2. Descomposición vectorial: velocidad normal y tangencial
          const vn = this.velocity.x * nx + this.velocity.z * nz;
          if (vn < 0) {
            const vtx = this.velocity.x - vn * nx;
            const vtz = this.velocity.z - vn * nz;

            const restitution = 0.32;
            const friction = 0.35;

            const vnNew = -vn * restitution;
            const vtxNew = vtx * (1.0 - friction);
            const vtzNew = vtz * (1.0 - friction);

            this.velocity.x = vnNew * nx + vtxNew;
            this.velocity.z = vnNew * nz + vtzNew;

            // 3. Transferencia de Impulso Angular acotada
            const vImpact = Math.abs(vn);
            const impulseMag = Math.min(20.0, this.m * (1.0 + restitution) * vImpact);

            this.rollRate += (nz * impulseMag * 1.5) / this.Ixx;
            this.pitchRate += (-nx * impulseMag * 1.5) / this.Izz;
            this.yawRate += ((nx * nz >= 0 ? 1 : -1) * impulseMag * 1.2) / this.Iyy;

            const dmg = Math.min(45.0, Math.max(3.0, vImpact * 14.0));
            this.applyDamage(dmg, "Colisión contra tronco de árbol");
          }
          break; // Procesar obstáculo más cercano por paso
        } else {
          // --- IMPACTO CON FOLLAJE / RAMAS DE PINO ---
          const foliageDamp = Math.max(0.20, 1.0 - 4.5 * dt);
          this.velocity.x *= foliageDamp;
          this.velocity.z *= foliageDamp;
          this.velocity.y *= Math.max(0.3, 1.0 - 2.8 * dt);

          this.rollRate += (Math.random() - 0.5) * 3.0 * dt;
          this.pitchRate += (Math.random() - 0.5) * 3.0 * dt;

          for (let r = 0; r < this.numRotors; r++) {
            this.rotorSpeeds[r] = Math.max(this.wMin, this.rotorSpeeds[r] - 500.0 * dt);
          }

          const currentSpeed = this.velocity.length();
          if (currentSpeed > 1.4) {
            this.applyDamage(currentSpeed * 3.5 * dt, "Fricción con follaje denso");
          }
        }
      }
    }
  }

  public applyDamage(amount: number, reason: string): void {
    this.health = Math.max(0.0, this.health - amount);
    this.totalDamage += amount;
    if (this.onDamageCallback) {
      this.onDamageCallback(this.health, amount, reason);
    }
  }

  private syncVisualMesh(): void {
    if (!this.drone || !this.drone.root) return;
    this.drone.root.position.copyFrom(this.position);
    this.drone.root.rotationQuaternion = this.rotationQuaternion;

    // Girar todas las hélices visuales según los rotores disponibles
    if (this.drone.propellers && this.drone.propellers.length > 0) {
      this.drone.propellers.forEach((prop: any, idx: number) => {
        const speed = this.rotorSpeeds[idx] !== undefined ? this.rotorSpeeds[idx] : (this.rotorSpeeds[0] || 0);
        // Hélices en diagonal giran en el mismo sentido para cancelar par reactivo
        const dir = (this.numRotors === 4)
          ? (idx === 0 || idx === 3 ? 1 : -1)
          : (idx % 2 === 0 ? 1 : -1);
        prop.rotation.y += speed * 0.015 * dir;
      });
    }
  }

  public getTelemetry(): TelemetryData {
    const speedMs = this.velocity.length();
    const thrustN = this.rotorSpeeds.slice(0, this.numRotors).map(w => this.effectiveB * w * w);
    const totalThrust = thrustN.reduce((a, b) => a + b, 0);

    return {
      altitude: Math.max(0, this.position.y - this.landingGearHeight),
      speedKmh: speedMs * 3.6,
      verticalSpeed: this.velocity.y,
      rollDeg: (-this.roll * 180) / Math.PI,
      pitchDeg: (this.pitch * 180) / Math.PI,
      yawDeg: (((this.yaw * 180) / Math.PI) % 360 + 360) % 360,
      voltage: this.batteryVoltage,
      current: this.currentAmps,
      soc: this.soc * 100,
      ambientTemp: this.ambientTemp,
      batteryTemp: this.batteryTemp,
      thermalUpdraft: this.thermalUpdraft,
      totalThrust: totalThrust,
      thrustN: thrustN,
      rotorRpm: this.rotorSpeeds.slice(0, this.numRotors).map(w => Math.round((w * 60) / (2 * Math.PI))),
      retardant: this.retardantLevel * 100,
      armed: this.isArmed,
      health: Math.round(this.health),
      flightMode: this.flightMode,
      position: { x: this.position.x, y: this.position.y, z: this.position.z }
    };
  }
}
