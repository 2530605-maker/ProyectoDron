/**
 * Entorno Forestal 3D, Sistema Volumétrico de Incendios, Colisiones y VFX de Rescate
 * 100% Sincrónico, Nativo y Offline en Babylon.js
 * 
 * Rol de Ingeniería: Emi (Ángel Emiliano Gómez Porras)
 * Características avanzadas:
 * 1. Shaders volumétricos y multicapa de fuego y humo con extinción gradual y brasas.
 * 2. Efecto visual de retardante químico en abanico plano y generación de vapor térmico.
 * 3. Mapa térmico del terreno (FLIR Ironbow) y modo de visión infrarroja.
 * 4. Registro de colisiones rígidas y de ramas para los 90 árboles del bosque.
 * 5. Lógica de propagación dinámica del fuego entre las copas de los árboles según el viento.
 */

import { createProceduralTextures } from '../drone/textures.js';

export class ForestEnvironment {
  constructor(scene) {
    this.scene = scene;
    this.textures = createProceduralTextures(scene);

    this.forestGroup = new BABYLON.TransformNode('forestGroup', scene);
    this.workbenchGroup = new BABYLON.TransformNode('workbenchGroup', scene);

    this.fireHotspots = [];
    this.treeColliders = [];
    this.trees = [];

    this.isThermalVisionActive = false;
    this.thermalPostProcess = null;

    this.init();
  }

  init() {
    this.createMaterials();
    this.createWorkbench();
    this.createForest();
    this.createSpraySystem();
    this.setupThermalPostProcess();
  }

  createMaterials() {
    // 1. Terreno Forestal PBR con Tonalidades de Musgo y Tierra
    this.groundMat = new BABYLON.PBRMaterial('groundMat', this.scene);
    this.groundMat.albedoColor = new BABYLON.Color3(0.18, 0.28, 0.12);
    this.groundMat.metallic = 0.05;
    this.groundMat.roughness = 0.85;
    this.groundMat.freeze();

    // 2. Troncos de Pino (Corteza de Madera Mate)
    this.trunkMat = new BABYLON.PBRMaterial('trunkMat', this.scene);
    this.trunkMat.albedoColor = new BABYLON.Color3(0.24, 0.14, 0.08);
    this.trunkMat.metallic = 0.02;
    this.trunkMat.roughness = 0.92;
    this.trunkMat.freeze();

    // 3. Follaje de Agujas de Pino (Coníferas Verdes)
    this.foliageMat = new BABYLON.PBRMaterial('foliageMat', this.scene);
    this.foliageMat.albedoColor = new BABYLON.Color3(0.08, 0.24, 0.10);
    this.foliageMat.metallic = 0.04;
    this.foliageMat.roughness = 0.75;
    this.foliageMat.freeze();

    // 4. Follaje Incandescente Quemándose
    this.burningFoliageMat = new BABYLON.StandardMaterial('burningFoliageMat', this.scene);
    this.burningFoliageMat.diffuseColor = new BABYLON.Color3(0.15, 0.05, 0.02);
    this.burningFoliageMat.emissiveColor = new BABYLON.Color3(0.85, 0.25, 0.05);

    // 5. Helipad de Rescate
    this.helipadMat = new BABYLON.PBRMaterial('helipadMat', this.scene);
    this.helipadMat.albedoColor = new BABYLON.Color3(0.22, 0.25, 0.28);
    this.helipadMat.metallic = 0.15;
    this.helipadMat.roughness = 0.60;
    this.helipadMat.freeze();
  }

