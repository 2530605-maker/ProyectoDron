/**
 * Máquina de Estados de las Fases STEAM y Emisor de Eventos Estandarizados
 * Controla la progresión estricta M -> S -> E -> T -> A con autoguardado y validación.
 * 
 * Rol de Ingeniería: Koki (Jorge Luis Carrizales Aguiar) y Perez (Ángel Jesús Pérez Escobedo)
 */

export class SteamStateMachine {
  constructor(options = {}) {
    this.projectId = 'dron-simulador-zd550-forestal';
    this.studentId = options.studentId || this.detectStudentId();

    this.phases = ['M', 'S', 'E', 'T', 'A'];
    this.currentPhase = 'M';

    this.phaseData = {
      M: { name: 'Matemáticas', title: 'Dinámica 6-DOF y Cálculo de TWR', unlocked: true, completed: false, score: 0 },
      S: { name: 'Ciencias', title: 'Termodinámica de Fuego y Batería Thevenin', unlocked: false, completed: false, score: 0 },
      E: { name: 'Ingeniería', title: 'Taller de Ensamblaje Estructural 3D', unlocked: false, completed: false, score: 0 },
      T: { name: 'Tecnología', title: 'Sistemas Autónomos, PID y Navegación RTL', unlocked: false, completed: false, score: 0 },
      A: { name: 'Arte y Diseño', title: 'Carcasa Aerodinámica PBR de Rescate', unlocked: false, completed: false, score: 0 }
    };

    this.onStateChangeCallbacks = [];
    this.loadState();
  }

  detectStudentId() {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      return urlParams.get('alumno') || urlParams.get('student') || 'alumno-local-demo';
    } catch (e) {
      return 'alumno-local-demo';
    }
  }

  onStateChange(cb) {
    this.onStateChangeCallbacks.push(cb);
  }

  notifyStateChange() {
    this.saveState();
    this.onStateChangeCallbacks.forEach(cb => cb(this.getState()));
    this.syncWithBackend();
  }

  getState() {
    return {
      projectId: this.projectId,
      studentId: this.studentId,
      currentPhase: this.currentPhase,
      phaseData: this.phaseData,
      isFullyCompleted: this.phases.every(p => this.phaseData[p].completed)
    };
  }

  loadState() {
    try {
      const key = `midron_steam_state_${this.studentId}`;
      const saved = localStorage.getItem(key);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.phaseData) {
          this.currentPhase = parsed.currentPhase || 'M';
          this.phaseData = parsed.phaseData;
        }
      }
    } catch (e) {
      console.warn('Error cargando estado STEAM:', e);
    }
  }

  saveState() {
    try {
      const key = `midron_steam_state_${this.studentId}`;
      localStorage.setItem(key, JSON.stringify(this.getState()));
    } catch (e) {}
  }

  canAccessPhase(phase) {
    const idx = this.phases.indexOf(phase);
    if (idx === -1) return false;
    if (idx === 0) return true;
    // La fase anterior debe estar completada
    const prevPhase = this.phases[idx - 1];
    return Boolean(this.phaseData[prevPhase].completed);
  }

  setPhase(phase) {
    if (!this.canAccessPhase(phase)) {
      return { success: false, message: `La fase ${phase} está bloqueada. Debes completar primero la fase anterior.` };
    }
    this.currentPhase = phase;
    this.phaseData[phase].unlocked = true;
    this.notifyStateChange();
    return { success: true };
  }

  completePhase(phase, score = 100) {
    if (!this.phaseData[phase]) return;
    this.phaseData[phase].completed = true;
    this.phaseData[phase].score = Math.max(this.phaseData[phase].score, score);

    // Desbloquear automáticamente la siguiente fase
    const idx = this.phases.indexOf(phase);
    if (idx < this.phases.length - 1) {
      const nextPhase = this.phases[idx + 1];
      this.phaseData[nextPhase].unlocked = true;
      this.currentPhase = nextPhase;
    }

    this.notifyStateChange();
  }

  // =========================================================================
  // EMISIÓN DE EVENTOS ESTANDARIZADOS HACIA LA PLATAFORMA EDUCATIVA
  // =========================================================================
  emitEvent(eventType, eventPayload = {}) {
    const fullEvent = {
      event_type: eventType,
      proyecto_id: this.projectId,
      student_id: this.studentId,
      timestamp: new Date().toISOString(),
      phase: this.currentPhase,
      payload: eventPayload
    };

    console.log(`[STEAM Event] Emitted: ${eventType}`, fullEvent);

    // 1. Notificar a parent window si se ejecuta en iframe (LMS / Canvas / Moodle)
    try {
      if (window.parent && window.parent !== window) {
        window.parent.postMessage({ type: 'STEAM_EVENT', data: fullEvent }, '*');
      }
    } catch (e) {}

    // 2. Enviar a API local en segundo plano
    try {
      fetch('/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fullEvent)
      }).catch(() => {});
    } catch (e) {}

    return fullEvent;
  }

  // Métodos de conveniencia para los 4 eventos pedagógicos clave
  emitMatematicasIntento(params) {
    return this.emitEvent('matematicas_intento', {
      twrCalculado: params.twr,
      esApto: params.twr >= 2.0,
      masaTotalG: params.masa,
      empujeTotalG: params.empuje,
      correct: params.correct
    });
  }

  emitCienciaIntento(params) {
    return this.emitEvent('ciencia_intento', {
      tema: params.tema || 'termodinamica_lipo',
      soc: params.soc,
      temperatura: params.temp,
      correct: params.correct
    });
  }

  emitObjetoColocado(partName, stepIndex) {
    return this.emitEvent('objeto_colocado', {
      partName,
      stepIndex,
      isFullyAssembled: stepIndex >= 9
    });
  }

  emitProgramaEjecutado(flightMode, stats = {}) {
    return this.emitEvent('programa_ejecutado', {
      flightMode,
      durationSec: stats.duration || 0,
      altitudeMax: stats.maxAlt || 0,
      firesExtinguished: stats.firesExtinguished || 0,
      damage: stats.damage || 0,
      success: stats.success || false
    });
  }

  syncWithBackend() {
    try {
      fetch('/api/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentId: this.studentId,
          projectId: this.projectId,
          state: this.getState()
        })
      }).catch(() => {});
    } catch (e) {}
  }
}
