/**
 * Script Principal de Inicialización del Simulador de Dron ZD550 en Babylon.js
 * Arquitectura 100% Offline, Modular y con Integración STEAM Completa
 * 
 * Desarrolladores / Roles:
 * - Martin (Silva Cruz, Yulian Martin): Físicas 6-DOF, Thevenin, Motores y Control PID
 * - Emi (Gómez Porras, Ángel Emiliano): Shaders PBR, Carcasa de Rescate, Fuego Volumétrico y Mapa Térmico
 * - Koki (Carrizales Aguiar, Jorge Luis): UI/UX, Fases STEAM, Onboarding, Osciloscopio y Modo Misión
 * - Perez (Pérez Escobedo, Ángel Jesús): Metadatos JSON, Modo Profesor (?alumno=ID) y Eventos
 */

import { createDroneModel } from './drone/parts.js';
import { DronePhysicsEngine } from './drone/physics.js';
import { AssemblyManager } from './drone/assembly.js';
import { ForestEnvironment } from './scene/forest.js';
import { SteamStateMachine } from './drone/steam.js';
import { MissionManager } from './drone/mission.js';

window.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('renderCanvas');
  if (!canvas) return;

  // 1. Motor Babylon.js WebGL 2.0 de alto rendimiento
  const engine = new BABYLON.Engine(canvas, true, {
    preserveDrawingBuffer: true,
    stencil: true,
    antialias: true
  });

  const scene = new BABYLON.Scene(engine);
  scene.clearColor = new BABYLON.Color4(0.04, 0.06, 0.09, 1.0);

  // 2. Luces de Estudio y Ambiente
  const hemiLight = new BABYLON.HemisphericLight('hemiLight', new BABYLON.Vector3(0, 1, 0), scene);
  hemiLight.intensity = 0.75;
  hemiLight.diffuse = new BABYLON.Color3(0.92, 0.94, 0.98);
  hemiLight.groundColor = new BABYLON.Color3(0.18, 0.20, 0.24);

  const dirLight = new BABYLON.DirectionalLight('sunLight', new BABYLON.Vector3(-1.2, -2.5, 1.0), scene);
  dirLight.position = new BABYLON.Vector3(20, 45, -20);
  dirLight.intensity = 1.15;

  // 3. Cámaras: Orbital para Taller y Seguimiento para Vuelo
  const orbitCamera = new BABYLON.ArcRotateCamera('orbitCam', -Math.PI / 2, Math.PI / 3, 1.15, new BABYLON.Vector3(0, 0.24, 0), scene);
  orbitCamera.lowerRadiusLimit = 0.35;
  orbitCamera.upperRadiusLimit = 45.0;
  orbitCamera.wheelPrecision = 50;
  orbitCamera.attachControl(canvas, true);

  const followCamera = new BABYLON.FollowCamera('flightFollowCam', new BABYLON.Vector3(0, 2.5, -4.5), scene);
  followCamera.radius = 3.2;
  followCamera.heightOffset = 1.1;
  followCamera.rotationOffset = 180;
  followCamera.cameraAcceleration = 0.08;
  followCamera.maxCameraSpeed = 25;

  scene.activeCamera = orbitCamera;

  // 4. Modelado 3D, Físicas, Ensamblaje y Entorno
  const droneModel = createDroneModel(scene);
  const physicsEngine = new DronePhysicsEngine(droneModel);
  const assemblyManager = new AssemblyManager(droneModel);
  const forestEnv = new ForestEnvironment(scene);
  followCamera.lockedTarget = droneModel.root;

  // 5. Máquina de Estados STEAM y Modo Misión
  const steamSM = new SteamStateMachine();
  const missionMgr = new MissionManager(physicsEngine, forestEnv, steamSM);

  // =========================================================================
  // REFERENCIAS DOM DE LA INTERFAZ (UI/HUD)
  // =========================================================================
  const btnModeAssembly = document.getElementById('btn-mode-assembly');
  const btnModeFlight = document.getElementById('btn-mode-flight');
  const panelAssembly = document.getElementById('panel-assembly');
  const panelTelemetry = document.getElementById('panel-telemetry');
  const hudAlertEl = document.getElementById('hud-alert');

  // Inspector de Materiales
  const inspectorCard = document.getElementById('material-inspector-card');
  const btnCloseInspector = document.getElementById('btn-close-inspector');
  const inspectorTitle = document.getElementById('inspector-title');
  const inspectorBadgeType = document.getElementById('inspector-badge-type');
  const inspectorBadgeTemp = document.getElementById('inspector-badge-temp');
  const inspectorMatName = document.getElementById('inspector-material-name');
  const inspectorDesc = document.getElementById('inspector-desc');
  const inspectorPropsGrid = document.getElementById('inspector-props-grid');

  // Ensamblaje y Onboarding
  const stepNumberEl = document.getElementById('step-number');
  const stepProgressFill = document.getElementById('step-progress-fill');
  const partTitleEl = document.getElementById('part-title');
  const partDescEl = document.getElementById('part-desc');
  const partSpecsEl = document.getElementById('part-specs');
  const btnStepPrev = document.getElementById('btn-step-prev');
  const btnStepNext = document.getElementById('btn-step-next');
  const btnAssembleAll = document.getElementById('btn-assemble-all');
  const btnDisassemble = document.getElementById('btn-disassemble');
  const explosionSlider = document.getElementById('explosion-slider');
  const explosionVal = document.getElementById('explosion-val');

  const guideBoxEl = document.getElementById('onboarding-guide-box');
  const guidePhaseEl = document.getElementById('guide-steam-phase');
  const guideToolEl = document.getElementById('guide-tool');
  const guideTipEl = document.getElementById('guide-tip');

  // Telemetría
  const tAltitudeEl = document.getElementById('t-altitude');
  const tSpeedEl = document.getElementById('t-speed');
  const tVspeedEl = document.getElementById('t-vspeed');
  const tYawEl = document.getElementById('t-yaw');
  const tRollEl = document.getElementById('t-roll');
  const tPitchEl = document.getElementById('t-pitch');
  const tVoltageEl = document.getElementById('t-voltage');
  const tCurrentEl = document.getElementById('t-current');
  const tSocEl = document.getElementById('t-soc');
  const tTempEl = document.getElementById('t-temp');
  const tUpdraftEl = document.getElementById('t-updraft');
  const tTotalThrustEl = document.getElementById('t-total-thrust');
  const tHealthValEl = document.getElementById('t-health-val');
  const tHealthFillEl = document.getElementById('t-health-fill');

  const rotorFills = [
    document.getElementById('r1-fill'),
    document.getElementById('r2-fill'),
    document.getElementById('r3-fill'),
    document.getElementById('r4-fill')
  ];
  const rotorVals = [
    document.getElementById('r1-val'),
    document.getElementById('r2-val'),
    document.getElementById('r3-val'),
    document.getElementById('r4-val')
  ];

  const tRetardantEl = document.getElementById('t-retardant');
  const retardantFillEl = document.getElementById('retardant-fill');
  const btnArmEl = document.getElementById('btn-arm');
  const btnSprayEl = document.getElementById('btn-spray');
  const btnToggleThermal = document.getElementById('btn-toggle-thermal');
  const btnToggleGraphs = document.getElementById('btn-toggle-graphs');
  const flightModeBadge = document.getElementById('flight-mode-badge');

  // Horizonte y Radar
  const horizonCanvas = document.getElementById('hud-horizon-canvas');
  const horizonCtx = horizonCanvas ? horizonCanvas.getContext('2d') : null;
  const thermalRadarCanvas = document.getElementById('hud-thermal-radar');

  // Osciloscopio
  const graphsPanel = document.getElementById('hud-graphs-panel');
  const btnCloseGraphs = document.getElementById('btn-close-graphs');
  const telemetryCanvas = document.getElementById('hud-telemetry-canvas');
  const telemetryCtx = telemetryCanvas ? telemetryCanvas.getContext('2d') : null;
  const telemetryHistory = [];

  // Misión
  const missionTracker = document.getElementById('hud-mission-tracker');
  const missionScoreEl = document.getElementById('hud-mission-score');
  const missionObjectivesList = document.getElementById('mission-objectives-list');

  // Modales
  const modalTutorial = document.getElementById('modal-tutorial');
  const modalFlightLogs = document.getElementById('modal-flight-logs');
  const modalSteamTest = document.getElementById('modal-steam-test');
  const modalMissionResult = document.getElementById('modal-mission-result');
  const btnOpenTutorial = document.getElementById('btn-open-tutorial');
  const btnOpenLogs = document.getElementById('btn-open-logs');
  const btnExportLogs = document.getElementById('btn-export-logs');
  const logsTableBody = document.getElementById('logs-table-body');

  let currentMode = 'assembly';

  // =========================================================================
  // SISTEMA DE ALERTAS CORREGIDO (KOKI: NO REDUNDANTE EN CADA FOTOGRAMA)
  // =========================================================================
  let lastAlertMsg = '';
  let lastAlertTime = 0;

  function showAlert(msg, force = false) {
    const now = Date.now();
    if (!force && msg === lastAlertMsg && (now - lastAlertTime) < 4000) {
      return; // Debounce de 4 segundos para evitar disparos en cada frame
    }
    lastAlertMsg = msg;
    lastAlertTime = now;

    if (!hudAlertEl) return;
    hudAlertEl.textContent = msg;
    hudAlertEl.style.display = 'block';
    clearTimeout(hudAlertEl.timeoutId);
    hudAlertEl.timeoutId = setTimeout(() => {
      hudAlertEl.style.display = 'none';
    }, 3500);
  }

  // =========================================================================
  // MODO PROFESOR / AUDITORÍA ACADÉMICA (?alumno=ID)
  // =========================================================================
  const urlParams = new URLSearchParams(window.location.search);
  const studentParam = urlParams.get('alumno') || urlParams.get('student');
  const teacherModeBar = document.getElementById('teacher-mode-bar');
  const teacherStudentInfo = document.getElementById('teacher-student-info');

  if (studentParam) {
    if (teacherModeBar) teacherModeBar.classList.remove('hidden');
    if (teacherStudentInfo) {
      teacherStudentInfo.innerHTML = `Auditoría del Alumno: ID <strong>${studentParam}</strong>`;
    }
  }

  const btnTeacherProgress = document.getElementById('btn-teacher-view-progress');
  if (btnTeacherProgress) {
    btnTeacherProgress.addEventListener('click', () => {
      const state = steamSM.getState();
      alert(`📊 Progreso del Alumno (${state.studentId}):\n\n` +
        `• Fase Actual: ${state.currentPhase}\n` +
        `• Fase M (Matemáticas): ${state.phaseData.M.completed ? 'Aprobada' : 'Pendiente'}\n` +
        `• Fase S (Ciencias): ${state.phaseData.S.completed ? 'Aprobada' : 'Pendiente'}\n` +
        `• Fase E (Ingeniería): ${state.phaseData.E.completed ? 'Aprobada' : 'Pendiente'}\n` +
        `• Fase T (Tecnología): ${state.phaseData.T.completed ? 'Aprobada' : 'Pendiente'}\n` +
        `• Fase A (Arte & Diseño): ${state.phaseData.A.completed ? 'Aprobada' : 'Pendiente'}`
      );
    });
  }

  const btnTeacherLogs = document.getElementById('btn-teacher-view-logs');
  if (btnTeacherLogs) {
    btnTeacherLogs.addEventListener('click', () => {
      openFlightLogsModal();
    });
  }

  const btnTeacherRubrics = document.getElementById('btn-teacher-view-rubrics');
  if (btnTeacherRubrics) {
    btnTeacherRubrics.addEventListener('click', () => {
      window.open('/rubrics.json', '_blank');
    });
  }

  // =========================================================================
  // NAVEGACIÓN Y VALIDACIÓN DE FASES STEAM (M -> S -> E -> T -> A)
  // =========================================================================
  function updateSteamNavUI() {
    const state = steamSM.getState();
    ['M', 'S', 'E', 'T', 'A'].forEach(phase => {
      const btn = document.getElementById(`btn-phase-${phase.toLowerCase()}`);
      if (!btn) return;
      const pData = state.phaseData[phase];

      btn.classList.remove('active', 'completed', 'locked');
      if (pData.completed) {
        btn.classList.add('completed');
      } else if (pData.unlocked) {
        if (state.currentPhase === phase) btn.classList.add('active');
      } else {
        btn.classList.add('locked');
      }
    });
  }

  document.querySelectorAll('.steam-phase-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetPhase = btn.getAttribute('data-phase');
      const canAccess = steamSM.canAccessPhase(targetPhase);
      if (!canAccess) {
        showAlert(`⚠️ Fase ${targetPhase} bloqueada. Completa primero los objetivos de la fase anterior.`);
        return;
      }
      openSteamPhaseTest(targetPhase);
    });
  });

  function openSteamPhaseTest(phase) {
    if (phase === 'M') {
      openPhaseMModal();
    } else if (phase === 'S') {
      openPhaseSModal();
    } else if (phase === 'E') {
      switchMode('assembly');
      showAlert('🔧 FASE E: Ensambla los 9 subsistemas mecánicos en el banco de trabajo.');
    } else if (phase === 'T') {
      switchMode('flight');
      showAlert('🚁 FASE T: Ejecuta la misión de vuelo y activa los lazos de control PID y RTL.');
    } else if (phase === 'A') {
      switchMode('assembly');
      assemblyManager.setStep(9);
      showAlert('🎨 FASE A: Carcasa aerodinámica PBR de rescate instalada. Inspecciónala en 3D.');
      steamSM.completePhase('A', 100);
    }
  }

  function openPhaseMModal() {
    const titleEl = document.getElementById('steam-test-title');
    const bodyEl = document.getElementById('steam-test-body');
    titleEl.textContent = '📐 FASE M: Dinámica 6-DOF y Cálculo de TWR';
    bodyEl.innerHTML = `
      <p style="font-size:0.85rem; color:#cbd5e1; margin-bottom:12px;">
        Para certificar que el cuadricóptero ZD550 es aeronavegable, calcula la relación Empuje/Peso (TWR):
      </p>
      <div style="background:#1e293b; padding:10px; border-radius:6px; font-family:monospace; font-size:0.8rem; margin-bottom:12px;">
        • Masa Total (m): 1,850 gramos<br>
        • Empuje por Motor (5010 750KV): 1,150 gramos (x4 motores)<br>
        • Empuje Total Combinado: 4,600 gramos
      </div>
      <p style="font-size:0.85rem; margin-bottom:8px;">¿Cuál es la relación TWR resultante y su dictamen aeronáutico?</p>
      <div style="display:flex; flex-direction:column; gap:6px;">
        <button class="btn-action btn-secondary btn-m-opt" data-correct="false">A) TWR = 1.25:1 (No es apto para vuelo en ráfagas)</button>
        <button class="btn-action btn-secondary btn-m-opt" data-correct="true">B) TWR = 2.48:1 (Apto y excelente para operaciones forestales)</button>
        <button class="btn-action btn-secondary btn-m-opt" data-correct="false">C) TWR = 0.50:1 (El dron es demasiado pesado y no despega)</button>
      </div>
    `;

    document.querySelectorAll('.btn-m-opt').forEach(opt => {
      opt.addEventListener('click', () => {
        const isCorrect = opt.getAttribute('data-correct') === 'true';
        steamSM.emitMatematicasIntento({ twr: 2.48, masa: 1850, empuje: 4600, correct: isCorrect });
        if (isCorrect) {
          alert('✅ ¡Cálculo Correcto! TWR = 4600 / 1850 = 2.48:1 (>2.0). Fase M aprobada.');
          steamSM.completePhase('M', 100);
          updateSteamNavUI();
          modalSteamTest.classList.add('hidden');
        } else {
          alert('❌ Respuesta incorrecta. Recuerda: TWR = Empuje Total / Masa Total = 4600 / 1850.');
        }
      });
    });

    modalSteamTest.classList.remove('hidden');
  }

  function openPhaseSModal() {
    const titleEl = document.getElementById('steam-test-title');
    const bodyEl = document.getElementById('steam-test-body');
    titleEl.textContent = '🔬 FASE S: Termodinámica y Batería LiPo Thevenin';
    bodyEl.innerHTML = `
      <p style="font-size:0.85rem; color:#cbd5e1; margin-bottom:12px;">
        Evalúa el impacto del calor extremo en incendios forestales sobre la aeronáutica del dron:
      </p>
      <div style="background:#1e293b; padding:10px; border-radius:6px; font-family:monospace; font-size:0.8rem; margin-bottom:12px;">
        • Temperatura ambiente cerca del fuego: 105°C<br>
        • Densidad del aire estándar (ρ₀ a 15°C): 1.225 kg/m³<br>
        • Batería LiPo 3S bajo descarga continua de 40A
      </div>
      <p style="font-size:0.85rem; margin-bottom:8px;">¿Qué ocurre con el empuje de las hélices y el voltaje terminal de la batería?</p>
      <div style="display:flex; flex-direction:column; gap:6px;">
        <button class="btn-action btn-secondary btn-s-opt" data-correct="true">A) La sustentación cae por rarefacción del aire y el voltaje cae por resistencia interna térmica</button>
        <button class="btn-action btn-secondary btn-s-opt" data-correct="false">B) El aire caliente empuja el dron hacia arriba sin gastar batería</button>
        <button class="btn-action btn-secondary btn-s-opt" data-correct="false">C) Los motores se aceleran al doble sin requerir más corriente</button>
      </div>
    `;

    document.querySelectorAll('.btn-s-opt').forEach(opt => {
      opt.addEventListener('click', () => {
        const isCorrect = opt.getAttribute('data-correct') === 'true';
        steamSM.emitCienciaIntento({ tema: 'termodinamica_lipo', soc: 0.9, temp: 105, correct: isCorrect });
        if (isCorrect) {
          alert('✅ ¡Excelente análisis científico! La rarefacción térmica reduce effectiveB y la resistencia interna provoca caída de tensión. Fase S aprobada.');
          steamSM.completePhase('S', 100);
          updateSteamNavUI();
          modalSteamTest.classList.add('hidden');
        } else {
          alert('❌ Respuesta incorrecta. La alta temperatura reduce la densidad del aire y aumenta la resistencia de la batería.');
        }
      });
    });

    modalSteamTest.classList.remove('hidden');
  }

  updateSteamNavUI();

  // =========================================================================
  // GESTIÓN DE MODOS DE VUELO AUTÓNOMO (FASE T: LOITER, WAYPOINTS, RTL)
  // =========================================================================
  document.querySelectorAll('.btn-fmode').forEach(b => {
    b.addEventListener('click', () => {
      const mode = b.getAttribute('data-mode');
      document.querySelectorAll('.btn-fmode').forEach(el => el.classList.remove('active'));
      b.classList.add('active');
      physicsEngine.setFlightMode(mode);
      if (flightModeBadge) flightModeBadge.textContent = mode;
      showAlert(`MODO DE VUELO: ${mode}`);
    });
  });

  // =========================================================================
  // INSPECTOR DE MATERIALES PBR INTERACTIVO
  // =========================================================================
  scene.onPointerObservable.add((pointerInfo) => {
    if (pointerInfo.type === BABYLON.PointerEventTypes.POINTERDOWN && pointerInfo.event.button === 0) {
      const pick = pointerInfo.pickInfo;
      if (pick && pick.hit && pick.pickedMesh) {
        const mesh = pick.pickedMesh;
        if (mesh.metadata && mesh.metadata.title) {
          showMaterialInfo(mesh.metadata);
        }
      }
    }
  });

  function showMaterialInfo(meta) {
    if (!inspectorCard) return;
    inspectorTitle.textContent = meta.title || 'Pieza';
    inspectorBadgeType.textContent = (meta.family || 'COMPONENTE').toUpperCase();
    inspectorBadgeTemp.textContent = meta.tempLimit || '100°C';
    inspectorMatName.textContent = meta.material || 'Aleación de Ingeniería';
    inspectorDesc.textContent = meta.description || 'Especificaciones aeroespaciales.';

    inspectorPropsGrid.innerHTML = `
      <div class="prop-row"><span class="prop-name">DENSIDAD / MASA</span><span class="prop-val">${meta.density || 'N/A'}</span></div>
      <div class="prop-row"><span class="prop-name">RESISTENCIA</span><span class="prop-val">${meta.tensileStrength || 'Alta'}</span></div>
    `;
    inspectorCard.style.display = 'block';
  }

  function hideMaterialInfo() {
    if (inspectorCard) inspectorCard.style.display = 'none';
  }

  if (btnCloseInspector) {
    btnCloseInspector.addEventListener('click', hideMaterialInfo);
  }

  // =========================================================================
  // ACTUALIZACIÓN DE UI DEL TALLER DE ENSAMBLAJE
  // =========================================================================
  function updateAssemblyUI(currentStep, maxSteps, currentPart, guide) {
    if (stepNumberEl) stepNumberEl.textContent = `${currentStep} / ${maxSteps}`;
    if (stepProgressFill) {
      const pct = (currentStep / maxSteps) * 100;
      stepProgressFill.style.width = `${pct}%`;
    }

    if (guide && guideBoxEl) {
      guidePhaseEl.textContent = guide.steamPhase;
      guideToolEl.textContent = `🔧 ${guide.tool}`;
      guideTipEl.textContent = guide.tip;
    }

    if (currentPart) {
      partTitleEl.textContent = currentPart.name;
      partDescEl.textContent = `Paso ${currentStep} de ${maxSteps}: Inspecciona las tolerancias y el acoplamiento físico en el banco.`;

      let specsHtml = '';
      if (currentPart.specs) {
        Object.entries(currentPart.specs).forEach(([k, v]) => {
          const keyClean = k.replace(/_/g, ' ').toUpperCase();
          specsHtml += `<div class="spec-item"><span class="spec-label">${keyClean}:</span><span class="spec-val">${v}</span></div>`;
        });
      }
      partSpecsEl.innerHTML = specsHtml;
      steamSM.emitObjetoColocado(currentPart.name, currentStep);
    } else if (currentStep === 0) {
      partTitleEl.textContent = 'Taller Vacío (Desensamblado)';
      partDescEl.textContent = 'Pulsa "Siguiente" para comenzar el montaje paso a paso desde el chasis.';
      partSpecsEl.innerHTML = '';
    }

    if (currentStep >= maxSteps) {
      steamSM.completePhase('E', 100);
      updateSteamNavUI();
    }
  }

  assemblyManager.onStepChange(updateAssemblyUI);

  if (btnStepNext) btnStepNext.addEventListener('click', () => assemblyManager.nextStep());
  if (btnStepPrev) btnStepPrev.addEventListener('click', () => assemblyManager.prevStep());
  if (btnAssembleAll) btnAssembleAll.addEventListener('click', () => assemblyManager.assembleAll());
  if (btnDisassemble) btnDisassemble.addEventListener('click', () => assemblyManager.disassembleAll());

  if (explosionSlider) {
    explosionSlider.addEventListener('input', (e) => {
      const val = parseFloat(e.target.value);
      assemblyManager.setExplosion(val);
      if (explosionVal) explosionVal.textContent = `${Math.round(val * 100)}%`;
    });
  }

  // =========================================================================
  // CAMBIO DE MODOS: TALLER DE ENSAMBLAJE <---> MISIÓN VUELO FORESTAL
  // =========================================================================
  function switchMode(mode) {
    if (mode === 'flight') {
      if (!assemblyManager.isFullyAssembled()) {
        showAlert('⚠️ ENSAMBLE INCOMPLETO: Debes montar el 100% de las piezas y cerrar la vista explosionada.');
        return;
      }
      hideMaterialInfo();
      currentMode = 'flight';
      btnModeFlight.classList.add('active');
      btnModeAssembly.classList.remove('active');
      panelAssembly.classList.add('hidden');
      panelTelemetry.classList.remove('hidden');
      if (missionTracker) missionTracker.classList.remove('hidden');

      forestEnv.setMode('flight');
      physicsEngine.position.set(0, 0.25, 0);
      physicsEngine.velocity.set(0, 0, 0);
      physicsEngine.roll = 0;
      physicsEngine.pitch = 0;

      scene.activeCamera = followCamera;
      followCamera.attachControl(canvas, true);

      // Iniciar Modo Misión
      missionMgr.startMission();
      updateMissionTrackerUI();
      showAlert('🌲 MODO VUELO FORESTAL: Pulsa X para Armar motores. WASD + Flechas de dirección.', true);
    } else {
      currentMode = 'assembly';
      btnModeAssembly.classList.add('active');
      btnModeFlight.classList.remove('active');
      panelAssembly.classList.remove('hidden');
      panelTelemetry.classList.add('hidden');
      if (missionTracker) missionTracker.classList.add('hidden');
      if (graphsPanel) graphsPanel.classList.add('hidden');

      physicsEngine.disarm();
      forestEnv.setMode('assembly');

      droneModel.root.position.set(0, 0.23, 0);
      droneModel.root.rotation.set(0, 0, 0);

      scene.activeCamera = orbitCamera;
      orbitCamera.setTarget(new BABYLON.Vector3(0, 0.22, 0));
      orbitCamera.attachControl(canvas, true);
    }
  }

  btnModeAssembly.addEventListener('click', () => switchMode('assembly'));
  btnModeFlight.addEventListener('click', () => switchMode('flight'));

  // =========================================================================
  // CONTROLES DE VUELO Y TECLADO
  // =========================================================================
  const keys = {};
  window.addEventListener('keydown', (e) => {
    keys[e.key.toLowerCase()] = true;
    keys[e.code] = true;

    if (e.key.toLowerCase() === 'x') toggleArm();
    if (e.key.toLowerCase() === 'r') resetDrone();
    if (e.key.toLowerCase() === 'c') toggleCamera();
    if (e.key.toLowerCase() === 't') toggleThermal();
    if (e.key.toLowerCase() === 'g') toggleGraphs();
  });

  window.addEventListener('keyup', (e) => {
    keys[e.key.toLowerCase()] = false;
    keys[e.code] = false;
  });

  function toggleArm() {
    if (currentMode !== 'flight') return;
    if (physicsEngine.isArmed) {
      physicsEngine.disarm();
      btnArmEl.textContent = 'ARMAR MOTORES (X)';
      btnArmEl.classList.remove('active');
      showAlert('MOTORES DESARMADOS', true);
    } else {
      physicsEngine.arm();
      btnArmEl.textContent = 'DESARMAR (X)';
      btnArmEl.classList.add('active');
      showAlert('MOTORES ARMADOS - LISTO PARA DESPEGUE', true);
    }
  }

  function resetDrone() {
    physicsEngine.position.set(0, 0.25, 0);
    physicsEngine.velocity.set(0, 0, 0);
    physicsEngine.roll = 0;
    physicsEngine.pitch = 0;
    physicsEngine.yaw = 0;
    physicsEngine.inputThrottle = 0;
    showAlert('DRON REPOSICIONADO EN HELIPAD', true);
  }

  function toggleCamera() {
    if (currentMode !== 'flight') return;
    if (scene.activeCamera === followCamera) {
      scene.activeCamera = orbitCamera;
      orbitCamera.target.copyFrom(droneModel.root.position);
      showAlert('CÁMARA: ORBITAL LIBRE', true);
    } else {
      scene.activeCamera = followCamera;
      showAlert('CÁMARA: SEGUIMIENTO AÉREO', true);
    }
  }

  function toggleThermal() {
    const active = forestEnv.toggleThermalVision(scene.activeCamera);
    showAlert(active ? '🌡️ VISIÓN TÉRMICA FLIR: ACTIVADA' : 'VISIÓN ÓPTICA NORMAL', true);
  }

  function toggleGraphs() {
    if (graphsPanel) {
      graphsPanel.classList.toggle('hidden');
    }
  }

  if (btnArmEl) btnArmEl.addEventListener('click', toggleArm);
  if (btnToggleThermal) btnToggleThermal.addEventListener('click', toggleThermal);
  if (btnToggleGraphs) btnToggleGraphs.addEventListener('click', toggleGraphs);
  if (btnCloseGraphs) btnCloseGraphs.addEventListener('click', () => graphsPanel.classList.add('hidden'));

  if (btnSprayEl) {
    btnSprayEl.addEventListener('mousedown', () => { physicsEngine.isSpraying = true; });
    btnSprayEl.addEventListener('mouseup', () => { physicsEngine.isSpraying = false; });
    btnSprayEl.addEventListener('touchstart', () => { physicsEngine.isSpraying = true; });
    btnSprayEl.addEventListener('touchend', () => { physicsEngine.isSpraying = false; });
  }

  function processFlightInputs(dt) {
    if (currentMode !== 'flight' || !physicsEngine.isArmed) return;

    if (physicsEngine.flightMode === 'MANUAL') {
      if (keys['w']) {
        physicsEngine.inputThrottle = Math.min(1.0, physicsEngine.inputThrottle + 0.6 * dt);
      } else if (keys['s']) {
        physicsEngine.inputThrottle = Math.max(0.0, physicsEngine.inputThrottle - 0.6 * dt);
      }

      if (keys['a']) physicsEngine.inputYaw = -1.0;
      else if (keys['d']) physicsEngine.inputYaw = 1.0;
      else physicsEngine.inputYaw = 0;

      if (keys['arrowup']) physicsEngine.inputPitch = 1.0;
      else if (keys['arrowdown']) physicsEngine.inputPitch = -1.0;
      else physicsEngine.inputPitch = 0;

      if (keys['arrowleft']) physicsEngine.inputRoll = -1.0;
      else if (keys['arrowright']) physicsEngine.inputRoll = 1.0;
      else physicsEngine.inputRoll = 0;
    }

    physicsEngine.isSpraying = Boolean(keys[' '] || keys['space']);
  }

  // =========================================================================
  // HORIZONTE ARTIFICIAL HUD (2D Canvas)
  // =========================================================================
  function drawArtificialHorizon(rollDeg, pitchDeg) {
    if (!horizonCtx || !horizonCanvas) return;
    const w = horizonCanvas.width;
    const h = horizonCanvas.height;
    const cx = w / 2;
    const cy = h / 2;

    horizonCtx.save();
    horizonCtx.clearRect(0, 0, w, h);
    horizonCtx.fillStyle = '#06101e';
    horizonCtx.fillRect(0, 0, w, h);

    horizonCtx.translate(cx, cy);
    horizonCtx.rotate((-rollDeg * Math.PI) / 180);

    const pitchOffset = (pitchDeg / 45) * (h / 2);
    horizonCtx.translate(0, pitchOffset);

    // Cielo
    horizonCtx.fillStyle = 'rgba(0, 136, 255, 0.45)';
    horizonCtx.fillRect(-w, -h, w * 2, h);

    // Tierra
    horizonCtx.fillStyle = 'rgba(160, 80, 20, 0.45)';
    horizonCtx.fillRect(-w, 0, w * 2, h);

    // Línea de horizonte
    horizonCtx.strokeStyle = '#00e5ff';
    horizonCtx.lineWidth = 2;
    horizonCtx.beginPath();
    horizonCtx.moveTo(-w, 0);
    horizonCtx.lineTo(w, 0);
    horizonCtx.stroke();

    horizonCtx.restore();

    // Cruz fija
    horizonCtx.strokeStyle = '#00ff88';
    horizonCtx.lineWidth = 2;
    horizonCtx.beginPath();
    horizonCtx.moveTo(cx - 16, cy); horizonCtx.lineTo(cx - 5, cy);
    horizonCtx.moveTo(cx + 5, cy); horizonCtx.lineTo(cx + 16, cy);
    horizonCtx.moveTo(cx, cy - 5); horizonCtx.lineTo(cx, cy + 5);
    horizonCtx.stroke();
  }

  // =========================================================================
  // OSCILOSCOPIO GRÁFICO DE TELEMETRÍA (4 CANALES EN TIEMPO REAL)
  // =========================================================================
  function updateTelemetryGraphs(tel) {
    if (!telemetryCtx || !telemetryCanvas || graphsPanel.classList.contains('hidden')) return;

    telemetryHistory.push({
      alt: tel.altitude,
      volt: tel.voltage,
      curr: tel.current,
      temp: tel.ambientTemp
    });
    if (telemetryHistory.length > 150) telemetryHistory.shift();

    const w = telemetryCanvas.width;
    const h = telemetryCanvas.height;
    telemetryCtx.clearRect(0, 0, w, h);

    // Fondo y rejilla
    telemetryCtx.fillStyle = '#060a14';
    telemetryCtx.fillRect(0, 0, w, h);

    telemetryCtx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    telemetryCtx.lineWidth = 1;
    for (let y = 0; y < h; y += 30) {
      telemetryCtx.beginPath(); telemetryCtx.moveTo(0, y); telemetryCtx.lineTo(w, y); telemetryCtx.stroke();
    }
    for (let x = 0; x < w; x += 50) {
      telemetryCtx.beginPath(); telemetryCtx.moveTo(x, 0); telemetryCtx.lineTo(x, h); telemetryCtx.stroke();
    }

    if (telemetryHistory.length < 2) return;

    function drawChannel(getter, maxVal, color) {
      telemetryCtx.strokeStyle = color;
      telemetryCtx.lineWidth = 2;
      telemetryCtx.beginPath();
      telemetryHistory.forEach((sample, idx) => {
        const x = (idx / 150) * w;
        const val = getter(sample);
        const y = h - (val / maxVal) * (h - 10) - 5;
        if (idx === 0) telemetryCtx.moveTo(x, y);
        else telemetryCtx.lineTo(x, y);
      });
      telemetryCtx.stroke();
    }

    drawChannel(s => s.alt, 25, '#10b981');   // Altitud (0-25m)
    drawChannel(s => s.volt, 15, '#f59e0b');  // Voltaje (0-15V)
    drawChannel(s => s.curr, 80, '#ef4444');  // Corriente (0-80A)
    drawChannel(s => s.temp, 120, '#00f0ff'); // Temperatura (0-120°C)
  }

  // =========================================================================
  // GESTIÓN DEL TRACKER DE MISIÓN Y RESULTADOS
  // =========================================================================
  function updateMissionTrackerUI() {
    if (!missionObjectivesList) return;
    let html = '';
    missionMgr.objectives.forEach(obj => {
      const icon = obj.completed ? '✅' : '⬜';
      const cl = obj.completed ? 'class="done"' : '';
      html += `<li ${cl}><span>${icon}</span> <span>${obj.text}</span></li>`;
    });
    missionObjectivesList.innerHTML = html;
    if (missionScoreEl) {
      missionScoreEl.textContent = `SCORE: ${Math.round(missionMgr.score)}`;
    }
  }

  missionMgr.onMissionEvent((type, data) => {
    updateMissionTrackerUI();

    if (type === 'MISSION_COMPLETED') {
      const rec = data.record;
      document.getElementById('mission-result-icon').textContent = '🏆';
      document.getElementById('mission-result-heading').textContent = '¡MISIÓN CUMPLIDA CON ÉXITO!';
      document.getElementById('mission-result-heading').style.color = '#10b981';
      document.getElementById('mission-result-desc').textContent = 'Has extinguido todos los focos de incendio forestal y retornado seguro al helipad.';
      document.getElementById('res-score').textContent = `${rec.score} pts`;
      document.getElementById('res-time').textContent = `${rec.durationSeconds} s`;
      document.getElementById('res-health').textContent = `${rec.finalHealth}%`;
      document.getElementById('res-fires').textContent = `${rec.firesExtinguished} / 3`;
      modalMissionResult.classList.remove('hidden');
    } else if (type === 'MISSION_FAILED') {
      const rec = data.record;
      document.getElementById('mission-result-icon').textContent = '💥';
      document.getElementById('mission-result-heading').textContent = 'MISIÓN FALLIDA';
      document.getElementById('mission-result-heading').style.color = '#ef4444';
      document.getElementById('mission-result-desc').textContent = data.reason || 'El dron no completó la operación.';
      document.getElementById('res-score').textContent = `${rec.score} pts`;
      document.getElementById('res-time').textContent = `${rec.durationSeconds} s`;
      document.getElementById('res-health').textContent = `${rec.finalHealth}%`;
      document.getElementById('res-fires').textContent = `${rec.firesExtinguished} / 3`;
      modalMissionResult.classList.remove('hidden');
    }
  });

  const btnMissionAck = document.getElementById('btn-mission-ack');
  if (btnMissionAck) {
    btnMissionAck.addEventListener('click', () => {
      modalMissionResult.classList.add('hidden');
    });
  }

  // =========================================================================
  // GESTIÓN DE MODALES DE TUTORIAL Y BITÁCORA
  // =========================================================================
  if (btnOpenTutorial) {
    btnOpenTutorial.addEventListener('click', () => modalTutorial.classList.remove('hidden'));
  }
  if (btnOpenLogs) {
    btnOpenLogs.addEventListener('click', openFlightLogsModal);
  }
  if (btnExportLogs) {
    btnExportLogs.addEventListener('click', () => MissionManager.exportLogsAsJSON(steamSM.studentId));
  }

  document.querySelectorAll('.modal-close').forEach(b => {
    b.addEventListener('click', () => {
      const targetId = b.getAttribute('data-close');
      const targetModal = document.getElementById(targetId);
      if (targetModal) targetModal.classList.add('hidden');
    });
  });

  function openFlightLogsModal() {
    const logs = MissionManager.getFlightLogs(steamSM.studentId);
    let html = '';
    if (logs.length === 0) {
      html = '<tr><td colspan="7" style="text-align:center; color:var(--text-muted); padding:16px;">No hay vuelos registrados aún para este alumno.</td></tr>';
    } else {
      logs.forEach(l => {
        const statusBadge = l.success
          ? '<span style="color:#10b981; font-weight:700;">ÉXITO</span>'
          : '<span style="color:#ef4444; font-weight:700;">FALLO</span>';
        html += `
          <tr>
            <td style="font-family:var(--font-mono);">${l.flightId}</td>
            <td>${l.date}</td>
            <td>${l.durationSeconds} s</td>
            <td>${l.firesExtinguished} / 3</td>
            <td>${l.finalHealth}%</td>
            <td><strong>${l.score}</strong></td>
            <td>${statusBadge}</td>
          </tr>
        `;
      });
    }
    if (logsTableBody) logsTableBody.innerHTML = html;
    if (modalFlightLogs) modalFlightLogs.classList.remove('hidden');
  }

  // =========================================================================
  // BUCLE DE RENDER Y SIMULACIÓN FÍSICA EN TIEMPO REAL
  // =========================================================================
  let lastTime = performance.now();
  let lastHudTime = 0;

  engine.runRenderLoop(() => {
    try {
      const now = performance.now();
      const dt = Math.min((now - lastTime) / 1000, 0.04);
      lastTime = now;

      if (currentMode === 'flight') {
        processFlightInputs(dt);
        // Actualizar física con colisionadores de árboles y ráfagas
        physicsEngine.update(dt, forestEnv.fireHotspots, forestEnv.treeColliders);

        // Propagación del fuego entre las copas de los árboles
        forestEnv.updateFirePropagation(dt, physicsEngine.windVector);

        // Aspersión de retardante químico
        forestEnv.updateSpray(physicsEngine.position, physicsEngine.isSpraying, physicsEngine.retardantLevel, physicsEngine.windVector);

        // Modo Misión
        missionMgr.update(dt);

        // Throttling de telemetría y HUD a 20 Hz para evitar caídas de FPS por manipulación del DOM y Canvas
        if (now - lastHudTime > 48) {
          lastHudTime = now;
          const tel = physicsEngine.getTelemetry();

          // Actualizar datos del HUD
          tAltitudeEl.textContent = tel.altitude.toFixed(1);
          tSpeedEl.textContent = tel.speedKmh.toFixed(1);
          tVspeedEl.textContent = tel.verticalSpeed.toFixed(1);
          tRollEl.textContent = `${tel.rollDeg.toFixed(1)}°`;
          tPitchEl.textContent = `${tel.pitchDeg.toFixed(1)}°`;
          tYawEl.textContent = `${tel.yawDeg.toFixed(0)}°`;
          tVoltageEl.textContent = tel.voltage.toFixed(2);
          tCurrentEl.textContent = tel.current.toFixed(1);
          tSocEl.textContent = `${Math.round(tel.soc)}%`;
          tTempEl.textContent = `${Math.round(tel.ambientTemp)}°C`;
          tUpdraftEl.textContent = `${tel.thermalUpdraft.toFixed(1)} m/s`;
          tRetardantEl.textContent = `${Math.round(tel.retardant)}%`;
          retardantFillEl.style.width = `${tel.retardant}%`;

          // Salud e Integridad
          tHealthValEl.textContent = `${tel.health}%`;
          tHealthFillEl.style.width = `${tel.health}%`;
          if (tel.health < 30) {
            tHealthFillEl.style.background = '#ef4444';
          } else if (tel.health < 65) {
            tHealthFillEl.style.background = '#f59e0b';
          } else {
            tHealthFillEl.style.background = 'linear-gradient(90deg, #10b981 0%, #34d399 100%)';
          }

          // Empuje individual de rotores (effectiveB corregido por temperatura)
          let totalThrustSum = 0;
          tel.rotorRpm.forEach((rpm, idx) => {
            const pct = Math.min(100, (rpm / 7160) * 100);
            rotorFills[idx].style.height = `${pct}%`;
            rotorVals[idx].textContent = `${rpm}`;
            totalThrustSum += tel.thrustN[idx] || 0;
          });
          tTotalThrustEl.textContent = `${totalThrustSum.toFixed(1)} N`;

          drawArtificialHorizon(tel.rollDeg, tel.pitchDeg);
          forestEnv.drawThermalHeatmap(thermalRadarCanvas, physicsEngine.position);
          updateTelemetryGraphs(tel);

          // Alertas inteligentes no redundantes
          if (tel.ambientTemp > 65) {
            showAlert('🔥 ALTA TEMPERATURA POR INCENDIO - PÉRDIDA DE SUSTENTACIÓN AERODINÁMICA');
          } else if (tel.soc < 15) {
            showAlert('⚠️ BATERÍA CRÍTICA: INICIANDO FAILSAFE RTL HACIA LA BASE');
          } else if (tel.health < 30) {
            showAlert('⚠️ INTEGRIDAD ESTRUCTURAL CRÍTICA: RIESGO DE FALLO MECÁNICO');
          }
        }
      }

      scene.render();
    } catch (err) {
      console.error('Error en bucle de render:', err);
    }
  });

  window.addEventListener('resize', () => {
    engine.resize();
    if (horizonCanvas) {
      horizonCanvas.width = horizonCanvas.clientWidth;
      horizonCanvas.height = horizonCanvas.clientHeight;
    }
  });

  if (horizonCanvas) {
    horizonCanvas.width = horizonCanvas.clientWidth || 160;
    horizonCanvas.height = horizonCanvas.clientHeight || 120;
  }

  // Inicializar UI con el paso actual de ensamblaje
  assemblyManager.notifyStepChange();
});