  createWorkbench() {
    // Mesa de ingeniería y banco antiestático para el modo Taller
    const tableTop = BABYLON.MeshBuilder.CreateBox('tableTop', { width: 1.8, height: 0.04, depth: 1.3 }, this.scene);
    tableTop.position.set(0, 0.21, 0);
    const tableMat = new BABYLON.PBRMaterial('tableMat', this.scene);
    tableMat.albedoColor = new BABYLON.Color3(0.16, 0.18, 0.22);
    tableMat.metallic = 0.10;
    tableMat.roughness = 0.50;
    tableTop.material = tableMat;
    tableTop.parent = this.workbenchGroup;

    const esdMat = BABYLON.MeshBuilder.CreateBox('esdMat', { width: 1.2, height: 0.005, depth: 0.9 }, this.scene);
    esdMat.position.set(0, 0.233, 0);
    const matMat = new BABYLON.PBRMaterial('matMat', this.scene);
    matMat.albedoColor = new BABYLON.Color3(0.08, 0.40, 0.65); // Azul antiestático ESD
    matMat.metallic = 0.05;
    matMat.roughness = 0.40;
    esdMat.material = matMat;
    esdMat.parent = this.workbenchGroup;

    // Patas de la mesa
    const legCoords = [
      [-0.8, -0.4, 0.55],
      [0.8, -0.4, 0.55],
      [-0.8, -0.4, -0.55],
      [0.8, -0.4, -0.55]
    ];
    legCoords.forEach((coord, idx) => {
      const leg = BABYLON.MeshBuilder.CreateCylinder(`wLeg_${idx}`, { diameter: 0.04, height: 0.8 }, this.scene);
      leg.position.set(coord[0], coord[1], coord[2]);
      leg.material = tableMat;
      leg.parent = this.workbenchGroup;
    });

    this.workbenchGroup.setEnabled(true);
  }

  createForest() {
    // Terreno forestal amplio (250m x 250m)
    const ground = BABYLON.MeshBuilder.CreateGround('forestGround', {
      width: 260,
      height: 260,
      subdivisions: 48
    }, this.scene);
    ground.material = this.groundMat;
    ground.receiveShadows = true;
    ground.parent = this.forestGroup;

    // Helipad circular con marcaje H
    const helipad = BABYLON.MeshBuilder.CreateCylinder('helipad', {
      diameter: 12.0,
      height: 0.08,
      tessellation: 36
    }, this.scene);
    helipad.position.set(0, 0.04, 0);
    helipad.material = this.helipadMat;
    helipad.parent = this.forestGroup;

    const heliRing = BABYLON.MeshBuilder.CreateTorus('heliRing', {
      diameter: 10.5,
      thickness: 0.25,
      tessellation: 36
    }, this.scene);
    heliRing.position.set(0, 0.09, 0);
    const yellowMat = new BABYLON.StandardMaterial('yellowMat', this.scene);
    yellowMat.diffuseColor = new BABYLON.Color3(0.95, 0.8, 0.1);
    yellowMat.emissiveColor = new BABYLON.Color3(0.35, 0.28, 0.02);
    heliRing.material = yellowMat;
    heliRing.parent = this.forestGroup;

    // Generar 90 árboles en el bosque con colisionadores y seguimiento térmico
    for (let i = 0; i < 90; i++) {
      const radius = 10 + Math.random() * 95;
      const angle = Math.random() * Math.PI * 2;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;

      // Dejar helipad y zona de despegue despejada
      if (Math.hypot(x, z) < 6.5) continue;

      this.createTree(x, z, i);
    }

    // 3 Focos Principales de Incendio Forestal (Sectores Norte, Oeste y Este)
    this.createFireHotspot(-25, 20, 1.0, 'Alfa (Sector Norte)');
    this.createFireHotspot(-42, -18, 0.95, 'Bravo (Sector Oeste)');
    this.createFireHotspot(32, 28, 0.85, 'Charlie (Sector Este)');

    this.forestGroup.setEnabled(false);
  }

