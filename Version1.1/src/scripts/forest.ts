import * as BABYLON from "@babylonjs/core";
import { createProceduralTextures, ProceduralTexturesResult } from "./textures";

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

export interface FireHotspot {
  id: string;
  name: string;
  position: BABYLON.Vector3;
  radius: number;
  intensity: number;
  maxIntensity: number;
  mesh: BABYLON.Mesh;
  particles: {
    flame: BABYLON.ParticleSystem;
    smoke: BABYLON.ParticleSystem;
    steam: BABYLON.ParticleSystem;
    sparks: BABYLON.ParticleSystem;
  };
  light: BABYLON.PointLight;
}

export interface TreeCollider {
  x: number;
  z: number;
  radius: number;
  height: number;
  type: "trunk" | "foliage";
}

export interface TreeData {
  root: BABYLON.TransformNode;
  trunk: BABYLON.AbstractMesh;
  foliage: BABYLON.AbstractMesh[];
  position: BABYLON.Vector3;
  isBurning: boolean;
  heatAccumulated: number;
}

export class ForestEnvironment {
  public scene: BABYLON.Scene;
  public textures: ProceduralTexturesResult;

  public forestGroup: BABYLON.TransformNode;
  public fireHotspots: FireHotspot[] = [];
  public treeColliders: TreeCollider[] = [];
  public trees: TreeData[] = [];

  public groundMat!: BABYLON.PBRMaterial;
  public trunkMat!: BABYLON.PBRMaterial;
  public foliageMat!: BABYLON.PBRMaterial;
  public burningFoliageMat!: BABYLON.StandardMaterial;
  public helipadMat!: BABYLON.PBRMaterial;
  public masterBurningCones: BABYLON.Mesh[] = [];

  public spraySystem: BABYLON.ParticleSystem | null = null;
  public isThermalVisionActive: boolean = false;
  public thermalPostProcess: BABYLON.PostProcess | null = null;

  constructor(scene: BABYLON.Scene) {
    this.scene = scene;
    this.textures = createProceduralTextures(scene);
    this.forestGroup = new BABYLON.TransformNode("forestGroup", scene);

    this.createMaterials();
    this.createForest();
    this.createSpraySystem();
    this.setupThermalPostProcess();
  }

  private createMaterials(): void {
    this.groundMat = new BABYLON.PBRMaterial("groundMat", this.scene);
    this.groundMat.albedoColor = new BABYLON.Color3(0.18, 0.28, 0.12);
    this.groundMat.metallic = 0.05;
    this.groundMat.roughness = 0.85;
    this.groundMat.freeze();

    this.trunkMat = new BABYLON.PBRMaterial("trunkMat", this.scene);
    this.trunkMat.albedoColor = new BABYLON.Color3(0.24, 0.14, 0.08);
    this.trunkMat.metallic = 0.02;
    this.trunkMat.roughness = 0.92;
    this.trunkMat.freeze();

    this.foliageMat = new BABYLON.PBRMaterial("foliageMat", this.scene);
    this.foliageMat.albedoColor = new BABYLON.Color3(0.08, 0.24, 0.10);
    this.foliageMat.metallic = 0.04;
    this.foliageMat.roughness = 0.75;
    this.foliageMat.freeze();

    this.burningFoliageMat = new BABYLON.StandardMaterial("burningFoliageMat", this.scene);
    this.burningFoliageMat.diffuseColor = new BABYLON.Color3(0.15, 0.05, 0.02);
    this.burningFoliageMat.emissiveColor = new BABYLON.Color3(0.85, 0.25, 0.05);

    this.helipadMat = new BABYLON.PBRMaterial("helipadMat", this.scene);
    this.helipadMat.albedoColor = new BABYLON.Color3(0.22, 0.25, 0.28);
    this.helipadMat.metallic = 0.15;
    this.helipadMat.roughness = 0.60;
    this.helipadMat.freeze();
  }

