/**
 * Máquina de Estados STEAM y Emisión de Eventos Estandarizados a la Plataforma
 * 
 * Roles de Ingeniería: Koki (UI/UX) y Perez (Integración y Metadatos)
 * Características:
 * - Secuencia de fases estricta y bloqueada: M -> S -> E -> T -> A.
 * - Emisión estandarizada de eventos educativos con proyecto_id: "dron-simulador-zd550-forestal".
 * - Persistencia local en localStorage con sincronización REST para Modo Profesor (?alumno=ID).
 */

export interface PhaseData {
  unlocked: boolean;
  completed: boolean;
  score: number;
  attempts: number;
}

export interface SteamState {
  currentPhase: string;
  studentId: string;
  phaseData: { [key: string]: PhaseData };
  lastUpdated: string;
}

export class SteamStateMachine {
  public studentId: string;
  public state: SteamState;
  public phaseOrder: string[] = ["M", "S", "E", "T", "A"];
  public proyectoId: string = "dron-simulador-zd550-forestal";

  constructor() {
    this.studentId = this.detectStudentId();
    this.state = this.loadState();
  }

  private detectStudentId(): string {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      return params.get("alumno") || params.get("student") || "ALUMNO_LOCAL";
    }
    return "ALUMNO_LOCAL";
  }

  private loadState(): SteamState {
    const key = `steam_progress_${this.studentId}`;
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(key);
      if (stored) {
        try {
          return JSON.parse(stored);
        } catch (e) {
          console.warn("Error cargando estado STEAM local:", e);
        }
      }
    }

    return {
      currentPhase: "M",
      studentId: this.studentId,
      phaseData: {
        M: { unlocked: true, completed: false, score: 0, attempts: 0 },
        S: { unlocked: false, completed: false, score: 0, attempts: 0 },
        E: { unlocked: false, completed: false, score: 0, attempts: 0 },
        T: { unlocked: false, completed: false, score: 0, attempts: 0 },
        A: { unlocked: false, completed: false, score: 0, attempts: 0 }
      },
      lastUpdated: new Date().toISOString()
    };
  }

  public saveState(): void {
    this.state.lastUpdated = new Date().toISOString();
    if (typeof window !== "undefined") {
      const key = `steam_progress_${this.studentId}`;
      localStorage.setItem(key, JSON.stringify(this.state));

      // Sincronización REST con la plataforma educativa si está online
      fetch("/api/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentId: this.studentId,
          proyectoId: this.proyectoId,
          state: this.state
        })
      }).catch(() => {
        // Modo offline silencioso
      });
    }
  }

  public canAccessPhase(phase: string): boolean {
    const p = phase.toUpperCase();
    if (!this.state.phaseData[p]) return false;
    return this.state.phaseData[p].unlocked;
  }

  public completePhase(phase: string, score: number = 100): boolean {
    const p = phase.toUpperCase();
    if (!this.state.phaseData[p]) return false;

    this.state.phaseData[p].completed = true;
    this.state.phaseData[p].score = Math.max(this.state.phaseData[p].score, score);
    this.state.phaseData[p].attempts++;

    // Desbloquear fase siguiente
    const currentIdx = this.phaseOrder.indexOf(p);
    if (currentIdx !== -1 && currentIdx < this.phaseOrder.length - 1) {
      const nextPhase = this.phaseOrder[currentIdx + 1];
      this.state.phaseData[nextPhase].unlocked = true;
      this.state.currentPhase = nextPhase;
    }

    this.saveState();
    return true;
  }

  public emitEvent(eventType: string, data: any): void {
    const payload = {
      event: eventType,
      studentId: this.studentId,
      proyecto_id: this.proyectoId,
      timestamp: new Date().toISOString(),
      data: data
    };

    if (typeof window !== "undefined") {
      const eventLogKey = `event_log_${this.studentId}`;
      const logs = JSON.parse(localStorage.getItem(eventLogKey) || "[]");
      logs.push(payload);
      if (logs.length > 200) logs.shift();
      localStorage.setItem(eventLogKey, JSON.stringify(logs));

      fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      }).catch(() => {});
    }
  }

  public emitMatematicasIntento(data: any): void {
    this.emitEvent("matematicas_intento", data);
  }

  public emitCienciaIntento(data: any): void {
    this.emitEvent("ciencia_intento", data);
  }

  public emitObjetoColocado(partName: string, step: number): void {
    this.emitEvent("objeto_colocado", { part: partName, step });
  }

  public emitProgramaEjecutado(command: string, telemetrySummary: any): void {
    this.emitEvent("programa_ejecutado", { command, telemetry: telemetrySummary });
  }

  public getState(): SteamState {
    return this.state;
  }
}