  createTree(x, z, id) {
    const treeNode = new BABYLON.TransformNode(`tree_${id}`, this.scene);
    treeNode.position.set(x, 0, z);
    treeNode.rotation.y = Math.random() * Math.PI * 2;
    treeNode.parent = this.forestGroup;

    const scale = 0.85 + Math.random() * 0.75;
    const trunkHeight = 4.2 * scale;
    const trunkRadius = (0.55 * scale) / 2;

    // Tronco
    const trunk = BABYLON.MeshBuilder.CreateCylinder(`trunk_${id}`, {
      diameterTop: 0.3 * scale,
      diameterBottom: 0.55 * scale,
      height: trunkHeight,
      tessellation: 8
    }, this.scene);
    trunk.position.y = trunkHeight / 2;
    trunk.material = this.trunkMat;
    trunk.parent = treeNode;
    trunk.freezeWorldMatrix();
    trunk.doNotSyncBoundingInfo = true;

    // 3 Niveles de Follaje Cónico (Copa del árbol)
    const foliageCones = [];
    const maxFoliageRadius = (3.6 * scale) / 2;
    for (let l = 0; l < 3; l++) {
      const cone = BABYLON.MeshBuilder.CreateCylinder(`foliage_${id}_${l}`, {
        diameterTop: 0.1,
        diameterBottom: (3.6 - l * 0.7) * scale,
        height: 2.4 * scale,
        tessellation: 8
      }, this.scene);
      cone.position.y = (2.4 * scale) + l * (1.2 * scale);
      cone.material = this.foliageMat;
      cone.parent = treeNode;
      cone.freezeWorldMatrix();
      cone.doNotSyncBoundingInfo = true;
      foliageCones.push(cone);
    }

    const totalHeight = trunkHeight + (3.6 * scale);

    // Registro del Colisionador y Estado Térmico para propagación
    const treeData = {
      id,
      x,
      z,
      trunkHeight,
      trunkRadius,
      foliageRadius: maxFoliageRadius,
      totalHeight,
      node: treeNode,
      foliageCones,
      temperature: 25.0,
      isBurning: false,
      burnIntensity: 0.0,
      fireParticles: null
    };

    this.treeColliders.push(treeData);
    this.trees.push(treeData);
  }