  public setVisible(visible: boolean): void {
    this.forestGroup.setEnabled(visible);
    this.fireHotspots.forEach(spot => {
      if (visible) {
        if (spot.intensity > 0.05) {
          if (!spot.particles.flame.isStarted()) spot.particles.flame.start();
          if (!spot.particles.smoke.isStarted()) spot.particles.smoke.start();
          if (!spot.particles.sparks.isStarted()) spot.particles.sparks.start();
        }
      } else {
        if (spot.particles.flame.isStarted()) spot.particles.flame.stop();
        if (spot.particles.smoke.isStarted()) spot.particles.smoke.stop();
        if (spot.particles.sparks.isStarted()) spot.particles.sparks.stop();
        if (spot.particles.steam.isStarted()) spot.particles.steam.stop();
      }
    });

    if (!visible && this.spraySystem && this.spraySystem.isStarted()) {
      this.spraySystem.stop();
    } else if (visible && this.spraySystem && !this.spraySystem.isStarted()) {
      this.spraySystem.start();
    }

    if (!visible) {
      if (this.isThermalVisionActive && this.scene.activeCamera) {
        this.toggleThermalVision(this.scene.activeCamera);
      }
    }
  }

  private createForest(): void {
    // Terreno Forestal
    const ground = BABYLON.MeshBuilder.CreateGround("forestGround", { width: 350, height: 350, subdivisions: 32 }, this.scene);
    ground.position.y = 0;
    ground.material = this.groundMat;
    ground.parent = this.forestGroup;
    ground.freezeWorldMatrix();
    ground.doNotSyncBoundingInfo = true;

    // Helipad Base en (0, 0)
    const helipad = BABYLON.MeshBuilder.CreateCylinder("helipad", { diameter: 10, height: 0.15, tessellation: 32 }, this.scene);
    helipad.position.set(0, 0.08, 0);
    helipad.material = this.helipadMat;
    helipad.parent = this.forestGroup;
    helipad.freezeWorldMatrix();
    helipad.doNotSyncBoundingInfo = true;

    // Marcado en H de helipuerto
    const hBar1 = BABYLON.MeshBuilder.CreateBox("hBar1", { width: 0.8, height: 0.05, depth: 4.5 }, this.scene);
    hBar1.position.set(-1.6, 0.16, 0);
    const hBar2 = BABYLON.MeshBuilder.CreateBox("hBar2", { width: 0.8, height: 0.05, depth: 4.5 }, this.scene);
    hBar2.position.set(1.6, 0.16, 0);
    const hCross = BABYLON.MeshBuilder.CreateBox("hCross", { width: 2.4, height: 0.05, depth: 0.8 }, this.scene);
    hCross.position.set(0, 0.16, 0);

    const hMat = new BABYLON.StandardMaterial("hMat", this.scene);
    hMat.diffuseColor = new BABYLON.Color3(0.95, 0.85, 0.1);
    hMat.freeze();
    hBar1.material = hMat; hBar2.material = hMat; hCross.material = hMat;
    hBar1.parent = helipad; hBar2.parent = helipad; hCross.parent = helipad;
    hBar1.freezeWorldMatrix(); hBar2.freezeWorldMatrix(); hCross.freezeWorldMatrix();
    hBar1.doNotSyncBoundingInfo = true; hBar2.doNotSyncBoundingInfo = true; hCross.doNotSyncBoundingInfo = true;

    // Generar 90 árboles en anillo exterior (alejados del helipad)
    const treePositions: { x: number; z: number; scale: number }[] = [];
    const rnd = (seed: number) => {
      const x = Math.sin(seed++) * 10000;
      return x - Math.floor(x);
    };

    let seedCounter = 42;
    for (let i = 0; i < 90; i++) {
      const angle = rnd(seedCounter++) * Math.PI * 2;
      const radius = 18.0 + rnd(seedCounter++) * 130.0;
      const tx = Math.cos(angle) * radius;
      const tz = Math.sin(angle) * radius;
      const scale = 0.75 + rnd(seedCounter++) * 0.55;
      treePositions.push({ x: tx, z: tz, scale });
    }

    // Plantillas maestras para instanciación por hardware (reduce draw calls de 360 a 4)
    const masterTrunk = BABYLON.MeshBuilder.CreateCylinder("masterTrunk", {
      diameterTop: 0.45 * 1.4,
      diameterBottom: 0.45 * 2.0,
      height: 4.5,
      tessellation: 8
    }, this.scene);
    masterTrunk.material = this.trunkMat;
    masterTrunk.isVisible = false;
    masterTrunk.parent = this.forestGroup;

    const masterCones: BABYLON.Mesh[] = [];
    this.masterBurningCones = [];
    for (let t = 0; t < 3; t++) {
      const tierH = 4.0 - t * 0.7;
      const tierR = 3.2 - t * 0.75;
      const cone = BABYLON.MeshBuilder.CreateCylinder(`masterCone_${t}`, {
        diameterTop: 0.1,
        diameterBottom: tierR * 2,
        height: tierH,
        tessellation: 8
      }, this.scene);
      cone.material = this.foliageMat;
      cone.isVisible = false;
      cone.parent = this.forestGroup;
      masterCones.push(cone);

      const bCone = BABYLON.MeshBuilder.CreateCylinder(`masterBurningCone_${t}`, {
        diameterTop: 0.1,
        diameterBottom: tierR * 2,
        height: tierH,
        tessellation: 8
      }, this.scene);
      bCone.material = this.burningFoliageMat;
      bCone.isVisible = false;
      bCone.parent = this.forestGroup;
      this.masterBurningCones.push(bCone);
    }

    treePositions.forEach((pos, idx) => {
      const treeNode = new BABYLON.TransformNode(`tree_${idx}`, this.scene);
      treeNode.position.set(pos.x, 0, pos.z);
      treeNode.parent = this.forestGroup;

      const trunkH = 4.5 * pos.scale;
      const trunkR = 0.45 * pos.scale;
      const trunkInst = masterTrunk.createInstance(`trunk_${idx}`);
      trunkInst.scaling.set(pos.scale, pos.scale, pos.scale);
      trunkInst.position.y = trunkH / 2;
      trunkInst.parent = treeNode;
      trunkInst.freezeWorldMatrix();
      trunkInst.doNotSyncBoundingInfo = true;
      trunkInst.cullingStrategy = BABYLON.AbstractMesh.CULLINGSTRATEGY_BOUNDINGSPHERE_ONLY;

      const foliageMeshes: any[] = [];
      for (let t = 0; t < 3; t++) {
        const coneInst = masterCones[t].createInstance(`cone_${idx}_${t}`);
        coneInst.scaling.set(pos.scale, pos.scale, pos.scale);
        coneInst.position.y = trunkH + (t * 2.1 * pos.scale);
        coneInst.parent = treeNode;
        coneInst.freezeWorldMatrix();
        coneInst.doNotSyncBoundingInfo = true;
        coneInst.cullingStrategy = BABYLON.AbstractMesh.CULLINGSTRATEGY_BOUNDINGSPHERE_ONLY;
        foliageMeshes.push(coneInst);
      }

      this.trees.push({
        root: treeNode,
        trunk: trunkInst as any,
        foliage: foliageMeshes,
        position: new BABYLON.Vector3(pos.x, 0, pos.z),
        isBurning: false,
        heatAccumulated: 0
      });

      this.treeColliders.push({
        x: pos.x,
        z: pos.z,
        radius: trunkR * 1.5,
        height: trunkH,
        type: "trunk"
      });

      this.treeColliders.push({
        x: pos.x,
        z: pos.z,
        radius: 2.8 * pos.scale,
        height: trunkH + 5.5 * pos.scale,
        type: "foliage"
      });
    });

    // 3 Focos de Incendio Forestal (Alfa, Bravo, Charlie)
    this.createFireHotspot("fire_alfa", "Foco Alfa (Sector Norte)", new BABYLON.Vector3(25, 0, 35), 11.0);
    this.createFireHotspot("fire_bravo", "Foco Bravo (Sector Oeste)", new BABYLON.Vector3(-30, 0, 20), 13.0);
    this.createFireHotspot("fire_charlie", "Foco Charlie (Sector Este)", new BABYLON.Vector3(35, 0, -25), 10.0);
  }

