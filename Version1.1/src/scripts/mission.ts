import { DronePhysicsEngine } from "./physics";
import { ForestEnvironment } from "./forest";
import { SteamStateMachine } from "./steam";

/**
 * Gestor del Modo Misión de Rescate Forestal, Daños y Bitácora Persistente
 * 
 * Rol de Ingeniería: Koki (Jorge Luis Carrizales Aguiar)
 * - Objetivos claros con verificación en tiempo real.
 * - Sistema de salud estructural y daños por colisión/impacto.
 * - Puntuación dinámica de desempeño (Score).
 * - Bitácora de vuelo persistente local (localStorage) y exportación JSON.
 */

export interface MissionObjective {
  id: string;
  text: string;
  completed: boolean;
}

export interface FlightLogRecord {
  flightId: string;
  studentId: string;
  date: string;
  durationSeconds: number;
  finalHealth: number;
  score: number;
  firesExtinguished: number;
  success: boolean;
}

export class MissionManager {
  public physics: DronePhysicsEngine;
  public forest: ForestEnvironment;
  public steam: SteamStateMachine;

  public isActive: boolean = false;
  public startTime: number = 0;
  public endTime: number = 0;

  public score: number = 5000;
  public firesExtinguishedCount: number = 0;
  public totalFires: number = 3;

  public missionAccomplished: boolean = false;
  public missionFailed: boolean = false;
  public failReason: string = "";

  public objectives: MissionObjective[] = [
    { id: "takeoff", text: "Despegar y ascender a altitud de patrulla (> 6 m)", completed: false },
    { id: "fire_alfa", text: "Extinguir Foco Alfa (Sector Norte)", completed: false },
    { id: "fire_bravo", text: "Extinguir Foco Bravo (Sector Oeste)", completed: false },
    { id: "fire_charlie", text: "Extinguir Foco Charlie (Sector Este)", completed: false },
    { id: "return_base", text: "Regresar al Helipad y aterrizar suavemente (< 1.5 m/s)", completed: false }
  ];

  public onMissionEventCallbacks: ((type: string, data: any) => void)[] = [];

  constructor(physicsEngine: DronePhysicsEngine, forestEnv: ForestEnvironment, steamStateMachine: SteamStateMachine) {
    this.physics = physicsEngine;
    this.forest = forestEnv;
    this.steam = steamStateMachine;

    this.physics.onDamageCallback = (currentHealth, amount, reason) => {
      this.handleDamage(amount, reason);
    };
  }

  public onMissionEvent(cb: (type: string, data: any) => void): void {
    this.onMissionEventCallbacks.push(cb);
  }

  public notify(type: string, data: any): void {
    this.onMissionEventCallbacks.forEach(cb => cb(type, data));
  }

  public startMission(): void {
    this.isActive = true;
    this.startTime = Date.now();
    this.endTime = 0;
    this.score = 5000; // Base inicial
    this.firesExtinguishedCount = 0;
    this.missionAccomplished = false;
    this.missionFailed = false;
    this.failReason = "";

    this.objectives.forEach(obj => obj.completed = false);
    this.notify("MISSION_STARTED", { startTime: this.startTime });
  }

  public handleDamage(amount: number, reason: string): void {
    if (!this.isActive) return;
    this.score = Math.max(0, this.score - Math.round(amount * 35));
    this.notify("DAMAGE_RECEIVED", { health: this.physics.health, damage: amount, reason });

    if (this.physics.health <= 0) {
      this.failMission(`Dron destruido por daños críticos (${reason}).`);
    }
  }