  // =========================================================================
  // SISTEMA VOLUMÉTRICO Y MULTICAPA DE FUEGO Y HUMO CON EXTINCIÓN GRADUAL
  // =========================================================================
  createFireHotspot(x, z, initialIntensity, label = 'Foco de Incendio') {
    const fireNode = new BABYLON.TransformNode(`fireHotspot_${x}_${z}`, this.scene);
    fireNode.position.set(x, 0, z);
    fireNode.parent = this.forestGroup;

    // 1. Luz Incandescente Dinámica de Fuego (Llama parpadeante)
    const fireLight = new BABYLON.PointLight(`fireLight_${x}_${z}`, new BABYLON.Vector3(x, 2.5, z), this.scene);
    fireLight.diffuse = new BABYLON.Color3(1.0, 0.45, 0.08);
    fireLight.specular = new BABYLON.Color3(1.0, 0.35, 0.0);
    fireLight.range = 50;
    fireLight.intensity = 3.5 * initialIntensity;

    // 2. Malla Central Volumétrica Emisiva de Fuego (Plasma core)
    const fireCore = BABYLON.MeshBuilder.CreateSphere(`fireCore_${x}_${z}`, { diameter: 3.2, segments: 12 }, this.scene);
    fireCore.position.set(x, 1.8, z);
    fireCore.scaling.set(1.0, 1.8, 1.0);
    const fireCoreMat = new BABYLON.StandardMaterial(`coreMat_${x}_${z}`, this.scene);
    fireCoreMat.emissiveColor = new BABYLON.Color3(1.0, 0.55, 0.1);
    fireCoreMat.alpha = 0.75;
    fireCore.material = fireCoreMat;
    fireCore.parent = fireNode;

    // 3. Sistema Volumétrico de Llamas Vivas
    const fireParticles = new BABYLON.ParticleSystem(`flames_${x}_${z}`, 450, this.scene);
    fireParticles.particleTexture = this.textures.particleTexture;
    fireParticles.emitter = new BABYLON.Vector3(x, 0.4, z);
    fireParticles.minEmitBox = new BABYLON.Vector3(-2.2, 0, -2.2);
    fireParticles.maxEmitBox = new BABYLON.Vector3(2.2, 0.8, 2.2);

    // Gradiente térmico: blanco-amarillo en ignición -> naranja -> rojo oscuro
    fireParticles.color1 = new BABYLON.Color4(1.0, 0.95, 0.4, 1.0);
    fireParticles.color2 = new BABYLON.Color4(1.0, 0.35, 0.04, 0.9);
    fireParticles.colorDead = new BABYLON.Color4(0.2, 0.02, 0.0, 0.0);

    fireParticles.minSize = 1.2;
    fireParticles.maxSize = 3.4;
    fireParticles.minLifeTime = 0.45;
    fireParticles.maxLifeTime = 1.1;
    fireParticles.emitRate = 220 * initialIntensity;
    fireParticles.gravity = new BABYLON.Vector3(0.5, 7.5, 0.2);
    fireParticles.start();

    // 4. Sistema Volumétrico de Humo Denso
    const smokeParticles = new BABYLON.ParticleSystem(`smoke_${x}_${z}`, 300, this.scene);
    smokeParticles.particleTexture = this.textures.particleTexture;
    smokeParticles.emitter = new BABYLON.Vector3(x, 2.5, z);
    smokeParticles.minEmitBox = new BABYLON.Vector3(-1.8, 0, -1.8);
    smokeParticles.maxEmitBox = new BABYLON.Vector3(1.8, 1.2, 1.8);

    smokeParticles.color1 = new BABYLON.Color4(0.25, 0.25, 0.28, 0.75);
    smokeParticles.color2 = new BABYLON.Color4(0.12, 0.12, 0.14, 0.50);
    smokeParticles.colorDead = new BABYLON.Color4(0.05, 0.05, 0.06, 0.0);

    smokeParticles.minSize = 3.0;
    smokeParticles.maxSize = 8.5;
    smokeParticles.minLifeTime = 2.2;
    smokeParticles.maxLifeTime = 5.0;
    smokeParticles.emitRate = 75 * initialIntensity;
    smokeParticles.gravity = new BABYLON.Vector3(1.8, 4.2, 0.6);
    smokeParticles.start();

    // 5. Sistema de Brasas y Chispas Volantes (Pavesas)
    const emberParticles = new BABYLON.ParticleSystem(`embers_${x}_${z}`, 80, this.scene);
    emberParticles.particleTexture = this.textures.particleTexture;
    emberParticles.emitter = new BABYLON.Vector3(x, 1.5, z);
    emberParticles.color1 = new BABYLON.Color4(1.0, 0.8, 0.2, 1.0);
    emberParticles.color2 = new BABYLON.Color4(1.0, 0.2, 0.0, 0.8);
    emberParticles.colorDead = new BABYLON.Color4(0.4, 0.1, 0.0, 0.0);
    emberParticles.minSize = 0.15;
    emberParticles.maxSize = 0.35;
    emberParticles.minLifeTime = 1.0;
    emberParticles.maxLifeTime = 2.5;
    emberParticles.emitRate = 35 * initialIntensity;
    emberParticles.gravity = new BABYLON.Vector3(2.5, 5.0, 1.0);
    emberParticles.start();

    // 6. Sistema de Vapor Sofocante al Extinguirse (Steam / Smolder)
    const steamParticles = new BABYLON.ParticleSystem(`steam_${x}_${z}`, 120, this.scene);
    steamParticles.particleTexture = this.textures.particleTexture;
    steamParticles.emitter = new BABYLON.Vector3(x, 1.0, z);
    steamParticles.color1 = new BABYLON.Color4(0.9, 0.92, 0.95, 0.65);
    steamParticles.color2 = new BABYLON.Color4(0.8, 0.85, 0.90, 0.35);
    steamParticles.colorDead = new BABYLON.Color4(0.95, 0.95, 1.0, 0.0);
    steamParticles.minSize = 1.5;
    steamParticles.maxSize = 4.5;
    steamParticles.minLifeTime = 1.2;
    steamParticles.maxLifeTime = 2.8;
    steamParticles.emitRate = 0; // Se activa al apagar
    steamParticles.gravity = new BABYLON.Vector3(0.5, 2.5, 0.3);
    steamParticles.start();

    const hotspot = {
      label,
      position: new BABYLON.Vector3(x, 0, z),
      intensity: initialIntensity,
      initialIntensity,
      light: fireLight,
      core: fireCore,
      coreMat: fireCoreMat,
      fireParticles,
      smokeParticles,
      emberParticles,
      steamParticles,
      isExtinguished: false,
      update: (dt = 0.016) => {
        const i = hotspot.intensity;

        if (i <= 0.04) {
          if (!hotspot.isExtinguished) {
            hotspot.isExtinguished = true;
            hotspot.intensity = 0;
            // Humareda blanca final de vapor sofocado
            steamParticles.emitRate = 45;
            setTimeout(() => { steamParticles.stop(); }, 6000);
          }
          fireLight.intensity = 0;
          fireCore.scaling.set(0.001, 0.001, 0.001);
          fireParticles.stop();
          smokeParticles.emitRate = 12; // Pequeño humo residual
          emberParticles.stop();
          return;
        }

        // Parpadeo de luz
        const flicker = 0.85 + Math.random() * 0.3;
        fireLight.intensity = 3.5 * i * flicker;

        // Escala del núcleo volumétrico
        const coreScale = Math.max(0.2, i);
        fireCore.scaling.set(coreScale, coreScale * (1.2 + Math.random() * 0.3), coreScale);
        fireCoreMat.emissiveColor.set(1.0 * i, 0.55 * i, 0.1 * i);
        fireCoreMat.alpha = 0.75 * i;

        fireParticles.emitRate = 220 * i;
        smokeParticles.emitRate = 75 * i;
        emberParticles.emitRate = 35 * i;

        // Si se está apagando, emitir vapor blanco
        if (i < hotspot.initialIntensity * 0.85 && i > 0.05) {
          steamParticles.emitRate = 60 * (1 - i);
        }
      }
    };

    this.fireHotspots.push(hotspot);
    return hotspot;
  }