  private createFireHotspot(id: string, name: string, pos: BABYLON.Vector3, radius: number): void {
    const fireMesh = BABYLON.MeshBuilder.CreateCylinder(id, { diameter: radius * 1.8, height: 0.4, tessellation: 16 }, this.scene);
    fireMesh.position.copyFrom(pos);
    fireMesh.position.y = 0.2;
    const ashMat = new BABYLON.StandardMaterial(`${id}_ash`, this.scene);
    ashMat.diffuseColor = new BABYLON.Color3(0.08, 0.04, 0.02);
    ashMat.emissiveColor = new BABYLON.Color3(0.4, 0.12, 0.03);
    ashMat.freeze();
    fireMesh.material = ashMat;
    fireMesh.parent = this.forestGroup;
    fireMesh.freezeWorldMatrix();
    fireMesh.doNotSyncBoundingInfo = true;

    const fireLight = new BABYLON.PointLight(`${id}_light`, new BABYLON.Vector3(pos.x, 3.5, pos.z), this.scene);
    fireLight.diffuse = new BABYLON.Color3(1.0, 0.45, 0.1);
    fireLight.specular = new BABYLON.Color3(1.0, 0.2, 0.0);
    fireLight.range = 35;
    fireLight.intensity = 2.4;
    fireLight.parent = this.forestGroup;

    // Partículas de Llamas (Optimizadas para 60 FPS sin tirones)
    const flamePs = new BABYLON.ParticleSystem(`${id}_flames`, 220, this.scene);
    flamePs.particleTexture = this.textures.particleTexture;
    flamePs.emitter = new BABYLON.Vector3(pos.x, 0.5, pos.z);
    flamePs.minEmitBox = new BABYLON.Vector3(-radius * 0.4, 0, -radius * 0.4);
    flamePs.maxEmitBox = new BABYLON.Vector3(radius * 0.4, 0.5, radius * 0.4);

    flamePs.color1 = new BABYLON.Color4(1.0, 0.8, 0.1, 1.0);
    flamePs.color2 = new BABYLON.Color4(1.0, 0.25, 0.02, 0.85);
    flamePs.colorDead = new BABYLON.Color4(0.2, 0.05, 0.01, 0.0);

    flamePs.minSize = 1.4;
    flamePs.maxSize = 3.8;
    flamePs.minLifeTime = 0.8;
    flamePs.maxLifeTime = 1.6;
    flamePs.emitRate = 140;
    flamePs.blendMode = BABYLON.ParticleSystem.BLENDMODE_ADD;
    flamePs.gravity = new BABYLON.Vector3(0, 4.5, 0);
    flamePs.direction1 = new BABYLON.Vector3(-0.8, 4.0, -0.8);
    flamePs.direction2 = new BABYLON.Vector3(0.8, 7.5, 0.8);
    flamePs.minAngularSpeed = -1.5;
    flamePs.maxAngularSpeed = 1.5;
    flamePs.start();

    // Partículas de Humo Denso
    const smokePs = new BABYLON.ParticleSystem(`${id}_smoke`, 180, this.scene);
    smokePs.particleTexture = this.textures.particleTexture;
    smokePs.emitter = new BABYLON.Vector3(pos.x, 2.5, pos.z);
    smokePs.minEmitBox = new BABYLON.Vector3(-radius * 0.5, 0, -radius * 0.5);
    smokePs.maxEmitBox = new BABYLON.Vector3(radius * 0.5, 1.0, radius * 0.5);

    smokePs.color1 = new BABYLON.Color4(0.12, 0.12, 0.12, 0.65);
    smokePs.color2 = new BABYLON.Color4(0.22, 0.22, 0.24, 0.35);
    smokePs.colorDead = new BABYLON.Color4(0.4, 0.4, 0.45, 0.0);

    smokePs.minSize = 3.5;
    smokePs.maxSize = 8.5;
    smokePs.minLifeTime = 2.0;
    smokePs.maxLifeTime = 4.5;
    smokePs.emitRate = 60;
    smokePs.gravity = new BABYLON.Vector3(0.8, 2.8, 0.3);
    smokePs.direction1 = new BABYLON.Vector3(-1.0, 3.0, -1.0);
    smokePs.direction2 = new BABYLON.Vector3(1.0, 6.0, 1.0);
    smokePs.start();

    // Partículas de Vapor Blanco y Cenizas (para extinción gradual)
    const steamPs = new BABYLON.ParticleSystem(`${id}_steam`, 120, this.scene);
    steamPs.particleTexture = this.textures.particleTexture;
    steamPs.emitter = new BABYLON.Vector3(pos.x, 0.8, pos.z);
    steamPs.color1 = new BABYLON.Color4(0.92, 0.94, 0.98, 0.7);
    steamPs.color2 = new BABYLON.Color4(0.8, 0.82, 0.86, 0.3);
    steamPs.colorDead = new BABYLON.Color4(1.0, 1.0, 1.0, 0.0);
    steamPs.minSize = 2.0;
    steamPs.maxSize = 5.0;
    steamPs.minLifeTime = 1.2;
    steamPs.maxLifeTime = 2.5;
    steamPs.emitRate = 0; // Se activa al apagar
    steamPs.gravity = new BABYLON.Vector3(0, 1.5, 0);
    steamPs.start();

    // Chispas / Brasas Volátiles
    const sparksPs = new BABYLON.ParticleSystem(`${id}_sparks`, 50, this.scene);
    sparksPs.particleTexture = this.textures.particleTexture;
    sparksPs.emitter = new BABYLON.Vector3(pos.x, 1.0, pos.z);
    sparksPs.color1 = new BABYLON.Color4(1.0, 0.6, 0.1, 1.0);
    sparksPs.color2 = new BABYLON.Color4(1.0, 0.1, 0.0, 0.8);
    sparksPs.colorDead = new BABYLON.Color4(0.5, 0.0, 0.0, 0.0);
    sparksPs.minSize = 0.15;
    sparksPs.maxSize = 0.45;
    sparksPs.minLifeTime = 0.8;
    sparksPs.maxLifeTime = 1.8;
    sparksPs.emitRate = 20;
    sparksPs.gravity = new BABYLON.Vector3(0, 3.5, 0);
    sparksPs.start();

    this.fireHotspots.push({
      id,
      name,
      position: pos,
      radius,
      intensity: 1.0,
      maxIntensity: 1.0,
      mesh: fireMesh,
      particles: { flame: flamePs, smoke: smokePs, steam: steamPs, sparks: sparksPs },
      light: fireLight
    });
  }

