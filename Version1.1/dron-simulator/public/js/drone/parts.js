/**
 * Módulo de Modelado 3D de Alta Fidelidad del Dron ZD550 en Babylon.js
 * Incluye metadatos completos de materiales y física en cada submalla
 * para el Inspector Interactivo al hacer clic en cualquier pieza.
 * 
 * Rol de Ingeniería: Emi (Ángel Emiliano Gómez Porras)
 * - Shaders y Materiales PBR con texturas reales de fibra de carbono 3K y clearcoat epóxico.
 * - Carcasa Aerodinámica de Rescate Forestal en color naranja/rojo de alta visibilidad (Fase A).
 */

import { createProceduralTextures } from './textures.js';

export function createDroneModel(scene) {
  const root = new BABYLON.TransformNode('droneRoot', scene);
  const textures = createProceduralTextures(scene);

  // =========================================================================
  // MATERIALES PBR FOTORREALISTAS (PHYSICALLY BASED RENDERING)
  // =========================================================================

  // 1. Fibra de Carbono 3K con Laca Epóxica Aeroespacial ClearCoat
  const carbonMat = new BABYLON.PBRMaterial('carbonPbrMat', scene);
  carbonMat.albedoTexture = textures.carbonTexture;
  carbonMat.bumpTexture = textures.carbonBumpTexture;
  carbonMat.metallic = 0.38;
  carbonMat.roughness = 0.26;
  if (carbonMat.clearCoat) {
    carbonMat.clearCoat.isEnabled = true;
    carbonMat.clearCoat.intensity = 0.95;
    carbonMat.clearCoat.roughness = 0.06;
  }

  // 2. Placa PDB FR-4 Grado Militar
  const pcbMat = new BABYLON.PBRMaterial('pcbPbrMat', scene);
  pcbMat.albedoTexture = textures.pcbTexture;
  pcbMat.metallic = 0.65;
  pcbMat.roughness = 0.32;

  // 3. Aluminio Aeronáutico 6061-T6 Mecanizado CNC
  const metalMat = new BABYLON.PBRMaterial('metalPbrMat', scene);
  metalMat.metallic = 0.94;
  metalMat.roughness = 0.18;
  metalMat.albedoColor = new BABYLON.Color3(0.85, 0.88, 0.92);

  // 4. Cobre Puro OFC para Bobinados Estatóricos
  const copperMat = new BABYLON.PBRMaterial('copperPbrMat', scene);
  copperMat.metallic = 0.92;
  copperMat.roughness = 0.28;
  copperMat.albedoColor = new BABYLON.Color3(0.95, 0.48, 0.16);

  // 5. Aluminio 7075 Anodizado Rojo Brillante
  const redAnodizedMat = new BABYLON.PBRMaterial('redAnodizedPbrMat', scene);
  redAnodizedMat.metallic = 0.90;
  redAnodizedMat.roughness = 0.16;
  redAnodizedMat.albedoColor = new BABYLON.Color3(0.92, 0.08, 0.14);
  if (redAnodizedMat.clearCoat) {
    redAnodizedMat.clearCoat.isEnabled = true;
    redAnodizedMat.clearCoat.intensity = 0.85;
  }

  // 6. Latón Naval C36000 para Toberas de Inyección
  const brassMat = new BABYLON.PBRMaterial('brassPbrMat', scene);
  brassMat.metallic = 0.88;
  brassMat.roughness = 0.24;
  brassMat.albedoColor = new BABYLON.Color3(0.94, 0.82, 0.26);

  // 7. Polímero Antirreflejante Pixhawk 2.4.8
  const pixhawkMat = new BABYLON.PBRMaterial('pixhawkPbrMat', scene);
  pixhawkMat.metallic = 0.06;
  pixhawkMat.roughness = 0.58;
  pixhawkMat.albedoColor = new BABYLON.Color3(0.12, 0.13, 0.15);

  // 8. Hélices de Material Compuesto CW y CCW
  const propCwMat = new BABYLON.PBRMaterial('propCwPbrMat', scene);
  propCwMat.metallic = 0.35;
  propCwMat.roughness = 0.30;
  propCwMat.albedoColor = new BABYLON.Color3(0.98, 0.42, 0.04); // Naranja de alta visibilidad

  const propCcwMat = new BABYLON.PBRMaterial('propCcwPbrMat', scene);
  propCcwMat.metallic = 0.35;
  propCcwMat.roughness = 0.30;
  propCcwMat.albedoColor = new BABYLON.Color3(0.04, 0.65, 0.98); // Azul de alta visibilidad

  // 9. Batería LiPo 3S con Funda Termorretráctil Azul Marino
  const lipoMat = new BABYLON.PBRMaterial('lipoPbrMat', scene);
  lipoMat.metallic = 0.08;
  lipoMat.roughness = 0.36;
  lipoMat.albedoColor = new BABYLON.Color3(0.06, 0.22, 0.65);

  const lipoLabelMat = new BABYLON.StandardMaterial('lipoLabelMat', scene);
  lipoLabelMat.diffuseColor = new BABYLON.Color3(0.98, 0.85, 0.12);

  // 10. Cableado AWG Siliconado
  const cableRedMat = new BABYLON.PBRMaterial('cableRedMat', scene);
  cableRedMat.metallic = 0.05;
  cableRedMat.roughness = 0.45;
  cableRedMat.albedoColor = new BABYLON.Color3(0.90, 0.06, 0.08);

  const cableBlackMat = new BABYLON.PBRMaterial('cableBlackMat', scene);
  cableBlackMat.metallic = 0.05;
  cableBlackMat.roughness = 0.45;
  cableBlackMat.albedoColor = new BABYLON.Color3(0.08, 0.08, 0.09);

  // 11. Tanque de Retardante con Pintura Epóxica Resistente a Fuego
  const tankMat = new BABYLON.PBRMaterial('tankPbrMat', scene);
  tankMat.metallic = 0.32;
  tankMat.roughness = 0.22;
  tankMat.albedoColor = new BABYLON.Color3(0.94, 0.10, 0.14);

  // 12. Led Indicador RGB Pixhawk
  const ledMat = new BABYLON.StandardMaterial('ledMat', scene);
  ledMat.emissiveColor = new BABYLON.Color3(0.0, 1.0, 0.4);

  // 13. CARCASA AERODINÁMICA DE RESCATE (FASE A - ARTE Y DISEÑO)
  const rescueCanopyMat = new BABYLON.PBRMaterial('rescueCanopyPbrMat', scene);
  rescueCanopyMat.metallic = 0.18;
  rescueCanopyMat.roughness = 0.15;
  rescueCanopyMat.albedoColor = new BABYLON.Color3(1.0, 0.25, 0.02); // Naranja/Rojo Internacional de Rescate
  if (rescueCanopyMat.clearCoat) {
    rescueCanopyMat.clearCoat.isEnabled = true;
    rescueCanopyMat.clearCoat.intensity = 1.0;
    rescueCanopyMat.clearCoat.roughness = 0.04;
  }

  const flirGlassMat = new BABYLON.PBRMaterial('flirGlassMat', scene);
  flirGlassMat.metallic = 0.90;
  flirGlassMat.roughness = 0.05;
  flirGlassMat.albedoColor = new BABYLON.Color3(0.08, 0.12, 0.18);
  flirGlassMat.alpha = 0.85;

  // Registro de partes
  const parts = [];

  function registerPart(mesh, name, stepIndex, explodeVec, specs) {
    mesh.parent = root;
    const initialPos = mesh.position.clone();
    parts.push({ mesh, name, stepIndex, initialPos, explodeVec, specs });
  }

  // =========================================================================
  // PASO 1: Chasis Inferior ZD550 con PDB Integrada
  // =========================================================================
  const bottomGroup = new BABYLON.TransformNode('bottomGroup', scene);
  bottomGroup.parent = root;

  const plateC = BABYLON.MeshBuilder.CreateCylinder('bottomPlateCore', {
    diameter: 0.24,
    height: 0.003,
    tessellation: 24
  }, scene);
  plateC.material = carbonMat;
  plateC.parent = bottomGroup;
  plateC.metadata = {
    title: 'Chasis Inferior ZD550 (Placa Central)',
    material: 'Fibra de Carbono 3K (Twill 2x2 Weave)',
    family: 'composite',
    density: '1.55 g/cm³',
    tempLimit: '180°C continuo',
    tensileStrength: '3500 MPa',
    description: 'Placa portante estructural cortada en CNC de fibra de carbono 3K pre-impregnada con resina epoxi aeroespacial, optimizada contra vibraciones electromecánicas.'
  };

  const pcbLayer = BABYLON.MeshBuilder.CreateCylinder('pcbLayer', {
    diameter: 0.20,
    height: 0.0016,
    tessellation: 24
  }, scene);
  pcbLayer.position.y = 0.0022;
  pcbLayer.material = pcbMat;
  pcbLayer.parent = bottomGroup;
  pcbLayer.metadata = {
    title: 'Placa de Distribución de Potencia (PDB Integrada)',
    material: 'FR-4 Grado Militar TG150 + Cobre ENIG (Oro por Inmersión)',
    family: 'composite',
    density: '1.85 g/cm³',
    tempLimit: '150°C',
    tensileStrength: '4 capas de cobre de 2 oz (soporta 180A pico)',
    description: 'PDB integrada con filtrado LC contra picos de voltaje inductivo y derivación balanceada para los 4 ESCs de 40A.'
  };

  const armRadius = 0.275;
  const armAngles = [
    { id: 1, angle: Math.PI / 4, name: 'Delantero Derecho (M1)' },
    { id: 2, angle: (3 * Math.PI) / 4, name: 'Delantero Izquierdo (M2)' },
    { id: 3, angle: (5 * Math.PI) / 4, name: 'Trasero Izquierdo (M3)' },
    { id: 4, angle: (7 * Math.PI) / 4, name: 'Trasero Derecho (M4)' }
  ];

  armAngles.forEach(armData => {
    const mount = BABYLON.MeshBuilder.CreateBox(`armMount_${armData.id}`, {
      width: 0.038,
      height: 0.018,
      depth: 0.038
    }, scene);
    mount.position.set(Math.cos(armData.angle) * 0.10, 0.01, Math.sin(armData.angle) * 0.10);
    mount.rotation.y = -armData.angle;
    mount.material = redAnodizedMat;
    mount.parent = bottomGroup;
    mount.metadata = {
      title: `Bloque de Anclaje de Brazo (${armData.name})`,
      material: 'Aluminio 6061-T6 Anodizado',
      family: 'metal',
      density: '2.70 g/cm³',
      tempLimit: '220°C',
      tensileStrength: '310 MPa',
      description: 'Bloque mecanizado por CNC con tornillos de aleación de acero M3 para sujeción rígida de los tubos de carbono.'
    };
  });

  registerPart(bottomGroup, 'Chasis Inferior ZD550 + PDB Integrada', 1, new BABYLON.Vector3(0, -0.15, 0), {
    id: 'frame_bottom',
    material: 'Fibra de carbono 3K (Twill 2x2) y placa FR-4 con cobre ENIG',
    peso: '185 g',
    resistencia: 'Tracción 3500 MPa, módulo elástico 230 GPa',
    temperatura_max: '180°C en resina epoxi aeroespacial'
  });

  // =========================================================================
  // PASO 2: 4 Brazos de Fibra de Carbono con Patas y Bancadas
  // =========================================================================
  const armsGroup = new BABYLON.TransformNode('armsGroup', scene);
  armsGroup.parent = root;

  armAngles.forEach(armData => {
    const armNode = new BABYLON.TransformNode(`armNode_${armData.id}`, scene);
    armNode.parent = armsGroup;

    const tubeLength = armRadius - 0.09;
    const tube = BABYLON.MeshBuilder.CreateCylinder(`tube_${armData.id}`, {
      diameter: 0.020,
      height: tubeLength,
      tessellation: 20
    }, scene);
    tube.rotation.z = Math.PI / 2;
    tube.rotation.y = -armData.angle;
    const midR = 0.09 + tubeLength / 2;
    tube.position.set(Math.cos(armData.angle) * midR, 0.01, Math.sin(armData.angle) * midR);
    tube.material = carbonMat;
    tube.parent = armNode;
    tube.metadata = {
      title: `Brazo Tubular de Carbono 20mm (${armData.name})`,
      material: 'Tubo de Fibra de Carbono Bobinado (Roll-Wrapped 3K)',
      family: 'composite',
      density: '1.50 g/cm³',
      tempLimit: '160°C',
      tensileStrength: '3800 MPa',
      description: 'Tubo hueco de 20 mm de diámetro exterior y pared de 1.2 mm que maximiza la inercia torsional y canaliza los cables del motor.'
    };

    const mountOuter = BABYLON.MeshBuilder.CreateCylinder(`motorMount_${armData.id}`, {
      diameter: 0.046,
      height: 0.004,
      tessellation: 20
    }, scene);
    mountOuter.position.set(Math.cos(armData.angle) * armRadius, 0.015, Math.sin(armData.angle) * armRadius);
    mountOuter.material = carbonMat;
    mountOuter.parent = armNode;
    mountOuter.metadata = {
      title: `Bancada de Motor (${armData.name})`,
      material: 'Placa de Fibra de Carbono 3K (espesor 2.5 mm)',
      family: 'composite',
      density: '1.55 g/cm³',
      tempLimit: '180°C',
      tensileStrength: '3500 MPa',
      description: 'Soporte con patrón de barrenos de 19x25 mm compatible con motores outrunner clase 5010.'
    };
  });

  // Tren de Aterrizaje Tubular
  const legs = [
    { name: 'Pata Delantera Izquierda', z: 0.08, legX: -0.095 },
    { name: 'Pata Trasera Izquierda', z: -0.08, legX: -0.095 },
    { name: 'Pata Delantera Derecha', z: 0.08, legX: 0.095 },
    { name: 'Pata Trasera Derecha', z: -0.08, legX: 0.095 }
  ];

  legs.forEach((leg, idx) => {
    const legCyl = BABYLON.MeshBuilder.CreateCylinder(`leg_${idx}`, {
      diameter: 0.012,
      height: 0.20,
      tessellation: 16
    }, scene);
    legCyl.position.set(leg.legX, -0.095, leg.z);
    legCyl.rotation.x = (leg.z > 0) ? -0.25 : 0.25;
    legCyl.rotation.z = (leg.legX > 0) ? -0.22 : 0.22;
    legCyl.material = carbonMat;
    legCyl.parent = armsGroup;
    legCyl.metadata = {
      title: `Tren de Aterrizaje (${leg.name})`,
      material: 'Tubo de Fibra de Carbono 12mm con amortiguador de silicona',
      family: 'composite',
      density: '1.45 g/cm³',
      tempLimit: '140°C',
      tensileStrength: '2800 MPa',
      description: 'Pilar absorbente de impacto para despegue y aterrizaje en superficies agrestes de montaña.'
    };
  });

  registerPart(armsGroup, '4 Brazos de Carbono 20mm + Tren de Aterrizaje', 2, new BABYLON.Vector3(0, -0.08, 0), {
    id: 'arms_landing_gear',
    dimensiones: 'Tubos de 20 mm ext / 1.2 mm pared / 275 mm radio',
    tren_aterrizaje: '4 pilares de carbono de 200 mm con amortiguación pasiva',
    capacidad_carga: 'Soporta aterrizajes con aceleración de hasta 4.5G'
  });

  // =========================================================================
  // PASO 3: 4 Motores Brushless Sunnysky 5010 750KV
  // =========================================================================
  const motorsGroup = new BABYLON.TransformNode('motorsGroup', scene);
  motorsGroup.parent = root;
  const motorBells = [];

  armAngles.forEach(armData => {
    const mNode = new BABYLON.TransformNode(`motorGroup_${armData.id}`, scene);
    mNode.parent = motorsGroup;
    const px = Math.cos(armData.angle) * armRadius;
    const pz = Math.sin(armData.angle) * armRadius;

    const stator = BABYLON.MeshBuilder.CreateCylinder(`stator_${armData.id}`, {
      diameter: 0.048,
      height: 0.010,
      tessellation: 20
    }, scene);
    stator.position.set(px, 0.021, pz);
    stator.material = copperMat;
    stator.parent = mNode;
    stator.metadata = {
      title: `Estator y Bobinados 12N14P (${armData.name})`,
      material: 'Acero al Silicio Kawasaki de 0.2mm + Cobre OFC Grado 180°C',
      family: 'metal',
      density: '7.85 g/cm³',
      tempLimit: '180°C continuo',
      tensileStrength: 'Aislamiento clase H para 600V',
      description: 'Núcleo laminado con devanados de cobre de alta pureza enrollados a mano para optimizar el par motor y reducir pérdidas por corrientes de Foucault.'
    };

    const rotorBell = BABYLON.MeshBuilder.CreateCylinder(`bell_${armData.id}`, {
      diameter: 0.050,
      height: 0.012,
      tessellation: 24
    }, scene);
    rotorBell.position.set(px, 0.027, pz);
    rotorBell.material = redAnodizedMat;
    rotorBell.parent = mNode;
    rotorBell.metadata = {
      title: `Campana de Rotor con Imanes N52SH (${armData.name})`,
      material: 'Aleación de Aluminio 6061-T6 + Neodimio N52SH Curie 150°C',
      family: 'metal',
      density: '3.10 g/cm³ (compuesto magnético)',
      tempLimit: '150°C de temperatura Curie',
      tensileStrength: 'Equilibrado dinámico aeroespacial a 15,000 RPM',
      description: 'Campana mecanizada con 14 imanes curvados de neodimio que maximizan el flujo magnético en el entrehierro.'
    };

    const shaft = BABYLON.MeshBuilder.CreateCylinder(`shaft_${armData.id}`, {
      diameter: 0.005,
      height: 0.032,
      tessellation: 16
    }, scene);
    shaft.position.set(px, 0.033, pz);
    shaft.material = metalMat;
    shaft.parent = mNode;

    motorBells.push(rotorBell);
  });

  registerPart(motorsGroup, '4 Motores Brushless Sunnysky 5010 750KV', 3, new BABYLON.Vector3(0, 0.12, 0), {
    id: 'motors_brushless',
    especificaciones: 'Configuración 12N14P, 750 KV, eje de 4 mm',
    empuje_maximo: '1,150 g por motor (4,600 g empuje combinado 100%)',
    corriente_maxima: '28.5 A pico por motor (350 W continuos)'
  });

  // =========================================================================
  // PASO 4: 4 Controladores Electrónicos de Velocidad (ESC 40A DShot600)
  // =========================================================================
  const escGroup = new BABYLON.TransformNode('escGroup', scene);
  escGroup.parent = root;

  armAngles.forEach(armData => {
    const escBox = BABYLON.MeshBuilder.CreateBox(`esc_${armData.id}`, {
      width: 0.022,
      height: 0.009,
      depth: 0.048
    }, scene);
    const midR = armRadius * 0.52;
    escBox.position.set(Math.cos(armData.angle) * midR, 0.022, Math.sin(armData.angle) * midR);
    escBox.rotation.y = -armData.angle;
    escBox.material = pixhawkMat;
    escBox.parent = escGroup;
    escBox.metadata = {
      title: `ESC 40A DShot600 BLHeli_S (${armData.name})`,
      material: 'PCB FR-4 con Disipador de Aluminio y Termorretráctil ignífugo',
      family: 'composite',
      density: '2.10 g/cm³',
      tempLimit: '125°C junction MOSFET',
      tensileStrength: 'MOSFETs Toshiba de baja resistencia RDS(on) 1.2 mΩ',
      description: 'Controlador trifásico digital con protocolo DShot600 (sin retardo analógico) que conmuta hasta 40A continuos por motor.'
    };
  });

  registerPart(escGroup, '4 ESCs 40A BLHeli_S (Protocolo DShot600)', 4, new BABYLON.Vector3(0, 0.18, 0), {
    id: 'esc_units',
    potencia: '40 A continuo / 50 A ráfaga (10s)',
    frecuencia_pwm: 'Hasta 48 kHz para vuelo ultrasilencioso',
    frenado_regenerativo: 'Damped Light activo para respuesta rápida de RPM'
  });

  // =========================================================================
  // PASO 5: Chasis Superior + Pixhawk 2.4.8 + GPS Neo-M8N
  // =========================================================================
  const avionicsGroup = new BABYLON.TransformNode('avionicsGroup', scene);
  avionicsGroup.parent = root;

  const topPlate = BABYLON.MeshBuilder.CreateCylinder('topPlate', {
    diameter: 0.22,
    height: 0.0025,
    tessellation: 24
  }, scene);
  topPlate.position.y = 0.038;
  topPlate.material = carbonMat;
  topPlate.parent = avionicsGroup;
  topPlate.metadata = {
    title: 'Placa Superior Estructural ZD550',
    material: 'Fibra de Carbono 3K (espesor 2.0 mm)',
    family: 'composite',
    density: '1.55 g/cm³',
    tempLimit: '180°C',
    tensileStrength: '3500 MPa',
    description: 'Tapa de rigidización estructural que crea una celda de torsión cerrada y soporta la electrónica sensible.'
  };

  const pixhawk = BABYLON.MeshBuilder.CreateBox('pixhawkUnit', {
    width: 0.052,
    height: 0.016,
    depth: 0.082
  }, scene);
  pixhawk.position.set(0, 0.052, 0);
  pixhawk.material = pixhawkMat;
  pixhawk.parent = avionicsGroup;
  pixhawk.metadata = {
    title: 'Controladora de Vuelo Pixhawk 2.4.8 (ArduCopter 4.5)',
    material: 'Carcasa de Policarbonato Anti-ESD + IMU MPU6000 Aislada',
    family: 'electronics',
    density: '38 g masa total',
    tempLimit: '85°C operativo',
    tensileStrength: 'Montaje flotante de silicona contra vibración',
    description: 'Cerebro de aviónica con procesador STM32F427 a 168 MHz, sensor inercial triple redundante, barómetro MS5611 y filtro de Kalman extendido (EKF3).'
  };

  const led = BABYLON.MeshBuilder.CreateCylinder('pixhawkLed', {
    diameter: 0.008,
    height: 0.003,
    tessellation: 16
  }, scene);
  led.position.set(0, 0.061, 0.024);
  led.material = ledMat;
  led.parent = avionicsGroup;

  const mast = BABYLON.MeshBuilder.CreateCylinder('gpsMast', {
    diameter: 0.004,
    height: 0.09,
    tessellation: 12
  }, scene);
  mast.position.set(0, 0.095, -0.065);
  mast.material = carbonMat;
  mast.parent = avionicsGroup;

  const gpsPuck = BABYLON.MeshBuilder.CreateCylinder('gpsPuck', {
    diameter: 0.052,
    height: 0.014,
    tessellation: 20
  }, scene);
  gpsPuck.position.set(0, 0.142, -0.065);
  gpsPuck.material = pixhawkMat;
  gpsPuck.parent = avionicsGroup;
  gpsPuck.metadata = {
    title: 'Módulo GPS/GNSS Neo-M8N con Brújula Magnetométrica HMC5883L',
    material: 'Antena de Parche Cerámico de 25x25mm con blindaje EMI',
    family: 'electronics',
    density: '24 g con mástil',
    tempLimit: '85°C',
    tensileStrength: 'Recepción multi-constelación (GPS + GLONASS + Galileo)',
    description: 'Elevado en un mástil de carbono de 9 cm para aislar el magnetómetro de los campos electromagnéticos de 100A que circulan por los ESCs.'
  };

  registerPart(avionicsGroup, 'Placa Superior + Pixhawk 2.4.8 + GPS Neo-M8N', 5, new BABYLON.Vector3(0, 0.25, 0), {
    id: 'avionics_fc',
    procesador: 'ARM Cortex-M4 32 bits a 168 MHz con FPU de coma flotante',
    sensores: 'Giroscopio/Acelerómetro MPU6000, Magnetómetro HMC5883L, Barómetro MS5611',
    redundancia: 'Filtro EKF3 de 24 estados y receptor GPS de 72 canales'
  });

  // =========================================================================
  // PASO 6: Batería LiPo 3S 11.1V 5000 mAh 35C
  // =========================================================================
  const batteryGroup = new BABYLON.TransformNode('batteryGroup', scene);
  batteryGroup.parent = root;

  const battery = BABYLON.MeshBuilder.CreateBox('lipoPack', {
    width: 0.048,
    height: 0.034,
    depth: 0.142
  }, scene);
  battery.position.set(0, -0.024, 0);
  battery.material = lipoMat;
  battery.parent = batteryGroup;
  battery.metadata = {
    title: 'Batería LiPo 3S 11.1V 5000 mAh 35C (55.5 Wh)',
    material: 'Celdas de Polímero de Ión de Litio (LiCoO2) en Serie',
    family: 'electrochem',
    density: '415 g masa neta (133 Wh/kg)',
    tempLimit: '60°C máx en descarga / 45°C en recarga',
    tensileStrength: 'Descarga continua 35C (175A) / Ráfaga 70C (350A)',
    description: 'Paquete de tres celdas planas de alta tasa C acopladas con conector XT60 y cables de silicona de calibre 12AWG.'
  };

  const lipoLabel = BABYLON.MeshBuilder.CreatePlane('lipoLabel', {
    width: 0.044,
    height: 0.13
  }, scene);
  lipoLabel.rotation.x = Math.PI / 2;
  lipoLabel.position.set(0, -0.006, 0);
  lipoLabel.material = lipoLabelMat;
  lipoLabel.parent = batteryGroup;

  registerPart(batteryGroup, 'Batería LiPo 3S 5000 mAh 35C con Conector XT60', 6, new BABYLON.Vector3(0, -0.22, 0), {
    id: 'battery_pack',
    quimica: 'Polímero de Litio (LiPo) con densidad energética de 133 Wh/kg',
    autonomia_estimada: '16.5 minutos en vuelo estacionario (hover)',
    resistencia_interna: '0.045 Ohm/celda (Modelo ECM Thevenin calibrado)'
  });

  // =========================================================================
  // PASO 7: Carga Útil: Tanque Extintor 1.2L + Boquillas TeeJet
  // =========================================================================
  const payloadGroup = new BABYLON.TransformNode('payloadGroup', scene);
  payloadGroup.parent = root;

  const tank = BABYLON.MeshBuilder.CreateCylinder('extinguisherTank', {
    diameter: 0.095,
    height: 0.19,
    tessellation: 24
  }, scene);
  tank.rotation.z = Math.PI / 2;
  tank.position.set(0, -0.075, 0);
  tank.material = tankMat;
  tank.parent = payloadGroup;
  tank.metadata = {
    title: 'Tanque Presurizado de Retardante de Incendios',
    material: 'Aleación de Aluminio 5052-H32 con Recubrimiento Epóxico',
    family: 'metal',
    density: '260 g vacío (1.46 kg lleno con 1.2 L)',
    tempLimit: '120°C externo',
    tensileStrength: 'Presión de servicio 4.0 Bar (N₂)',
    description: 'Cilindro ventral de aleación ligera presurizado con nitrógeno seco, diseñado para descargar retardante de polifosfato de amonio sobre focos de fuego forestal.'
  };

  [-0.06, 0.06].forEach((nz, idx) => {
    const nozzle = BABYLON.MeshBuilder.CreateCylinder(`nozzle_${idx}`, {
      diameterTop: 0.008,
      diameterBottom: 0.015,
      height: 0.035,
      tessellation: 16
    }, scene);
    nozzle.position.set(0, -0.14, nz);
    nozzle.material = brassMat;
    nozzle.parent = payloadGroup;
    nozzle.metadata = {
      title: `Boquilla Aspersora de Abanico Plano (${idx === 0 ? 'Tobera Izq' : 'Tobera Der'})`,
      material: 'Latón Forjado C36000 (Aleación Cobre-Zinc)',
      family: 'metal',
      density: '8.50 g/cm³',
      tempLimit: '250°C',
      tensileStrength: 'Patrón de abanico plano de 110° TeeJet',
      description: 'Boquilla de atomización calibrada para producir gotas de 250 a 400 micras, evitando la evaporación instantánea por el calor ascendente del fuego.'
    };
  });

  registerPart(payloadGroup, 'Sistema de Extinción de Incendios (Tanque 1.2L + Boquillas)', 7, new BABYLON.Vector3(0, -0.32, 0), {
    id: 'payload_fire',
    capacidad: '1.2 Litros de retardante de polifosfato de amonio',
    presion: '4.0 Bar presurizado con N2',
    cobertura: 'Abanico plano de 110° para supresión rápida de conatos'
  });

  // =========================================================================
  // PASO 8: 4 Hélices Aerodinámicas Alabeadas 12x4.5
  // =========================================================================
  const propGroup = new BABYLON.TransformNode('propGroup', scene);
  propGroup.parent = root;
  const propMeshes = [];

  armAngles.forEach(armData => {
    const pNode = new BABYLON.TransformNode(`propPivot_${armData.id}`, scene);
    pNode.parent = propGroup;
    const px = Math.cos(armData.angle) * armRadius;
    const pz = Math.sin(armData.angle) * armRadius;
    pNode.position.set(px, 0.042, pz);

    const isCw = (armData.id === 1 || armData.id === 3);
    const tipMat = isCw ? propCwMat : propCcwMat;

    const hub = BABYLON.MeshBuilder.CreateCylinder(`hub_${armData.id}`, {
      diameter: 0.024,
      height: 0.014,
      tessellation: 16
    }, scene);
    hub.material = carbonMat;
    hub.parent = pNode;

    const blade1 = BABYLON.MeshBuilder.CreateBox(`blade1_${armData.id}`, {
      width: 0.14,
      height: 0.003,
      depth: 0.024
    }, scene);
    blade1.position.x = 0.075;
    blade1.rotation.y = isCw ? -0.25 : 0.25;
    blade1.material = carbonMat;
    blade1.parent = pNode;

    const tip1 = BABYLON.MeshBuilder.CreateBox(`tip1_${armData.id}`, {
      width: 0.035,
      height: 0.0035,
      depth: 0.02
    }, scene);
    tip1.position.x = 0.13;
    tip1.rotation.y = isCw ? -0.25 : 0.25;
    tip1.material = tipMat;
    tip1.parent = pNode;

    const blade2 = BABYLON.MeshBuilder.CreateBox(`blade2_${armData.id}`, {
      width: 0.14,
      height: 0.003,
      depth: 0.024
    }, scene);
    blade2.position.x = -0.075;
    blade2.rotation.y = isCw ? -0.25 : 0.25;
    blade2.material = carbonMat;
    blade2.parent = pNode;

    const tip2 = BABYLON.MeshBuilder.CreateBox(`tip2_${armData.id}`, {
      width: 0.035,
      height: 0.0035,
      depth: 0.02
    }, scene);
    tip2.position.x = -0.13;
    tip2.rotation.y = isCw ? -0.25 : 0.25;
    tip2.material = tipMat;
    tip2.parent = pNode;

    const lockNut = BABYLON.MeshBuilder.CreateCylinder(`lockNut_${armData.id}`, {
      diameterTop: 0.003,
      diameterBottom: 0.018,
      height: 0.02,
      tessellation: 16
    }, scene);
    lockNut.position.y = 0.012;
    lockNut.material = redAnodizedMat;
    lockNut.parent = pNode;

    propMeshes.push({ node: pNode, isCw, id: armData.id });
  });

  registerPart(propGroup, '4 Hélices Alabeadas 12x4.5 (2 CW Naranja / 2 CCW Azul)', 8, new BABYLON.Vector3(0, 0.40, 0), {
    id: 'propellers',
    geometria: 'Fibra de carbono mate con perfil aerodinámico Clark-Y y puntas de alta visibilidad',
    dimensiones: '12 x 4.5 pulgadas (304.8 mm x 114.3 mm)',
    par_antiparalelo: 'Cancelación total de momento giroscópico'
  });

  // =========================================================================
  // PASO 9: CARCASA AERODINÁMICA DE RESCATE (FASE A - ARTE Y DISEÑO)
  // Acabado PBR en Naranja/Rojo Internacional de Alta Visibilidad
  // =========================================================================
  const rescueCanopyGroup = new BABYLON.TransformNode('rescueCanopyGroup', scene);
  rescueCanopyGroup.parent = root;

  // 1. Cuerpo Principal Aerodinámico (Lágrima aerodinámica envolvente)
  const canopyHull = BABYLON.MeshBuilder.CreateCylinder('canopyHull', {
    diameterTop: 0.16,
    diameterBottom: 0.21,
    height: 0.055,
    tessellation: 32
  }, scene);
  canopyHull.position.set(0, 0.068, -0.01);
  canopyHull.scaling.set(0.85, 0.85, 1.35); // Perfil en gota aerodinámica
  canopyHull.material = rescueCanopyMat;
  canopyHull.parent = rescueCanopyGroup;
  canopyHull.metadata = {
    title: 'Carcasa Aerodinámica de Rescate Forestal (Fase A)',
    material: 'Policarbonato Termoformado Lexan EXL + Acabado Lacado PBR Naranja/Rojo',
    family: 'aerodynamic_fairing',
    density: '1.20 g/cm³ (95 g masa neta)',
    tempLimit: '145°C continuo con protección contra pavesas',
    tensileStrength: 'Coeficiente aerodinámico Cx = 0.12 (reducción de arrastre del 34%)',
    description: 'Carenado envolvente de intervención rápida diseñado según la Fase A (Arte y Diseño). Protege la electrónica Pixhawk contra humo denso, ceniza caliente y ráfagas térmicas.'
  };

  // 2. Cúpula Frontal para Sensor Térmico FLIR (Gimbal Óptico)
  const flirDome = BABYLON.MeshBuilder.CreateSphere('flirDome', {
    diameter: 0.048,
    segments: 20
  }, scene);
  flirDome.position.set(0, 0.062, 0.115);
  flirDome.material = flirGlassMat;
  flirDome.parent = rescueCanopyGroup;
  flirDome.metadata = {
    title: 'Domo de Visión Térmica FLIR Infrarroja',
    material: 'Cristal de Germanio Óptico Infrarrojo de Onda Larga (LWIR)',
    family: 'optics',
    density: '5.32 g/cm³',
    tempLimit: '200°C',
    tensileStrength: 'Transmisión 8-14 micrómetros para detección de focos de incendio',
    description: 'Cúpula frontal blindada que aloja la cámara termográfica de detección temprana de conatos.'
  };

  // 3. Tomas de Aire Frontales NACA para Refrigeración
  [-0.038, 0.038].forEach((nx, idx) => {
    const intake = BABYLON.MeshBuilder.CreateBox(`nacaIntake_${idx}`, {
      width: 0.018,
      height: 0.012,
      depth: 0.035
    }, scene);
    intake.position.set(nx, 0.078, 0.05);
    intake.rotation.x = -0.35;
    intake.material = pixhawkMat;
    intake.parent = rescueCanopyGroup;
  });

  // 4. Aleta Estabilizadora Vertical Superior
  const fin = BABYLON.MeshBuilder.CreateBox('canopyFin', {
    width: 0.005,
    height: 0.038,
    depth: 0.09
  }, scene);
  fin.position.set(0, 0.105, -0.045);
  fin.rotation.x = 0.18;
  fin.material = rescueCanopyMat;
  fin.parent = rescueCanopyGroup;

  // Franja reflectante de alta visibilidad (blanco perla)
  const stripe = BABYLON.MeshBuilder.CreatePlane('rescueStripe', {
    width: 0.024,
    height: 0.12
  }, scene);
  stripe.rotation.x = Math.PI / 2;
  stripe.position.set(0, 0.092, -0.01);
  const stripeMat = new BABYLON.StandardMaterial('stripeMat', scene);
  stripeMat.diffuseColor = new BABYLON.Color3(1.0, 1.0, 1.0);
  stripeMat.emissiveColor = new BABYLON.Color3(0.4, 0.4, 0.4);
  stripe.material = stripeMat;
  stripe.parent = rescueCanopyGroup;

  registerPart(rescueCanopyGroup, 'Carcasa Aerodinámica de Rescate Forestal (Fase A: Arte & Diseño)', 9, new BABYLON.Vector3(0, 0.48, 0), {
    id: 'canopy_rescue',
    acabado_pbr: 'Laca automotriz Naranja Internacional (#FF3D00) con ClearCoat reflectante',
    aerodinamica: 'Reducción de arrastre parásito Cx de 0.35 a 0.12',
    fase_steam: 'Fase A (Arte & Diseño Industrial Aeroespacial)'
  });

  return {
    root,
    parts,
    motorBells,
    propMeshes,
    statusLed: led,
    ledMat,
    canopyMat: rescueCanopyMat
  };
}