  // =========================================================================
  // SISTEMA DE ASPERSIÓN DE RETARDANTE QUÍMICO EN ABANICO PLANO
  // =========================================================================
  createSpraySystem() {
    this.sprayParticleSystem = new BABYLON.ParticleSystem('waterSpray', 400, this.scene);
    this.sprayParticleSystem.particleTexture = this.textures.retardantTexture;

    // Retardante forestal característico carmín/rosa (Phos-Chek)
    this.sprayParticleSystem.color1 = new BABYLON.Color4(1.0, 0.35, 0.45, 0.90);
    this.sprayParticleSystem.color2 = new BABYLON.Color4(0.95, 0.65, 0.70, 0.60);
    this.sprayParticleSystem.colorDead = new BABYLON.Color4(1.0, 0.9, 0.9, 0.0);

    this.sprayParticleSystem.minSize = 0.20;
    this.sprayParticleSystem.maxSize = 0.65;
    this.sprayParticleSystem.minLifeTime = 0.5;
    this.sprayParticleSystem.maxLifeTime = 1.1;
    this.sprayParticleSystem.emitRate = 0;
    this.sprayParticleSystem.gravity = new BABYLON.Vector3(0, -9.81, 0);

    // Patrón de abanico plano de 110 grados (Boquillas TeeJet)
    this.sprayParticleSystem.direction1 = new BABYLON.Vector3(-0.65, -1.0, -0.65);
    this.sprayParticleSystem.direction2 = new BABYLON.Vector3(0.65, -1.0, 0.65);
    this.sprayParticleSystem.start();
  }

  updateSpray(dronePosition, isSpraying, retardantLevel, windVector) {
    if (this.sprayParticleSystem) {
      this.sprayParticleSystem.emitter = dronePosition.clone().add(new BABYLON.Vector3(0, -0.16, 0));
      this.sprayParticleSystem.emitRate = (isSpraying && retardantLevel > 0) ? 320 : 0;

      // Arrastre del retardante por el viento
      if (windVector) {
        this.sprayParticleSystem.gravity.x = windVector.x * 0.6;
        this.sprayParticleSystem.gravity.z = windVector.z * 0.6;
      }
    }

    this.fireHotspots.forEach(hotspot => hotspot.update());
  }