  private createSpraySystem(): void {
    this.spraySystem = new BABYLON.ParticleSystem("retardantSpray", 250, this.scene);
    this.spraySystem.particleTexture = this.textures.retardantTexture;
    this.spraySystem.emitter = new BABYLON.Vector3(0, 0, 0);

    this.spraySystem.color1 = new BABYLON.Color4(1.0, 0.35, 0.45, 0.95);
    this.spraySystem.color2 = new BABYLON.Color4(0.95, 0.20, 0.35, 0.80);
    this.spraySystem.colorDead = new BABYLON.Color4(0.9, 0.6, 0.65, 0.0);

    this.spraySystem.minSize = 0.25;
    this.spraySystem.maxSize = 0.75;
    this.spraySystem.minLifeTime = 0.8;
    this.spraySystem.maxLifeTime = 1.5;
    this.spraySystem.emitRate = 0; // Desactivado por defecto
    this.spraySystem.gravity = new BABYLON.Vector3(0, -9.81, 0);
    this.spraySystem.direction1 = new BABYLON.Vector3(-1.8, -6.0, -1.8);
    this.spraySystem.direction2 = new BABYLON.Vector3(1.8, -9.0, 1.8);
    this.spraySystem.start();
  }

  public updateSpray(dronePos: BABYLON.Vector3, isSpraying: boolean, retardantLevel: number, windVec: BABYLON.Vector3): void {
    if (!this.spraySystem) return;

    if (isSpraying && retardantLevel > 0) {
      this.spraySystem.emitter = new BABYLON.Vector3(dronePos.x, dronePos.y - 0.2, dronePos.z);
      this.spraySystem.emitRate = 250;
      this.spraySystem.gravity.set(windVec.x * 0.4, -9.81, windVec.z * 0.4);

      // Evaluar impacto sobre focos de incendio
      this.fireHotspots.forEach(spot => {
        if (spot.intensity <= 0.01) return;
        const dx = dronePos.x - spot.position.x;
        const dz = dronePos.z - spot.position.z;
        const dist2D = Math.hypot(dx, dz);

        if (dist2D < (spot.radius + 2.0) && dronePos.y < 30.0) {
          // Reducción gradual del fuego
          spot.intensity = Math.max(0.0, spot.intensity - 0.012);
          spot.particles.flame.emitRate = 450 * spot.intensity;
          spot.particles.smoke.emitRate = 180 * Math.max(0.2, spot.intensity);
          spot.particles.sparks.emitRate = 60 * spot.intensity;
          spot.light.intensity = 2.4 * spot.intensity;

          // Generación de vapor blanco
          spot.particles.steam.emitRate = 350 * (1.0 - spot.intensity);

          if (spot.intensity <= 0.05) {
            spot.particles.flame.stop();
            spot.particles.sparks.stop();
            spot.light.intensity = 0.1;
            setTimeout(() => {
              spot.particles.steam.emitRate = 0;
              spot.particles.smoke.emitRate = 0;
            }, 5000);
          }
        }
      });
    } else {
      this.spraySystem.emitRate = 0;
    }
  }

