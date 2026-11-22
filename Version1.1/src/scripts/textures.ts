import * as BABYLON from "@babylonjs/core";

/**
 * Generador de Texturas Procedurales en Alta Definición y Mapas PBR
 * 100% Sincrónico, Nativo y Offline en Babylon.js
 * 
 * Rol de Ingeniería: Emi (Ángel Emiliano Gómez Porras)
 * Solución de Bugs Visuales de Texturas y Acabados PBR Fotorrealistas:
 * - Tejido de Fibra de Carbono 3K (Twill 2x2) sin distorsión ni aliasing.
 * - Mapa de Normales/Bump procedural para relieve de fibras microscópicas.
 * - Textura de Placa PDB multicapa con cobre ENIG y máscara de soldadura mate.
 * - Texturas volumétricas de partículas para Fuego, Humo, Retardante y Mapa Térmico.
 */

export interface ProceduralTexturesResult {
  carbonTexture: BABYLON.DynamicTexture;
  carbonBumpTexture: BABYLON.DynamicTexture;
  pcbTexture: BABYLON.DynamicTexture;
  particleTexture: BABYLON.DynamicTexture;
  retardantTexture: BABYLON.DynamicTexture;
  thermalLutTexture: BABYLON.DynamicTexture;
}

export function createProceduralTextures(scene: BABYLON.Scene): ProceduralTexturesResult {
  // =========================================================================
  // 1. TEXTURA PBR ALBEDO DE FIBRA DE CARBONO 3K (TWILL 2x2 WEAVE)
  // =========================================================================
  const carbonSize = 512;
  const carbonTex = new BABYLON.DynamicTexture("carbonAlbedoTex", { width: carbonSize, height: carbonSize }, scene, true);
  const ctxC = carbonTex.getContext();

  ctxC.fillStyle = "#111215";
  ctxC.fillRect(0, 0, carbonSize, carbonSize);

  const twillStep = 32;
  for (let y = 0; y < carbonSize; y += twillStep) {
    for (let x = 0; x < carbonSize; x += twillStep) {
      // Patrón de sarga Twill 2x2 escalonado
      const cellX = Math.floor(x / twillStep);
      const cellY = Math.floor(y / twillStep);
      const isHorizontalWeave = ((cellX + cellY) % 2 === 0);

      // Degradado sutil con reflejos anisotrópicos de hilo trenzado
      const grad = ctxC.createLinearGradient(x, y, x + twillStep, y + twillStep);
      if (isHorizontalWeave) {
        grad.addColorStop(0.0, "#26282e");
        grad.addColorStop(0.3, "#1a1b1f");
        grad.addColorStop(0.7, "#2f323a");
        grad.addColorStop(1.0, "#16171a");
      } else {
        grad.addColorStop(0.0, "#151618");
        grad.addColorStop(0.4, "#2c2e35");
        grad.addColorStop(0.8, "#18191c");
        grad.addColorStop(1.0, "#282a30");
      }
      ctxC.fillStyle = grad;
      ctxC.fillRect(x, y, twillStep, twillStep);

      // Micro-fibras individuales peinadas (4 hebras por hilo)
      ctxC.strokeStyle = "rgba(255, 255, 255, 0.055)";
      ctxC.lineWidth = 1;
      for (let i = 4; i < twillStep; i += 4) {
        ctxC.beginPath();
        if (isHorizontalWeave) {
          ctxC.moveTo(x + i, y);
          ctxC.lineTo(x + i, y + twillStep);
        } else {
          ctxC.moveTo(x, y + i);
          ctxC.lineTo(x + twillStep, y + i);
        }
        ctxC.stroke();
      }

      // Sombras de oclusión en el borde de cada entrecruzamiento
      ctxC.strokeStyle = "rgba(0, 0, 0, 0.55)";
      ctxC.lineWidth = 1.5;
      ctxC.strokeRect(x, y, twillStep, twillStep);
    }
  }

  carbonTex.uScale = 4.0;
  carbonTex.vScale = 4.0;
  carbonTex.wrapU = BABYLON.Texture.WRAP_ADDRESSMODE;
  carbonTex.wrapV = BABYLON.Texture.WRAP_ADDRESSMODE;
  carbonTex.update(true);

  // =========================================================================
  // 2. MAPA DE RELIEVE / BUMP DE FIBRA DE CARBONO (NORMAL SIMULATION)
  // =========================================================================
  const carbonBumpTex = new BABYLON.DynamicTexture("carbonBumpTex", { width: 256, height: 256 }, scene, true);
  const ctxBump = carbonBumpTex.getContext();

  ctxBump.fillStyle = "#808080"; // Gris neutro (Normal Z pura)
  ctxBump.fillRect(0, 0, 256, 256);

  const bumpStep = 16;
  for (let y = 0; y < 256; y += bumpStep) {
    for (let x = 0; x < 256; x += bumpStep) {
      const isAlt = (Math.floor(x / bumpStep) + Math.floor(y / bumpStep)) % 2 === 0;
      const bGrad = ctxBump.createLinearGradient(x, y, x + bumpStep, y + bumpStep);
      if (isAlt) {
        bGrad.addColorStop(0.0, "#b0b0b0");
        bGrad.addColorStop(0.5, "#808080");
        bGrad.addColorStop(1.0, "#505050");
      } else {
        bGrad.addColorStop(0.0, "#505050");
        bGrad.addColorStop(0.5, "#808080");
        bGrad.addColorStop(1.0, "#b0b0b0");
      }
      ctxBump.fillStyle = bGrad;
      ctxBump.fillRect(x, y, bumpStep, bumpStep);
    }
  }
  carbonBumpTex.uScale = 4.0;
  carbonBumpTex.vScale = 4.0;
  carbonBumpTex.wrapU = BABYLON.Texture.WRAP_ADDRESSMODE;
  carbonBumpTex.wrapV = BABYLON.Texture.WRAP_ADDRESSMODE;
  carbonBumpTex.update(true);

  // =========================================================================
  // 3. TEXTURA DE PLACA DE POTENCIA PDB MILITAR (FR-4 + ENIG GOLD)
  // =========================================================================
  const pcbTex = new BABYLON.DynamicTexture("pcbTex", { width: 512, height: 512 }, scene, true);
  const ctxP = pcbTex.getContext();

  // Sustrato FR-4 verde oscuro mate militar
  ctxP.fillStyle = "#061a0f";
  ctxP.fillRect(0, 0, 512, 512);

  // Cuadrícula de tierra mallada (Ground Plane)
  ctxP.strokeStyle = "rgba(10, 45, 25, 0.45)";
  ctxP.lineWidth = 1;
  for (let g = 0; g < 512; g += 16) {
    ctxP.beginPath();
    ctxP.moveTo(g, 0); ctxP.lineTo(g, 512);
    ctxP.moveTo(0, g); ctxP.lineTo(512, g);
    ctxP.stroke();
  }

  // Pistas de cobre con chapado en oro químico ENIG
  ctxP.strokeStyle = "#e6bf38";
  ctxP.lineWidth = 5;
  (ctxP as any).lineCap = "round";
  (ctxP as any).lineJoin = "round";

  const busLines: [number, number][][] = [
    [[50, 50], [160, 50], [220, 110], [220, 256]],
    [[512 - 50, 50], [512 - 160, 50], [512 - 220, 110], [512 - 220, 256]],
    [[50, 512 - 50], [160, 512 - 50], [220, 512 - 110], [220, 256]],
    [[512 - 50, 512 - 50], [512 - 160, 512 - 50], [512 - 220, 512 - 110], [512 - 220, 256]],
    [[256, 40], [256, 140]],
    [[256, 512 - 40], [256, 512 - 140]],
    [[40, 256], [140, 256]],
    [[512 - 40, 256], [512 - 140, 256]]
  ];

  busLines.forEach(line => {
    ctxP.beginPath();
    ctxP.moveTo(line[0][0], line[0][1]);
    for (let i = 1; i < line.length; i++) {
      ctxP.lineTo(line[i][0], line[i][1]);
    }
    ctxP.stroke();
  });

  // Pads circulares de soldadura de alto amperaje
  ctxP.fillStyle = "#ffd54f";
  for (let i = 0; i < 16; i++) {
    const angle = (i / 16) * Math.PI * 2;
    const px = 256 + Math.cos(angle) * 190;
    const py = 256 + Math.sin(angle) * 190;
    ctxP.beginPath();
    ctxP.arc(px, py, 11, 0, Math.PI * 2);
    ctxP.fill();

    // Orificio metalizado pasante (via hole)
    ctxP.fillStyle = "#0a0a0a";
    ctxP.beginPath();
    ctxP.arc(px, py, 4.5, 0, Math.PI * 2);
    ctxP.fill();
    ctxP.fillStyle = "#ffd54f";
  }

  // Serigrafía blanca de ingeniería
  ctxP.fillStyle = "#f0f0f0";
  ctxP.font = "bold 15px monospace";
  ctxP.fillText("M1-ESC [40A]", 60, 80);
  ctxP.fillText("M2-ESC [40A]", 340, 80);
  ctxP.fillText("M3-ESC [40A]", 340, 450);
  ctxP.fillText("M4-ESC [40A]", 60, 450);
  ctxP.font = "bold 13px sans-serif";
  ctxP.fillText("PDB-ZD550 MIL-SPEC 4S/6S READY", 150, 250);
  ctxP.fillText("CURRENT SENSOR: TI INA226", 165, 275);
  pcbTex.update(true);

  // =========================================================================
  // 4. TEXTURA VOLUMÉTRICA DE PARTÍCULAS (FUEGO, HUMO Y VAPOR)
  // =========================================================================
  const partSize = 128;
  const particleTex = new BABYLON.DynamicTexture("volumetricParticleTex", { width: partSize, height: partSize }, scene, true);
  const ctxPart = particleTex.getContext();

  const radGrad = ctxPart.createRadialGradient(partSize / 2, partSize / 2, 0, partSize / 2, partSize / 2, partSize / 2);
  radGrad.addColorStop(0.0, "rgba(255, 255, 255, 1.0)");
  radGrad.addColorStop(0.2, "rgba(255, 255, 255, 0.95)");
  radGrad.addColorStop(0.5, "rgba(255, 240, 220, 0.55)");
  radGrad.addColorStop(0.8, "rgba(255, 200, 160, 0.15)");
  radGrad.addColorStop(1.0, "rgba(0, 0, 0, 0.0)");
  ctxPart.fillStyle = radGrad;
  ctxPart.fillRect(0, 0, partSize, partSize);

  // Ruido de textura para romper la simetría esférica artificial
  for (let i = 0; i < 400; i++) {
    const rx = Math.random() * partSize;
    const ry = Math.random() * partSize;
    const d = Math.hypot(rx - partSize / 2, ry - partSize / 2);
    if (d < partSize / 2) {
      const alpha = (1 - d / (partSize / 2)) * 0.18;
      ctxPart.fillStyle = `rgba(255, 255, 255, ${alpha})`;
      ctxPart.fillRect(rx, ry, 2, 2);
    }
  }
  particleTex.update(true);

  // =========================================================================
  // 5. TEXTURA DEL RETARDANTE QUÍMICO (GOTAS Y ESPUMA IGNÍFUGA)
  // =========================================================================
  const retardantTex = new BABYLON.DynamicTexture("retardantTex", { width: 128, height: 128 }, scene, true);
  const ctxRet = retardantTex.getContext();

  const retGrad = ctxRet.createRadialGradient(64, 64, 2, 64, 64, 60);
  retGrad.addColorStop(0.0, "rgba(255, 110, 120, 1.0)"); // Tono rosa/carmín característico Phos-Chek
  retGrad.addColorStop(0.4, "rgba(255, 70, 90, 0.85)");
  retGrad.addColorStop(0.75, "rgba(240, 220, 230, 0.40)");
  retGrad.addColorStop(1.0, "rgba(255, 255, 255, 0.0)");
  ctxRet.fillStyle = retGrad;
  ctxRet.fillRect(0, 0, 128, 128);
  retardantTex.update(true);

  // =========================================================================
  // 6. MAPA TÉRMICO PROCEDURAL (PALETA IRONBOW TERMOGRÁFICA FLIR)
  // =========================================================================
  const thermalLutTex = new BABYLON.DynamicTexture("thermalLutTex", { width: 256, height: 16 }, scene, false);
  const ctxTh = thermalLutTex.getContext();
  const thGrad = ctxTh.createLinearGradient(0, 0, 256, 0);
  // Escala Ironbow FLIR oficial: Negro -> Púrpura -> Rojo -> Amarillo -> Blanco brillante
  thGrad.addColorStop(0.0, "#000004"); // Frío extremo / Ambiente
  thGrad.addColorStop(0.2, "#3b0f70"); // Frío moderado (~30°C)
  thGrad.addColorStop(0.45, "#8c2981"); // Calor bajo (~55°C)
  thGrad.addColorStop(0.7, "#de4968"); // Calor medio (~90°C)
  thGrad.addColorStop(0.88, "#fe9f6d"); // Fuego activo (>200°C)
  thGrad.addColorStop(1.0, "#fcfdbf"); // Llama incandescente (>600°C)
  ctxTh.fillStyle = thGrad;
  ctxTh.fillRect(0, 0, 256, 16);
  thermalLutTex.update(false);

  return {
    carbonTexture: carbonTex,
    carbonBumpTexture: carbonBumpTex,
    pcbTexture: pcbTex,
    particleTexture: particleTex,
    retardantTexture: retardantTex,
    thermalLutTexture: thermalLutTex
  };
}