  // =========================================================================
  // PROPAGACIÓN DINÁMICA DEL FUEGO ENTRE LAS COPAS DE LOS ÁRBOLES
  // =========================================================================
  updateFirePropagation(dt, windVector) {
    if (!this.forestGroup.isEnabled()) return;

    const windDir = windVector ? windVector.clone().normalize() : new BABYLON.Vector3(1, 0, 0);
    const windSpeed = windVector ? windVector.length() : 1.5;

    // 1. Cada foco activo irradia calor y propaga pavesas a los árboles cercanos
    this.fireHotspots.forEach(hotspot => {
      if (hotspot.intensity <= 0.05) return;

      this.trees.forEach(tree => {
        if (tree.isBurning) return;

        const dx = tree.x - hotspot.position.x;
        const dz = tree.z - hotspot.position.z;
        const dist = Math.hypot(dx, dz);

        if (dist < 32) {
          // Cono de propagación a sotavento (en dirección del viento)
          const toTree = new BABYLON.Vector3(dx, 0, dz).normalize();
          const alignmentWithWind = BABYLON.Vector3.Dot(toTree, windDir); // [-1 a 1]
          const windMultiplier = Math.max(0.3, 1.0 + alignmentWithWind * (windSpeed * 0.4));

          // Radiación térmica que calienta la copa del árbol
          const heatFlux = (1.0 - dist / 32) * hotspot.intensity * windMultiplier * 25.0;
          tree.temperature += heatFlux * dt;

          // Si el árbol supera el punto de ignición (260°C), se enciende
          if (tree.temperature >= 260 && !tree.isBurning) {
            this.igniteTree(tree);
          }
        }
      });
    });

    // 2. Árboles en combustión consumen su biomasa y pueden apagarse si reciben retardante
    this.trees.forEach(tree => {
      if (!tree.isBurning) {
        // Enfriamiento natural convectivo hacia temperatura ambiente
        tree.temperature = Math.max(25.0, tree.temperature - 3.5 * dt);
        return;
      }

      tree.burnIntensity = Math.min(1.0, tree.burnIntensity + 0.15 * dt);

      // Efecto visual en el follaje del árbol
      tree.foliageCones.forEach(cone => {
        cone.material = this.burningFoliageMat;
      });
    });
  }

  igniteTree(tree) {
    tree.isBurning = true;
    tree.burnIntensity = 0.4;
    // Agregar foco de incendio menor en la copa del árbol
    const newHotspot = this.createFireHotspot(tree.x, tree.z, 0.65, `Árbol Propagado #${tree.id}`);
    tree.fireHotspot = newHotspot;
  }

  // =========================================================================
  // MAPA TÉRMICO Y VISIÓN INFRARROJA (FLIR IRONBOW)
  // =========================================================================
  setupThermalPostProcess() {
    // Configuración del post-proceso de visión térmica FLIR para la escena
    try {
      BABYLON.Effect.ShadersStore['thermalPixelShader'] = `
        precision highp float;
        varying vec2 vUV;
        uniform sampler2D textureSampler;
        uniform float intensity;

        void main(void) {
          vec4 color = texture2D(textureSampler, vUV);
          float lum = dot(color.rgb, vec3(0.299, 0.587, 0.114));

          // Rampa termográfica Ironbow
          vec3 c1 = vec3(0.0, 0.0, 0.2);  // Frío (Azul)
          vec3 c2 = vec3(0.4, 0.0, 0.6);  // Púrpura
          vec3 c3 = vec3(0.9, 0.2, 0.0);  // Naranja
          vec3 c4 = vec3(1.0, 0.9, 0.2);  // Amarillo
          vec3 c5 = vec3(1.0, 1.0, 1.0);  // Blanco incandescente

          vec3 thermal;
          if (lum < 0.25) thermal = mix(c1, c2, lum / 0.25);
          else if (lum < 0.55) thermal = mix(c2, c3, (lum - 0.25) / 0.30);
          else if (lum < 0.82) thermal = mix(c3, c4, (lum - 0.55) / 0.27);
          else thermal = mix(c4, c5, (lum - 0.82) / 0.18);

          gl_FragColor = vec4(mix(color.rgb, thermal, intensity), color.a);
        }
      `;
    } catch (e) {
      console.warn('Thermal shader registration fallback:', e);
    }
  }