  private firePropTimer: number = 0;

  public updateFirePropagation(dt: number, windVec: BABYLON.Vector3): void {
    this.firePropTimer += dt;
    if (this.firePropTimer < 0.25) return; // Evaluación a 4 Hz en lugar de 60 Hz para máximo rendimiento
    const stepDt = this.firePropTimer;
    this.firePropTimer = 0;

    this.trees.forEach(tree => {
      if (tree.isBurning) return;

      this.fireHotspots.forEach(spot => {
        if (spot.intensity < 0.3) return;
        const dx = tree.position.x - spot.position.x;
        if (Math.abs(dx) > 18.0) return;
        const dz = tree.position.z - spot.position.z;
        if (Math.abs(dz) > 18.0) return;

        const distSq = dx * dx + dz * dz;
        if (distSq > 324.0) return; // 18m * 18m
        const dist = Math.sqrt(distSq) || 0.001;

        // Influencia del viento hacia la dirección de avance
        const windDot = (dx * windVec.x + dz * windVec.z) / dist;
        const windBoost = windDot > 0 ? 1.6 : 0.6;

        tree.heatAccumulated += ((18.0 - dist) / 18.0) * spot.intensity * windBoost * stepDt * 0.12;

        if (tree.heatAccumulated >= 1.0) {
          tree.isBurning = true;
          // Reemplazar instancias de follaje normal por follaje incendiado
          const scale = tree.trunk ? tree.trunk.scaling.y : 1.0;
          const trunkH = 4.5 * scale;
          tree.foliage.forEach((f: any) => {
            if (f && f.dispose) f.dispose();
          });
          tree.foliage = [];
          for (let t = 0; t < 3; t++) {
            if (this.masterBurningCones[t]) {
              const bInst = this.masterBurningCones[t].createInstance(`burning_cone_${tree.root.name}_${t}`);
              bInst.scaling.set(scale, scale, scale);
              bInst.position.y = trunkH + (t * 2.1 * scale);
              bInst.parent = tree.root;
              bInst.freezeWorldMatrix();
              tree.foliage.push(bInst);
            }
          }
        }
      });
    });
  }