  public update(dt: number): void {
    if (!this.isActive || this.missionAccomplished || this.missionFailed) return;

    const tel = this.physics.getTelemetry();

    // 1. Objetivo Despegue
    if (!this.objectives[0].completed && tel.altitude >= 6.0) {
      this.objectives[0].completed = true;
      this.score += 800;
      this.notify("OBJECTIVE_COMPLETED", { objective: this.objectives[0] });
    }

    // 2, 3, 4. Objetivos de Extinción de Incendios
    const hotspots = this.forest.fireHotspots;
    if (hotspots[0] && hotspots[0].intensity <= 0.05 && !this.objectives[1].completed) {
      this.objectives[1].completed = true;
      this.firesExtinguishedCount++;
      this.score += 2500;
      this.notify("OBJECTIVE_COMPLETED", { objective: this.objectives[1] });
    }
    if (hotspots[1] && hotspots[1].intensity <= 0.05 && !this.objectives[2].completed) {
      this.objectives[2].completed = true;
      this.firesExtinguishedCount++;
      this.score += 2500;
      this.notify("OBJECTIVE_COMPLETED", { objective: this.objectives[2] });
    }
    if (hotspots[2] && hotspots[2].intensity <= 0.05 && !this.objectives[3].completed) {
      this.objectives[3].completed = true;
      this.firesExtinguishedCount++;
      this.score += 2500;
      this.notify("OBJECTIVE_COMPLETED", { objective: this.objectives[3] });
    }

    // 5. Objetivo Aterrizaje en Base
    const allFiresOut = this.objectives[1].completed && this.objectives[2].completed && this.objectives[3].completed;
    const distToHelipad = Math.hypot(tel.position.x, tel.position.z);
    const isLanded = (tel.altitude < 0.10) && !tel.armed;

    if (allFiresOut && !this.objectives[4].completed) {
      if (isLanded && distToHelipad < 5.5) {
        if (Math.abs(tel.verticalSpeed) <= 1.8) {
          this.objectives[4].completed = true;
          this.score += 3000;
          this.notify("OBJECTIVE_COMPLETED", { objective: this.objectives[4] });
          this.completeMission();
        } else {
          this.failMission("Aterrizaje violento con velocidad vertical excesiva.");
        }
      }
    }

    // Descuento progresivo de puntuación por tiempo transcurrido (2 pt/s)
    this.score = Math.max(100, this.score - dt * 2.0);

    // Si la batería llega a 0 en pleno vuelo
    if (tel.soc <= 0 && tel.altitude > 1.0) {
      this.failMission("Batería completamente agotada en pleno vuelo forestal.");
    }
  }

  public completeMission(): void {
    this.isActive = false;
    this.missionAccomplished = true;
    this.endTime = Date.now();
    const durationSec = Math.round((this.endTime - this.startTime) / 1000);

    const flightRecord = this.saveFlightRecord(true, durationSec);
    this.notify("MISSION_COMPLETED", { record: flightRecord });

    if (this.steam) {
      this.steam.completePhase("T", Math.min(100, Math.round(this.score / 130)));
      this.steam.emitProgramaEjecutado("MISSION", {
        duration: durationSec,
        maxAlt: this.physics.getTelemetry().altitude,
        firesExtinguished: this.firesExtinguishedCount,
        damage: this.physics.totalDamage,
        success: true
      });
    }
  }

  public failMission(reason: string): void {
    this.isActive = false;
    this.missionFailed = true;
    this.failReason = reason;
    this.endTime = Date.now();
    const durationSec = Math.round((this.endTime - this.startTime) / 1000);

    const flightRecord = this.saveFlightRecord(false, durationSec);
    this.notify("MISSION_FAILED", { reason, record: flightRecord });

    if (this.steam) {
      this.steam.emitProgramaEjecutado("MISSION_FAILED", {
        reason,
        duration: durationSec,
        firesExtinguished: this.firesExtinguishedCount,
        damage: this.physics.totalDamage,
        success: false
      });
    }
  }

  private saveFlightRecord(success: boolean, durationSec: number): FlightLogRecord {
    const record: FlightLogRecord = {
      flightId: `FL-${Date.now().toString().slice(-6)}`,
      studentId: this.steam.studentId,
      date: new Date().toLocaleDateString(),
      durationSeconds: durationSec,
      finalHealth: Math.round(this.physics.health),
      score: Math.round(this.score),
      firesExtinguished: this.firesExtinguishedCount,
      success: success
    };

    if (typeof window !== "undefined") {
      const logsKey = `flight_logs_${this.steam.studentId}`;
      const logs = JSON.parse(localStorage.getItem(logsKey) || "[]");
      logs.unshift(record);
      if (logs.length > 50) logs.pop();
      localStorage.setItem(logsKey, JSON.stringify(logs));

      fetch("/api/flight-log", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(record)
      }).catch(() => {});
    }

    return record;
  }

  public static getFlightLogs(studentId: string): FlightLogRecord[] {
    if (typeof window !== "undefined") {
      const logsKey = `flight_logs_${studentId}`;
      return JSON.parse(localStorage.getItem(logsKey) || "[]");
    }
    return [];
  }

  public static exportLogsAsJSON(studentId: string): void {
    if (typeof window === "undefined") return;
    const logs = MissionManager.getFlightLogs(studentId);
    const blob = new Blob([JSON.stringify(logs, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `bitacora_vuelo_${studentId}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }
}