  toggleThermalVision(camera) {
    this.isThermalVisionActive = !this.isThermalVisionActive;

    if (this.isThermalVisionActive && camera) {
      try {
        if (!this.thermalPostProcess) {
          this.thermalPostProcess = new BABYLON.PostProcess('thermal', 'thermal', ['intensity'], null, 1.0, camera);
          this.thermalPostProcess.onApply = (effect) => {
            effect.setFloat('intensity', 0.95);
          };
        } else {
          camera.attachPostProcess(this.thermalPostProcess);
        }
      } catch (e) {
        console.warn('No fue posible activar PostProcess térmico:', e);
      }
    } else if (this.thermalPostProcess && camera) {
      camera.detachPostProcess(this.thermalPostProcess);
    }

    return this.isThermalVisionActive;
  }

  // Renderizar minimapa térmico 2D en tiempo real para el HUD
  drawThermalHeatmap(canvas, dronePos) {
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;

    ctx.clearRect(0, 0, w, h);

    // Fondo del mapa forestal frío (~25°C - azul/negro profundo)
    ctx.fillStyle = '#060a14';
    ctx.fillRect(0, 0, w, h);

    // Factor de escala: 260m mapeados a las dimensiones del canvas
    const scaleX = w / 260;
    const scaleY = h / 260;
    const cx = w / 2;
    const cy = h / 2;

    // Helipad base
    ctx.strokeStyle = '#22d3ee';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(cx, cy, 6 * scaleX, 0, Math.PI * 2);
    ctx.stroke();

    // Árboles (Verde/Azul según temperatura)
    this.trees.forEach(tree => {
      const px = cx + tree.x * scaleX;
      const py = cy + tree.z * scaleY;

      if (tree.isBurning) {
        ctx.fillStyle = '#ff3b30';
        ctx.beginPath();
        ctx.arc(px, py, 3.5, 0, Math.PI * 2);
        ctx.fill();
      } else if (tree.temperature > 50) {
        ctx.fillStyle = '#f59e0b';
        ctx.beginPath();
        ctx.arc(px, py, 2.5, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.fillStyle = '#059669';
        ctx.fillRect(px - 1, py - 1, 2, 2);
      }
    });

    // Focos de fuego con gradiente térmico de calor
    this.fireHotspots.forEach(hotspot => {
      if (hotspot.intensity <= 0.05) return;
      const fx = cx + hotspot.position.x * scaleX;
      const fy = cy + hotspot.position.z * scaleY;
      const r = 18 * hotspot.intensity;

      const grad = ctx.createRadialGradient(fx, fy, 1, fx, fy, r);
      grad.addColorStop(0.0, 'rgba(255, 255, 255, 0.95)'); // 800°C
      grad.addColorStop(0.3, 'rgba(255, 200, 30, 0.85)');  // 500°C
      grad.addColorStop(0.6, 'rgba(239, 68, 68, 0.60)');   // 250°C
      grad.addColorStop(1.0, 'rgba(124, 58, 237, 0.0)');   // Disipación
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(fx, fy, r, 0, Math.PI * 2);
      ctx.fill();
    });

    // Posición del dron con icono orientable
    if (dronePos) {
      const dx = cx + dronePos.x * scaleX;
      const dy = cy + dronePos.z * scaleY;

      ctx.fillStyle = '#00ff88';
      ctx.beginPath();
      ctx.arc(dx, dy, 4.5, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(dx, dy, 7, 0, Math.PI * 2);
      ctx.stroke();
    }
  }

  setMode(mode) {
    if (mode === 'assembly') {
      this.workbenchGroup.setEnabled(true);
      this.forestGroup.setEnabled(false);
    } else {
      this.workbenchGroup.setEnabled(false);
      this.forestGroup.setEnabled(true);
    }
  }
}