  private setupThermalPostProcess(): void {
    const customVertexShader = `
      precision highp float;
      attribute vec2 position;
      varying vec2 vUV;
      const vec2 madd = vec2(0.5, 0.5);
      void main(void) {
        vUV = position * madd + madd;
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

    const customFragmentShader = `
      precision highp float;
      varying vec2 vUV;
      uniform sampler2D textureSampler;
      uniform sampler2D thermalLut;

      void main(void) {
        vec4 baseColor = texture2D(textureSampler, vUV);
        // Calcular luminancia térmica
        float lum = dot(baseColor.rgb, vec3(0.299, 0.587, 0.114));
        // Remapear con LUT Ironbow
        vec4 ironbowColor = texture2D(thermalLut, vec2(clamp(lum * 1.3, 0.02, 0.98), 0.5));
        gl_FragColor = vec4(ironbowColor.rgb, 1.0);
      }
    `;

    BABYLON.Effect.ShadersStore["thermalVertexShader"] = customVertexShader;
    BABYLON.Effect.ShadersStore["thermalPixelShader"] = customFragmentShader;
    BABYLON.Effect.ShadersStore["thermalFragmentShader"] = customFragmentShader;
  }

  public toggleThermalVision(camera: BABYLON.Camera): boolean {
    if (this.isThermalVisionActive) {
      if (this.thermalPostProcess) {
        this.thermalPostProcess.dispose(camera);
        this.thermalPostProcess = null;
      }
      this.isThermalVisionActive = false;
      return false;
    } else {
      this.thermalPostProcess = new BABYLON.PostProcess(
        "thermalEffect",
        "thermal",
        [],
        ["thermalLut"],
        1.0,
        camera
      );

      this.thermalPostProcess.onApply = (effect) => {
        effect.setTexture("thermalLut", this.textures.thermalLutTexture);
      };

      this.isThermalVisionActive = true;
      return true;
    }
  }

  public drawThermalHeatmap(canvas: HTMLCanvasElement | BABYLON.ICanvas | any, dronePos: BABYLON.Vector3): void {
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    // Fondo oscuro de radar
    ctx.fillStyle = "#040810";
    ctx.fillRect(0, 0, w, h);

    // Anillos de radar
    ctx.strokeStyle = "rgba(0, 229, 255, 0.25)";
    ctx.lineWidth = 1;
    [0.25, 0.5, 0.75, 0.95].forEach(r => {
      ctx.beginPath();
      ctx.arc(w / 2, h / 2, (w / 2) * r, 0, Math.PI * 2);
      ctx.stroke();
    });

    const scale = (w / 2) / 80; // 80 metros de rango

    // Dibujar focos de incendio
    this.fireHotspots.forEach(spot => {
      const rx = (spot.position.x - dronePos.x) * scale;
      const rz = (spot.position.z - dronePos.z) * scale;
      const cx = w / 2 + rx;
      const cy = h / 2 - rz;

      if (cx >= 0 && cx <= w && cy >= 0 && cy <= h) {
        const rad = Math.max(4, spot.radius * scale * spot.intensity);
        const grad = ctx.createRadialGradient(cx, cy, 1, cx, cy, rad);
        grad.addColorStop(0, "rgba(255, 240, 100, 0.95)");
        grad.addColorStop(0.4, "rgba(255, 80, 20, 0.75)");
        grad.addColorStop(0.8, "rgba(140, 20, 80, 0.40)");
        grad.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(cx, cy, rad, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 9px sans-serif";
        ctx.fillText(spot.name.substring(0, 6), cx - 12, cy - rad - 2);
      }
    });

    // Dron en el centro
    ctx.fillStyle = "#00e5ff";
    ctx.beginPath();
    ctx.arc(w / 2, h / 2, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#ffffff";
    ctx.stroke();
  }
}
