/**
 * Gestor del Taller de Ensamblaje y Vista Explosionada (Exploded View)
 * Permite al alumno armar el dron paso a paso desde cero, con onboarding interactivo
 * y validación de acoplamiento físico y eléctrico.
 * 
 * Rol de Ingeniería: Koki (Jorge Luis Carrizales Aguiar)
 * - 9 Pasos secuenciales de ensamblaje (incluye Carcasa Aerodinámica de Rescate Fase A).
 * - Onboarding interactivo por componente con consejos prácticos de aviónica.
 * - Autoguardado del estado de ensamblaje en localStorage.
 */

export class AssemblyManager {
  constructor(droneModel) {
    this.droneModel = droneModel;
    this.maxSteps = 9; // 8 subsistemas mecánicos + 1 carcasa aerodinámica de rescate
    this.currentStep = 9; // Por defecto ensamblado completo
    this.explosionFactor = 0;
    this.onStepChangeCallbacks = [];

    // Guías de Onboarding Interactivo por Componente
    this.onboardingGuides = [
      {
        step: 1,
        title: 'Chasis Inferior ZD550 con PDB Integrada',
        tip: 'Coloca la placa base de fibra de carbono 3K. Asegúrate de orientar las pistas de potencia ENIG hacia los brazos de motor correspondientes.',
        tool: 'Destornillador Hexagonal Allen M3',
        steamPhase: 'Fase E (Ingeniería Estructural)'
      },
      {
        step: 2,
        title: '4 Brazos Tubulares de Carbono 20mm + Patas',
        tip: 'Inserta los 4 tubos de carbono de 275 mm en los bloques de fijación de aluminio anodizado. Verifica el apriete simétrico para evitar desalineación.',
        tool: 'Llave Dinamométrica (Torque: 2.2 N·m)',
        steamPhase: 'Fase E (Geometría de Sustentación)'
      },
      {
        step: 3,
        title: '4 Motores Brushless Sunnysky 5010 750KV',
        tip: 'Fija los 4 motores en las bancadas exteriores usando tornillos M3 con fijador de roscas Loctite 243 contra vibraciones electromecánicas.',
        tool: 'Tornillería Allen M3 x 6mm con Loctite',
        steamPhase: 'Fase E (Propulsión Electromecánica)'
      },
      {
        step: 4,
        title: '4 Variadores de Velocidad ESC 40A DShot600',
        tip: 'Conecta las 3 fases del motor a cada ESC. El protocolo digital DShot600 no requiere calibración de rango PWM y ofrece refresco a 48 kHz.',
        tool: 'Estación de Soldadura (350°C) + Termorretráctil',
        steamPhase: 'Fase E (Electrónica de Potencia)'
      },
      {
        step: 5,
        title: 'Aviónica Pixhawk 2.4.8 + GPS Neo-M8N',
        tip: 'Monta la Pixhawk sobre almohadillas de silicona anti-vibración centrada en el Centro de Gravedad (CG). Eleva el mástil GPS a 9cm para aislar el compás.',
        tool: 'Dampers de Gel de Silicona + Cable MAVLink',
        steamPhase: 'Fase E (Sistemas de Navegación)'
      },
      {
        step: 6,
        title: 'Batería LiPo 3S 5000 mAh 35C',
        tip: 'Inserta la batería ventralmente con correas de Kevlar anti-deslizantes. Conecta el conector XT60 con antichispa al sensor de corriente de la PDB.',
        tool: 'Correas de Kevlar + Conector XT60',
        steamPhase: 'Fase E (Almacenamiento Electroquímico)'
      },
      {
        step: 7,
        title: 'Sistema de Extinción (Tanque 1.2L + Boquillas)',
        tip: 'Acopla el cilindro ventral presurizado de aleación 5052 y conecta los ductos a las boquillas de atomización de abanico plano TeeJet.',
        tool: 'Abrazaderas de Presión + Boquillas TeeJet',
        steamPhase: 'Fase E (Carga Útil de Emergencia)'
      },
      {
        step: 8,
        title: '4 Hélices Alabeadas 12x4.5 (2 CW / 2 CCW)',
        tip: 'Respeta estrictamente la rotación antiparalela: Motores 1 y 3 usan hélices CW (naranja); Motores 2 y 4 usan CCW (azul) para cancelar el torque reactivo.',
        tool: 'Tuercas Autoblocantes M6 Invertidas',
        steamPhase: 'Fase E (Dinámica de Rotores)'
      },
      {
        step: 9,
        title: 'Carcasa Aerodinámica de Rescate (Fase A)',
        tip: 'Monta la carcasa termoformada en color Naranja Internacional de alta visibilidad. Protege la aviónica contra pavesas y reduce el arrastre parásito un 34%.',
        tool: 'Clips de Cierre Rápido de 1/4 de Vuelta',
        steamPhase: 'Fase A (Arte & Diseño Industrial)'
      }
    ];

    this.loadSavedAssembly();
    this.init();
  }

  init() {
    this.updateVisibility();
  }

  loadSavedAssembly() {
    try {
      const saved = localStorage.getItem('midron_assembly_step');
      if (saved !== null) {
        const stepNum = parseInt(saved, 10);
        if (!isNaN(stepNum) && stepNum >= 0 && stepNum <= this.maxSteps) {
          this.currentStep = stepNum;
        }
      }
    } catch (e) {
      console.warn('LocalStorage no accesible para autoguardado:', e);
    }
  }

  saveAssembly() {
    try {
      localStorage.setItem('midron_assembly_step', this.currentStep.toString());
    } catch (e) {}
  }

  onStepChange(callback) {
    this.onStepChangeCallbacks.push(callback);
  }

  notifyStepChange() {
    const currentPart = this.droneModel.parts.find(p => p.stepIndex === this.currentStep);
    const guide = this.onboardingGuides.find(g => g.step === this.currentStep) || null;
    this.onStepChangeCallbacks.forEach(cb => cb(this.currentStep, this.maxSteps, currentPart, guide));
    this.saveAssembly();
  }

  setStep(step) {
    this.currentStep = Math.max(0, Math.min(this.maxSteps, step));
    this.updateVisibility();
    this.notifyStepChange();
  }

  nextStep() {
    if (this.currentStep < this.maxSteps) {
      this.setStep(this.currentStep + 1);
    }
  }

  prevStep() {
    if (this.currentStep > 0) {
      this.setStep(this.currentStep - 1);
    }
  }

  assembleAll() {
    this.setExplosion(0);
    this.setStep(this.maxSteps);
  }

  disassembleAll() {
    this.setExplosion(0);
    this.setStep(0);
  }

  setExplosion(factor) {
    this.explosionFactor = Math.max(0, Math.min(2.0, factor));
    this.updatePositions();
  }

  updateVisibility() {
    this.droneModel.parts.forEach(part => {
      const isVisible = part.stepIndex <= this.currentStep;
      part.mesh.setEnabled(isVisible);
    });
    this.updatePositions();
  }

  updatePositions() {
    this.droneModel.parts.forEach(part => {
      if (!part.mesh.isEnabled()) return;
      const targetPos = part.initialPos.add(part.explodeVec.scale(this.explosionFactor));
      part.mesh.position.copyFrom(targetPos);
    });
  }

  isFullyAssembled() {
    return this.currentStep === this.maxSteps && this.explosionFactor < 0.05;
  }
}
