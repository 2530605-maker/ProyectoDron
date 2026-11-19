import * as BABYLON from "@babylonjs/core";
import * as GUI from "@babylonjs/gui";
import { IScript } from "babylonjs-editor-tools";

/**
 * SIMULADOR DE INGENIERÍA Y TALLER DE ENSAMBLAJE 3D DE DRONES
 * - Visuales PBR y texturas procedurales de alta fidelidad (adiós aspecto Lego).
 * - Múltiples prototipos: ZD550 Forestal Quad, Tarot 680 Hexa, F450 Scout Compact.
 * - Motor de detección de errores de vuelo y compatibilidad de ingeniería real.
 * - Modo de Inspección Aislada 3D individual por pieza con ficha técnica completa.
 */
export default class DronComponent implements IScript {
    public constructor(public mesh: any) { }

    public onStart(): void {
        const scene: BABYLON.Scene = this.mesh.getScene ? this.mesh.getScene() : this.mesh;
        const canvas = scene.getEngine().getRenderingCanvas();

        // Limpiar ambiente y evitar que se quemen los colores a blanco
        scene.clearColor = new BABYLON.Color4(0.10, 0.12, 0.16, 1.0);
        scene.ambientColor = new BABYLON.Color3(0.15, 0.16, 0.18);

        // Desactivar luces duplicadas que queman la mesa si existen
        scene.lights.forEach(l => {
            if (l.name !== "studioKey" && l.name !== "studioFill" && l.name !== "studioRim") {
                l.intensity = 0.25;
            }
        });

        // Escucha de redimensionado automático y pantalla completa para adaptarse al 100% del monitor
        window.addEventListener("resize", () => {
            scene.getEngine().resize();
        });
        document.addEventListener("fullscreenchange", () => {
            setTimeout(() => scene.getEngine().resize(), 100);
        });
        document.addEventListener("webkitfullscreenchange", () => {
            setTimeout(() => scene.getEngine().resize(), 100);
        });

        function toggleFullScreen() {
            try {
                const doc: any = document;
                const docEl: any = document.documentElement;
                if (!doc.fullscreenElement && !doc.webkitFullscreenElement && !doc.mozFullScreenElement && !doc.msFullscreenElement) {
                    if (docEl.requestFullscreen) docEl.requestFullscreen();
                    else if (docEl.webkitRequestFullscreen) docEl.webkitRequestFullscreen();
                    else if (docEl.mozRequestFullScreen) docEl.mozRequestFullScreen();
                    else if (docEl.msRequestFullscreen) docEl.msRequestFullscreen();
                } else {
                    if (doc.exitFullscreen) doc.exitFullscreen();
                    else if (doc.webkitExitFullscreen) doc.webkitExitFullscreen();
                    else if (doc.mozCancelFullScreen) doc.mozCancelFullScreen();
                    else if (doc.msExitFullscreen) doc.msExitFullscreen();
                }
                setTimeout(() => scene.getEngine().resize(), 150);
            } catch (e) {
                console.warn("Fullscreen toggle error:", e);
            }
        }

        // ================= CÁMARA PRINCIPAL INTERACTIVA =================
        const camera = new BABYLON.ArcRotateCamera("dronWorkCam", -Math.PI / 2, Math.PI / 2.8, 1.25, new BABYLON.Vector3(0, 0.12, 0.02), scene);
        if (canvas) {
            camera.attachControl(canvas, true);
        }
        camera.wheelPrecision = 40;
        camera.lowerRadiusLimit = 0.35; // Permite acercarse a ver detalles de carbono sin entrar en la mesa
        camera.upperRadiusLimit = 2.4;  // Evita alejarse tanto que la mesa se vea flotando en el vacio
        camera.minZ = 0.02;             // 2 cm: gran nitidez de profundidad sin Z-fighting ni planos cortados
        camera.maxZ = 40.0;
        camera.lowerBetaLimit = 0.15;   // Evita giro vertical invertido
        camera.upperBetaLimit = Math.PI / 2.3; // ~78°: NUNCA baja del nivel de la mesa, la plataforma NUNCA se corta
        camera.panningSensibility = 0;  // Mantiene la cámara siempre perfectamente centrada en el dron
        scene.activeCamera = camera;

        // ================= ILUMINACIÓN DE ESTUDIO / TALLER =================
        const studioKey = new BABYLON.DirectionalLight("studioKey", new BABYLON.Vector3(-1.2, -2.5, 1.0), scene);
        studioKey.position = new BABYLON.Vector3(3.5, 7.0, -3.5);
        studioKey.intensity = 1.1;

        const studioFill = new BABYLON.DirectionalLight("studioFill", new BABYLON.Vector3(1.5, -1.8, -1.2), scene);
        studioFill.position = new BABYLON.Vector3(-4.0, 5.0, 4.0);
        studioFill.intensity = 0.65;

        const studioRim = new BABYLON.HemisphericLight("studioRim", new BABYLON.Vector3(0, 1, 0), scene);
        studioRim.intensity = 0.65;
        studioRim.diffuse = new BABYLON.Color3(0.92, 0.94, 0.98);
        studioRim.groundColor = new BABYLON.Color3(0.18, 0.20, 0.24);

        const hl = new BABYLON.HighlightLayer("hl_dron", scene);

        // ================= GLOW LAYER & PIPELINE CINEMATOGRÁFICO NÍTIDO =================
        // GlowLayer sutil optimizado a 0.5 ratio (fluidez 60 FPS sin tirones)
        const glowLayer = new BABYLON.GlowLayer("glowLayer", scene, {
            mainTextureRatio: 0.5,
            blurKernelSize: 16
        });
        glowLayer.intensity = 0.40;

        // Pipeline de post-procesado DefaultRenderingPipeline con nitidez cristalina
        let pipeline: BABYLON.DefaultRenderingPipeline | null = null;
        try {
            pipeline = new BABYLON.DefaultRenderingPipeline("defaultPipeline", true, scene, [camera]);
            if (pipeline) {
                // Antialiasing MSAA 2x equilibrado para nitidez y 60 FPS estables
                pipeline.samples = 2;

                // ACES ToneMapping para contraste y rango dinámico profesional sin quemar colores
                scene.imageProcessingConfiguration.toneMappingEnabled = true;
                scene.imageProcessingConfiguration.toneMappingType = BABYLON.ImageProcessingConfiguration.TONEMAPPING_ACES;
                scene.imageProcessingConfiguration.contrast = 1.15;
                scene.imageProcessingConfiguration.exposure = 1.05;

                // Desactivar bloom a pantalla completa para evitar cualquier desenfoque o neblina (nitidez nativa 1:1)
                pipeline.bloomEnabled = false;

                // Viñeta muy suave en las esquinas
                pipeline.imageProcessing.vignetteEnabled = true;
                pipeline.imageProcessing.vignetteWeight = 0.8;
                pipeline.imageProcessing.vignetteStretch = 0.5;
                pipeline.imageProcessing.vignetteColor = new BABYLON.Color4(0.01, 0.02, 0.05, 0.0);

                // Desactivar aberración cromática (era la causa del efecto borroso y doble contorno)
                pipeline.chromaticAberrationEnabled = false;
            }
        } catch (e) {
            console.warn("Pipeline de post-procesado en modo fallback:", e);
        }

        // Generador de Sombras Suaves (Poisson Sampling - 60 FPS estables)
        let shadowGenerator: BABYLON.ShadowGenerator | null = null;
        try {
            shadowGenerator = new BABYLON.ShadowGenerator(512, studioKey);
            shadowGenerator.usePoissonSampling = true;
            shadowGenerator.bias = 0.002;
        } catch (e) {
            console.warn("Shadow generator no disponible:", e);
        }

        // ================= GENERACIÓN DE MATERIALES REALISTAS (PBR) =================
        // 1. Fibra de Carbono 3K (Tejido mate con laca transparente ClearCoat epóxica aeroespacial)
        const carbonMat = new BABYLON.PBRMaterial("carbonMat", scene);
        carbonMat.metallic = 0.35;
        carbonMat.roughness = 0.28;
        carbonMat.albedoColor = new BABYLON.Color3(0.07, 0.07, 0.08);
        if (carbonMat.clearCoat) {
            carbonMat.clearCoat.isEnabled = true;
            carbonMat.clearCoat.intensity = 0.95;
            carbonMat.clearCoat.roughness = 0.08;
        }
        const carbonTex = new BABYLON.DynamicTexture("carbonTex", 256, scene, false);
        const cCtx = carbonTex.getContext();
        for (let x = 0; x < 256; x += 16) {
            for (let y = 0; y < 256; y += 16) {
                const isEven = ((x / 16) + (y / 16)) % 2 === 0;
                cCtx.fillStyle = isEven ? "#141518" : "#222428";
                cCtx.fillRect(x, y, 16, 16);
            }
        }
        carbonTex.update();
        carbonMat.albedoTexture = carbonTex;

        // 2. Aluminio CNC Anodizado Rojo con Anisotropía de Torno CNC
        const redCncMat = new BABYLON.PBRMaterial("redCncMat", scene);
        redCncMat.metallic = 0.92;
        redCncMat.roughness = 0.18;
        redCncMat.albedoColor = new BABYLON.Color3(0.85, 0.08, 0.12);
        if (redCncMat.anisotropy) {
            redCncMat.anisotropy.isEnabled = true;
            redCncMat.anisotropy.intensity = 0.85;
            redCncMat.anisotropy.direction = new BABYLON.Vector2(1, 0);
        }

        // 3. Acero Inoxidable y Tornillería Allen M3 con Brillo Metálico
        const steelMat = new BABYLON.PBRMaterial("steelMat", scene);
        steelMat.metallic = 0.96;
        steelMat.roughness = 0.16;
        steelMat.albedoColor = new BABYLON.Color3(0.84, 0.86, 0.90);
        if (steelMat.anisotropy) {
            steelMat.anisotropy.isEnabled = true;
            steelMat.anisotropy.intensity = 0.6;
        }

        // 4. Cobre Puro OFC (Bobinados de motor)
        const copperMat = new BABYLON.PBRMaterial("copperMat", scene);
        copperMat.metallic = 0.90;
        copperMat.roughness = 0.28;
        copperMat.albedoColor = new BABYLON.Color3(0.92, 0.45, 0.15);

        // 5. Latón Naval (Boquillas y casquillos)
        const brassMat = new BABYLON.PBRMaterial("brassMat", scene);
        brassMat.metallic = 0.85;
        brassMat.roughness = 0.30;
        brassMat.albedoColor = new BABYLON.Color3(0.92, 0.78, 0.22);

        // 6. Polímero Pixhawk (Policarbonato negro mate anti-reflejo)
        const polymerMat = new BABYLON.PBRMaterial("polymerMat", scene);
        polymerMat.metallic = 0.05;
        polymerMat.roughness = 0.65;
        polymerMat.albedoColor = new BABYLON.Color3(0.12, 0.13, 0.15);

        // 7. Batería LiPo (Funda termorretráctil azul con etiqueta técnica dorada)
        const lipoMat = new BABYLON.PBRMaterial("lipoMat", scene);
        lipoMat.metallic = 0.10;
        lipoMat.roughness = 0.40;
        lipoMat.albedoColor = new BABYLON.Color3(0.08, 0.25, 0.68);

        const lipoLabelMat = new BABYLON.StandardMaterial("lipoLabelMat", scene);
        const lTex = new BABYLON.DynamicTexture("lTex", 512, scene, false);
        const lCtx = lTex.getContext();
        lCtx.fillStyle = "#ffb300";
        lCtx.fillRect(0, 0, 512, 512);
        lCtx.fillStyle = "#000000";
        lCtx.font = "bold 44px Arial";
        lCtx.fillText("LiPo 3S 11.1V", 40, 90);
        lCtx.font = "bold 70px Arial";
        lCtx.fillText("5000 mAh", 40, 180);
        lCtx.font = "bold 38px Arial";
        lCtx.fillText("35C DISCHARGE (175A)", 40, 250);
        lCtx.fillText("55.5 Wh • XT60", 40, 310);
        lTex.update();
        lipoLabelMat.diffuseTexture = lTex;

        // 8. Tanque Extintor Epóxico
        const tankMat = new BABYLON.PBRMaterial("tankMat", scene);
        tankMat.metallic = 0.30;
        tankMat.roughness = 0.25;
        tankMat.albedoColor = new BABYLON.Color3(0.85, 0.06, 0.08);

        // 9. Hélices de Fibra Compuesta CW y CCW
        const propCwMat = new BABYLON.PBRMaterial("propCwMat", scene);
        propCwMat.metallic = 0.50;
        propCwMat.roughness = 0.30;
        propCwMat.albedoColor = new BABYLON.Color3(0.98, 0.45, 0.05);

        const propCcwMat = new BABYLON.PBRMaterial("propCcwMat", scene);
        propCcwMat.metallic = 0.50;
        propCcwMat.roughness = 0.30;
        propCcwMat.albedoColor = new BABYLON.Color3(0.05, 0.65, 0.98);

        // ================= MATERIALES EMISIVOS CON BLOOM (LEDS & VECTORES) =================
        const ledGreenMat = new BABYLON.StandardMaterial("ledGreenMat", scene);
        ledGreenMat.emissiveColor = new BABYLON.Color3(0.0, 1.0, 0.25);
        ledGreenMat.diffuseColor = new BABYLON.Color3(0.0, 0.8, 0.2);

        const ledRedMat = new BABYLON.StandardMaterial("ledRedMat", scene);
        ledRedMat.emissiveColor = new BABYLON.Color3(1.0, 0.05, 0.1);
        ledRedMat.diffuseColor = new BABYLON.Color3(0.8, 0.05, 0.1);

        const ledStrobeWhiteMat = new BABYLON.StandardMaterial("ledStrobeWhiteMat", scene);
        ledStrobeWhiteMat.emissiveColor = new BABYLON.Color3(1.0, 1.0, 1.0);
        ledStrobeWhiteMat.diffuseColor = new BABYLON.Color3(1.0, 1.0, 1.0);

        const aeroVectorMat = new BABYLON.StandardMaterial("aeroVectorMat", scene);
        aeroVectorMat.emissiveColor = new BABYLON.Color3(0.0, 0.9, 1.0);
        aeroVectorMat.diffuseColor = new BABYLON.Color3(0.0, 0.7, 0.9);

        const aeroVortexMat = new BABYLON.StandardMaterial("aeroVortexMat", scene);
        aeroVortexMat.emissiveColor = new BABYLON.Color3(0.08, 0.65, 1.0);
        aeroVortexMat.diffuseColor = new BABYLON.Color3(0.0, 0.4, 0.8);
        aeroVortexMat.alpha = 0.75;

        const propWhiteMat = new BABYLON.PBRMaterial("propWhiteMat", scene);
        propWhiteMat.metallic = 0.15;
        propWhiteMat.roughness = 0.20;
        propWhiteMat.albedoColor = new BABYLON.Color3(0.96, 0.97, 0.99);

        const ledDotMat = new BABYLON.StandardMaterial("ledDotMat", scene);
        ledDotMat.emissiveColor = new BABYLON.Color3(0.95, 0.98, 1.0);
        ledDotMat.diffuseColor = new BABYLON.Color3(1.0, 1.0, 1.0);

        // ================= BANCO DE TRABAJO DE MADERA REALISTA ESTILO DRL =================
        const workbenchRoot = new BABYLON.TransformNode("workbenchRoot", scene);
        const tableTop = BABYLON.MeshBuilder.CreateBox("tableTop", { width: 2.7, height: 0.05, depth: 1.7 }, scene);
        tableTop.position.set(0, -0.025, 0);
        tableTop.parent = workbenchRoot;

        const woodMat = new BABYLON.PBRMaterial("woodMat", scene);
        woodMat.metallic = 0.04;
        woodMat.roughness = 0.36;
        const woodTex = new BABYLON.DynamicTexture("woodTex", 1024, scene, false);
        const wCtx = woodTex.getContext();
        wCtx.fillStyle = "#8a5d3b";
        wCtx.fillRect(0, 0, 1024, 1024);
        for (let i = 0; i < 1024; i += 4) {
            const alpha = 0.05 + 0.08 * Math.sin(i * 0.04) * Math.cos(i * 0.015);
            wCtx.fillStyle = `rgba(55, 32, 14, ${alpha})`;
            wCtx.fillRect(0, i, 1024, 3);
        }
        wCtx.fillStyle = "rgba(40, 22, 10, 0.12)";
        (wCtx as any).beginPath();
        if ((wCtx as any).ellipse) {
            (wCtx as any).ellipse(320, 240, 120, 18, 0.08, 0, Math.PI * 2);
            (wCtx as any).fill();
            (wCtx as any).beginPath();
            (wCtx as any).ellipse(780, 680, 140, 22, -0.05, 0, Math.PI * 2);
            (wCtx as any).fill();
        }
        woodTex.update();
        woodMat.albedoTexture = woodTex;
        tableTop.material = woodMat;
        tableTop.receiveShadows = true;

        // Alfombrilla de corte de modelismo azul autocurable estilo DRL (Cutting Mat)
        const cuttingMat = BABYLON.MeshBuilder.CreateBox("cuttingMat", { width: 1.25, height: 0.008, depth: 0.88 }, scene);
        cuttingMat.position.set(0, 0.004, 0.02);
        cuttingMat.parent = workbenchRoot;
        cuttingMat.receiveShadows = true;

        const cutTex = new BABYLON.DynamicTexture("cutTex", 1024, scene, false);
        const cCtxMat = cutTex.getContext();
        cCtxMat.fillStyle = "#0284c7";
        cCtxMat.fillRect(0, 0, 1024, 1024);

        // Cuadrícula milimétrica blanca fina
        cCtxMat.strokeStyle = "rgba(255, 255, 255, 0.28)";
        cCtxMat.lineWidth = 1;
        for (let g = 0; g <= 1024; g += 32) {
            cCtxMat.beginPath();
            cCtxMat.moveTo(g, 0); cCtxMat.lineTo(g, 1024);
            cCtxMat.moveTo(0, g); cCtxMat.lineTo(1024, g);
            cCtxMat.stroke();
        }

        // Cuadrícula mayor cada 50mm
        cCtxMat.strokeStyle = "rgba(255, 255, 255, 0.70)";
        cCtxMat.lineWidth = 2.5;
        for (let g = 0; g <= 1024; g += 160) {
            cCtxMat.beginPath();
            cCtxMat.moveTo(g, 0); cCtxMat.lineTo(g, 1024);
            cCtxMat.moveTo(0, g); cCtxMat.lineTo(1024, g);
            cCtxMat.stroke();
        }

        // Guías angulares 45°
        cCtxMat.strokeStyle = "rgba(255, 255, 255, 0.50)";
        cCtxMat.lineWidth = 1.5;
        cCtxMat.beginPath();
        cCtxMat.moveTo(0, 0); cCtxMat.lineTo(1024, 1024);
        cCtxMat.moveTo(1024, 0); cCtxMat.lineTo(0, 1024);
        cCtxMat.stroke();

        // Círculos concéntricos de alineación de centro
        cCtxMat.strokeStyle = "rgba(255, 255, 255, 0.40)";
        cCtxMat.setLineDash([8, 6]);
        [120, 240, 360].forEach(r => {
            cCtxMat.beginPath();
            cCtxMat.arc(512, 512, r, 0, Math.PI * 2);
            cCtxMat.stroke();
        });
        cCtxMat.setLineDash([]);

        // Reglas perimetrales numeradas
        cCtxMat.fillStyle = "#ffffff";
        cCtxMat.font = "bold 14px Arial";
        for (let cm = 1; cm <= 16; cm++) {
            cCtxMat.fillText(String(cm * 5), cm * 60 - 8, 22);
            cCtxMat.fillText(String(cm * 5), cm * 60 - 8, 1016);
        }
        for (let cm = 1; cm <= 10; cm++) {
            cCtxMat.fillText(String(cm * 5), 8, cm * 96);
            cCtxMat.fillText(String(cm * 5), 988, cm * 96);
        }

        cCtxMat.font = "bold 22px Arial";
        cCtxMat.fillText("DRL RACER • MODEL CUTTING MAT • SELF HEALING", 40, 60);
        cCtxMat.font = "bold 14px monospace";
        cCtxMat.fillText("ENGINEERING WORKBENCH • METRIC 10mm GRID", 40, 960);
        cutTex.update();

        const cutMat = new BABYLON.PBRMaterial("cutMat", scene);
        cutMat.metallic = 0.05;
        cutMat.roughness = 0.40;
        cutMat.albedoTexture = cutTex;
        cuttingMat.material = cutMat;
        tableTop.freezeWorldMatrix();
        cuttingMat.freezeWorldMatrix();

        // ================= ACCESORIOS REALISTAS DE TALLER (COMO REFERENCIA DRL) =================
        // 1. Emisora de Radio Control FPV (Transmisor estilo Radiomaster / Taranis) sobre la mesa
        const radioGroup = new BABYLON.TransformNode("radioGroup", scene);
        radioGroup.parent = workbenchRoot;
        radioGroup.position.set(-0.62, 0.024, 0.42);
        radioGroup.rotation.y = 0.18;

        const radioBody = BABYLON.MeshBuilder.CreateBox("radioBody", { width: 0.16, height: 0.038, depth: 0.18 }, scene);
        radioBody.material = polymerMat;
        radioBody.parent = radioGroup;

        const radioScreen = BABYLON.MeshBuilder.CreatePlane("radioScreen", { width: 0.075, height: 0.045 }, scene);
        radioScreen.rotation.x = Math.PI / 2;
        radioScreen.position.set(0, 0.020, -0.01);
        const radioScreenMat = new BABYLON.StandardMaterial("radioScreenMat", scene);
        radioScreenMat.emissiveColor = new BABYLON.Color3(0.0, 0.7, 0.9);
        radioScreenMat.diffuseColor = new BABYLON.Color3(0.0, 0.2, 0.4);
        radioScreen.material = radioScreenMat;
        radioScreen.parent = radioGroup;

        [-0.042, 0.042].forEach((gx, gi) => {
            const gimbalRing = BABYLON.MeshBuilder.CreateTorus("gRing_" + gi, { diameter: 0.034, thickness: 0.005 }, scene);
            gimbalRing.position.set(gx, 0.021, 0.045);
            gimbalRing.material = redCncMat;
            gimbalRing.parent = radioGroup;

            const stick = BABYLON.MeshBuilder.CreateCylinder("stick_" + gi, { diameter: 0.004, height: 0.024 }, scene);
            stick.position.set(gx, 0.032, 0.045);
            stick.material = steelMat;
            stick.parent = radioGroup;
        });

        const radioAnt = BABYLON.MeshBuilder.CreateCylinder("radioAnt", { diameter: 0.007, height: 0.12 }, scene);
        radioAnt.rotation.z = Math.PI / 2;
        radioAnt.position.set(0, 0.020, 0.10);
        radioAnt.material = polymerMat;
        radioAnt.parent = radioGroup;

        // 2. Gafas FPV (FPV Goggles) con diadema sobre la mesa
        const goggleGroup = new BABYLON.TransformNode("goggleGroup", scene);
        goggleGroup.parent = workbenchRoot;
        goggleGroup.position.set(-0.28, 0.028, 0.46);
        goggleGroup.rotation.y = -0.15;

        const goggleBody = BABYLON.MeshBuilder.CreateBox("goggleBody", { width: 0.14, height: 0.048, depth: 0.075 }, scene);
        const goggleMat = new BABYLON.PBRMaterial("goggleMat", scene);
        goggleMat.metallic = 0.2;
        goggleMat.roughness = 0.25;
        goggleMat.albedoColor = new BABYLON.Color3(0.92, 0.93, 0.95);
        goggleBody.material = goggleMat;
        goggleBody.parent = goggleGroup;

        [-0.045, 0.045].forEach((ax, ai) => {
            const antStem = BABYLON.MeshBuilder.CreateCylinder("gAntStem_" + ai, { diameter: 0.004, height: 0.045 }, scene);
            antStem.position.set(ax, 0.045, 0.015);
            antStem.material = polymerMat;
            antStem.parent = goggleGroup;

            const antCap = BABYLON.MeshBuilder.CreateSphere("gAntCap_" + ai, { diameter: 0.018 }, scene);
            antCap.position.set(ax, 0.068, 0.015);
            antCap.material = polymerMat;
            antCap.parent = goggleGroup;
        });

        const goggleStrap = BABYLON.MeshBuilder.CreateTorus("gStrap", { diameter: 0.13, thickness: 0.016, tessellation: 32 }, scene);
        goggleStrap.position.set(0, 0.005, -0.035);
        goggleStrap.scaling.z = 1.4;
        const strapMat = new BABYLON.StandardMaterial("strapMat", scene);
        strapMat.diffuseColor = new BABYLON.Color3(0.12, 0.15, 0.22);
        goggleStrap.material = strapMat;
        goggleStrap.parent = goggleGroup;

        // 3. Fondo de Taller de Modelismo (Pared, estantería y cajones de herramientas)
        const workshopBackdrop = new BABYLON.TransformNode("workshopBackdrop", scene);
        workshopBackdrop.parent = workbenchRoot;
        workshopBackdrop.position.set(0, 0.5, 1.35);

        const backWall = BABYLON.MeshBuilder.CreatePlane("backWall", { width: 3.4, height: 1.8 }, scene);
        const wallMat = new BABYLON.PBRMaterial("wallMat", scene);
        wallMat.metallic = 0.05;
        wallMat.roughness = 0.85;
        wallMat.albedoColor = new BABYLON.Color3(0.16, 0.18, 0.24);
        backWall.material = wallMat;
        backWall.parent = workshopBackdrop;

        const shelf = BABYLON.MeshBuilder.CreateBox("shelf", { width: 2.4, height: 0.025, depth: 0.22 }, scene);
        shelf.position.set(0, 0.22, -0.10);
        shelf.material = steelMat;
        shelf.parent = workshopBackdrop;
        backWall.freezeWorldMatrix();
        shelf.freezeWorldMatrix();

        for (let bx = -1.0; bx <= 1.0; bx += 0.22) {
            const bin = BABYLON.MeshBuilder.CreateBox("bin_" + bx.toFixed(1), { width: 0.18, height: 0.09, depth: 0.15 }, scene);
            bin.position.set(bx, 0.28, -0.10);
            const binMat = new BABYLON.StandardMaterial("binMat_" + bx, scene);
            binMat.diffuseColor = (Math.sin(bx * 4) > 0) ? new BABYLON.Color3(0.8, 0.15, 0.15) : new BABYLON.Color3(0.15, 0.45, 0.85);
            bin.material = binMat;
            bin.parent = workshopBackdrop;
            bin.freezeWorldMatrix();
        }

        // Bandejas organizadoras metálicas cepilladas
        function makeTray(x: number, z: number, w: number, d: number) {
            const tray = BABYLON.MeshBuilder.CreateBox("tray", { width: w, height: 0.016, depth: d }, scene);
            tray.position.set(x, 0.008, z);
            tray.parent = workbenchRoot;
            tray.material = steelMat;
            return tray;
        }
        makeTray(-0.95, -0.32, 0.40, 0.32);
        makeTray(-0.95, 0.32, 0.40, 0.32);
        makeTray(0.95, -0.32, 0.40, 0.32);
        makeTray(0.95, 0.32, 0.40, 0.32);

        // Congelar matrices de todos los objetos estáticos del banco para máximo rendimiento (60 FPS)
        workbenchRoot.getChildMeshes().forEach((m: any) => m.freezeWorldMatrix());

        // ================= PODIO / PEANA DE EXHIBICIÓN EN ESTUDIO =================
        // Peana circular compacta de grafito mate que enmarca a escala perfecta cada pieza
        const showroomPedestal = BABYLON.MeshBuilder.CreateCylinder("showroomPedestal", { diameter: 0.46, height: 0.014, tessellation: 64 }, scene);
        showroomPedestal.position.set(0, 0.007, 0.02);
        const pedestalMat = new BABYLON.PBRMaterial("pedestalMat", scene);
        pedestalMat.metallic = 0.65;
        pedestalMat.roughness = 0.35;
        pedestalMat.albedoColor = new BABYLON.Color3(0.12, 0.14, 0.18); // Titanio/grafito oscuro sereno
        showroomPedestal.material = pedestalMat;
        showroomPedestal.receiveShadows = true;
        showroomPedestal.setEnabled(false);
        showroomPedestal.isVisible = false;

        // Anillo biselado luminoso que delimita con elegancia el borde de la plataforma
        const pedestalRing = BABYLON.MeshBuilder.CreateTorus("pedestalRing", { diameter: 0.46, thickness: 0.005, tessellation: 64 }, scene);
        pedestalRing.position.set(0, 0.014, 0.02);
        const ringMat = new BABYLON.StandardMaterial("ringMat", scene);
        ringMat.emissiveColor = new BABYLON.Color3(0.0, 0.75, 0.95);
        ringMat.diffuseColor = new BABYLON.Color3(0.0, 0.5, 0.8);
        pedestalRing.material = ringMat;
        pedestalRing.setEnabled(false);
        pedestalRing.isVisible = false;

        // ================= OBJETIVO HOLOGRÁFICO DE ENSAMBLAJE 3D (SNAP TARGET) =================
        const snapTargetRoot = new BABYLON.TransformNode("snapTargetRoot", scene);
        snapTargetRoot.position.set(0, 0.012, 0.02);

        const snapRing = BABYLON.MeshBuilder.CreateTorus("snapRing", { diameter: 0.38, thickness: 0.007, tessellation: 48 }, scene);
        snapRing.parent = snapTargetRoot;
        const snapRingMat = new BABYLON.StandardMaterial("snapRingMat", scene);
        snapRingMat.emissiveColor = new BABYLON.Color3(0.0, 0.85, 1.0);
        snapRingMat.diffuseColor = new BABYLON.Color3(0.0, 0.5, 0.8);
        snapRing.material = snapRingMat;
        snapRing.isVisible = false;

        const snapDisc = BABYLON.MeshBuilder.CreateDisc("snapDisc", { radius: 0.19, tessellation: 36 }, scene);
        snapDisc.rotation.x = Math.PI / 2;
        snapDisc.parent = snapTargetRoot;
        const snapDiscMat = new BABYLON.StandardMaterial("snapDiscMat", scene);
        snapDiscMat.emissiveColor = new BABYLON.Color3(0.0, 0.6, 1.0);
        snapDiscMat.diffuseColor = new BABYLON.Color3(0.0, 0.2, 0.5);
        snapDiscMat.alpha = 0.25;
        snapDisc.material = snapDiscMat;
        snapDisc.isVisible = false;

        // ================= INTERFAZ DE USUARIO PRINCIPAL (GUI) =================
        const ui = GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

        let topNavRibbon: GUI.Rectangle | null = null;
        let btnFullScreen: GUI.Rectangle | null = null;
        let telemetryCard: GUI.Rectangle | null = null;
        let frameDrawer: GUI.Rectangle | null = null;
        let bottomBar: GUI.Rectangle | null = null;
        let partsDrawer: GUI.Rectangle | null = null;
        let workbenchDossier: GUI.Rectangle | null = null;
        let buildPartsDrawerCards = () => {};
        let updatePartsDrawer = () => {};
        let showWorkbenchDossier = (p: any) => {};

        function setWorkshopUIVisibility(visible: boolean) {
            if (topNavRibbon) topNavRibbon.isVisible = visible;
            if (btnFullScreen) btnFullScreen.isVisible = visible;
            if (telemetryCard) telemetryCard.isVisible = visible;
            if (frameDrawer) frameDrawer.isVisible = visible;
            if (bottomBar) bottomBar.isVisible = visible;
            if (partsDrawer) partsDrawer.isVisible = visible;
            if (!visible && workbenchDossier) workbenchDossier.isVisible = false;
        }

        // ================= MODELADO PROCEDURAL DETALLADO DEL DRON =================
        const droneRoot = new BABYLON.TransformNode("droneRoot", scene);
        droneRoot.position.set(0, 0.045, 0.02);

        let activePrototypeId = "drl_racer"; // "drl_racer" | "zd550" | "tarot680" | "f450"
        let PARTS: any[] = [];
        let propNodes: BABYLON.TransformNode[] = [];
        let aeroSystemRoot: BABYLON.TransformNode | null = null;
        let isAeroVisible = false; // Desactivado por defecto en banco para ahorrar 15+ FPS (activable con botón o en vuelo)
        let thrustVectorMeshes: { shaft: BABYLON.Mesh; tip: BABYLON.Mesh; label: GUI.Rectangle; baseHeight: number }[] = [];
        let downwashVortices: BABYLON.LinesMesh[] = [];
        let navLeds: { mesh: BABYLON.Mesh; type: "green" | "red" | "strobe" }[] = [];

        let isFlightMode = false;
        let isLanding = false;
        let flightTargetY = 0.85;
        let propSpinSpeed = 0;
        let keyState: { [key: string]: boolean } = {};
        let flightStartTime = 0;

        function registerShadowCasters(node: BABYLON.TransformNode) {
            if (!shadowGenerator) return;
            node.getChildMeshes().forEach((m: any) => {
                shadowGenerator.addShadowCaster(m, true);
                m.receiveShadows = true;
            });
        }

        function buildDroneComponents(protoType: string) {
            // Limpiar partes anteriores y componentes de telemetría previa
            droneRoot.getChildren().forEach((c: any) => c.dispose());
            PARTS = [];
            propNodes = [];
            navLeds = [];
            thrustVectorMeshes.forEach(tv => tv.label.dispose());
            thrustVectorMeshes = [];
            downwashVortices = [];

            const isRacer = (protoType === "drl_racer");
            const isHexa = (protoType === "tarot680");
            const armCount = isHexa ? 6 : 4;
            const armRadius = isRacer ? 0.165 : (isHexa ? 0.34 : 0.275);
            droneRoot.position.set(0, isRacer ? 0.045 : (isHexa ? 0.235 : 0.225), 0.02);

            // --- 1. Chasis Inferior + PDB ---
            const bottomGroup = new BABYLON.TransformNode("bottomGroup", scene);
            bottomGroup.parent = droneRoot;

            if (isRacer) {
                // Chasis unibody True-X 220mm de carbono 3K mate con biselado CNC
                const baseArm1 = BABYLON.MeshBuilder.CreateBox("baseArm1", { width: 0.32, height: 0.004, depth: 0.036 }, scene);
                baseArm1.rotation.y = Math.PI / 4;
                baseArm1.material = carbonMat;
                baseArm1.parent = bottomGroup;

                const baseArm2 = BABYLON.MeshBuilder.CreateBox("baseArm2", { width: 0.32, height: 0.004, depth: 0.036 }, scene);
                baseArm2.rotation.y = -Math.PI / 4;
                baseArm2.material = carbonMat;
                baseArm2.parent = bottomGroup;

                const centerPlate = BABYLON.MeshBuilder.CreateCylinder("centerPlate", { diameter: 0.13, height: 0.004, tessellation: 16 }, scene);
                centerPlate.material = carbonMat;
                centerPlate.parent = bottomGroup;

                const pcbPwr = BABYLON.MeshBuilder.CreateCylinder("pcbPwr", { diameter: 0.085, height: 0.002, tessellation: 16 }, scene);
                pcbPwr.position.y = 0.003;
                const pcbPwrMat = new BABYLON.PBRMaterial("pcbPwrMat", scene);
                pcbPwrMat.metallic = 0.2;
                pcbPwrMat.albedoColor = new BABYLON.Color3(0.06, 0.35, 0.14);
                pcbPwr.material = pcbPwrMat;
                pcbPwr.parent = bottomGroup;
            } else {
                const plateC = BABYLON.MeshBuilder.CreateCylinder("plateC", { diameter: isHexa ? 0.28 : 0.24, height: 0.003, tessellation: isHexa ? 12 : 8 }, scene);
                plateC.material = carbonMat;
                plateC.parent = bottomGroup;

                const pcbLayer = BABYLON.MeshBuilder.CreateCylinder("pcbLayer", { diameter: isHexa ? 0.24 : 0.20, height: 0.0015, tessellation: isHexa ? 12 : 8 }, scene);
                pcbLayer.position.y = 0.002;
                const pcbMat = new BABYLON.PBRMaterial("pcbMat", scene);
                pcbMat.metallic = 0.3;
                pcbMat.roughness = 0.4;
                pcbMat.albedoColor = new BABYLON.Color3(0.08, 0.42, 0.18);
                pcbLayer.material = pcbMat;
                pcbLayer.parent = bottomGroup;

                for (let b = 0; b < armCount; b++) {
                    const ang0 = (b * Math.PI * 2) / armCount;
                    const clamp = BABYLON.MeshBuilder.CreateBox("clamp_" + b, { width: 0.038, height: 0.016, depth: 0.028 }, scene);
                    clamp.position.set(Math.cos(ang0) * 0.085, 0.009, Math.sin(ang0) * 0.085);
                    clamp.rotation.y = -ang0 + Math.PI / 2;
                    clamp.material = redCncMat;
                    clamp.parent = bottomGroup;

                    [-0.012, 0.012].forEach((sx, si) => {
                        const bolt = BABYLON.MeshBuilder.CreateCylinder("bolt_" + b + "_" + si, { diameter: 0.0055, height: 0.004 }, scene);
                        bolt.position.set(clamp.position.x + sx * 0.5, 0.018, clamp.position.z);
                        bolt.material = steelMat;
                        bolt.parent = bottomGroup;
                    });
                }
            }

            PARTS.push({
                id: 1,
                key: "chasis_inf",
                category: "ESTRUCTURA Y DISTRIBUCIÓN ELÉCTRICA",
                shortTag: isRacer ? "📐 CHASIS RACER4 3K" : "📐 CHASIS INF. + PDB",
                name: isRacer ? "Chasis Monocasco DRL Racer4 de Competición en Carbono 3K" : (isHexa ? "Chasis Central Tarot 680 Hexa + PDB 250A" : "Placa Inferior ZD550 3K + PDB 160A"),
                material: "Fibra de Carbono 3K (4.0mm Biselado) + PDB Integrada de Cobre Pesado 2oz",
                specs: isRacer ? { geometria: "True-X 220mm", espesor: "4.0mm Unibody Carbono 3K", peso: "142g", tornilleria: "Titanio Grado 5 Torx M3" } : { peso: "285g", corrienteMax: "160A", rigidez: "Torsión > 12 Nm/°", tornilleria: "16x Tornillos M3x8mm Titanio Grado 5" },
                desc: isRacer ? "Placa portante ultraligera monocasco con bajo centro de masa para carreras FPV de alta velocidad." : "Placa portante estructural que canaliza la distribución de alta potencia y sujeta los brazos.",
                errorReal: "Si el carbono carece de rigidez o tiene delaminación, las vibraciones de alta frecuencia saturarán el filtro notch del giroscopio, provocando sobrecalentamiento destructivo de los motores.",
                group: bottomGroup,
                benchPos: new BABYLON.Vector3(-0.95, 0.025, -0.32),
                assembledPos: new BABYLON.Vector3(0, 0, 0),
                inspectPos: new BABYLON.Vector3(-0.15, 0.25, -0.20),
                isAssembled: false
            });

            // --- 2. Brazos tubulares + Variadores ESC ---
            const armGroup = new BABYLON.TransformNode("armGroup", scene);
            armGroup.parent = droneRoot;

            for (let b = 0; b < armCount; b++) {
                const ang = (b * Math.PI * 2) / armCount;
                const aNode = new BABYLON.TransformNode("armNode_" + b, scene);
                aNode.parent = armGroup;

                if (isRacer) {
                    const armStrut = BABYLON.MeshBuilder.CreateBox("armStrut_" + b, { width: 0.14, height: 0.010, depth: 0.024 }, scene);
                    armStrut.position.x = 0.085;
                    armStrut.material = carbonMat;
                    armStrut.parent = aNode;

                    // Micro-matriz de LEDs blancos puntuales en cada brazo (como en la foto de referencia DRL)
                    for (let ld = 0; ld < 6; ld++) {
                        const dot = BABYLON.MeshBuilder.CreateSphere("ledDot_" + b + "_" + ld, { diameter: 0.005 }, scene);
                        dot.position.set(0.038 + ld * 0.018, 0.006, 0);
                        dot.material = ledDotMat;
                        dot.parent = aNode;
                    }

                    const motorPlate = BABYLON.MeshBuilder.CreateCylinder("mPlate_" + b, { diameter: 0.036, height: 0.005 }, scene);
                    motorPlate.position.set(armRadius, 0.002, 0);
                    motorPlate.material = carbonMat;
                    motorPlate.parent = aNode;
                } else {
                    const tube = BABYLON.MeshBuilder.CreateCylinder("armTube_" + b, { height: isHexa ? 0.28 : 0.22, diameter: 0.02, tessellation: 20 }, scene);
                    tube.rotation.z = Math.PI / 2;
                    tube.position.x = isHexa ? 0.14 : 0.11;
                    tube.material = carbonMat;
                    tube.parent = aNode;

                    const mount = BABYLON.MeshBuilder.CreateCylinder("mount_" + b, { diameter: 0.055, height: 0.008, tessellation: 20 }, scene);
                    mount.position.set(isHexa ? 0.28 : 0.22, 0.005, 0);
                    mount.material = redCncMat;
                    mount.parent = aNode;

                    // Variador ESC 40A con cables de silicona
                    const esc = BABYLON.MeshBuilder.CreateBox("esc_" + b, { width: 0.055, height: 0.012, depth: 0.026 }, scene);
                    esc.position.set(0.12, -0.014, 0);
                    esc.material = steelMat;
                    esc.parent = aNode;
                }

                aNode.rotation.y = ang;
            }

            PARTS.push({
                id: 2,
                key: "brazos_esc",
                category: "PROPULSIÓN Y VARIADORES DE VELOCIDAD",
                shortTag: isRacer ? "🥢 4 BRAZOS + LEDS BLANCOS" : `🥢 ${armCount} BRAZOS + ESCs 40A`,
                name: isRacer ? "4 Brazos Rígidos Monocasco con Micro-Matriz de LEDs de Carrera + ESCs 55A" : `${armCount} Brazos Tubulares Ø20mm + Variadores ESC BLHeli_32`,
                material: "Fibra de Carbono Mate 3K Tejido Twill + Difusores LED Acrílicos",
                specs: isRacer ? { esc: "55A 4-in-1 DShot1200 BLHeli_32", leds: "24x LEDs Blancos DRL de Alta Luminosidad", frecuencia: "48 kHz PWM", peso: "98g" } : { tubos: `${armCount}x Ø20mm x 220mm`, esc: "40A Continuo / 55A Pico (3-6S DShot1200)", frecuencia: "48 kHz PWM", peso: `${armCount * 45}g` },
                desc: isRacer ? "Brazos perfilados de competición con iluminación perimetral para seguimiento visual a 120 km/h." : "Alojan el cableado interno y los ESC con disipador de aluminio y protocolo digital DShot.",
                errorReal: "Si los ESCs pierden sincronización (desync) a pleno gas, el dron sufrirá un bloqueo de motor instantáneo en el aire.",
                group: armGroup,
                benchPos: new BABYLON.Vector3(0.95, 0.025, -0.32),
                assembledPos: new BABYLON.Vector3(0, 0, 0),
                inspectPos: new BABYLON.Vector3(0.15, 0.25, -0.20),
                isAssembled: false
            });

            // --- 3. Motores Brushless ---
            const motorGroup = new BABYLON.TransformNode("motorGroup", scene);
            motorGroup.parent = droneRoot;

            for (let b = 0; b < armCount; b++) {
                const ang = (b * Math.PI * 2) / armCount;
                const mNode = new BABYLON.TransformNode("mNode_" + b, scene);
                mNode.parent = motorGroup;
                mNode.position.set(Math.cos(ang) * armRadius, 0.014, Math.sin(ang) * armRadius);

                const baseDia = isRacer ? 0.032 : 0.05;
                const base = BABYLON.MeshBuilder.CreateCylinder("base_" + b, { diameter: baseDia, height: 0.005 }, scene);
                base.material = steelMat;
                base.parent = mNode;

                // Bobinas de cobre
                const coilCount = isRacer ? 12 : 12;
                for (let c = 0; c < coilCount; c++) {
                    const ca = (c * Math.PI * 2) / coilCount;
                    const coil = BABYLON.MeshBuilder.CreateCylinder("coil_" + b + "_" + c, { diameter: isRacer ? 0.006 : 0.009, height: isRacer ? 0.010 : 0.014 }, scene);
                    coil.position.set(Math.cos(ca) * (baseDia * 0.35), 0.006, Math.sin(ca) * (baseDia * 0.35));
                    coil.material = copperMat;
                    coil.parent = mNode;
                }

                // Campana de motor con ranuras de ventilación
                const bellDia = isRacer ? 0.034 : 0.052;
                const bell = BABYLON.MeshBuilder.CreateCylinder("bell_" + b, { diameter: bellDia, height: isRacer ? 0.014 : 0.019 }, scene);
                bell.position.y = 0.012;
                bell.material = isRacer ? steelMat : redCncMat;
                bell.parent = mNode;

                const shaft = BABYLON.MeshBuilder.CreateCylinder("shaft_" + b, { diameter: 0.005, height: 0.024 }, scene);
                shaft.position.y = 0.022;
                shaft.material = steelMat;
                shaft.parent = mNode;
            }

            PARTS.push({
                id: 3,
                key: "motores",
                category: "PLANTA MOTRIZ ELECTROMAGNÉTICA",
                shortTag: isRacer ? "⚙️ MOTORES 2207 1950KV" : `⚙️ ${armCount} MOTORES 5010 750KV`,
                name: isRacer ? "4 Motores Brushless DRL Racing 2207 1950KV (7566g Empuje Total)" : `${armCount} Motores Brushless Outrunner 5010 750KV Grado Industrial`,
                material: "Cuerpo Aluminio 7075-T6 + 14 Imanes Neodimio N52H + Hilo Cobre OFC",
                specs: isRacer ? { kv: "1950 RPM/V", empujeTotal: "7566g Pico (1890g/motor)", potenciaMax: "720W por motor", velocidadRotacion: "17,794 RPM @ 6S" } : { kv: "750 RPM/V", potencia: "550W / motor", empujeMax: `${armCount * 1250}g total`, corrientePico: "35A por motor", rodamientos: "Japoneses NMB" },
                desc: isRacer ? "Motores de competición FPV optimizados para respuesta explosiva de aceleración y 120+ km/h de velocidad punta." : "Produce tracción constante. Imanes curvos para mínimo cogging y máxima eficiencia g/W.",
                errorReal: "Si un rodamiento sufre holgura por impacto, provocará desbalanceo dinámico que descalibrará el filtro giroscópico a 17,000 RPM.",
                group: motorGroup,
                benchPos: new BABYLON.Vector3(-0.95, 0.025, 0.32),
                assembledPos: new BABYLON.Vector3(0, 0, 0),
                inspectPos: new BABYLON.Vector3(-0.15, 0.28, -0.15),
                isAssembled: false
            });

            // --- 4. Aviónica / Cámara FPV y Antenas ---
            const fcGroup = new BABYLON.TransformNode("fcGroup", scene);
            fcGroup.parent = droneRoot;

            if (isRacer) {
                // Cámara FPV inclinada a 35° hacia arriba en la nariz
                const camPod = BABYLON.MeshBuilder.CreateBox("camPod", { width: 0.034, height: 0.034, depth: 0.032 }, scene);
                camPod.position.set(0, 0.026, 0.088);
                camPod.rotation.x = -0.35;
                camPod.material = redCncMat;
                camPod.parent = fcGroup;

                const lens = BABYLON.MeshBuilder.CreateCylinder("fpvLens", { diameter: 0.020, height: 0.014 }, scene);
                lens.rotation.x = Math.PI / 2;
                lens.position.set(0, 0.026, 0.106);
                const lensMat = new BABYLON.PBRMaterial("lensMat", scene);
                lensMat.metallic = 0.95;
                lensMat.roughness = 0.05;
                lensMat.albedoColor = new BABYLON.Color3(0.04, 0.40, 0.90);
                lens.material = lensMat;
                lens.parent = fcGroup;

                // Doble antena FPV tipo Lollipop / Pagoda en la popa a 45° (como en la foto de referencia DRL)
                [-0.035, 0.035].forEach((ax, ai) => {
                    const antStem = BABYLON.MeshBuilder.CreateCylinder("fpvAntStem_" + ai, { diameter: 0.005, height: 0.085 }, scene);
                    antStem.position.set(ax, 0.052, -0.092);
                    antStem.rotation.x = -0.65;
                    antStem.material = polymerMat;
                    antStem.parent = fcGroup;

                    const antPuck = BABYLON.MeshBuilder.CreateCylinder("fpvAntPuck_" + ai, { diameter: 0.022, height: 0.014 }, scene);
                    antPuck.position.set(ax, 0.082, -0.122);
                    antPuck.rotation.x = -0.65;
                    antPuck.material = polymerMat;
                    antPuck.parent = fcGroup;
                });
            } else {
                const fcCase = BABYLON.MeshBuilder.CreateBox("fcCase", { width: 0.05, height: 0.016, depth: 0.082 }, scene);
                fcCase.position.set(0, 0.016, 0);
                fcCase.material = polymerMat;
                fcCase.parent = fcGroup;

                const mast = BABYLON.MeshBuilder.CreateCylinder("gpsMast", { diameter: 0.006, height: 0.14 }, scene);
                mast.position.set(0.045, 0.08, -0.045);
                mast.material = carbonMat;
                mast.parent = fcGroup;

                const gpsPuck = BABYLON.MeshBuilder.CreateCylinder("gpsPuck", { diameter: 0.048, height: 0.014 }, scene);
                gpsPuck.position.set(0.045, 0.15, -0.045);
                gpsPuck.material = polymerMat;
                gpsPuck.parent = fcGroup;
            }

            PARTS.push({
                id: 4,
                key: "pixhawk_gps",
                category: "AVIÓNICA Y CONTROL DE NAVEGACIÓN",
                shortTag: isRacer ? "📷 CÁMARA FPV + ANTENAS" : "🧠 PIXHAWK + GPS NEO-M8N",
                name: isRacer ? "Cámara FPV 1200TVL Inclinable 35° + Doble Antena Pagoda 5.8GHz" : "Autopiloto de Vuelo Pixhawk 2.4.8 + Mástil GPS/Brújula M8N",
                material: "Carcasa CNC 6061-T6 + Lente Gran Angular 1.8mm + Antenas Polarizadas RHCP",
                specs: isRacer ? { camara: "1200TVL 165° FOV Ultra WDR (0.0001 Lux)", vtx: "1000mW 5.8GHz 48CH SmartAudio", antenas: "2x Pagoda RHCP 2.5dBi Omnidireccional" } : { procesador: "STM32F427 32-bit Cortex M4 (168 MHz)", imu: "MPU6000 + L3GD20 + LSM303D", barometro: "MS5611 (10cm precisión)", puertos: "CAN, I2C, UART, Telemetría" },
                desc: isRacer ? "Sistema de transmisión de video de cero latencia para pilotaje inmersivo en primera persona." : "Cerebro de control autónomo con triple redundancia de sensores y posicionamiento satelital.",
                errorReal: "Si las antenas de video sufren sombraje por la batería de carbono, se producirá pérdida de video instantánea (estática) en maniobras rápidas.",
                group: fcGroup,
                benchPos: new BABYLON.Vector3(0.95, 0.025, 0.32),
                assembledPos: new BABYLON.Vector3(0, 0, 0),
                inspectPos: new BABYLON.Vector3(0.15, 0.28, -0.15),
                isAssembled: false
            });

            // --- 5. Canopia Aerodinámica Central DRL o Patines de Aterrizaje ---
            const structGroup = new BABYLON.TransformNode("structGroup", scene);
            structGroup.parent = droneRoot;

            if (isRacer) {
                // Canopia aerodinámica central estilo DRL Racer4 con forma de cuña
                const canopy = BABYLON.MeshBuilder.CreateBox("canopy", { width: 0.088, height: 0.038, depth: 0.155 }, scene);
                canopy.position.set(0, 0.034, 0);
                canopy.material = carbonMat;
                canopy.parent = structGroup;

                // Aleta dorsal de tiburón (Shark Fin) en la parte trasera de la canopia (exacta a la foto de referencia)
                const sharkFin = BABYLON.MeshBuilder.CreateCylinder("sharkFin", { diameterTop: 0.002, diameterBottom: 0.065, height: 0.052, tessellation: 3 }, scene);
                sharkFin.rotation.z = Math.PI / 2;
                sharkFin.rotation.x = Math.PI / 2;
                sharkFin.position.set(0, 0.068, -0.042);
                sharkFin.material = carbonMat;
                sharkFin.parent = structGroup;

                // Almohadillas protectoras bajo cada motor
                for (let b = 0; b < armCount; b++) {
                    const ang = (b * Math.PI * 2) / armCount;
                    const skid = BABYLON.MeshBuilder.CreateCylinder("skid_" + b, { diameter: 0.015, height: 0.012 }, scene);
                    skid.position.set(Math.cos(ang) * armRadius, -0.006, Math.sin(ang) * armRadius);
                    skid.material = polymerMat;
                    skid.parent = structGroup;
                }
            } else {
                const topPlate = BABYLON.MeshBuilder.CreateCylinder("topPlate", { diameter: isHexa ? 0.26 : 0.22, height: 0.002, tessellation: isHexa ? 12 : 8 }, scene);
                topPlate.position.set(0, 0.045, 0);
                topPlate.material = carbonMat;
                topPlate.parent = structGroup;

                [
                    { x: -0.095, z: 0.08 },
                    { x: -0.095, z: -0.08 },
                    { x: 0.095, z: 0.08 },
                    { x: 0.095, z: -0.08 }
                ].forEach((l, i) => {
                    const leg = BABYLON.MeshBuilder.CreateCylinder("leg_" + i, { diameter: 0.012, height: 0.22 }, scene);
                    leg.position.set(l.x, -0.105, l.z);
                    leg.rotation.z = l.x < 0 ? 0.32 : -0.32;
                    leg.material = carbonMat;
                    leg.parent = structGroup;

                    const tClamp = BABYLON.MeshBuilder.CreateBox("tclamp_" + i, { width: 0.02, height: 0.02, depth: 0.02 }, scene);
                    tClamp.position.set(l.x * 1.35, -0.21, l.z);
                    tClamp.material = redCncMat;
                    tClamp.parent = structGroup;
                });

                [-0.13, 0.13].forEach((sx, idx) => {
                    const skid = BABYLON.MeshBuilder.CreateCylinder("skid_" + idx, { diameter: 0.014, height: 0.36 }, scene);
                    skid.rotation.x = Math.PI / 2;
                    skid.position.set(sx, -0.21, 0);
                    skid.material = carbonMat;
                    skid.parent = structGroup;
                });
            }

            PARTS.push({
                id: 5,
                key: "chasis_sup",
                category: "ESTRUCTURA Y AERODINÁMICA SUPERIOR",
                shortTag: isRacer ? "🦾 CANOPY CENTRAL + ALETA" : "🦾 CHASIS SUP. + PATAS",
                name: isRacer ? "Canopía Aerodinámica DRL Racer4 con Aleta Dorsal de Tiburón" : "Placa Superior 3K + Tren de Aterrizaje Reforzado",
                material: "Placa Carbono 3K + Policarbonato Moldeado al Vacío",
                specs: isRacer ? { coeficienteArrastre: "Cx: 0.10 Ns/m", proteccion: "Carcasa Antivuelco (Turtle Mode)", peso: "46g" } : { despejeSuelo: "190mm para payload", peso: "195g", absorcion: "Espuma EPDM 55 Shore A", uniones: "Abrazaderas T en Aluminio 6061" },
                desc: isRacer ? "Carcasa aerodinámica envolvente que minimiza la resistencia al avance y permite autorrecuperarse en caso de vuelco." : "Protege la electrónica interna y proporciona 19cm de despeje para el tanque extintor.",
                errorReal: "Si la canopia o patas se rompen, el chasis absorberá todo el impacto directamente, destruyendo los componentes de control.",
                group: structGroup,
                benchPos: new BABYLON.Vector3(-0.95, 0.025, 0.32),
                assembledPos: new BABYLON.Vector3(0, 0, 0),
                inspectPos: new BABYLON.Vector3(0.0, 0.32, -0.18),
                isAssembled: false
            });

            // --- 6. Batería LiPo Principal ---
            const battGroup = new BABYLON.TransformNode("battGroup", scene);
            battGroup.parent = droneRoot;

            const battW = isRacer ? 0.040 : 0.052;
            const battH = isRacer ? 0.034 : 0.038;
            const battD = isRacer ? 0.082 : 0.145;
            const battY = isRacer ? -0.022 : 0.065;

            const batt = BABYLON.MeshBuilder.CreateBox("battery", { width: battW, height: battH, depth: battD }, scene);
            batt.position.set(0, battY, 0);
            batt.material = lipoMat;
            batt.parent = battGroup;

            const bLabel = BABYLON.MeshBuilder.CreateBox("bLabel", { width: battW + 0.001, height: battH * 0.8, depth: battD * 0.65 }, scene);
            bLabel.position.set(0, battY, 0);
            bLabel.material = lipoLabelMat;
            bLabel.parent = battGroup;

            // Conector XT60 con cables AWG12
            const xt60 = BABYLON.MeshBuilder.CreateBox("xt60", { width: 0.016, height: 0.010, depth: 0.016 }, scene);
            xt60.position.set(0, battY + 0.018, battD * 0.55);
            const xt60Mat = new BABYLON.PBRMaterial("xt60Mat", scene);
            xt60Mat.albedoColor = new BABYLON.Color3(0.95, 0.80, 0.05);
            xt60.material = xt60Mat;
            xt60.parent = battGroup;

            PARTS.push({
                id: 6,
                key: "bateria_pila",
                category: "ALMACENAMIENTO DE ENERGÍA Y POTENCIA",
                shortTag: isRacer ? "🔋 LIPO 6S GRAPHENE" : "🔋 BATERÍA (PILA) LiPo 3S",
                name: isRacer ? "Batería LiPo Graphene 6S 22.2V 1400mAh 150C XT60" : "Batería de Polímero de Litio (Pila Principal) 3S 5000mAh",
                material: isRacer ? "6 Celdas LiPo Grafeno en Serie + Cables Silicona 12AWG" : "3 Celdas LiCoO2 en Serie + Cables Silicona 12AWG + Conector XT60 Oro",
                specs: isRacer ? { voltaje: "22.2V Nominal (25.2V Máx)", capacidad: "1400 mAh (31 Wh)", descarga: "150C Continua (210A) / 300C Ráfaga", peso: "228g" } : { voltaje: "11.1V Nominal (12.6V Máx)", capacidad: "5000 mAh (55.5 Wh)", descarga: "35C Continua (175A) / 70C Ráfaga (350A)", peso: "420g" },
                desc: isRacer ? "Pila de competición con nanoplacas de grafeno capaz de entregar 200+ Amperios instantáneos sin caída de voltaje." : "Pila de alta descarga capaz de alimentar los motores a pleno régimen durante más de 18-22 minutos.",
                errorReal: "Si la batería sufre perforación o se descarga por debajo de 3.2V por celda, entrará en fuga térmica (Thermal Runaway) con riesgo de ignición violenta.",
                group: battGroup,
                benchPos: new BABYLON.Vector3(0.48, 0.025, 0.42),
                assembledPos: new BABYLON.Vector3(0, 0, 0),
                inspectPos: new BABYLON.Vector3(0.12, 0.28, -0.15),
                isAssembled: false
            });

            // --- 7. Transponder DRL o Tanque Extintor ---
            const payloadGroup = new BABYLON.TransformNode("payloadGroup", scene);
            payloadGroup.parent = droneRoot;

            if (isRacer) {
                // Transponder oficial DRL de cronometraje de carreras
                const transponder = BABYLON.MeshBuilder.CreateBox("transponder", { width: 0.038, height: 0.016, depth: 0.045 }, scene);
                transponder.position.set(0, -0.015, -0.03);
                transponder.material = redCncMat;
                transponder.parent = payloadGroup;

                const irLed = BABYLON.MeshBuilder.CreateSphere("irLed", { diameter: 0.009 }, scene);
                irLed.position.set(0, -0.024, -0.03);
                irLed.material = ledDotMat;
                irLed.parent = payloadGroup;
            } else {
                const tankVol = isHexa ? 0.24 : 0.19;
                const tank = BABYLON.MeshBuilder.CreateCylinder("tank", { diameter: 0.095, height: tankVol }, scene);
                tank.rotation.z = Math.PI / 2;
                tank.position.set(0, -0.075, 0);
                tank.material = tankMat;
                tank.parent = payloadGroup;

                [-0.06, 0.06].forEach((nz, idx) => {
                    const noz = BABYLON.MeshBuilder.CreateCylinder("noz_" + idx, { diameterTop: 0.008, diameterBottom: 0.015, height: 0.035 }, scene);
                    noz.position.set(0, -0.14, nz);
                    noz.material = brassMat;
                    noz.parent = payloadGroup;
                });
            }

            PARTS.push({
                id: 7,
                key: "tanque_extintor",
                category: isRacer ? "CRONOMETRAJE Y TELEMETRÍA" : "CARGA ÚTIL / PAYLOAD EXTINTOR",
                shortTag: isRacer ? "⏱️ TRANSPONDER DRL" : (isHexa ? "🧯 TANQUE EXTINTOR 2.0L" : "🧯 TANQUE EXTINTOR 1.2L"),
                name: isRacer ? "Transponder Oficial DRL Racing + Sensor IR de Vuelta Rápida" : (isHexa ? "Sistema Extintor Presurizado 2.0L AFFF" : "Tanque de Retardante Forestal 1.2L + Boquillas TeeJet"),
                material: isRacer ? "Aluminio Anodizado 6061-T6 + Diodo Emisor Infrarrojo 940nm" : "Aluminio 5052-H32 Epóxico + Válvula Solenoide 12V",
                specs: isRacer ? { precision: "Cronometraje a 1/1000 de segundo", peso: "14g", comunicacion: "Transmisión RF + IR Dual" } : { volumen: isHexa ? "2.0 Litros" : "1.2 Litros", presion: "4.0 Bar" },
                desc: isRacer ? "Registra el tiempo por vuelta y posición en carrera a través de las puertas de paso (gates) de la DRL." : "Dispersa cortina de espuma retardante química para supresión inmediata de líneas de fuego.",
                errorReal: "Si el transponder falla o se descalibra, los arcos de cronometraje no registrarán el paso del dron por el circuito.",
                group: payloadGroup,
                benchPos: new BABYLON.Vector3(-0.48, 0.025, -0.45),
                assembledPos: new BABYLON.Vector3(0, 0, 0),
                inspectPos: new BABYLON.Vector3(0.0, 0.25, -0.18),
                isAssembled: false
            });

            // --- 8. Hélices Aerodinámicas ---
            const propGroup = new BABYLON.TransformNode("propGroup", scene);
            propGroup.parent = droneRoot;

            for (let b = 0; b < armCount; b++) {
                const ang = (b * Math.PI * 2) / armCount;
                const pNode = new BABYLON.TransformNode("propNode_" + b, scene);
                pNode.parent = propGroup;
                pNode.position.set(Math.cos(ang) * armRadius, 0.044, Math.sin(ang) * armRadius);

                const isCw = (b % 2 === 0);

                if (isRacer) {
                    const hub = BABYLON.MeshBuilder.CreateCylinder("hub_" + b, { diameter: 0.018, height: 0.010 }, scene);
                    hub.material = steelMat;
                    hub.parent = pNode;

                    // 3 Palas a 120° en blanco puro (Hélices Tripala como en la foto de referencia DRL)
                    for (let p = 0; p < 3; p++) {
                        const bladeAng = (p * Math.PI * 2) / 3;
                        const bladeNode = new BABYLON.TransformNode("bNode_" + b + "_" + p, scene);
                        bladeNode.parent = pNode;
                        bladeNode.rotation.y = bladeAng;

                        const blade = BABYLON.MeshBuilder.CreateBox("blade_" + b + "_" + p, { width: 0.076, height: 0.0025, depth: 0.016 }, scene);
                        blade.position.x = 0.040;
                        blade.rotation.y = isCw ? -0.32 : 0.32;
                        blade.material = propWhiteMat;
                        blade.parent = bladeNode;
                    }

                    const nut = BABYLON.MeshBuilder.CreateCylinder("nut_" + b, { diameterTop: 0.004, diameterBottom: 0.014, height: 0.012 }, scene);
                    nut.position.y = 0.009;
                    nut.material = steelMat;
                    nut.parent = pNode;
                } else {
                    const tipMat = isCw ? propCwMat : propCcwMat;

                    const hub = BABYLON.MeshBuilder.CreateCylinder("hub_" + b, { diameter: 0.024, height: 0.014 }, scene);
                    hub.material = carbonMat;
                    hub.parent = pNode;

                    const blade1 = BABYLON.MeshBuilder.CreateBox("blade1_" + b, { width: 0.14, height: 0.003, depth: 0.024 }, scene);
                    blade1.position.x = 0.075;
                    blade1.rotation.y = isCw ? -0.25 : 0.25;
                    blade1.material = carbonMat;
                    blade1.parent = pNode;

                    const tip1 = BABYLON.MeshBuilder.CreateBox("tip1_" + b, { width: 0.035, height: 0.0035, depth: 0.02 }, scene);
                    tip1.position.x = 0.13;
                    tip1.rotation.y = isCw ? -0.25 : 0.25;
                    tip1.material = tipMat;
                    tip1.parent = pNode;

                    const blade2 = BABYLON.MeshBuilder.CreateBox("blade2_" + b, { width: 0.14, height: 0.003, depth: 0.024 }, scene);
                    blade2.position.x = -0.075;
                    blade2.rotation.y = isCw ? -0.25 : 0.25;
                    blade2.material = carbonMat;
                    blade2.parent = pNode;

                    const tip2 = BABYLON.MeshBuilder.CreateBox("tip2_" + b, { width: 0.035, height: 0.0035, depth: 0.02 }, scene);
                    tip2.position.x = -0.13;
                    tip2.rotation.y = isCw ? -0.25 : 0.25;
                    tip2.material = tipMat;
                    tip2.parent = pNode;

                    const nut = BABYLON.MeshBuilder.CreateCylinder("nut_" + b, { diameterTop: 0.003, diameterBottom: 0.018, height: 0.02 }, scene);
                    nut.position.y = 0.012;
                    nut.material = redCncMat;
                    nut.parent = pNode;
                }

                propNodes.push(pNode);
            }

            PARTS.push({
                id: 8,
                key: "helices",
                category: "AERODINÁMICA Y PROPULSIÓN",
                shortTag: isRacer ? "🌀 4 HÉLICES TRIPALA BLANCAS" : `🌀 ${armCount} HÉLICES 12x4.5"`,
                name: isRacer ? "Juego de 4 Hélices Tripala 5x4.3x3 Competición (Blanco Policarbonato)" : `Juego de ${armCount} Hélices 12x4.5" CW (Naranja) y CCW (Azul)`,
                material: isRacer ? "Policarbonato de Alto Impacto HQProp V1S" : "Fibra de Carbono Compuesta Reforzada + Tuercas Bala M6 Al 7075",
                specs: isRacer ? { palas: "3 Palas por Hélice (Tripala)", paso: '5" x 4.3" Geometría Agresiva', traccion: "1890g / motor (7566g Total)", peso: "4.2g por hélice" } : { pasoDiametro: '12" de Diámetro x 4.5" de Paso', traccionNominal: "1150g @ 6500 RPM", perfil: "Clark-Y Aerodinámico" },
                desc: isRacer ? "Hélices tripala de competición con respuesta inmediata al acelerador y máxima tracción en virajes." : "Giro alternado (horario y antihorario) para cancelar el torque reactivo en vuelo.",
                errorReal: "Si se invierte el sentido de giro de una hélice (poner CW en lugar de CCW), ese motor empujará hacia el suelo en vez de hacia arriba, provocando un volteo catastrófico inmediato al despegar ('Flip of Death').",
                group: propGroup,
                benchPos: new BABYLON.Vector3(0.48, 0.025, -0.45),
                assembledPos: new BABYLON.Vector3(0, 0, 0),
                inspectPos: new BABYLON.Vector3(0.0, 0.28, -0.15),
                isAssembled: false
            });

            // --- 9. Luces de Navegación Aeronáutica FAA (nodo independiente para no aparecer al aislar el tren) ---
            navLeds = [];
            const navLedsGroup = new BABYLON.TransformNode("navLedsGroup", scene);
            navLedsGroup.parent = droneRoot;

            // LED Verde (Estribor / Starboard) en brazo delantero derecho (b = 0)
            const ledGreen = BABYLON.MeshBuilder.CreateSphere("ledGreen", { diameter: 0.016 }, scene);
            ledGreen.position.set(Math.cos(0) * (armRadius + 0.025), 0.025, Math.sin(0) * (armRadius + 0.025));
            ledGreen.material = ledGreenMat;
            ledGreen.parent = navLedsGroup;
            navLeds.push({ mesh: ledGreen, type: "green" });

            // LED Rojo (Babor / Port) en brazo delantero izquierdo
            const angRed = isHexa ? (Math.PI * 2 / 3) : (Math.PI / 2);
            const ledRed = BABYLON.MeshBuilder.CreateSphere("ledRed", { diameter: 0.016 }, scene);
            ledRed.position.set(Math.cos(angRed) * (armRadius + 0.025), 0.025, Math.sin(angRed) * (armRadius + 0.025));
            ledRed.material = ledRedMat;
            ledRed.parent = navLedsGroup;
            navLeds.push({ mesh: ledRed, type: "red" });

            // LED Blanco Strobe de Alta Intensidad (Popa / Tren de aterrizaje trasero)
            const ledStrobe = BABYLON.MeshBuilder.CreateSphere("ledStrobe", { diameter: 0.020 }, scene);
            ledStrobe.position.set(0, -0.19, -0.16);
            ledStrobe.material = ledStrobeWhiteMat;
            ledStrobe.parent = navLedsGroup;
            navLeds.push({ mesh: ledStrobe, type: "strobe" });

            // Construir sistema de Vectores Aerodinámicos & Envolvente Espacial (Referencia Tierra)
            buildAeroVisualizationSystem(armCount, armRadius);

            // Registrar proyectores de sombras suaves
            [bottomGroup, armGroup, motorGroup, fcGroup, structGroup, battGroup, payloadGroup, propGroup].forEach(registerShadowCasters);

            // Recrear etiquetas y comenzar 100% ARMADO en el centro del banco de trabajo
            create3DLabels();
            PARTS.forEach(p => {
                p.group.position.copyFrom(p.assembledPos);
                p.group.rotation.set(0, 0, 0);
                p.isAssembled = true;
            });
            hl.removeAllMeshes();
            updateLabelsVisibility();
            updateHUD();
            buildPartsDrawerCards();
            updatePartsDrawer();
        }

        // ================= SISTEMA DE VECTORES AERODINÁMICOS Y ENVOLVENTE ESPACIAL =================
        function buildAeroVisualizationSystem(armCount: number, armRadius: number) {
            if (aeroSystemRoot) {
                aeroSystemRoot.dispose();
                aeroSystemRoot = null;
            }
            thrustVectorMeshes = [];
            downwashVortices = [];

            aeroSystemRoot = new BABYLON.TransformNode("aeroSystemRoot", scene);
            aeroSystemRoot.parent = droneRoot;

            // --- 1. Centro de Gravedad (CoG) 3D Gimbal y Ejes Cartesianos ---
            const cogRoot = new BABYLON.TransformNode("cogRoot", scene);
            cogRoot.parent = aeroSystemRoot;
            cogRoot.position.set(0, 0.015, 0);

            // Esfera central de masa CoG
            const cogCore = BABYLON.MeshBuilder.CreateSphere("cogCore", { diameter: 0.024, segments: 16 }, scene);
            cogCore.material = aeroVectorMat;
            cogCore.parent = cogRoot;

            // Ejes X, Y, Z con líneas luminosas
            const axisLength = 0.16;
            // Eje X (Alabeo / Roll - Rojo)
            const axisXLines = BABYLON.MeshBuilder.CreateLines("axisXLines", {
                points: [new BABYLON.Vector3(-axisLength, 0, 0), new BABYLON.Vector3(axisLength, 0, 0)]
            }, scene);
            axisXLines.color = new BABYLON.Color3(1.0, 0.2, 0.2);
            axisXLines.parent = cogRoot;

            // Eje Y (Guiñada / Yaw - Verde)
            const axisYLines = BABYLON.MeshBuilder.CreateLines("axisYLines", {
                points: [new BABYLON.Vector3(0, -0.08, 0), new BABYLON.Vector3(0, axisLength, 0)]
            }, scene);
            axisYLines.color = new BABYLON.Color3(0.2, 1.0, 0.3);
            axisYLines.parent = cogRoot;

            // Eje Z (Cabeceo / Pitch - Azul)
            const axisZLines = BABYLON.MeshBuilder.CreateLines("axisZLines", {
                points: [new BABYLON.Vector3(0, 0, -axisLength), new BABYLON.Vector3(0, 0, axisLength)]
            }, scene);
            axisZLines.color = new BABYLON.Color3(0.2, 0.5, 1.0);
            axisZLines.parent = cogRoot;

            // Anillos dobles de orientación inercial (Gimbal rings)
            const ringPoints1: BABYLON.Vector3[] = [];
            const ringPoints2: BABYLON.Vector3[] = [];
            for (let i = 0; i <= 48; i++) {
                const theta = (i / 48) * Math.PI * 2;
                ringPoints1.push(new BABYLON.Vector3(Math.cos(theta) * 0.085, 0, Math.sin(theta) * 0.085));
                ringPoints2.push(new BABYLON.Vector3(Math.cos(theta) * 0.065, Math.sin(theta) * 0.065, 0));
            }
            const cogRing1 = BABYLON.MeshBuilder.CreateDashedLines("cogRing1", { points: ringPoints1, dashSize: 3, gapSize: 2 }, scene);
            cogRing1.color = new BABYLON.Color3(0.0, 0.85, 1.0);
            cogRing1.parent = cogRoot;

            const cogRing2 = BABYLON.MeshBuilder.CreateDashedLines("cogRing2", { points: ringPoints2, dashSize: 3, gapSize: 2 }, scene);
            cogRing2.color = new BABYLON.Color3(0.0, 0.85, 1.0);
            cogRing2.parent = cogRoot;

            // --- 2. Vectores de Empuje Vertical & Streamlines de Downwash ---
            const isHexa = (activePrototypeId === "tarot680");
            for (let b = 0; b < armCount; b++) {
                const ang = (b * Math.PI * 2) / armCount;
                const px = Math.cos(ang) * armRadius;
                const pz = Math.sin(ang) * armRadius;

                // Vector vertical de empuje hacia arriba (Cilindro luminoso + Cono)
                const vNode = new BABYLON.TransformNode("thrustNode_" + b, scene);
                vNode.position.set(px, 0.05, pz);
                vNode.parent = aeroSystemRoot;

                const shaft = BABYLON.MeshBuilder.CreateCylinder("thrustShaft_" + b, { diameter: 0.005, height: 0.14 }, scene);
                shaft.position.y = 0.07;
                shaft.material = aeroVectorMat;
                shaft.parent = vNode;

                const tip = BABYLON.MeshBuilder.CreateCylinder("thrustTip_" + b, { diameterTop: 0.0, diameterBottom: 0.022, height: 0.035 }, scene);
                tip.position.y = 0.155;
                tip.material = aeroVectorMat;
                tip.parent = vNode;

                // Etiqueta flotante con el empuje en Newtons
                const thrustLabelAnchor = new BABYLON.TransformNode("thrustLabelAnchor_" + b, scene);
                thrustLabelAnchor.parent = vNode;
                thrustLabelAnchor.position.y = 0.19;

                const tRect = new GUI.Rectangle("thrustTag_" + b);
                tRect.width = "82px";
                tRect.height = "22px";
                tRect.cornerRadius = 4;
                tRect.thickness = 1;
                tRect.color = "#00e5ff";
                tRect.background = "rgba(4, 14, 30, 0.88)";
                tRect.isHitTestVisible = false;

                const tTxt = new GUI.TextBlock();
                const newtonsBase = isHexa ? "12.3 N" : "11.2 N";
                tTxt.text = `↑ ${newtonsBase}`;
                tTxt.color = "#00e5ff";
                tTxt.fontSize = 10;
                tTxt.fontStyle = "bold";
                tRect.addControl(tTxt);

                ui.addControl(tRect);
                tRect.linkWithMesh(thrustLabelAnchor);
                thrustVectorMeshes.push({ shaft, tip, label: tRect, baseHeight: 0.14 });

                // Vórtices de flujo helicoidales (Downwash Streamlines)
                const vortexGroup = new BABYLON.TransformNode("vortexGroup_" + b, scene);
                vortexGroup.position.set(px, 0.04, pz);
                vortexGroup.parent = aeroSystemRoot;

                for (let v = 0; v < 3; v++) {
                    const startAngle = (v * Math.PI * 2) / 3;
                    const spiralPoints: BABYLON.Vector3[] = [];
                    const steps = 36;
                    for (let s = 0; s <= steps; s++) {
                        const ratio = s / steps;
                        const y = -ratio * 0.38; // desciende 38cm hacia el suelo
                        const r = (0.13 * (1.0 - ratio * 0.28));
                        const theta = startAngle + (ratio * Math.PI * 4.5);
                        spiralPoints.push(new BABYLON.Vector3(Math.cos(theta) * r, y, Math.sin(theta) * r));
                    }
                    const vortexLine = BABYLON.MeshBuilder.CreateLines("vortex_" + b + "_" + v, { points: spiralPoints }, scene);
                    vortexLine.color = new BABYLON.Color3(0.0, 0.75, 1.0);
                    vortexLine.alpha = 0.65;
                    vortexLine.parent = vortexGroup;
                    downwashVortices.push(vortexLine);
                }
            }

            // --- 3. Jaula Bounding Box Holográfica y Vectores Espaciales (Referencia Estilo Tierra) ---
            const ringCount = isHexa ? 12 : 8;
            const cagePointsTop: BABYLON.Vector3[] = [];
            const cagePointsBottom: BABYLON.Vector3[] = [];
            for (let i = 0; i <= ringCount; i++) {
                const theta = (i / ringCount) * Math.PI * 2;
                const r = armRadius * 1.25;
                cagePointsTop.push(new BABYLON.Vector3(Math.cos(theta) * r, 0.22, Math.sin(theta) * r));
                cagePointsBottom.push(new BABYLON.Vector3(Math.cos(theta) * r, -0.22, Math.sin(theta) * r));
            }
            const cageRingTop = BABYLON.MeshBuilder.CreateDashedLines("cageRingTop", { points: cagePointsTop, dashSize: 4, gapSize: 2 }, scene);
            cageRingTop.color = new BABYLON.Color3(0.3, 0.6, 1.0);
            cageRingTop.parent = aeroSystemRoot;

            const cageRingBottom = BABYLON.MeshBuilder.CreateDashedLines("cageRingBottom", { points: cagePointsBottom, dashSize: 4, gapSize: 2 }, scene);
            cageRingBottom.color = new BABYLON.Color3(0.3, 0.6, 1.0);
            cageRingBottom.parent = aeroSystemRoot;

            // Líneas de envolvente poligonal constelación cruzando los motores
            for (let b = 0; b < armCount; b++) {
                const ang1 = (b * Math.PI * 2) / armCount;
                const ang2 = (((b + 1) % armCount) * Math.PI * 2) / armCount;
                const p1 = new BABYLON.Vector3(Math.cos(ang1) * armRadius, 0.04, Math.sin(ang1) * armRadius);
                const p2 = new BABYLON.Vector3(Math.cos(ang2) * armRadius, 0.04, Math.sin(ang2) * armRadius);
                const pCenter = new BABYLON.Vector3(0, 0.08, 0);

                const polyLine = BABYLON.MeshBuilder.CreateLines("constelPoly_" + b, {
                    points: [p1, pCenter, p2, p1]
                }, scene);
                polyLine.color = new BABYLON.Color3(0.4, 0.75, 1.0);
                polyLine.alpha = 0.5;
                polyLine.parent = aeroSystemRoot;

                // Nodos geométricos en los vértices (pequeños diamantes holográficos)
                const nodeMarker = BABYLON.MeshBuilder.CreateBox("nodeMarker_" + b, { size: 0.012 }, scene);
                nodeMarker.position.copyFrom(p1);
                nodeMarker.rotation.y = Math.PI / 4;
                nodeMarker.material = aeroVectorMat;
                nodeMarker.parent = aeroSystemRoot;
            }

            // --- 4. Retícula de Escaneo LiDAR en el Suelo (Tierra / Banco) ---
            const lidarRingPoints: BABYLON.Vector3[] = [];
            for (let i = 0; i <= 48; i++) {
                const theta = (i / 48) * Math.PI * 2;
                lidarRingPoints.push(new BABYLON.Vector3(Math.cos(theta) * 0.32, -0.16, Math.sin(theta) * 0.32));
            }
            const lidarRing = BABYLON.MeshBuilder.CreateDashedLines("lidarRing", { points: lidarRingPoints, dashSize: 4, gapSize: 2 }, scene);
            lidarRing.color = new BABYLON.Color3(0.0, 0.9, 0.5);
            lidarRing.parent = aeroSystemRoot;

            const lidarLaser = BABYLON.MeshBuilder.CreateLines("lidarLaser", {
                points: [new BABYLON.Vector3(0, -0.08, 0), new BABYLON.Vector3(0, -0.16, 0)]
            }, scene);
            lidarLaser.color = new BABYLON.Color3(0.0, 1.0, 0.5);
            lidarLaser.parent = aeroSystemRoot;

            aeroSystemRoot.setEnabled(false); // Solo se activa cuando el dron está completamente armado o volando
        }

        // ================= ETIQUETAS 3D FLOTANTES =================
        let labelControls: any[] = [];

        function create3DLabels() {
            labelControls.forEach(l => l.rect.dispose());
            labelControls = [];

            PARTS.forEach(part => {
                const labelAnchor = new BABYLON.TransformNode("labelAnchor_" + part.id, scene);
                labelAnchor.parent = part.group;
                labelAnchor.position.set(0, 0.14, 0);

                const tagRect = new GUI.Rectangle("tag_" + part.id);
                tagRect.width = "210px";
                tagRect.height = "28px";
                tagRect.cornerRadius = 6;
                tagRect.thickness = 1.5;
                tagRect.color = "#00e5ff";
                tagRect.background = "rgba(6, 14, 30, 0.94)";
                tagRect.isPointerBlocker = true;
                tagRect.hoverCursor = "pointer";

                const tagText = new GUI.TextBlock();
                tagText.text = part.shortTag;
                tagText.color = "#ffffff";
                tagText.fontSize = 11;
                tagText.fontStyle = "bold";
                tagRect.addControl(tagText);

                tagRect.onPointerEnterObservable.add(() => {
                    tagRect.background = "rgba(0, 160, 220, 0.98)";
                });
                tagRect.onPointerOutObservable.add(() => {
                    tagRect.background = "rgba(6, 14, 30, 0.94)";
                });
                // CLIC EN LETRERO = Abre pantalla de inspección dedicada de esa pieza
                tagRect.onPointerClickObservable.add(() => {
                    openPartInspectionScreen(part);
                });

                ui.addControl(tagRect);
                tagRect.linkWithMesh(labelAnchor);
                labelControls.push({ rect: tagRect, part: part });
            });
        }

        // ================= FÍSICA Y ANIMACIÓN EN BANCO =================
        let isMoving = false;

        function showAssemblyCelebrationToast() {
            try {
                const toast = new GUI.Rectangle("toastAssemble");
                toast.width = "480px";
                toast.height = "54px";
                toast.cornerRadius = 8;
                toast.background = "rgba(4, 78, 56, 0.95)";
                toast.color = "#34d399";
                toast.thickness = 1.5;
                toast.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
                toast.top = "62px";
                toast.isPointerBlocker = false;

                const txt = new GUI.TextBlock();
                txt.text = "🏆 ¡DRON 100% ENSAMBLADO CON ÉXITO!\nTodos los componentes conectados y listos para volar";
                txt.color = "#ffffff";
                txt.fontSize = 11;
                txt.fontStyle = "bold";
                toast.addControl(txt);
                ui.addControl(toast);

                setTimeout(() => {
                    ui.removeControl(toast);
                    toast.dispose();
                }, 4000);
            } catch (e) {
                console.warn(e);
            }
        }

        function snapPartToAssembled(part: any, onComplete?: () => void) {
            if (!part) return;
            const startPos = part.group.position.clone();
            const endPos = part.assembledPos;
            const startTime = performance.now();
            const duration = 280;

            hl.removeAllMeshes();
            part.group.getChildMeshes().forEach((m: any) => hl.addMesh(m, BABYLON.Color3.FromHexString("#10b981")));

            const obs = scene.onBeforeRenderObservable.add(() => {
                const elapsed = performance.now() - startTime;
                const t = Math.min(elapsed / duration, 1.0);
                const ease = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
                part.group.position = BABYLON.Vector3.Lerp(startPos, endPos, ease);

                if (t >= 1.0) {
                    part.group.position.copyFrom(endPos);
                    part.group.rotation.set(0, 0, 0);
                    part.isAssembled = true;
                    scene.onBeforeRenderObservable.remove(obs);
                    setTimeout(() => hl.removeAllMeshes(), 350);
                    updateLabelsVisibility();
                    updateHUD();
                    updatePartsDrawer();

                    const assembledCount = PARTS.filter(p => p.isAssembled).length;
                    if (assembledCount === PARTS.length) {
                        showAssemblyCelebrationToast();
                    }
                    if (onComplete) onComplete();
                }
            });
        }

        const animateHandAssemble = snapPartToAssembled;

        function disassemblePart(part: any) {
            if (!part || !part.isAssembled) return;
            const startPos = part.group.position.clone();
            const endPos = part.benchPos;
            const startTime = performance.now();
            const duration = 300;

            const obs = scene.onBeforeRenderObservable.add(() => {
                const elapsed = performance.now() - startTime;
                const t = Math.min(elapsed / duration, 1.0);
                const ease = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
                part.group.position = BABYLON.Vector3.Lerp(startPos, endPos, ease);

                if (t >= 1.0) {
                    part.group.position.copyFrom(endPos);
                    part.isAssembled = false;
                    scene.onBeforeRenderObservable.remove(obs);
                    updateLabelsVisibility();
                    updateHUD();
                    updatePartsDrawer();
                }
            });
        }

        function resetWorkbench() {
            PARTS.forEach(p => {
                p.group.position.copyFrom(p.benchPos);
                p.isAssembled = false;
            });
            hl.removeAllMeshes();
            updateLabelsVisibility();
            updateHUD();
            buildPartsDrawerCards();
            updatePartsDrawer();
        }

        function updateLabelsVisibility() {
            labelControls.forEach(item => {
                item.rect.isVisible = !item.part.isAssembled;
            });
        }

        // ================= APARTADO EXCLUSIVO POR PIEZA (STUDIO 3D DEDICADO) =================
        let isIsolatedInspection = false;
        let currentInspectIndex = 0;
        let lastWorkshopCamTarget = new BABYLON.Vector3(0, 0.18, 0);
        let lastWorkshopCamRadius = 1.35;
        let lastWorkshopCamAlpha = -Math.PI / 2;
        let lastWorkshopCamBeta = Math.PI / 2.7;

        // Contenedor principal de la interfaz dedicada tipo showroom
        const showroomRoot = new GUI.Rectangle("showroomRoot");
        showroomRoot.width = "100%";
        showroomRoot.height = "100%";
        showroomRoot.thickness = 0;
        showroomRoot.background = "transparent";
        showroomRoot.isPointerBlocker = false;
        showroomRoot.isVisible = false;
        ui.addControl(showroomRoot);

        // 1. Barra Superior con botón volver, ruta y título (bajado 48px para no taparse con la barra de Babylon Editor)
        const topBanner = new GUI.Rectangle("topBanner");
        topBanner.width = "100%";
        topBanner.height = "48px";
        topBanner.top = "46px";
        topBanner.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
        topBanner.background = "rgba(4, 8, 20, 0.94)";
        topBanner.thickness = 0;
        topBanner.isPointerBlocker = false;
        showroomRoot.addControl(topBanner);

        const btnBackToWorkshop = new GUI.Rectangle("btnBackToWorkshop");
        btnBackToWorkshop.width = "220px";
        btnBackToWorkshop.height = "36px";
        btnBackToWorkshop.cornerRadius = 6;
        btnBackToWorkshop.background = "#059669";
        btnBackToWorkshop.color = "#34d399";
        btnBackToWorkshop.thickness = 1.5;
        btnBackToWorkshop.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        btnBackToWorkshop.left = "20px";
        btnBackToWorkshop.isPointerBlocker = true;
        btnBackToWorkshop.hoverCursor = "pointer";
        const txtBack = new GUI.TextBlock();
        txtBack.text = "← Volver a la Mesa (Taller)";
        txtBack.color = "white";
        txtBack.fontSize = 11;
        txtBack.fontStyle = "bold";
        txtBack.isHitTestVisible = false;
        btnBackToWorkshop.addControl(txtBack);
        topBanner.addControl(btnBackToWorkshop);

        const txtBreadcrumb = new GUI.TextBlock();
        txtBreadcrumb.text = "ESTUDIO DEDICADO DE COMPONENTE 3D";
        txtBreadcrumb.color = "#00e5ff";
        txtBreadcrumb.fontSize = 12;
        txtBreadcrumb.fontStyle = "bold";
        txtBreadcrumb.isHitTestVisible = false;
        txtBreadcrumb.isPointerBlocker = false;
        topBanner.addControl(txtBreadcrumb);

        let isLightBg = false;
        const btnToggleBg = new GUI.Rectangle("btnToggleBg");
        btnToggleBg.width = "180px";
        btnToggleBg.height = "32px";
        btnToggleBg.cornerRadius = 6;
        btnToggleBg.background = "#1e293b";
        btnToggleBg.color = "#00e5ff";
        btnToggleBg.thickness = 1.5;
        btnToggleBg.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
        btnToggleBg.left = "-175px";
        btnToggleBg.isPointerBlocker = true;
        btnToggleBg.hoverCursor = "pointer";
        const txtToggleBg = new GUI.TextBlock();
        txtToggleBg.text = "🌙 Fondo Estudio Grafito";
        txtToggleBg.color = "#ffffff";
        txtToggleBg.fontSize = 10.5;
        txtToggleBg.fontStyle = "bold";
        btnToggleBg.addControl(txtToggleBg);
        topBanner.addControl(btnToggleBg);

        const btnFullScreenShowroom = new GUI.Rectangle("btnFullScreenShowroom");
        btnFullScreenShowroom.width = "145px";
        btnFullScreenShowroom.height = "32px";
        btnFullScreenShowroom.cornerRadius = 6;
        btnFullScreenShowroom.background = "#0f172a";
        btnFullScreenShowroom.color = "#38bdf8";
        btnFullScreenShowroom.thickness = 1.5;
        btnFullScreenShowroom.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
        btnFullScreenShowroom.left = "-20px";
        btnFullScreenShowroom.isPointerBlocker = true;
        btnFullScreenShowroom.hoverCursor = "pointer";
        const txtFSS = new GUI.TextBlock();
        txtFSS.text = "⛶ Pantalla Completa";
        txtFSS.color = "#38bdf8";
        txtFSS.fontSize = 10.5;
        txtFSS.fontStyle = "bold";
        btnFullScreenShowroom.addControl(txtFSS);
        btnFullScreenShowroom.onPointerClickObservable.add(toggleFullScreen);
        topBanner.addControl(btnFullScreenShowroom);

        btnToggleBg.onPointerClickObservable.add(() => {
            isLightBg = !isLightBg;
            if (isLightBg) {
                scene.clearColor = new BABYLON.Color4(0.22, 0.25, 0.30, 1.0);
                txtToggleBg.text = "🏙️ Gris Pizarra Neutro";
                txtToggleBg.color = "#ffffff";
                btnToggleBg.background = "#334155";
                pedestalMat.albedoColor = new BABYLON.Color3(0.24, 0.28, 0.34);
            } else {
                scene.clearColor = new BABYLON.Color4(0.08, 0.10, 0.14, 1.0);
                txtToggleBg.text = "🌙 Fondo Estudio Grafito";
                txtToggleBg.color = "#ffffff";
                btnToggleBg.background = "#1e293b";
                pedestalMat.albedoColor = new BABYLON.Color3(0.12, 0.14, 0.18);
            }
        });

        // 2. Flechas de Navegación Lateral (estilo catálogo 3D como imagen de referencia)
        const btnNavPrev = new GUI.Rectangle("btnNavPrev");
        btnNavPrev.width = "54px";
        btnNavPrev.height = "80px";
        btnNavPrev.cornerRadius = 10;
        btnNavPrev.background = "rgba(6, 14, 30, 0.88)";
        btnNavPrev.color = "#00e5ff";
        btnNavPrev.thickness = 1.5;
        btnNavPrev.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        btnNavPrev.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_CENTER;
        btnNavPrev.left = "24px";
        btnNavPrev.isPointerBlocker = true;
        btnNavPrev.hoverCursor = "pointer";
        const txtNavPrev = new GUI.TextBlock();
        txtNavPrev.text = "❮";
        txtNavPrev.color = "#00e5ff";
        txtNavPrev.fontSize = 28;
        btnNavPrev.addControl(txtNavPrev);
        showroomRoot.addControl(btnNavPrev);

        const btnNavNext = new GUI.Rectangle("btnNavNext");
        btnNavNext.width = "54px";
        btnNavNext.height = "80px";
        btnNavNext.cornerRadius = 10;
        btnNavNext.background = "rgba(6, 14, 30, 0.88)";
        btnNavNext.color = "#00e5ff";
        btnNavNext.thickness = 1.5;
        btnNavNext.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
        btnNavNext.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_CENTER;
        btnNavNext.left = "-480px"; // Desplazado para no tapar el panel de ficha técnica
        btnNavNext.isPointerBlocker = true;
        btnNavNext.hoverCursor = "pointer";
        const txtNavNext = new GUI.TextBlock();
        txtNavNext.text = "❯";
        txtNavNext.color = "#00e5ff";
        txtNavNext.fontSize = 28;
        btnNavNext.addControl(txtNavNext);
        showroomRoot.addControl(btnNavNext);

        // 3. Panel Lateral Completo con Ficha Técnica (Derecha)
        const sideDossier = new GUI.Rectangle("sideDossier");
        sideDossier.width = "460px";
        sideDossier.height = "100%";
        sideDossier.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
        sideDossier.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
        sideDossier.background = "rgba(4, 9, 22, 0.96)";
        sideDossier.thickness = 1.5;
        sideDossier.color = "#00e5ff";
        sideDossier.isPointerBlocker = true;
        showroomRoot.addControl(sideDossier);

        const dossierContent = new GUI.StackPanel();
        dossierContent.width = "420px";
        dossierContent.top = "52px";
        dossierContent.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
        sideDossier.addControl(dossierContent);

        // BOTÓN PRINCIPAL PARA VOLVER A LA MESA (100% VISIBLE EN LA ESQUINA SUPERIOR DERECHA)
        const btnExitShowroom = new GUI.Rectangle("btnExitShowroom");
        btnExitShowroom.width = "420px";
        btnExitShowroom.height = "42px";
        btnExitShowroom.cornerRadius = 8;
        btnExitShowroom.background = "#059669";
        btnExitShowroom.color = "#34d399";
        btnExitShowroom.thickness = 1.5;
        btnExitShowroom.isPointerBlocker = true;
        btnExitShowroom.hoverCursor = "pointer";
        const txtExit = new GUI.TextBlock();
        txtExit.text = "✕ VOLVER AL TALLER (MESA DE ARMADO)";
        txtExit.color = "#ffffff";
        txtExit.fontSize = 12;
        txtExit.fontStyle = "bold";
        txtExit.isHitTestVisible = false;
        btnExitShowroom.addControl(txtExit);
        dossierContent.addControl(btnExitShowroom);

        // Separador espaciador
        const sep0 = new GUI.Rectangle();
        sep0.height = "10px";
        sep0.thickness = 0;
        dossierContent.addControl(sep0);

        // Categoría Badge
        const badgeCategory = new GUI.TextBlock();
        badgeCategory.text = "CATEGORÍA: ALMACENAMIENTO DE ENERGÍA";
        badgeCategory.color = "#38bdf8";
        badgeCategory.fontSize = 10;
        badgeCategory.fontStyle = "bold";
        badgeCategory.height = "20px";
        badgeCategory.textHorizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        dossierContent.addControl(badgeCategory);

        // Nombre de la pieza
        const txtPartName = new GUI.TextBlock();
        txtPartName.text = "BATERÍA LIPO 3S 5000MAH (PILA PRINCIPAL)";
        txtPartName.color = "#ffffff";
        txtPartName.fontSize = 14;
        txtPartName.fontStyle = "bold";
        txtPartName.textWrapping = true;
        txtPartName.height = "42px";
        txtPartName.textHorizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        dossierContent.addControl(txtPartName);

        // Material
        const txtMaterial = new GUI.TextBlock();
        txtMaterial.text = "🔬 Material: ...";
        txtMaterial.color = "#00e5ff";
        txtMaterial.fontSize = 11;
        txtMaterial.textWrapping = true;
        txtMaterial.height = "36px";
        txtMaterial.textHorizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        dossierContent.addControl(txtMaterial);

        // Separador
        const sep1 = new GUI.Rectangle();
        sep1.height = "1px";
        sep1.background = "rgba(0, 229, 255, 0.25)";
        sep1.thickness = 0;
        sep1.top = "4px";
        dossierContent.addControl(sep1);

        // Ficha Técnica (Especificaciones)
        const lblSpecs = new GUI.TextBlock();
        lblSpecs.text = "⚙️ ESPECIFICACIONES TÉCNICAS (VIDA REAL):";
        lblSpecs.color = "#e2e8f0";
        lblSpecs.fontSize = 11;
        lblSpecs.fontStyle = "bold";
        lblSpecs.height = "26px";
        lblSpecs.textHorizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        dossierContent.addControl(lblSpecs);

        const txtSpecsList = new GUI.TextBlock();
        txtSpecsList.text = "";
        txtSpecsList.color = "#94a3b8";
        txtSpecsList.fontSize = 11;
        txtSpecsList.textWrapping = true;
        txtSpecsList.height = "95px";
        txtSpecsList.textHorizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        dossierContent.addControl(txtSpecsList);

        // Función
        const lblDesc = new GUI.TextBlock();
        lblDesc.text = "📋 FUNCIÓN EN EL PROTOTIPO:";
        lblDesc.color = "#e2e8f0";
        lblDesc.fontSize = 11;
        lblDesc.fontStyle = "bold";
        lblDesc.height = "22px";
        lblDesc.textHorizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        dossierContent.addControl(lblDesc);

        const txtDesc = new GUI.TextBlock();
        txtDesc.text = "";
        txtDesc.color = "#94a3b8";
        txtDesc.fontSize = 11;
        txtDesc.textWrapping = true;
        txtDesc.height = "40px";
        txtDesc.textHorizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        dossierContent.addControl(txtDesc);

        // Alerta de Detección de Errores y Consecuencias Reales
        const errorCard = new GUI.Rectangle("errorCard");
        errorCard.width = "420px";
        errorCard.height = "115px";
        errorCard.cornerRadius = 8;
        errorCard.thickness = 1.5;
        errorCard.color = "#f59e0b";
        errorCard.background = "rgba(40, 22, 5, 0.85)";
        dossierContent.addControl(errorCard);

        const errorStack = new GUI.StackPanel();
        errorStack.width = "400px";
        errorStack.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
        errorStack.top = "6px";
        errorCard.addControl(errorStack);

        const txtErrorTitle = new GUI.TextBlock();
        txtErrorTitle.text = "⚠️ DIAGNÓSTICO: ¿QUÉ PASA SI ESTA PIEZA FALLA O ES INCORRECTA?";
        txtErrorTitle.color = "#fbbf24";
        txtErrorTitle.fontSize = 10;
        txtErrorTitle.fontStyle = "bold";
        txtErrorTitle.height = "18px";
        txtErrorTitle.textHorizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        errorStack.addControl(txtErrorTitle);

        const txtErrorBody = new GUI.TextBlock();
        txtErrorBody.text = "";
        txtErrorBody.color = "#fed7aa";
        txtErrorBody.fontSize = 10;
        txtErrorBody.textWrapping = true;
        txtErrorBody.height = "85px";
        txtErrorBody.textHorizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        errorStack.addControl(txtErrorBody);

        // Estado y botón de montaje/desmontaje
        const actionBox = new GUI.Rectangle();
        actionBox.height = "55px";
        actionBox.thickness = 0;
        dossierContent.addControl(actionBox);

        const badgeAssemblyState = new GUI.Rectangle();
        badgeAssemblyState.width = "180px";
        badgeAssemblyState.height = "34px";
        badgeAssemblyState.cornerRadius = 6;
        badgeAssemblyState.thickness = 1;
        badgeAssemblyState.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        const txtAssemblyState = new GUI.TextBlock();
        txtAssemblyState.fontSize = 10;
        txtAssemblyState.fontStyle = "bold";
        badgeAssemblyState.addControl(txtAssemblyState);
        actionBox.addControl(badgeAssemblyState);

        const btnTogglePartMount = new GUI.Rectangle();
        btnTogglePartMount.width = "210px";
        btnTogglePartMount.height = "34px";
        btnTogglePartMount.cornerRadius = 6;
        btnTogglePartMount.thickness = 1;
        btnTogglePartMount.color = "#ffffff";
        btnTogglePartMount.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
        btnTogglePartMount.isPointerBlocker = true;
        btnTogglePartMount.hoverCursor = "pointer";
        const txtTogglePartMount = new GUI.TextBlock();
        txtTogglePartMount.fontSize = 10;
        txtTogglePartMount.fontStyle = "bold";
        txtTogglePartMount.color = "#ffffff";
        btnTogglePartMount.addControl(txtTogglePartMount);
        actionBox.addControl(btnTogglePartMount);

        // 4. Barra Inferior tipo Galería de Selección Rápida (8 piezas)
        const bottomCarousel = new GUI.Rectangle("bottomCarousel");
        bottomCarousel.width = "calc(100% - 500px)";
        bottomCarousel.height = "52px";
        bottomCarousel.cornerRadius = 8;
        bottomCarousel.thickness = 1;
        bottomCarousel.color = "rgba(0, 229, 255, 0.4)";
        bottomCarousel.background = "rgba(4, 9, 22, 0.94)";
        bottomCarousel.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        bottomCarousel.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
        bottomCarousel.left = "20px";
        bottomCarousel.top = "-14px";
        bottomCarousel.isPointerBlocker = true;
        showroomRoot.addControl(bottomCarousel);

        const carouselGrid = new GUI.StackPanel();
        carouselGrid.isVertical = false;
        carouselGrid.height = "100%";
        bottomCarousel.addControl(carouselGrid);

        let carouselButtons: any[] = [];

        function buildCarouselButtons() {
            carouselGrid.clearControls();
            carouselButtons = [];

            PARTS.forEach((part, idx) => {
                const cBtn = new GUI.Rectangle("cBtn_" + part.id);
                cBtn.width = "90px";
                cBtn.height = "38px";
                cBtn.cornerRadius = 6;
                cBtn.thickness = 1;
                cBtn.color = "rgba(0, 229, 255, 0.3)";
                cBtn.background = "rgba(10, 20, 38, 0.9)";
                cBtn.left = "3px";
                cBtn.isPointerBlocker = true;
                cBtn.hoverCursor = "pointer";

                const cText = new GUI.TextBlock();
                const shortNames = [
                    "📐 Chasis Inf",
                    "🥢 Brazos/ESC",
                    "⚙️ Motores",
                    "🧠 Pixhawk",
                    "🦾 Tren/Patas",
                    "🔋 Pila LiPo",
                    "🧯 Tanque",
                    "🌀 Hélices"
                ];
                cText.text = shortNames[idx] || part.shortTag;
                cText.fontSize = 10;
                cText.fontStyle = "bold";
                cText.color = "#e2e8f0";
                cBtn.addControl(cText);

                cBtn.onPointerClickObservable.add(() => {
                    showPartInShowroom(part);
                });

                carouselGrid.addControl(cBtn);
                carouselButtons.push({ btn: cBtn, text: cText, part: part });
            });
        }

        function updateCarouselButtons(activeIdx: number) {
            carouselButtons.forEach((item, idx) => {
                if (idx === activeIdx) {
                    item.btn.thickness = 2;
                    item.btn.color = "#00e5ff";
                    item.btn.background = "rgba(0, 160, 220, 0.45)";
                    item.text.color = "#ffffff";
                } else {
                    item.btn.thickness = 1;
                    item.btn.color = item.part.isAssembled ? "rgba(52, 211, 153, 0.6)" : "rgba(148, 163, 184, 0.3)";
                    item.btn.background = "rgba(10, 20, 38, 0.9)";
                    item.text.color = item.part.isAssembled ? "#34d399" : "#94a3b8";
                }
            });
        }

        function updateShowroomMountButton(part: any) {
            if (part.isAssembled) {
                txtAssemblyState.text = "✓ MONTADA EN DRON";
                txtAssemblyState.color = "#34d399";
                badgeAssemblyState.color = "#34d399";
                badgeAssemblyState.background = "rgba(6, 78, 59, 0.6)";

                txtTogglePartMount.text = "✖ Desmontar a Banco";
                btnTogglePartMount.background = "#7f1d1d";
                btnTogglePartMount.color = "#f87171";
            } else {
                txtAssemblyState.text = "⚪ EN BANCO DE TRABAJO";
                txtAssemblyState.color = "#94a3b8";
                badgeAssemblyState.color = "#64748b";
                badgeAssemblyState.background = "rgba(30, 41, 59, 0.6)";

                txtTogglePartMount.text = "🔧 Montar en el Dron";
                btnTogglePartMount.background = "#059669";
                btnTogglePartMount.color = "#34d399";
            }
        }

        function showPartInShowroom(part: any) {
            currentInspectIndex = PARTS.indexOf(part);
            if (currentInspectIndex < 0) currentInspectIndex = 0;

            // 0. Fondo de estudio calmo y relajante (grafito oscuro sereno que resalta al 100% cada material)
            scene.clearColor = isLightBg ? new BABYLON.Color4(0.20, 0.23, 0.28, 1.0) : new BABYLON.Color4(0.08, 0.10, 0.14, 1.0);
            studioRim.intensity = 0.85;
            studioRim.diffuse = new BABYLON.Color3(0.65, 0.80, 1.0);
            studioKey.intensity = 1.30;
            studioFill.intensity = 0.70;

            // 1. Asegurar que TODOS los transformNodes estén habilitados (elimina bloqueo de ancestros)
            scene.transformNodes.forEach((tn: any) => {
                if (tn.setEnabled) tn.setEnabled(true);
            });
            droneRoot.setEnabled(true);

            // 2. Obtener la lista exacta de mallas de la pieza seleccionada
            const targetMeshes = new Set(part.group.getChildMeshes());

            // 3. Filtrar todas las mallas de la escena: desactivar mesa, bandejas, suelo y otras partes
            // y activar ÚNICAMENTE las mallas del componente seleccionado + peana de estudio
            scene.meshes.forEach((m: any) => {
                if (m.name.startsWith("tag_") || m.name.startsWith("labelAnchor") || m.name.startsWith("thrustTag")) {
                    m.setEnabled(false);
                    m.isVisible = false;
                    return;
                }
                if (m === showroomPedestal || m === pedestalRing) {
                    m.setEnabled(true);
                    m.isVisible = true;
                    return;
                }
                const isTarget = targetMeshes.has(m);
                m.setEnabled(isTarget);
                m.isVisible = isTarget;
            });

            // 4. Colocar la pieza examinada sobre la peana sin traspasarla (alturas milimétricas por pieza)
            const showroomYOffsets: { [id: number]: number } = {
                1: 0.021,   // Chasis inf + PDB (apoya plana en la superficie)
                2: 0.038,   // Brazos + ESCs
                3: 0.024,   // Motores
                4: 0.030,   // Pixhawk + GPS
                5: 0.220,   // Chasis Sup + Patas
                6: 0.032,   // Batería LiPo (apoyada perfectamente sobre el pedestal sin hundirse)
                7: 0.160,   // Tanque Extintor / Transponder
                8: 0.028    // Hélices
            };

            const targetY = showroomYOffsets[part.id] !== undefined ? showroomYOffsets[part.id] : 0.025;

            PARTS.forEach((p, idx) => {
                if (idx === currentInspectIndex) {
                    p.group.setEnabled(true);
                    p.group.position.set(0, targetY, 0);
                    p.group.rotation.set(0, 0, 0);
                } else {
                    p.group.setEnabled(false);
                }
            });

            // 5. Configurar la cámara para enfocar directamente en la pieza (enmarcado perfecto)
            const targetPos = (part.id === 5)
                ? new BABYLON.Vector3(-0.06, 0.14, 0.02)
                : (part.id === 4 || part.id === 7)
                ? new BABYLON.Vector3(-0.06, 0.08, 0.02)
                : new BABYLON.Vector3(-0.06, 0.04, 0.02);

            const targetRadius = (part.id === 5) ? 0.60 : (part.id === 1 || part.id === 2) ? 0.48 : 0.28;

            scene.cameras.forEach(cam => {
                if (cam instanceof BABYLON.ArcRotateCamera) {
                    cam.setTarget(targetPos);
                    cam.alpha = -Math.PI / 2;
                    cam.beta = 1.18;
                    cam.radius = targetRadius;
                    cam.minZ = 0.005; // Evita que la plataforma o la pieza desaparezcan al acercarse
                    cam.maxZ = 150.0;
                    cam.lowerRadiusLimit = 0.08;
                }
            });
            camera.setTarget(targetPos);
            camera.alpha = -Math.PI / 2;
            camera.beta = 1.18;
            camera.radius = targetRadius;
            camera.minZ = 0.005;
            camera.maxZ = 150.0;
            camera.lowerRadiusLimit = 0.08;
            scene.activeCamera = camera;
            scene.activeCameras = [camera];

            // 6. Actualizar datos de la ficha técnica
            txtBreadcrumb.text = `PROTOTIPO: ${activePrototypeId.toUpperCase()} > PIEZA ${currentInspectIndex + 1} DE ${PARTS.length}: ${part.shortTag}`;
            badgeCategory.text = `CATEGORÍA: ${part.category || "COMPONENTE PRINCIPAL"}`;
            txtPartName.text = part.name;
            txtMaterial.text = `🔬 Material: ${part.material}`;

            let specStr = "";
            for (const [k, v] of Object.entries(part.specs || {})) {
                specStr += `• ${k.toUpperCase()}: ${v}\n`;
            }
            txtSpecsList.text = specStr;
            txtDesc.text = part.desc;
            txtErrorBody.text = part.errorReal || "Revisar compatibilidad y tolerancias mecánicas.";

            updateShowroomMountButton(part);
            updateCarouselButtons(currentInspectIndex);
        }

        function closePartShowroom() {
            try {
                isIsolatedInspection = false;
                showroomRoot.isVisible = false;

                // Restaurar fondo oscuro del taller general y luces
                scene.clearColor = new BABYLON.Color4(0.10, 0.12, 0.16, 1.0);
                studioRim.intensity = 0.65;
                studioKey.intensity = 1.10;
                showroomPedestal.setEnabled(false);
                showroomPedestal.isVisible = false;
                pedestalRing.setEnabled(false);
                pedestalRing.isVisible = false;

                // Reactivar todos los transformNodes y todas las mallas de la escena (mesa, accesorios, dron)
                scene.transformNodes.forEach((tn: any) => {
                    if (tn && tn.setEnabled) tn.setEnabled(true);
                });
                scene.meshes.forEach((m: any) => {
                    if (m === showroomPedestal || m === pedestalRing) {
                        m.setEnabled(false);
                        m.isVisible = false;
                        return;
                    }
                    m.setEnabled(true);
                    m.isVisible = true;
                });

                // Restaurar la posición de cada pieza a su estado de banco o ensamblado
                PARTS.forEach(p => {
                    if (p && p.group) {
                        p.group.setEnabled(true);
                        p.group.position.copyFrom(p.isAssembled ? p.assembledPos : p.benchPos);
                        p.group.rotation.set(0, 0, 0);
                    }
                });

                // Restaurar cámara del taller general
                const returnTarget = new BABYLON.Vector3(0, 0.12, 0.02);
                const returnRadius = (lastWorkshopCamRadius && lastWorkshopCamRadius > 0.8 && lastWorkshopCamRadius < 2.2) ? lastWorkshopCamRadius : 1.25;
                const returnAlpha = lastWorkshopCamAlpha || -Math.PI / 2;
                const returnBeta = lastWorkshopCamBeta || Math.PI / 2.8;

                scene.cameras.forEach(cam => {
                    if (cam instanceof BABYLON.ArcRotateCamera) {
                        cam.setTarget(returnTarget);
                        cam.alpha = returnAlpha;
                        cam.beta = returnBeta;
                        cam.radius = returnRadius;
                        cam.minZ = 0.02;
                    }
                });
                camera.setTarget(returnTarget);
                camera.alpha = returnAlpha;
                camera.beta = returnBeta;
                camera.radius = returnRadius;
                camera.minZ = 0.02;
                scene.activeCamera = camera;
                scene.activeCameras = [camera];

                // Mostrar HUD y barra del taller
                setWorkshopUIVisibility(true);
                updateLabelsVisibility();
                updateHUD();
                thrustVectorMeshes.forEach(tv => tv.label.isVisible = isAeroVisible && PARTS.every(p => p.isAssembled));
            } catch (err) {
                console.error("Error al salir de showroom:", err);
            }
        }

        btnNavPrev.onPointerClickObservable.add(() => {
            currentInspectIndex = (currentInspectIndex - 1 + PARTS.length) % PARTS.length;
            showPartInShowroom(PARTS[currentInspectIndex]);
        });
        btnNavPrev.onPointerUpObservable.add(() => {
            currentInspectIndex = (currentInspectIndex - 1 + PARTS.length) % PARTS.length;
            showPartInShowroom(PARTS[currentInspectIndex]);
        });

        btnNavNext.onPointerClickObservable.add(() => {
            currentInspectIndex = (currentInspectIndex + 1) % PARTS.length;
            showPartInShowroom(PARTS[currentInspectIndex]);
        });
        btnNavNext.onPointerUpObservable.add(() => {
            currentInspectIndex = (currentInspectIndex + 1) % PARTS.length;
            showPartInShowroom(PARTS[currentInspectIndex]);
        });

        btnBackToWorkshop.onPointerClickObservable.add(() => closePartShowroom());
        btnBackToWorkshop.onPointerUpObservable.add(() => closePartShowroom());
        btnExitShowroom.onPointerClickObservable.add(() => closePartShowroom());
        btnExitShowroom.onPointerUpObservable.add(() => closePartShowroom());

        // Tecla Escape para salir al instante
        scene.onKeyboardObservable.add((kbInfo) => {
            if (kbInfo.type === BABYLON.KeyboardEventTypes.KEYDOWN && (kbInfo.event.key === "Escape" || kbInfo.event.key === "Esc" || kbInfo.event.key === "Backspace")) {
                if (isIsolatedInspection) {
                    closePartShowroom();
                }
            }
        });

        btnTogglePartMount.onPointerClickObservable.add(() => {
            const currentPart = PARTS[currentInspectIndex];
            if (!currentPart) return;
            currentPart.isAssembled = !currentPart.isAssembled;
            updateShowroomMountButton(currentPart);
            updateCarouselButtons(currentInspectIndex);
            updateHUD();
        });

        // Giro turntable continuo mientras se inspecciona la pieza en 3D
        scene.onBeforeRenderObservable.add(() => {
            if (isIsolatedInspection && PARTS[currentInspectIndex] && PARTS[currentInspectIndex].group) {
                PARTS[currentInspectIndex].group.rotation.y += 0.006;
            }
        });

        function openPartInspectionScreen(part: any) {
            if (isFlightMode) {
                isFlightMode = false;
                isLanding = false;
                droneRoot.position.set(0, 0.16, 0.02);
                droneRoot.rotation.set(0, 0, 0);
                propSpinSpeed = 0;
                flightHud.isVisible = false;
            }
            if (aeroSystemRoot) aeroSystemRoot.setEnabled(false);
            thrustVectorMeshes.forEach(tv => tv.label.isVisible = false);

            isIsolatedInspection = true;
            lastWorkshopCamTarget = camera.target.clone();
            lastWorkshopCamRadius = camera.radius;
            lastWorkshopCamAlpha = camera.alpha;
            lastWorkshopCamBeta = camera.beta;

            workbenchRoot.getChildMeshes().forEach((m: any) => {
                m.setEnabled(false);
                m.isVisible = false;
            });
            setWorkshopUIVisibility(false);
            labelControls.forEach(l => l.rect.isVisible = false);

            showroomRoot.isVisible = true;
            buildCarouselButtons();
            showPartInShowroom(part);
        }

        const openIsolatedInspection = openPartInspectionScreen;

        // ================= MOTOR DE DETECCIÓN DE ERRORES DE VUELO =================
        const diagnosticModal = new GUI.Rectangle("diagnosticModal");
        diagnosticModal.width = "480px";
        diagnosticModal.height = "320px";
        diagnosticModal.cornerRadius = 10;
        diagnosticModal.thickness = 2;
        diagnosticModal.color = "#00e5ff";
        diagnosticModal.background = "rgba(4, 10, 24, 0.96)";
        diagnosticModal.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
        diagnosticModal.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_CENTER;
        diagnosticModal.isVisible = false;
        ui.addControl(diagnosticModal);

        const diagTitle = new GUI.TextBlock();
        diagTitle.text = "DIAGNÓSTICO AERONÁUTICO Y TEST DE VUELO";
        diagTitle.color = "#00e5ff";
        diagTitle.fontSize = 12;
        diagTitle.fontStyle = "bold";
        diagTitle.top = "-125px";
        diagnosticModal.addControl(diagTitle);

        const diagResult = new GUI.TextBlock();
        diagResult.text = "";
        diagResult.color = "#ffffff";
        diagResult.fontSize = 11;
        diagResult.textWrapping = true;
        diagResult.width = "430px";
        diagResult.top = "-5px";
        diagnosticModal.addControl(diagResult);

        const btnCloseDiag = new GUI.Rectangle("btnCloseDiag");
        btnCloseDiag.width = "160px";
        btnCloseDiag.height = "34px";
        btnCloseDiag.cornerRadius = 6;
        btnCloseDiag.background = "#162846";
        btnCloseDiag.color = "white";
        btnCloseDiag.top = "120px";
        btnCloseDiag.left = "-115px";
        btnCloseDiag.isPointerBlocker = true;
        btnCloseDiag.hoverCursor = "pointer";
        const bdText = new GUI.TextBlock();
        bdText.text = "Cerrar Diagnóstico";
        bdText.color = "white";
        bdText.fontSize = 11;
        bdText.isHitTestVisible = false;
        btnCloseDiag.addControl(bdText);
        diagnosticModal.addControl(btnCloseDiag);

        const btnStartLiveFlight = new GUI.Rectangle("btnStartLiveFlight");
        btnStartLiveFlight.width = "215px";
        btnStartLiveFlight.height = "34px";
        btnStartLiveFlight.cornerRadius = 6;
        btnStartLiveFlight.background = "#15803d";
        btnStartLiveFlight.color = "#86efac";
        btnStartLiveFlight.thickness = 1.5;
        btnStartLiveFlight.top = "120px";
        btnStartLiveFlight.left = "105px";
        btnStartLiveFlight.isPointerBlocker = true;
        btnStartLiveFlight.hoverCursor = "pointer";
        const bslfText = new GUI.TextBlock();
        bslfText.text = "🚀 Iniciar Vuelo en Vivo";
        bslfText.color = "white";
        bslfText.fontSize = 11;
        bslfText.fontStyle = "bold";
        bslfText.isHitTestVisible = false;
        btnStartLiveFlight.addControl(bslfText);
        diagnosticModal.addControl(btnStartLiveFlight);

        btnCloseDiag.onPointerClickObservable.add(() => {
            diagnosticModal.isVisible = false;
        });

        btnStartLiveFlight.onPointerClickObservable.add(() => {
            startLiveFlight();
        });

        function runFlightDiagnostic() {
            diagnosticModal.isVisible = true;
            const assembledCount = PARTS.filter(p => p.isAssembled).length;

            if (assembledCount < 8) {
                diagTitle.text = "❌ FALLO CRÍTICO: PROTOTIPO INCOMPLETO";
                diagTitle.color = "#ff334b";
                diagnosticModal.color = "#ff334b";
                btnStartLiveFlight.isVisible = false;
                btnCloseDiag.left = "0px";
                const faltantes = PARTS.filter(p => !p.isAssembled).map(p => p.shortTag).join(", ");
                diagResult.text = `El dron no puede encender ni probarse en banco porque faltan piezas críticas:\n\n• Piezas sin montar: ${faltantes}\n\n⚠️ Consecuencia en la vida real: Si intentas arrancar sin todas las conexiones montadas, el controlador Pixhawk entrará en error de 'PreArm Check' por circuito abierto o falta de alimentación.`;
                return;
            }

            btnStartLiveFlight.isVisible = true;
            btnCloseDiag.left = "-115px";

            // Cálculo físico real
            const isHexa = (activePrototypeId === "tarot680");
            const numMotores = isHexa ? 6 : 4;
            const pesoDron = isHexa ? 3.85 : 2.55; // kg con tanque lleno
            const empujeMax = numMotores * 1.25; // kg
            const twr = empujeMax / pesoDron; // Thrust-to-Weight Ratio
            const corrienteHover = isHexa ? 28 : 22; // Amperios
            const autonomiaMin = Math.round((5.0 / corrienteHover) * 60 * 0.82);

            if (twr < 1.4) {
                diagTitle.text = "⚠️ ADVERTENCIA: RELACIÓN EMPUJE/PESO DEFICIENTE";
                diagTitle.color = "#ff9900";
                diagnosticModal.color = "#ff9900";
                diagResult.text = `• Peso Total (TOW): ${pesoDron.toFixed(2)} kg | Empuje Máximo: ${empujeMax.toFixed(2)} kg\n• Ratio Thrust-to-Weight: ${twr.toFixed(2)}:1 (Mínimo recomendado: 1.80:1)\n\n❌ Consecuencia: El dron es demasiado pesado para sus motores/hélices. Se sobrecalentarán los ESC y perderá altura al acelerar contra ráfagas de viento.`;
            } else {
                diagTitle.text = "✅ CERTIFICACIÓN DE VUELO: APROBADO (REALISMO 100%)";
                diagTitle.color = "#00e5ff";
                diagnosticModal.color = "#00e5ff";
                diagResult.text = `✓ Parámetros Dinámicos de Ingeniería Real:\n• Peso Total con Retardante: ${pesoDron.toFixed(2)} kg\n• Empuje Máximo (${numMotores} Motores 5010): ${empujeMax.toFixed(2)} kg\n• Relación Empuje/Peso (TWR): ${twr.toFixed(2)}:1 (Excelente margen de maniobra)\n• Consumo en Vuelo Estacionario (Hover): ${corrienteHover}A @ 11.1V\n• Autonomía Estimada con LiPo 3S 5000mAh: ${autonomiaMin} Minutos\n• Margen de Seguridad de Variadores (ESCs 40A): 35% de holgura térmica.\n\n🏆 ¡Este prototipo es aerodinámicamente viable para vuelo real! Pulsa 'Iniciar Vuelo en Vivo'.`;
            }
        }

        // ================= PANEL DE TELEMETRÍA DE VUELO EN VIVO (HUD) =================
        const flightHud = new GUI.Rectangle("flightHud");
        flightHud.width = "420px";
        flightHud.height = "165px";
        flightHud.cornerRadius = 8;
        flightHud.thickness = 1.5;
        flightHud.color = "#00e5ff";
        flightHud.background = "rgba(4, 12, 28, 0.94)";
        flightHud.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        flightHud.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
        flightHud.left = "20px";
        flightHud.top = "20px";
        flightHud.isVisible = false;
        ui.addControl(flightHud);

        const txtFlightTitle = new GUI.TextBlock();
        txtFlightTitle.text = "🛰️ MIDRON AERO-TELEMETRY • VUELO EN VIVO";
        txtFlightTitle.color = "#00e5ff";
        txtFlightTitle.fontSize = 11;
        txtFlightTitle.fontStyle = "bold";
        txtFlightTitle.top = "-62px";
        flightHud.addControl(txtFlightTitle);

        const txtFlightAgl = new GUI.TextBlock();
        txtFlightAgl.text = "ALTITUD AGL: 0.85 m";
        txtFlightAgl.color = "#ffffff";
        txtFlightAgl.fontSize = 11;
        txtFlightAgl.fontStyle = "bold";
        txtFlightAgl.top = "-38px";
        flightHud.addControl(txtFlightAgl);

        const txtFlightThrust = new GUI.TextBlock();
        txtFlightThrust.text = "EMPUJE TOTAL: 44.8 N (6,500 RPM)";
        txtFlightThrust.color = "#38bdf8";
        txtFlightThrust.fontSize = 11;
        txtFlightThrust.top = "-16px";
        flightHud.addControl(txtFlightThrust);

        const txtFlightBattery = new GUI.TextBlock();
        txtFlightBattery.text = "BATERÍA: 11.8 V (3S) • 24.2 A";
        txtFlightBattery.color = "#4ade80";
        txtFlightBattery.fontSize = 11;
        txtFlightBattery.top = "6px";
        flightHud.addControl(txtFlightBattery);

        const txtFlightAttitude = new GUI.TextBlock();
        txtFlightAttitude.text = "ACTITUD: P: 0.0° | R: 0.0° | Y: 0.0°";
        txtFlightAttitude.color = "#facc15";
        txtFlightAttitude.fontSize = 10;
        txtFlightAttitude.top = "28px";
        flightHud.addControl(txtFlightAttitude);

        const txtControlsHint = new GUI.TextBlock();
        txtControlsHint.text = "⌨️ [W/S] Cabeceo | [A/D] Alabeo | [ESPACIO/C] Altura | [Q/E] Giro";
        txtControlsHint.color = "#94a3b8";
        txtControlsHint.fontSize = 9;
        txtControlsHint.top = "48px";
        flightHud.addControl(txtControlsHint);

        const btnLand = new GUI.Rectangle("btnLand");
        btnLand.width = "180px";
        btnLand.height = "26px";
        btnLand.cornerRadius = 5;
        btnLand.background = "#991b1b";
        btnLand.color = "#fca5a5";
        btnLand.thickness = 1;
        btnLand.top = "70px";
        btnLand.isPointerBlocker = true;
        btnLand.hoverCursor = "pointer";

        const txtLand = new GUI.TextBlock();
        txtLand.text = "🛬 Aterrizar en Banco";
        txtLand.color = "white";
        txtLand.fontSize = 10;
        txtLand.fontStyle = "bold";
        txtLand.isHitTestVisible = false;
        btnLand.addControl(txtLand);
        flightHud.addControl(btnLand);

        btnLand.onPointerClickObservable.add(() => landDrone());

        function startLiveFlight() {
            const assembledCount = PARTS.filter(p => p.isAssembled).length;
            if (assembledCount < PARTS.length) {
                PARTS.forEach(p => {
                    p.group.position.copyFrom(p.assembledPos);
                    p.isAssembled = true;
                });
                updateLabelsVisibility();
                updateHUD();
            }

            diagnosticModal.isVisible = false;
            setWorkshopUIVisibility(false);
            labelControls.forEach(l => l.rect.isVisible = false);

            isFlightMode = true;
            isLanding = false;
            flightStartTime = performance.now();
            flightTargetY = 0.85;

            if (aeroSystemRoot) aeroSystemRoot.setEnabled(isAeroVisible);
            thrustVectorMeshes.forEach(tv => tv.label.isVisible = isAeroVisible);

            camera.setTarget(droneRoot.position.clone());
            camera.radius = 1.65;
            camera.alpha = -Math.PI / 2;
            camera.beta = 1.25;

            flightHud.isVisible = true;
        }

        function landDrone() {
            if (!isFlightMode || isLanding) return;
            isLanding = true;
        }

        // ================= BARRA SUPERIOR DE CATEGORÍAS (ESTILO DRL SIMULATOR) =================
        topNavRibbon = new GUI.Rectangle("topNavRibbon");
        topNavRibbon.width = "820px";
        topNavRibbon.height = "42px";
        topNavRibbon.cornerRadius = 8;
        topNavRibbon.thickness = 1;
        topNavRibbon.color = "rgba(0, 229, 255, 0.4)";
        topNavRibbon.background = "rgba(6, 12, 28, 0.94)";
        topNavRibbon.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
        topNavRibbon.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
        topNavRibbon.top = "12px";
        ui.addControl(topNavRibbon);

        const navStack = new GUI.StackPanel();
        navStack.isVertical = false;
        navStack.height = "100%";
        topNavRibbon.addControl(navStack);

        const navCategories = [
            { label: "📐 FRAMES", partId: 1 },
            { label: "⚙️ MOTORS", partId: 3 },
            { label: "🌀 PROPS", partId: 8 },
            { label: "🔋 LIPOS", partId: 6 },
            { label: "🧠 EXTRAS", partId: 4 },
            { label: "🎨 COLOR", partId: 5 },
            { label: "💾 GUARDAR", partId: -1 }
        ];

        navCategories.forEach((cat, ci) => {
            const btnCat = new GUI.Rectangle("navCat_" + ci);
            btnCat.width = "112px";
            btnCat.height = "32px";
            btnCat.cornerRadius = 6;
            btnCat.thickness = 1;
            btnCat.color = (ci === 0) ? "#00e5ff" : "rgba(255,255,255,0.2)";
            btnCat.background = (ci === 0) ? "rgba(0, 160, 220, 0.4)" : "rgba(15, 23, 42, 0.8)";
            btnCat.left = "2px";
            btnCat.isPointerBlocker = true;
            btnCat.hoverCursor = "pointer";

            const txtCat = new GUI.TextBlock();
            txtCat.text = cat.label;
            txtCat.color = (ci === 0) ? "#ffffff" : "#94a3b8";
            txtCat.fontSize = 10.5;
            txtCat.fontStyle = "bold";
            btnCat.addControl(txtCat);

            btnCat.onPointerClickObservable.add(() => {
                if (cat.partId > 0) {
                    const p = PARTS.find(x => x.id === cat.partId);
                    if (p) openPartInspectionScreen(p);
                } else if (cat.label.includes("GUARDAR")) {
                    txtCat.text = "✓ GUARDADO";
                    setTimeout(() => txtCat.text = cat.label, 1200);
                }
            });

            navStack.addControl(btnCat);
        });

        // Botón de Pantalla Completa en la esquina superior derecha del taller
        btnFullScreen = new GUI.Rectangle("btnFullScreen");
        btnFullScreen.width = "165px";
        btnFullScreen.height = "38px";
        btnFullScreen.cornerRadius = 8;
        btnFullScreen.background = "rgba(10, 20, 38, 0.92)";
        btnFullScreen.color = "#00e5ff";
        btnFullScreen.thickness = 1.5;
        btnFullScreen.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
        btnFullScreen.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
        btnFullScreen.left = "-20px";
        btnFullScreen.top = "12px";
        btnFullScreen.isPointerBlocker = true;
        btnFullScreen.hoverCursor = "pointer";
        const txtFullScreen = new GUI.TextBlock();
        txtFullScreen.text = "⛶ Pantalla Completa (F11)";
        txtFullScreen.color = "#38bdf8";
        txtFullScreen.fontSize = 10.5;
        txtFullScreen.fontStyle = "bold";
        btnFullScreen.addControl(txtFullScreen);
        btnFullScreen.onPointerClickObservable.add(toggleFullScreen);
        ui.addControl(btnFullScreen);

        // ================= TARJETA IZQUIERDA DE TELEMETRÍA (ESTILO DRL SIMULATOR) =================
        telemetryCard = new GUI.Rectangle("telemetryCard");
        telemetryCard.width = "250px";
        telemetryCard.height = "420px";
        telemetryCard.cornerRadius = 10;
        telemetryCard.thickness = 1.5;
        telemetryCard.color = "#00e5ff";
        telemetryCard.background = "rgba(6, 12, 28, 0.94)";
        telemetryCard.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        telemetryCard.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_CENTER;
        telemetryCard.left = "20px";
        telemetryCard.isPointerBlocker = true;
        ui.addControl(telemetryCard);

        const tStack = new GUI.StackPanel();
        tStack.width = "225px";
        tStack.top = "10px";
        tStack.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
        telemetryCard.addControl(tStack);

        const tTitle = new GUI.TextBlock();
        tTitle.text = "DRL RACER4 • PRO FPV";
        tTitle.color = "#00e5ff";
        tTitle.fontSize = 12;
        tTitle.fontStyle = "bold";
        tTitle.height = "22px";
        tTitle.textHorizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        tStack.addControl(tTitle);

        const tMode = new GUI.TextBlock();
        tMode.text = "● SIMULADOR DE INGENIERÍA 3D";
        tMode.color = "#34d399";
        tMode.fontSize = 9.5;
        tMode.fontStyle = "bold";
        tMode.height = "16px";
        tMode.textHorizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        tStack.addControl(tMode);

        const rowSpecs: { [key: string]: GUI.TextBlock } = {};
        const specKeys = [
            { label: "THRUST (EMPUJE)", key: "thrust", defaultVal: "7566 g" },
            { label: "WEIGHT (PESO)", key: "weight", defaultVal: "1286 g" },
            { label: "TOP SPEED", key: "speed", defaultVal: "123 kph" },
            { label: "TORQUE", key: "torque", defaultVal: "1.05 Nm" },
            { label: "DRAG MODEL", key: "drag", defaultVal: "0.10 Ns/m" },
            { label: "MAX RPM", key: "rpm", defaultVal: "17794" },
            { label: "PEAK TEMP", key: "temp", defaultVal: "32 °C" }
        ];

        specKeys.forEach(s => {
            const row = new GUI.Rectangle();
            row.height = "24px";
            row.thickness = 0;

            const lbl = new GUI.TextBlock();
            lbl.text = s.label;
            lbl.color = "#94a3b8";
            lbl.fontSize = 10;
            lbl.textHorizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
            row.addControl(lbl);

            const val = new GUI.TextBlock();
            val.text = s.defaultVal;
            val.color = "#ffffff";
            val.fontSize = 10.5;
            val.fontStyle = "bold";
            val.textHorizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
            row.addControl(val);
            rowSpecs[s.key] = val;

            tStack.addControl(row);
        });

        // Banner amarillo de aerodinámica DRL
        const aeroTag = new GUI.Rectangle("aeroTag");
        aeroTag.width = "225px";
        aeroTag.height = "28px";
        aeroTag.cornerRadius = 4;
        aeroTag.thickness = 0;
        aeroTag.background = "#eab308";
        aeroTag.top = "8px";
        const txtAeroTag = new GUI.TextBlock();
        txtAeroTag.text = "UNSTEADY DRAG MODEL ≋ DRL";
        txtAeroTag.color = "#000000";
        txtAeroTag.fontSize = 10;
        txtAeroTag.fontStyle = "bold";
        aeroTag.addControl(txtAeroTag);
        tStack.addControl(aeroTag);

        // Botones de acción inferior en la tarjeta izquierda
        const tActionRow = new GUI.StackPanel();
        tActionRow.isVertical = false;
        tActionRow.height = "38px";
        tActionRow.top = "16px";
        tStack.addControl(tActionRow);

        function makeMiniAction(txt: string, bg: string, color: string) {
            const btn = new GUI.Rectangle();
            btn.width = "72px";
            btn.height = "32px";
            btn.cornerRadius = 6;
            btn.thickness = 1;
            btn.color = color;
            btn.background = bg;
            btn.left = "2px";
            btn.isPointerBlocker = true;
            btn.hoverCursor = "pointer";
            const bTxt = new GUI.TextBlock();
            bTxt.text = txt;
            bTxt.color = "white";
            bTxt.fontSize = 9.5;
            bTxt.fontStyle = "bold";
            btn.addControl(bTxt);
            tActionRow.addControl(btn);
            return btn;
        }

        const btnLeftAssemble = makeMiniAction("⚡ Armar", "#047857", "#34d399");
        const btnLeftFly = makeMiniAction("🚀 Volar", "#15803d", "#4ade80");
        const btnLeftAero = makeMiniAction("🌐 Vectores", "#0284c7", "#38bdf8");

        btnLeftAssemble.onPointerClickObservable.add(() => {
            PARTS.forEach(p => {
                p.group.position.copyFrom(p.assembledPos);
                p.group.rotation.set(0, 0, 0);
                p.isAssembled = true;
            });
            updateLabelsVisibility();
            updateHUD();
            buildPartsDrawerCards();
            updatePartsDrawer();
        });
        btnLeftFly.onPointerClickObservable.add(startLiveFlight);
        btnLeftAero.onPointerClickObservable.add(() => {
            isAeroVisible = !isAeroVisible;
            const isFullyAssembled = PARTS.every(p => p.isAssembled);
            if (aeroSystemRoot) aeroSystemRoot.setEnabled((isFullyAssembled || isFlightMode) && isAeroVisible);
            thrustVectorMeshes.forEach(tv => tv.label.isVisible = (isFullyAssembled || isFlightMode) && isAeroVisible);
        });

        // ================= SELECTOR DERECHO DE MODELOS (ESTILO DRL DRAWER) =================
        frameDrawer = new GUI.Rectangle("frameDrawer");
        frameDrawer.width = "255px";
        frameDrawer.height = "420px";
        frameDrawer.cornerRadius = 10;
        frameDrawer.thickness = 1.5;
        frameDrawer.color = "#00e5ff";
        frameDrawer.background = "rgba(6, 12, 28, 0.94)";
        frameDrawer.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
        frameDrawer.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_CENTER;
        frameDrawer.left = "-20px";
        frameDrawer.isPointerBlocker = true;
        ui.addControl(frameDrawer);

        const fStack = new GUI.StackPanel();
        fStack.width = "230px";
        fStack.top = "10px";
        fStack.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
        frameDrawer.addControl(fStack);

        const fTitle = new GUI.TextBlock();
        fTitle.text = "SELECCIÓN DE CHASIS (FRAME)";
        fTitle.color = "#00e5ff";
        fTitle.fontSize = 11;
        fTitle.fontStyle = "bold";
        fTitle.height = "22px";
        fTitle.textHorizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        fStack.addControl(fTitle);

        const frameModels = [
            { id: "drl_racer", title: "DRL Racer4", desc: "FPV Competición • 220mm • 748g", thrust: "7566 g", speed: "123 kph", weight: "1286 g" },
            { id: "zd550", title: "ZD550 Quad", desc: "Rescate Forestal • 550mm • 1480g", thrust: "5000 g", speed: "78 kph", weight: "1680 g" },
            { id: "tarot680", title: "Tarot 680 Pro", desc: "Hexa Carga Pesada • 680mm • 2450g", thrust: "7500 g", speed: "65 kph", weight: "2450 g" },
            { id: "f450", title: "F450 Scout", desc: "Plataforma Compacta • 450mm • 920g", thrust: "3800 g", speed: "85 kph", weight: "980 g" }
        ];

        const modelCardBtns: GUI.Rectangle[] = [];

        frameModels.forEach(m => {
            const card = new GUI.Rectangle("card_" + m.id);
            card.height = "64px";
            card.width = "225px";
            card.cornerRadius = 6;
            card.thickness = (m.id === activePrototypeId) ? 2 : 1;
            card.color = (m.id === activePrototypeId) ? "#00e5ff" : "rgba(148, 163, 184, 0.3)";
            card.background = (m.id === activePrototypeId) ? "rgba(0, 160, 220, 0.25)" : "rgba(15, 23, 42, 0.8)";
            card.top = "4px";
            card.isPointerBlocker = true;
            card.hoverCursor = "pointer";

            const cStack = new GUI.StackPanel();
            cStack.left = "8px";
            cStack.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_CENTER;
            cStack.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
            card.addControl(cStack);

            const cHead = new GUI.TextBlock();
            cHead.text = m.title;
            cHead.color = (m.id === activePrototypeId) ? "#38bdf8" : "#ffffff";
            cHead.fontSize = 11;
            cHead.fontStyle = "bold";
            cHead.height = "18px";
            cHead.textHorizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
            cStack.addControl(cHead);

            const cDesc = new GUI.TextBlock();
            cDesc.text = m.desc;
            cDesc.color = "#94a3b8";
            cDesc.fontSize = 9.5;
            cDesc.height = "16px";
            cDesc.textHorizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
            cStack.addControl(cDesc);

            card.onPointerClickObservable.add(() => {
                activePrototypeId = m.id;
                buildDroneComponents(activePrototypeId);
                modelCardBtns.forEach((cb, cbi) => {
                    const isSelected = (frameModels[cbi].id === activePrototypeId);
                    cb.thickness = isSelected ? 2 : 1;
                    cb.color = isSelected ? "#00e5ff" : "rgba(148, 163, 184, 0.3)";
                    cb.background = isSelected ? "rgba(0, 160, 220, 0.25)" : "rgba(15, 23, 42, 0.8)";
                });
                tTitle.text = `${m.title.toUpperCase()} • SIMULADOR`;
                if (rowSpecs["thrust"]) rowSpecs["thrust"].text = m.thrust;
                if (rowSpecs["weight"]) rowSpecs["weight"].text = m.weight;
                if (rowSpecs["speed"]) rowSpecs["speed"].text = m.speed;
            });

            fStack.addControl(card);
            modelCardBtns.push(card);
        });

        // Badge técnico inferior del drawer
        const dBadge = new GUI.Rectangle("dBadge");
        dBadge.width = "225px";
        dBadge.height = "42px";
        dBadge.cornerRadius = 6;
        dBadge.thickness = 1;
        dBadge.color = "rgba(0, 229, 255, 0.3)";
        dBadge.background = "rgba(10, 20, 38, 0.85)";
        dBadge.top = "10px";
        const txtDBadge = new GUI.TextBlock();
        txtDBadge.text = "DRL RACER 4 • SIZE: 220mm\n*Advanced Unsteady Drag Physics";
        txtDBadge.color = "#38bdf8";
        txtDBadge.fontSize = 9.5;
        txtDBadge.fontStyle = "bold";
        dBadge.addControl(txtDBadge);
        fStack.addControl(dBadge);

        // ================= APARTADO DE COMPONENTES DEL DRON (ESTILO LIFTOFF) =================
        partsDrawer = new GUI.Rectangle("partsDrawer");
        partsDrawer.width = "890px";
        partsDrawer.height = "104px";
        partsDrawer.cornerRadius = 8;
        partsDrawer.thickness = 1.5;
        partsDrawer.color = "#00e5ff";
        partsDrawer.background = "rgba(6, 12, 28, 0.95)";
        partsDrawer.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
        partsDrawer.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
        partsDrawer.top = "-72px";
        partsDrawer.isPointerBlocker = true;
        ui.addControl(partsDrawer);

        const drawerStack = new GUI.StackPanel();
        drawerStack.width = "100%";
        drawerStack.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
        partsDrawer.addControl(drawerStack);

        const drawerHeader = new GUI.Rectangle("drawerHeader");
        drawerHeader.height = "26px";
        drawerHeader.width = "100%";
        drawerHeader.thickness = 0;
        drawerHeader.background = "rgba(10, 25, 48, 0.9)";
        drawerStack.addControl(drawerHeader);

        const txtDrawerTitle = new GUI.TextBlock();
        txtDrawerTitle.text = "📦 CATÁLOGO DE PIEZAS DEL DRON (LIFTOFF) • ARRASTRA EN LA MESA O TOCA PARA MONTAR";
        txtDrawerTitle.color = "#38bdf8";
        txtDrawerTitle.fontSize = 10;
        txtDrawerTitle.fontStyle = "bold";
        txtDrawerTitle.left = "14px";
        txtDrawerTitle.textHorizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        drawerHeader.addControl(txtDrawerTitle);

        const txtDrawerProgress = new GUI.TextBlock();
        txtDrawerProgress.text = "ENSAMBLAJE: 8/8 (100%)";
        txtDrawerProgress.color = "#34d399";
        txtDrawerProgress.fontSize = 10;
        txtDrawerProgress.fontStyle = "bold";
        txtDrawerProgress.left = "-14px";
        txtDrawerProgress.textHorizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
        drawerHeader.addControl(txtDrawerProgress);

        const partsCardsRow = new GUI.StackPanel("partsCardsRow");
        partsCardsRow.isVertical = false;
        partsCardsRow.height = "76px";
        partsCardsRow.width = "100%";
        partsCardsRow.top = "2px";
        drawerStack.addControl(partsCardsRow);

        let partCardElements: { card: GUI.Rectangle; badgeText: GUI.TextBlock; badgeRect: GUI.Rectangle; part: any }[] = [];

        buildPartsDrawerCards = function() {
            partsCardsRow.clearControls();
            partCardElements = [];

            PARTS.forEach((p) => {
                const card = new GUI.Rectangle("pCard_" + p.id);
                card.width = "104px";
                card.height = "68px";
                card.cornerRadius = 6;
                card.thickness = p.isAssembled ? 1 : 1.5;
                card.color = p.isAssembled ? "rgba(52, 211, 153, 0.4)" : "#00e5ff";
                card.background = p.isAssembled ? "rgba(6, 78, 59, 0.3)" : "rgba(15, 23, 42, 0.85)";
                card.left = "3px";
                card.isPointerBlocker = true;
                card.hoverCursor = "pointer";

                const cStack = new GUI.StackPanel();
                cStack.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_CENTER;
                card.addControl(cStack);

                const cTitle = new GUI.TextBlock();
                cTitle.text = p.shortTag;
                cTitle.color = "#ffffff";
                cTitle.fontSize = 8.8;
                cTitle.fontStyle = "bold";
                cTitle.height = "16px";
                cStack.addControl(cTitle);

                const cSub = new GUI.TextBlock();
                cSub.text = p.category ? p.category.split(" ")[0] : "COMPONENTE";
                cSub.color = "#94a3b8";
                cSub.fontSize = 7.5;
                cSub.height = "14px";
                cStack.addControl(cSub);

                const badgeRect = new GUI.Rectangle();
                badgeRect.width = "92px";
                badgeRect.height = "18px";
                badgeRect.cornerRadius = 4;
                badgeRect.thickness = 0;
                badgeRect.background = p.isAssembled ? "#059669" : "#0284c7";

                const badgeText = new GUI.TextBlock();
                badgeText.text = p.isAssembled ? "✓ MONTADA" : "🖐️ EN MESA";
                badgeText.color = "#ffffff";
                badgeText.fontSize = 8.5;
                badgeText.fontStyle = "bold";
                badgeRect.addControl(badgeText);
                cStack.addControl(badgeRect);

                card.onPointerClickObservable.add(() => {
                    if (p.isAssembled) {
                        disassemblePart(p);
                    } else {
                        snapPartToAssembled(p);
                    }
                    showWorkbenchDossier(p);
                });

                partsCardsRow.addControl(card);
                partCardElements.push({ card, badgeText, badgeRect, part: p });
            });
            updatePartsDrawer();
        };
        buildPartsDrawerCards();

        updatePartsDrawer = function() {
            const assembledCount = PARTS.filter(p => p.isAssembled).length;
            txtDrawerProgress.text = `ENSAMBLAJE: ${assembledCount} / ${PARTS.length} (${Math.round((assembledCount / PARTS.length) * 100)}%)`;
            txtDrawerProgress.color = (assembledCount === PARTS.length) ? "#34d399" : "#fbbf24";

            partCardElements.forEach(item => {
                const isAss = item.part.isAssembled;
                item.badgeText.text = isAss ? "✓ MONTADA" : "🖐️ EN MESA";
                item.badgeRect.background = isAss ? "#059669" : "#0284c7";
                item.card.thickness = isAss ? 1 : 1.5;
                item.card.color = isAss ? "rgba(52, 211, 153, 0.4)" : "#00e5ff";
                item.card.background = isAss ? "rgba(6, 78, 59, 0.3)" : "rgba(15, 23, 42, 0.85)";
            });
        };

        // ================= FICHA TÉCNICA DEDICADA DE PIEZA EN BANCO (ESTILO LIFTOFF) =================
        workbenchDossier = new GUI.Rectangle("workbenchDossier");
        workbenchDossier.width = "300px";
        workbenchDossier.height = "380px";
        workbenchDossier.cornerRadius = 10;
        workbenchDossier.thickness = 1.5;
        workbenchDossier.color = "#00e5ff";
        workbenchDossier.background = "rgba(4, 10, 24, 0.96)";
        workbenchDossier.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
        workbenchDossier.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_CENTER;
        workbenchDossier.left = "-20px";
        workbenchDossier.isPointerBlocker = true;
        workbenchDossier.isVisible = false;
        ui.addControl(workbenchDossier);

        const wStack = new GUI.StackPanel();
        wStack.width = "270px";
        wStack.top = "10px";
        wStack.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
        workbenchDossier.addControl(wStack);

        const wHeaderRow = new GUI.Rectangle();
        wHeaderRow.height = "24px";
        wHeaderRow.thickness = 0;
        wStack.addControl(wHeaderRow);

        const txtWCat = new GUI.TextBlock();
        txtWCat.text = "FICHA TÉCNICA";
        txtWCat.color = "#38bdf8";
        txtWCat.fontSize = 10;
        txtWCat.fontStyle = "bold";
        txtWCat.textHorizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        wHeaderRow.addControl(txtWCat);

        const btnWClose = new GUI.Rectangle();
        btnWClose.width = "24px";
        btnWClose.height = "24px";
        btnWClose.cornerRadius = 4;
        btnWClose.background = "rgba(239, 68, 68, 0.2)";
        btnWClose.color = "#ef4444";
        btnWClose.thickness = 1;
        btnWClose.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
        btnWClose.hoverCursor = "pointer";
        const txtWClose = new GUI.TextBlock();
        txtWClose.text = "✕";
        txtWClose.color = "#ef4444";
        txtWClose.fontSize = 12;
        txtWClose.fontStyle = "bold";
        btnWClose.addControl(txtWClose);
        btnWClose.onPointerClickObservable.add(() => {
            workbenchDossier!.isVisible = false;
            hl.removeAllMeshes();
        });
        wHeaderRow.addControl(btnWClose);

        const txtWTitle = new GUI.TextBlock();
        txtWTitle.text = "COMPONENTE";
        txtWTitle.color = "#ffffff";
        txtWTitle.fontSize = 12.5;
        txtWTitle.fontStyle = "bold";
        txtWTitle.textWrapping = true;
        txtWTitle.height = "36px";
        txtWTitle.textHorizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        wStack.addControl(txtWTitle);

        const txtWMat = new GUI.TextBlock();
        txtWMat.text = "Material: ...";
        txtWMat.color = "#00e5ff";
        txtWMat.fontSize = 10;
        txtWMat.textWrapping = true;
        txtWMat.height = "28px";
        txtWMat.textHorizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        wStack.addControl(txtWMat);

        const txtWSpecs = new GUI.TextBlock();
        txtWSpecs.text = "...";
        txtWSpecs.color = "#cbd5e1";
        txtWSpecs.fontSize = 9.5;
        txtWSpecs.textWrapping = true;
        txtWSpecs.height = "90px";
        txtWSpecs.textHorizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        wStack.addControl(txtWSpecs);

        const wAlertBox = new GUI.Rectangle();
        wAlertBox.height = "52px";
        wAlertBox.width = "270px";
        wAlertBox.cornerRadius = 6;
        wAlertBox.background = "rgba(180, 83, 9, 0.25)";
        wAlertBox.color = "#f59e0b";
        wAlertBox.thickness = 1;
        wStack.addControl(wAlertBox);

        const txtWAlert = new GUI.TextBlock();
        txtWAlert.text = "⚠️ Regla de Ingeniería: ...";
        txtWAlert.color = "#fde68a";
        txtWAlert.fontSize = 8.5;
        txtWAlert.textWrapping = true;
        txtWAlert.paddingLeft = "6px";
        txtWAlert.paddingRight = "6px";
        wAlertBox.addControl(txtWAlert);

        const wActionRow = new GUI.StackPanel();
        wActionRow.isVertical = false;
        wActionRow.height = "36px";
        wActionRow.top = "10px";
        wStack.addControl(wActionRow);

        let activeDossierPart: any = null;

        const btnWMount = new GUI.Rectangle();
        btnWMount.width = "130px";
        btnWMount.height = "30px";
        btnWMount.cornerRadius = 6;
        btnWMount.background = "#059669";
        btnWMount.color = "#34d399";
        btnWMount.thickness = 1;
        btnWMount.hoverCursor = "pointer";
        const txtWMount = new GUI.TextBlock();
        txtWMount.text = "🔧 Montar / Quitar";
        txtWMount.color = "#ffffff";
        txtWMount.fontSize = 10;
        txtWMount.fontStyle = "bold";
        btnWMount.addControl(txtWMount);
        btnWMount.onPointerClickObservable.add(() => {
            if (!activeDossierPart) return;
            if (activeDossierPart.isAssembled) {
                disassemblePart(activeDossierPart);
            } else {
                snapPartToAssembled(activeDossierPart);
            }
            updateWorkbenchDossier(activeDossierPart);
        });
        wActionRow.addControl(btnWMount);

        const btnWShowroom = new GUI.Rectangle();
        btnWShowroom.width = "130px";
        btnWShowroom.height = "30px";
        btnWShowroom.cornerRadius = 6;
        btnWShowroom.background = "#1d4ed8";
        btnWShowroom.color = "#60a5fa";
        btnWShowroom.thickness = 1;
        btnWShowroom.left = "8px";
        btnWShowroom.hoverCursor = "pointer";
        const txtWShowroom = new GUI.TextBlock();
        txtWShowroom.text = "🔍 Estudio 360°";
        txtWShowroom.color = "#ffffff";
        txtWShowroom.fontSize = 10;
        txtWShowroom.fontStyle = "bold";
        btnWShowroom.addControl(txtWShowroom);
        btnWShowroom.onPointerClickObservable.add(() => {
            if (activeDossierPart) openPartInspectionScreen(activeDossierPart);
        });
        wActionRow.addControl(btnWShowroom);

        function updateWorkbenchDossier(p: any) {
            activeDossierPart = p;
            txtWCat.text = `FICHA • ${p.category ? p.category.split(" ")[0] : "COMPONENTE"}`;
            txtWTitle.text = p.name;
            txtWMat.text = `🔬 ${p.material}`;

            let s = "";
            for (const [k, v] of Object.entries(p.specs || {})) {
                s += `• ${k.toUpperCase()}: ${v}\n`;
            }
            txtWSpecs.text = s || p.desc;
            txtWAlert.text = `⚠️ Ingeniería: ${p.errorReal || "Verificar calibración y tolerancias."}`;

            txtWMount.text = p.isAssembled ? "✖ Desmontar a Mesa" : "🔧 Montar en Dron";
            btnWMount.background = p.isAssembled ? "#991b1b" : "#059669";
            btnWMount.color = p.isAssembled ? "#f87171" : "#34d399";
        }

        showWorkbenchDossier = function(p: any) {
            if (!workbenchDossier) return;
            workbenchDossier.isVisible = true;
            updateWorkbenchDossier(p);
        };

        // Barra inferior de mandos (diseño moderno Liftoff sin botón paso a paso)
        bottomBar = new GUI.Rectangle("bottomBar");
        bottomBar.width = "860px";
        bottomBar.height = "52px";
        bottomBar.cornerRadius = 8;
        bottomBar.thickness = 1;
        bottomBar.color = "rgba(0, 229, 255, 0.4)";
        bottomBar.background = "rgba(4, 10, 24, 0.94)";
        bottomBar.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
        bottomBar.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
        bottomBar.top = "-14px";
        ui.addControl(bottomBar);

        function makeBtn(txt: string, bg: string, leftPx: string, w = "120px") {
            const btn = new GUI.Rectangle();
            btn.width = w;
            btn.height = "34px";
            btn.cornerRadius = 6;
            btn.thickness = 1;
            btn.color = "rgba(255,255,255,0.25)";
            btn.background = bg;
            btn.left = leftPx;
            btn.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
            btn.isPointerBlocker = true;
            btn.hoverCursor = "pointer";

            const t = new GUI.TextBlock();
            t.text = txt;
            t.color = "white";
            t.fontSize = 10;
            t.fontStyle = "bold";
            t.isHitTestVisible = false;
            btn.addControl(t);
            if (bottomBar) bottomBar.addControl(btn);
            return { rect: btn, text: t };
        }

        const btnToggleCatalog = makeBtn("📦 Catálogo Piezas", "#0284c7", "-350px", "130px");
        const btnAssembleAll = makeBtn("⚡ Armar 100%", "#047857", "-210px", "115px");
        const btnFlight = makeBtn("🚀 Probar Vuelo", "#15803d", "-85px", "115px");
        const btnDiag = makeBtn("🧪 Diagnóstico", "#b45309", "40px", "115px");
        const btnIsolate = makeBtn("🔍 Ficha Técnica", "#1d4ed8", "165px", "115px");
        const btnReset = makeBtn("↩ Vaciar a Mesa", "#991b1b", "290px", "115px");

        btnToggleCatalog.rect.onPointerClickObservable.add(() => {
            if (partsDrawer) {
                partsDrawer.isVisible = !partsDrawer.isVisible;
                if (partsDrawer.isVisible) updatePartsDrawer();
            }
        });

        btnAssembleAll.rect.onPointerClickObservable.add(() => {
            PARTS.forEach(p => {
                p.group.position.copyFrom(p.assembledPos);
                p.group.rotation.set(0, 0, 0);
                p.isAssembled = true;
            });
            updateLabelsVisibility();
            updateHUD();
            buildPartsDrawerCards();
            updatePartsDrawer();
        });

        btnDiag.rect.onPointerClickObservable.add(runFlightDiagnostic);
        btnFlight.rect.onPointerClickObservable.add(startLiveFlight);

        btnIsolate.rect.onPointerClickObservable.add(() => {
            const target = PARTS.find(p => !p.isAssembled) || PARTS[0];
            showWorkbenchDossier(target);
        });

        btnReset.rect.onPointerClickObservable.add(resetWorkbench);

        function updateHUD() {
            const assembledCount = PARTS.filter(p => p.isAssembled).length;
            const isFullyAssembled = assembledCount === PARTS.length;

            if (aeroSystemRoot) {
                aeroSystemRoot.setEnabled((isFullyAssembled || isFlightMode) && isAeroVisible);
            }
            thrustVectorMeshes.forEach(tv => {
                tv.label.isVisible = (isFullyAssembled || isFlightMode) && isAeroVisible;
            });
        }

        // ================= CONTROLES DE TECLADO Y FÍSICA DE VUELO =================
        scene.onKeyboardObservable.add((kbInfo) => {
            const key = kbInfo.event.key.toLowerCase();
            const code = kbInfo.event.code ? kbInfo.event.code.toLowerCase() : "";

            if (kbInfo.type === BABYLON.KeyboardEventTypes.KEYDOWN) {
                keyState[key] = true;
                if (code) keyState[code] = true;

                if (key === "escape" || key === "esc" || key === "backspace") {
                    if (isIsolatedInspection) {
                        closePartShowroom();
                    } else if (isFlightMode) {
                        landDrone();
                    }
                }
            } else if (kbInfo.type === BABYLON.KeyboardEventTypes.KEYUP) {
                keyState[key] = false;
                if (code) keyState[code] = false;
            }
        });

        // Bucle de renderizado continuo (Física de Vuelo, Giro de Hélices y Luces Estroboscópicas FAA)
        scene.onBeforeRenderObservable.add(() => {
            const now = performance.now();
            const dt = scene.getEngine().getDeltaTime() / 1000;

            // 1. Destello estroboscópico doble FAA (cada 1200ms)
            const cycle = (now % 1200) / 1200;
            const isFlash = (cycle > 0.0 && cycle < 0.04) || (cycle > 0.12 && cycle < 0.16);
            if (ledStrobeWhiteMat) {
                const intens = isFlash ? 3.0 : 0.08;
                ledStrobeWhiteMat.emissiveColor.set(intens, intens, intens);
            }

            // Pulso suave continuo de navegación verde (estribor) y rojo (babor)
            const pulse = 0.8 + 0.2 * Math.sin(now * 0.006);
            if (ledGreenMat) ledGreenMat.emissiveColor.set(0, pulse * 1.2, 0.25 * pulse);
            if (ledRedMat) ledRedMat.emissiveColor.set(pulse * 1.2, 0.05 * pulse, 0.1 * pulse);

            // Giro dinámico de los vórtices de flujo helicoidales
            if (isAeroVisible && downwashVortices.length > 0) {
                downwashVortices.forEach(vl => {
                    vl.rotation.y += (isFlightMode ? 0.08 : 0.02);
                });
            }

            // 2. Simulación de Vuelo Activa
            if (isFlightMode) {
                const elapsedFlightSec = Math.floor((now - flightStartTime) / 1000);

                // Spool-up / Spool-down de hélices
                const targetSpin = isLanding ? 0.0 : 0.65;
                propSpinSpeed = BABYLON.Scalar.Lerp(propSpinSpeed, targetSpin, dt * 3.5);

                propNodes.forEach((pn, idx) => {
                    const dir = (idx % 2 === 0) ? 1 : -1;
                    pn.rotation.y += propSpinSpeed * dir;
                });

                if (isLanding) {
                    // Descenso y nivelación automática hacia el banco
                    const restY = (activePrototypeId === "drl_racer") ? 0.045 : (activePrototypeId === "tarot680" ? 0.235 : 0.225);
                    droneRoot.position.x = BABYLON.Scalar.Lerp(droneRoot.position.x, 0, dt * 2.2);
                    droneRoot.position.z = BABYLON.Scalar.Lerp(droneRoot.position.z, 0.02, dt * 2.2);
                    droneRoot.position.y = BABYLON.Scalar.Lerp(droneRoot.position.y, restY, dt * 1.8);

                    droneRoot.rotation.x = BABYLON.Scalar.Lerp(droneRoot.rotation.x, 0, dt * 3.0);
                    droneRoot.rotation.z = BABYLON.Scalar.Lerp(droneRoot.rotation.z, 0, dt * 3.0);
                    droneRoot.rotation.y = BABYLON.Scalar.Lerp(droneRoot.rotation.y, 0, dt * 2.0);

                    if (Math.abs(droneRoot.position.y - restY) < 0.025 && propSpinSpeed < 0.05) {
                        droneRoot.position.set(0, restY, 0.02);
                        droneRoot.rotation.set(0, 0, 0);
                        isFlightMode = false;
                        isLanding = false;
                        propSpinSpeed = 0;
                        flightHud.isVisible = false;
                        setWorkshopUIVisibility(true);
                        updateLabelsVisibility();
                        camera.setTarget(new BABYLON.Vector3(0, 0.12, 0.02));
                        camera.radius = 1.25;
                    }
                    return;
                }

                // Lectura de controles interactivos (WASD, Espacio, C, QE)
                let throttleInput = 0;
                if (keyState[" "] || keyState["space"]) throttleInput += 1;
                if (keyState["c"] || keyState["shift"] || keyState["shiftleft"]) throttleInput -= 1;

                flightTargetY += throttleInput * 0.45 * dt;
                flightTargetY = BABYLON.Scalar.Clamp(flightTargetY, 0.35, 2.2);

                let pitchInput = 0;
                if (keyState["w"] || keyState["arrowup"]) pitchInput += 1;
                if (keyState["s"] || keyState["arrowdown"]) pitchInput -= 1;

                let rollInput = 0;
                if (keyState["d"] || keyState["arrowright"]) rollInput += 1;
                if (keyState["a"] || keyState["arrowleft"]) rollInput -= 1;

                let yawInput = 0;
                if (keyState["e"]) yawInput += 1;
                if (keyState["q"]) yawInput -= 1;

                // Inclinaciones físicas (Pitch y Roll) con amortiguación PID
                const targetPitch = pitchInput * -0.16;
                const targetRoll = rollInput * 0.18;
                droneRoot.rotation.x = BABYLON.Scalar.Lerp(droneRoot.rotation.x, targetPitch, dt * 5.0);
                droneRoot.rotation.z = BABYLON.Scalar.Lerp(droneRoot.rotation.z, targetRoll, dt * 5.0);
                droneRoot.rotation.y += yawInput * 1.5 * dt;

                // Desplazamiento horizontal según la orientación
                const forward = droneRoot.forward.scale(pitchInput * 0.55 * dt);
                const right = droneRoot.right.scale(rollInput * 0.55 * dt);
                droneRoot.position.addInPlace(forward);
                droneRoot.position.addInPlace(right);

                // Límites de seguridad para el taller
                droneRoot.position.x = BABYLON.Scalar.Clamp(droneRoot.position.x, -1.8, 1.8);
                droneRoot.position.z = BABYLON.Scalar.Clamp(droneRoot.position.z, -1.8, 1.8);

                // Altitud y micro-turbulencia procedural realista
                const turb = Math.sin(now * 0.0035) * 0.012 + Math.cos(now * 0.0022) * 0.006;
                droneRoot.position.y = BABYLON.Scalar.Lerp(droneRoot.position.y, flightTargetY + turb, dt * 3.5);

                // La cámara sigue al dron suavemente
                camera.setTarget(BABYLON.Vector3.Lerp(camera.target, droneRoot.position, dt * 4.0));

                // Actualización de Telemetría en el HUD en tiempo real
                const isHexa = (activePrototypeId === "tarot680");
                const agl = Math.max(0, droneRoot.position.y - 0.16);
                const baseThrust = isHexa ? 48.0 : 44.8;
                const dynThrust = baseThrust + (throttleInput * 8.0) + (pitchInput !== 0 || rollInput !== 0 ? 3.5 : 0);
                const dynRPM = Math.round(6200 + (throttleInput * 1100) + Math.sin(now * 0.01) * 60);
                const battVolts = Math.max(10.5, 12.4 - (elapsedFlightSec * 0.02) - (throttleInput > 0 ? 0.35 : 0));
                const dynAmps = Math.round(22.0 + (throttleInput * 12.0) + (isHexa ? 6 : 0));

                txtFlightAgl.text = `ALTITUD AGL: ${agl.toFixed(2)} m`;
                txtFlightThrust.text = `EMPUJE: ${dynThrust.toFixed(1)} N (${dynRPM} RPM)`;
                txtFlightBattery.text = `BATERÍA: ${battVolts.toFixed(1)}V • ${dynAmps}A`;
                txtFlightAttitude.text = `P: ${(droneRoot.rotation.x * 57.3).toFixed(1)}° | R: ${(droneRoot.rotation.z * 57.3).toFixed(1)}° | Y: ${(droneRoot.rotation.y * 57.3).toFixed(1)}°`;

                // Escalar dinámicamente los vectores de empuje según el acelerador
                thrustVectorMeshes.forEach((tv) => {
                    const scaleY = 1.0 + (throttleInput * 0.35);
                    tv.shaft.scaling.y = scaleY;
                    tv.shaft.position.y = (tv.baseHeight * scaleY) / 2;
                    tv.tip.position.y = (tv.baseHeight * scaleY) + 0.015;
                });
            }
        });

        // ================= SISTEMA DE ARRASTRE Y ENSAMBLAJE 3D (DRAG & DROP EN MESA) =================
        let draggedPart: any = null;
        let isDragging = false;
        let dragPointerStart = { x: 0, y: 0 };
        let dragOffset = new BABYLON.Vector3(0, 0, 0);
        const dragPlane = BABYLON.Plane.FromPositionAndNormal(new BABYLON.Vector3(0, 0.025, 0), BABYLON.Vector3.Up());

        scene.onPointerDown = function (evt, pick) {
            if (isIsolatedInspection || isFlightMode) return;
            if (evt.button === 0 && pick.hit && pick.pickedMesh) {
                const m = pick.pickedMesh;
                for (let i = 0; i < PARTS.length; i++) {
                    const part = PARTS[i];
                    if (part.group === m || part.group.getChildren().includes(m) || m.isDescendantOf(part.group)) {
                        draggedPart = part;
                        isDragging = false;
                        dragPointerStart = { x: scene.pointerX, y: scene.pointerY };

                        // Desactivar temporalmente controles de cámara orbital mientras se manipula la pieza
                        camera.detachControl();

                        // Calcular punto de intersección inicial sobre el plano del banco de trabajo
                        const ray = scene.createPickingRay(scene.pointerX, scene.pointerY, BABYLON.Matrix.Identity(), camera);
                        const dist = ray.intersectsPlane(dragPlane);
                        if (dist !== null) {
                            const hit = ray.origin.add(ray.direction.scale(dist));
                            dragOffset = part.group.position.subtract(hit);
                        } else {
                            dragOffset = BABYLON.Vector3.Zero();
                        }
                        break;
                    }
                }
            }
        };

        scene.onPointerMove = function (evt, pick) {
            if (isIsolatedInspection || isFlightMode) return;

            if (draggedPart) {
                const moveDist = Math.hypot(scene.pointerX - dragPointerStart.x, scene.pointerY - dragPointerStart.y);
                if (moveDist > 5) {
                    isDragging = true;
                }

                if (isDragging) {
                    const ray = scene.createPickingRay(scene.pointerX, scene.pointerY, BABYLON.Matrix.Identity(), camera);
                    const dist = ray.intersectsPlane(dragPlane);
                    if (dist !== null) {
                        const hit = ray.origin.add(ray.direction.scale(dist));
                        const targetPos = hit.add(dragOffset);

                        // Delimitar coordenadas dentro de la mesa y estera de corte
                        targetPos.x = BABYLON.Scalar.Clamp(targetPos.x, -0.65, 0.65);
                        targetPos.z = BABYLON.Scalar.Clamp(targetPos.z, -0.45, 0.45);
                        targetPos.y = 0.045; // Elevar ligeramente sobre la estera para feedback visual

                        draggedPart.group.position.copyFrom(targetPos);

                        // Activar anillo y disco holográfico de montaje (Snap Target)
                        snapRing.isVisible = true;
                        snapDisc.isVisible = true;

                        const distToSnap = Math.hypot(targetPos.x, targetPos.z - 0.02);
                        if (distToSnap < 0.22) {
                            // Dentro del radio de ensamblaje -> Anillo se ilumina en verde esmeralda brillante
                            snapRingMat.emissiveColor.set(0.1, 1.0, 0.4);
                            snapDiscMat.emissiveColor.set(0.1, 1.0, 0.4);
                            snapDiscMat.alpha = 0.55;
                            hl.removeAllMeshes();
                            draggedPart.group.getChildMeshes().forEach((cm: any) => hl.addMesh(cm, BABYLON.Color3.FromHexString("#10b981")));
                        } else {
                            // Fuera del radio de ensamblaje (en la mesa) -> Halo cian
                            snapRingMat.emissiveColor.set(0.0, 0.85, 1.0);
                            snapDiscMat.emissiveColor.set(0.0, 0.6, 1.0);
                            snapDiscMat.alpha = 0.25;
                            hl.removeAllMeshes();
                            draggedPart.group.getChildMeshes().forEach((cm: any) => hl.addMesh(cm, BABYLON.Color3.FromHexString("#00e5ff")));
                        }
                    }
                    return;
                }
            }

            // Resaltado Hover cuando el ratón pasa por encima de una pieza
            if (pick.hit && pick.pickedMesh) {
                const m = pick.pickedMesh;
                let found = false;
                for (let i = 0; i < PARTS.length; i++) {
                    const part = PARTS[i];
                    if (part.group === m || part.group.getChildren().includes(m) || m.isDescendantOf(part.group)) {
                        hl.removeAllMeshes();
                        part.group.getChildMeshes().forEach((cm: any) => hl.addMesh(cm, BABYLON.Color3.FromHexString("#00e5ff")));
                        found = true;
                        break;
                    }
                }
                if (!found && hl) hl.removeAllMeshes();
            } else if (hl) {
                hl.removeAllMeshes();
            }
        };

        scene.onPointerUp = function (evt, pick) {
            const canvas = scene.getEngine().getRenderingCanvas();
            if (canvas) camera.attachControl(canvas, true);

            if (isIsolatedInspection || isFlightMode) {
                return;
            }

            if (draggedPart) {
                snapRing.isVisible = false;
                snapDisc.isVisible = false;

                if (isDragging) {
                    const distToSnap = Math.hypot(draggedPart.group.position.x, draggedPart.group.position.z - 0.02);
                    if (distToSnap < 0.22) {
                        // ¡Distancia menor a 22cm del centro: Enganche magnético perfecto en el dron!
                        snapPartToAssembled(draggedPart);
                        showWorkbenchDossier(draggedPart);
                    } else {
                        // Soltado sobre la mesa: permanece en reposo en esa posición
                        draggedPart.isAssembled = false;
                        draggedPart.group.position.y = draggedPart.benchPos.y;
                        updateLabelsVisibility();
                        updateHUD();
                        updatePartsDrawer();
                        showWorkbenchDossier(draggedPart);
                    }
                } else {
                    // Clic simple sin arrastre: Abre la ficha técnica lateral en la mesa de trabajo
                    showWorkbenchDossier(draggedPart);
                }

                draggedPart = null;
                isDragging = false;
                hl.removeAllMeshes();
            }
        };

        // Iniciar con prototipo DRL Racer4 100% armado en el centro
        buildDroneComponents(activePrototypeId);
    }
}
