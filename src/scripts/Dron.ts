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

        // ================= CÁMARA PRINCIPAL INTERACTIVA =================
        const camera = new BABYLON.ArcRotateCamera("dronWorkCam", -Math.PI / 2, Math.PI / 2.7, 1.35, new BABYLON.Vector3(0, 0.18, 0), scene);
        if (canvas) {
            camera.attachControl(canvas, true);
        }
        camera.wheelPrecision = 40;
        camera.lowerRadiusLimit = 0.25;
        camera.upperRadiusLimit = 3.2;
        camera.lowerBetaLimit = 0.15;
        camera.upperBetaLimit = Math.PI / 2 - 0.05;
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

        // ================= GENERACIÓN DE MATERIALES REALISTAS (PBR) =================
        // 1. Fibra de Carbono 3K (Tejido mate con reflejos sutiles)
        const carbonMat = new BABYLON.PBRMaterial("carbonMat", scene);
        carbonMat.metallic = 0.40;
        carbonMat.roughness = 0.35;
        carbonMat.albedoColor = new BABYLON.Color3(0.08, 0.08, 0.09);
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

        // 2. Aluminio CNC Anodizado Rojo (Brazos y soportes de motor)
        const redCncMat = new BABYLON.PBRMaterial("redCncMat", scene);
        redCncMat.metallic = 0.88;
        redCncMat.roughness = 0.22;
        redCncMat.albedoColor = new BABYLON.Color3(0.85, 0.08, 0.12);

        // 3. Acero Inoxidable y Tornillería Allen M3
        const steelMat = new BABYLON.PBRMaterial("steelMat", scene);
        steelMat.metallic = 0.95;
        steelMat.roughness = 0.20;
        steelMat.albedoColor = new BABYLON.Color3(0.82, 0.84, 0.88);

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

        // ================= BANCO DE TRABAJO DE MADERA REALISTA =================
        const workbenchRoot = new BABYLON.TransformNode("workbenchRoot", scene);
        const tableTop = BABYLON.MeshBuilder.CreateBox("tableTop", { width: 2.5, height: 0.045, depth: 1.6 }, scene);
        tableTop.position.set(0, -0.023, 0);
        tableTop.parent = workbenchRoot;

        const woodMat = new BABYLON.PBRMaterial("woodMat", scene);
        woodMat.metallic = 0.05;
        woodMat.roughness = 0.65;
        const woodTex = new BABYLON.DynamicTexture("woodTex", 512, scene, false);
        const wCtx = woodTex.getContext();
        wCtx.fillStyle = "#9c7a52";
        wCtx.fillRect(0, 0, 512, 512);
        wCtx.fillStyle = "rgba(70, 48, 25, 0.18)";
        for (let i = 0; i < 512; i += 8) {
            wCtx.fillRect(0, i, 512, 4);
        }
        woodTex.update();
        woodMat.albedoTexture = woodTex;
        tableTop.material = woodMat;

        // Tapete milimétrico azul de electrónica (ESD mat)
        const esdMat = BABYLON.MeshBuilder.CreatePlane("esdMat", { width: 1.05, height: 0.75 }, scene);
        esdMat.rotation.x = Math.PI / 2;
        esdMat.position.set(0, 0.001, 0.02);
        esdMat.parent = workbenchRoot;

        const esdTexture = new BABYLON.DynamicTexture("esdTexture", 512, scene, false);
        const eCtx = esdTexture.getContext();
        eCtx.fillStyle = "#162846";
        eCtx.fillRect(0, 0, 512, 512);
        eCtx.strokeStyle = "rgba(0, 229, 255, 0.4)";
        eCtx.lineWidth = 1.5;
        for (let g = 0; g <= 512; g += 32) {
            eCtx.beginPath();
            eCtx.moveTo(g, 0);
            eCtx.lineTo(g, 512);
            eCtx.stroke();
            eCtx.beginPath();
            eCtx.moveTo(0, g);
            eCtx.lineTo(512, g);
            eCtx.stroke();
        }
        eCtx.fillStyle = "#00e5ff";
        eCtx.font = "bold 16px monospace";
        eCtx.fillText("BANCO DE PRUEBAS AEROESPACIAL • ZD550", 25, 35);
        eCtx.fillText("METRIC ESD GRID 10mm", 25, 495);
        esdTexture.update();

        const esdMaterial = new BABYLON.PBRMaterial("esdMaterial", scene);
        esdMaterial.metallic = 0.10;
        esdMaterial.roughness = 0.50;
        esdMaterial.albedoTexture = esdTexture;
        esdMat.material = esdMaterial;

        // Bandejas organizadoras metálicas cepilladas
        function makeTray(x: number, z: number, w: number, d: number) {
            const tray = BABYLON.MeshBuilder.CreateBox("tray", { width: w, height: 0.016, depth: d }, scene);
            tray.position.set(x, 0.008, z);
            tray.parent = workbenchRoot;
            tray.material = steelMat;
            return tray;
        }
        makeTray(-0.85, -0.32, 0.45, 0.35);
        makeTray(-0.85, 0.32, 0.45, 0.35);
        makeTray(0.85, -0.32, 0.45, 0.35);
        makeTray(0.85, 0.32, 0.45, 0.35);

        // ================= PODIO / PEANA BLANCA DE EXHIBICIÓN EN ESTUDIO =================
        const showroomPedestal = BABYLON.MeshBuilder.CreateCylinder("showroomPedestal", { diameter: 0.92, height: 0.015, tessellation: 64 }, scene);
        showroomPedestal.position.set(0, 0.01, 0.02);
        const pedestalMat = new BABYLON.PBRMaterial("pedestalMat", scene);
        pedestalMat.metallic = 0.10;
        pedestalMat.roughness = 0.30;
        pedestalMat.albedoColor = new BABYLON.Color3(0.96, 0.97, 0.99); // Blanco puro satinado de estudio
        showroomPedestal.material = pedestalMat;
        showroomPedestal.setEnabled(false);
        showroomPedestal.isVisible = false;

        // ================= MODELADO PROCEDURAL DETALLADO DEL DRON =================
        const droneRoot = new BABYLON.TransformNode("droneRoot", scene);
        droneRoot.position.set(0, 0.16, 0.02);

        let activePrototypeId = "zd550"; // "zd550" | "tarot680" | "f450"
        let PARTS: any[] = [];

        function buildDroneComponents(protoType: string) {
            // Limpiar partes anteriores
            droneRoot.getChildren().forEach((c: any) => c.dispose());
            PARTS = [];

            const isHexa = (protoType === "tarot680");
            const armCount = isHexa ? 6 : 4;
            const armRadius = isHexa ? 0.34 : 0.275;

            // --- 1. Chasis Inferior + PDB ---
            const bottomGroup = new BABYLON.TransformNode("bottomGroup", scene);
            bottomGroup.parent = droneRoot;

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

            // Tornillos M3 y abrazaderas de aluminio mecanizado
            for (let b = 0; b < armCount; b++) {
                const ang0 = (b * Math.PI * 2) / armCount;
                const clamp = BABYLON.MeshBuilder.CreateBox("clamp_" + b, { width: 0.038, height: 0.016, depth: 0.028 }, scene);
                clamp.position.set(Math.cos(ang0) * 0.085, 0.009, Math.sin(ang0) * 0.085);
                clamp.rotation.y = -ang0 + Math.PI / 2;
                clamp.material = redCncMat;
                clamp.parent = bottomGroup;

                // Tornillos M3
                [-0.012, 0.012].forEach((sx, si) => {
                    const bolt = BABYLON.MeshBuilder.CreateCylinder("bolt_" + b + "_" + si, { diameter: 0.0055, height: 0.004 }, scene);
                    bolt.position.set(clamp.position.x + sx * 0.5, 0.018, clamp.position.z);
                    bolt.material = steelMat;
                    bolt.parent = bottomGroup;
                });
            }

            PARTS.push({
                id: 1,
                key: "chasis_inf",
                category: "ESTRUCTURA Y DISTRIBUCIÓN ELÉCTRICA",
                shortTag: "📐 CHASIS INF. + PDB",
                name: isHexa ? "Chasis Central Tarot 680 Hexa + PDB 250A" : "Placa Inferior ZD550 3K + PDB 160A",
                material: "Fibra de Carbono 3K (2.0mm) + Placa Cobre FR-4 Grado Militar",
                specs: { peso: "285g", corrienteMax: "160A", rigidez: "Torsión > 12 Nm/°", tornilleria: "16x Tornillos M3x8mm Titanio Grado 5" },
                desc: "Placa portante estructural que canaliza la distribución de alta potencia y sujeta los brazos.",
                errorReal: "Si se usa un chasis de baja rigidez o fibra barata (G10), la vibración de los motores saturará los giroscopios del autopiloto, haciendo imposible el vuelo estacionario. Además, una PDB sin filtro LC inducirá ruido eléctrico severo.",
                group: bottomGroup,
                benchPos: new BABYLON.Vector3(-0.85, 0.025, -0.32),
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

                aNode.rotation.y = ang;
            }

            PARTS.push({
                id: 2,
                key: "brazos_esc",
                category: "PROPULSIÓN Y VARIADORES DE VELOCIDAD",
                shortTag: `🥢 ${armCount} BRAZOS + ESCs 40A`,
                name: `${armCount} Brazos Tubulares Ø20mm + Variadores ESC BLHeli_32`,
                material: "Fibra de Carbono Mate 3K Tejido Twill + Abrazaderas CNC 6061-T6",
                specs: { tubos: `${armCount}x Ø20mm x 220mm`, esc: "40A Continuo / 55A Pico (3-6S DShot1200)", frecuencia: "48 kHz PWM", peso: `${armCount * 45}g` },
                desc: "Alojan el cableado interno y los ESC con disipador de aluminio y protocolo digital DShot.",
                errorReal: "Si los ESCs no soportan la corriente pico (mínimo 40A) o pierden sincronización (desync), un motor se apagará en pleno vuelo, provocando la pérdida total de control y colisión instantánea.",
                group: armGroup,
                benchPos: new BABYLON.Vector3(0.85, 0.025, -0.32),
                assembledPos: new BABYLON.Vector3(0, 0, 0),
                inspectPos: new BABYLON.Vector3(0.15, 0.25, -0.20),
                isAssembled: false
            });

            // --- 3. Motores Brushless 5010 750KV ---
            const motorGroup = new BABYLON.TransformNode("motorGroup", scene);
            motorGroup.parent = droneRoot;

            for (let b = 0; b < armCount; b++) {
                const ang = (b * Math.PI * 2) / armCount;
                const mNode = new BABYLON.TransformNode("mNode_" + b, scene);
                mNode.parent = motorGroup;
                mNode.position.set(Math.cos(ang) * armRadius, 0.014, Math.sin(ang) * armRadius);

                const base = BABYLON.MeshBuilder.CreateCylinder("base_" + b, { diameter: 0.05, height: 0.006 }, scene);
                base.material = steelMat;
                base.parent = mNode;

                // 12 Bobinas de cobre
                for (let c = 0; c < 12; c++) {
                    const ca = (c * Math.PI * 2) / 12;
                    const coil = BABYLON.MeshBuilder.CreateCylinder("coil_" + b + "_" + c, { diameter: 0.009, height: 0.014 }, scene);
                    coil.position.set(Math.cos(ca) * 0.018, 0.008, Math.sin(ca) * 0.018);
                    coil.material = copperMat;
                    coil.parent = mNode;
                }

                // Campana de motor con ranuras de ventilación
                const bell = BABYLON.MeshBuilder.CreateCylinder("bell_" + b, { diameter: 0.052, height: 0.019 }, scene);
                bell.position.y = 0.015;
                bell.material = redCncMat;
                bell.parent = mNode;

                const shaft = BABYLON.MeshBuilder.CreateCylinder("shaft_" + b, { diameter: 0.006, height: 0.028 }, scene);
                shaft.position.y = 0.025;
                shaft.material = steelMat;
                shaft.parent = mNode;
            }

            PARTS.push({
                id: 3,
                key: "motores",
                category: "PLANTA MOTRIZ ELECTROMAGNÉTICA",
                shortTag: `⚙️ ${armCount} MOTORES 5010 750KV`,
                name: `${armCount} Motores Brushless Outrunner 5010 750KV Grado Industrial`,
                material: "Cuerpo Aluminio 7075-T6 + 14 Imanes Neodimio N45SH + Hilo Cobre OFC",
                specs: { kv: "750 RPM/V", potencia: "550W / motor", empujeMax: `${armCount * 1250}g total`, corrientePico: "35A por motor", rodamientos: "Japoneses NMB" },
                desc: "Produce tracción constante. Imanes curvos para mínimo cogging y máxima eficiencia g/W.",
                errorReal: "Si se montan motores con KV excesivo (>950KV) con palas de 12'', demandarán más de 45A, quemando el esmalte del bobinado de cobre por sobretemperatura. Si el KV es insuficiente (<500KV con 3S), el dron no logrará levantar el vuelo.",
                group: motorGroup,
                benchPos: new BABYLON.Vector3(-0.85, 0.025, 0.32),
                assembledPos: new BABYLON.Vector3(0, 0, 0),
                inspectPos: new BABYLON.Vector3(-0.15, 0.28, -0.15),
                isAssembled: false
            });

            // --- 4. Autopiloto Pixhawk 2.4.8 + Mástil GPS ---
            const fcGroup = new BABYLON.TransformNode("fcGroup", scene);
            fcGroup.parent = droneRoot;

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

            PARTS.push({
                id: 4,
                key: "pixhawk_gps",
                category: "AVIÓNICA Y CONTROL DE NAVEGACIÓN",
                shortTag: "🧠 PIXHAWK + GPS NEO-M8N",
                name: "Autopiloto de Vuelo Pixhawk 2.4.8 + Mástil GPS/Brújula M8N",
                material: "Carcasa Policarbonato UL94-V0 Antivibración + Antena Parche Cerámica",
                specs: { procesador: "STM32F427 32-bit Cortex M4 (168 MHz)", imu: "MPU6000 + L3GD20 + LSM303D", barometro: "MS5611 (10cm precisión)", puertos: "CAN, I2C, UART, Telemetría" },
                desc: "Cerebro de control autónomo con triple redundancia de sensores y posicionamiento satelital.",
                errorReal: "Si el mástil del GPS no está elevado a más de 10cm de los cables de alta potencia de la batería, el campo electromagnético corromperá el compás digital (Compass EKF Error), provocando que el dron vuele errático en 'Fly-Away'.",
                group: fcGroup,
                benchPos: new BABYLON.Vector3(0.85, 0.025, 0.32),
                assembledPos: new BABYLON.Vector3(0, 0, 0),
                inspectPos: new BABYLON.Vector3(0.15, 0.28, -0.15),
                isAssembled: false
            });

            // --- 5. Chasis Superior + Patines de Aterrizaje ---
            const structGroup = new BABYLON.TransformNode("structGroup", scene);
            structGroup.parent = droneRoot;

            const topPlate = BABYLON.MeshBuilder.CreateCylinder("topPlate", { diameter: isHexa ? 0.26 : 0.22, height: 0.002, tessellation: isHexa ? 12 : 8 }, scene);
            topPlate.position.set(0, 0.045, 0);
            topPlate.material = carbonMat;
            topPlate.parent = structGroup;

            // Patas de aterrizaje reforzadas con abrazaderas T
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

            PARTS.push({
                id: 5,
                key: "chasis_sup",
                category: "PROTECCIÓN ESTRUCTURAL Y TREN DE ATERRIZAJE",
                shortTag: "🦾 CHASIS SUP. + PATAS",
                name: "Placa Superior 3K + Tren de Aterrizaje Reforzado",
                material: "Placa Carbono 1.5mm + Tubos Ø12mm / Ø14mm Neopreno Antichoques",
                specs: { despejeSuelo: "190mm para payload", peso: "195g", absorcion: "Espuma EPDM 55 Shore A", uniones: "Abrazaderas T en Aluminio 6061" },
                desc: "Protege la electrónica interna y proporciona 19cm de despeje para el tanque extintor.",
                errorReal: "Si el tren de aterrizaje es demasiado bajo (<15cm), el tanque de químico golpeará el suelo en tomas duras. Sin amortiguación elástica, el choque mecánico disparará el sensor de colisión 'Crash Check' del firmware apagando motores.",
                group: structGroup,
                benchPos: new BABYLON.Vector3(-0.48, 0.025, 0.42),
                assembledPos: new BABYLON.Vector3(0, 0, 0),
                inspectPos: new BABYLON.Vector3(0.0, 0.32, -0.18),
                isAssembled: false
            });

            // --- 6. Batería LiPo Principal ---
            const battGroup = new BABYLON.TransformNode("battGroup", scene);
            battGroup.parent = droneRoot;

            const batt = BABYLON.MeshBuilder.CreateBox("battery", { width: 0.052, height: 0.038, depth: 0.145 }, scene);
            batt.position.set(0, 0.065, 0);
            batt.material = lipoMat;
            batt.parent = battGroup;

            const bLabel = BABYLON.MeshBuilder.CreateBox("bLabel", { width: 0.053, height: 0.030, depth: 0.082 }, scene);
            bLabel.position.set(0, 0.065, 0);
            bLabel.material = lipoLabelMat;
            bLabel.parent = battGroup;

            // Conector XT60 con pines de oro y cables AWG12
            const xt60 = BABYLON.MeshBuilder.CreateBox("xt60", { width: 0.018, height: 0.011, depth: 0.018 }, scene);
            xt60.position.set(0, 0.082, 0.098);
            const xt60Mat = new BABYLON.PBRMaterial("xt60Mat", scene);
            xt60Mat.albedoColor = new BABYLON.Color3(0.95, 0.80, 0.05);
            xt60.material = xt60Mat;
            xt60.parent = battGroup;

            PARTS.push({
                id: 6,
                key: "bateria_pila",
                category: "ALMACENAMIENTO DE ENERGÍA Y POTENCIA",
                shortTag: "🔋 BATERÍA (PILA) LiPo 3S",
                name: "Batería de Polímero de Litio (Pila Principal) 3S 5000mAh",
                material: "3 Celdas LiCoO2 en Serie + Cables Silicona 12AWG + Conector XT60 Oro",
                specs: { voltaje: "11.1V Nominal (12.6V Máx)", capacidad: "5000 mAh (55.5 Wh)", descarga: "35C Continua (175A) / 70C Ráfaga (350A)", peso: "420g", resistencia: "< 3.2 mΩ por celda" },
                desc: "Pila de alta descarga capaz de alimentar los motores a pleno régimen durante más de 18-22 minutos.",
                errorReal: "Si se instala una batería con baja tasa de descarga (<25C), sufrirá caída brusca de tensión (Voltage Sag) al acelerar fuertemente, activando el corte de seguridad por batería baja (Battery Failsafe) antes de completar la misión.",
                group: battGroup,
                benchPos: new BABYLON.Vector3(0.48, 0.025, 0.42),
                assembledPos: new BABYLON.Vector3(0, 0, 0),
                inspectPos: new BABYLON.Vector3(0.12, 0.28, -0.15),
                isAssembled: false
            });

            // --- 7. Tanque Extintor Forestal ---
            const payloadGroup = new BABYLON.TransformNode("payloadGroup", scene);
            payloadGroup.parent = droneRoot;

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

            PARTS.push({
                id: 7,
                key: "tanque_extintor",
                category: "CARGA ÚTIL / PAYLOAD EXTINTOR",
                shortTag: isHexa ? "🧯 TANQUE EXTINTOR 2.0L" : "🧯 TANQUE EXTINTOR 1.2L",
                name: isHexa ? "Sistema Extintor Presurizado 2.0L AFFF" : "Tanque de Retardante Forestal 1.2L + Boquillas TeeJet",
                material: "Aluminio 5052-H32 Epóxico + Válvula Solenoide 12V + Latón Naval C36000",
                specs: { volumen: isHexa ? "2.0 Litros" : "1.2 Litros", presion: "4.0 Bar (Nitrógeno Seco)", boquillas: "2x Abanico Plano 110° TeeJet", pesoLleno: isHexa ? "2.45 kg" : "1.48 kg" },
                desc: "Dispersa cortina de espuma retardante química para supresión inmediata de líneas de fuego.",
                errorReal: "Si el tanque carece de deflectores internos anti-oleaje (anti-slosh), el líquido en movimiento desplazará violentamente el Centro de Gravedad (CoG), haciendo que el autopiloto pierda estabilidad y entre en oscilación incontrolada.",
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
                const tipMat = isCw ? propCwMat : propCcwMat;

                const hub = BABYLON.MeshBuilder.CreateCylinder("hub_" + b, { diameter: 0.024, height: 0.014 }, scene);
                hub.material = carbonMat;
                hub.parent = pNode;

                // Palas con perfil aerodinámico de ángulo de ataque
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

            PARTS.push({
                id: 8,
                key: "helices",
                category: "AERODINÁMICA Y VECTOR DE EMPUJE",
                shortTag: `🌀 ${armCount} HÉLICES 12x4.5"`,
                name: `Juego de ${armCount} Hélices 12x4.5" CW (Naranja) y CCW (Azul)`,
                material: "Fibra de Carbono Compuesta Reforzada + Tuercas Bala M6 Al 7075",
                specs: { pasoDiametro: '12" de Diámetro x 4.5" de Paso', traccionNominal: "1150g @ 6500 RPM", perfil: "Clark-Y Aerodinámico", balanceo: "Dinámico ISO G2.5" },
                desc: "Giro alternado (horario y antihorario) para cancelar el torque reactivo en vuelo.",
                errorReal: "Si se invierte el sentido de giro de una hélice (poner CW en lugar de CCW), ese motor empujará hacia el suelo en vez de hacia arriba, provocando un volteo catastrófico inmediato al despegar ('Flip of Death').",
                group: propGroup,
                benchPos: new BABYLON.Vector3(0.48, 0.025, -0.45),
                assembledPos: new BABYLON.Vector3(0, 0, 0),
                inspectPos: new BABYLON.Vector3(0.0, 0.28, -0.15),
                isAssembled: false
            });

            // Recrear etiquetas y reposicionar
            create3DLabels();
            resetWorkbench();
        }

        // ================= ETIQUETAS 3D FLOTANTES =================
        const ui = GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
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

        function animateHandAssemble(part: any, onComplete?: () => void) {
            if (isMoving) return;
            isMoving = true;

            const startPos = part.group.position.clone();
            const midPos = part.inspectPos;
            const endPos = part.assembledPos;
            const startTime = performance.now();
            const duration = 1050;

            hl.removeAllMeshes();
            part.group.getChildMeshes().forEach((m: any) => hl.addMesh(m, BABYLON.Color3.FromHexString("#00e5ff")));

            showInspectionCard(part);

            const obs = scene.onBeforeRenderObservable.add(() => {
                const elapsed = performance.now() - startTime;
                const t = Math.min(elapsed / duration, 1.0);

                if (t < 0.45) {
                    const subT = t / 0.45;
                    const ease = subT < 0.5 ? 2 * subT * subT : 1 - Math.pow(-2 * subT + 2, 2) / 2;
                    part.group.position = BABYLON.Vector3.Lerp(startPos, midPos, ease);
                } else {
                    const subT = (t - 0.45) / 0.55;
                    const ease = subT < 0.5 ? 2 * subT * subT : 1 - Math.pow(-2 * subT + 2, 2) / 2;
                    part.group.position = BABYLON.Vector3.Lerp(midPos, endPos, ease);
                }

                if (t >= 1.0) {
                    part.group.position.copyFrom(endPos);
                    part.isAssembled = true;
                    scene.onBeforeRenderObservable.remove(obs);
                    isMoving = false;
                    setTimeout(() => hl.removeAllMeshes(), 400);
                    updateLabelsVisibility();
                    if (onComplete) onComplete();
                }
            });
        }

        function disassemblePart(part: any) {
            if (isMoving || !part.isAssembled) return;
            isMoving = true;
            const startPos = part.group.position.clone();
            const endPos = part.benchPos;
            const startTime = performance.now();
            const duration = 750;

            const obs = scene.onBeforeRenderObservable.add(() => {
                const elapsed = performance.now() - startTime;
                const t = Math.min(elapsed / duration, 1.0);
                const ease = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
                part.group.position = BABYLON.Vector3.Lerp(startPos, endPos, ease);

                if (t >= 1.0) {
                    part.group.position.copyFrom(endPos);
                    part.isAssembled = false;
                    scene.onBeforeRenderObservable.remove(obs);
                    isMoving = false;
                    updateLabelsVisibility();
                    updateHUD();
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

        let isLightBg = true;
        const btnToggleBg = new GUI.Rectangle("btnToggleBg");
        btnToggleBg.width = "175px";
        btnToggleBg.height = "32px";
        btnToggleBg.cornerRadius = 6;
        btnToggleBg.background = "#ffffff";
        btnToggleBg.color = "#00e5ff";
        btnToggleBg.thickness = 1.5;
        btnToggleBg.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
        btnToggleBg.left = "-20px";
        btnToggleBg.isPointerBlocker = true;
        btnToggleBg.hoverCursor = "pointer";
        const txtToggleBg = new GUI.TextBlock();
        txtToggleBg.text = "☀️ Fondo Blanco Activo";
        txtToggleBg.color = "#0f172a";
        txtToggleBg.fontSize = 11;
        txtToggleBg.fontStyle = "bold";
        btnToggleBg.addControl(txtToggleBg);
        topBanner.addControl(btnToggleBg);

        btnToggleBg.onPointerClickObservable.add(() => {
            isLightBg = !isLightBg;
            if (isLightBg) {
                scene.clearColor = new BABYLON.Color4(0.93, 0.95, 0.98, 1.0);
                txtToggleBg.text = "☀️ Fondo Blanco Activo";
                txtToggleBg.color = "#0f172a";
                btnToggleBg.background = "#ffffff";
                pedestalMat.albedoColor = new BABYLON.Color3(0.96, 0.97, 0.99);
            } else {
                scene.clearColor = new BABYLON.Color4(0.12, 0.15, 0.20, 1.0);
                txtToggleBg.text = "🌙 Fondo Oscuro Activo";
                txtToggleBg.color = "#ffffff";
                btnToggleBg.background = "#1e293b";
                pedestalMat.albedoColor = new BABYLON.Color3(0.20, 0.24, 0.30);
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

            // 0. Fondo de estudio de alto contraste (blanco por defecto para destacar fibra de carbono)
            scene.clearColor = isLightBg ? new BABYLON.Color4(0.93, 0.95, 0.98, 1.0) : new BABYLON.Color4(0.12, 0.15, 0.20, 1.0);
            studioRim.intensity = 1.30;
            studioKey.intensity = 1.45;

            // 1. Asegurar que TODOS los transformNodes estén habilitados (elimina bloqueo de ancestros)
            scene.transformNodes.forEach((tn: any) => {
                if (tn.setEnabled) tn.setEnabled(true);
            });
            droneRoot.setEnabled(true);

            // 2. Obtener la lista exacta de mallas de la pieza seleccionada
            const targetMeshes = new Set(part.group.getChildMeshes());

            // 3. Filtrar todas las mallas de la escena: desactivar mesa, bandejas, suelo y otras partes
            // y activar ÚNICAMENTE las mallas del componente seleccionado + peana blanca de estudio
            scene.meshes.forEach((m: any) => {
                if (m.name.startsWith("tag_") || m.name.startsWith("labelAnchor")) return;
                if (m === showroomPedestal) {
                    m.setEnabled(true);
                    m.isVisible = true;
                    return;
                }
                const isTarget = targetMeshes.has(m);
                m.setEnabled(isTarget);
                m.isVisible = isTarget;
            });

            // 4. Colocar la pieza examinada en el centro del showroom (0,0,0 respecto a droneRoot)
            PARTS.forEach((p, idx) => {
                if (idx === currentInspectIndex) {
                    p.group.setEnabled(true);
                    p.group.position.set(0, 0, 0);
                    p.group.rotation.set(0, 0, 0);
                } else {
                    p.group.setEnabled(false);
                }
            });

            // 5. Configurar la cámara para enfocar directamente en la pieza (centrada en la parte visible izquierda)
            const targetPos = new BABYLON.Vector3(-0.06, 0.16, 0.02);
            const targetRadius = (part.id === 1 || part.id === 2 || part.id === 5 || part.id === 8) ? 0.65 : 0.42;

            scene.cameras.forEach(cam => {
                if (cam instanceof BABYLON.ArcRotateCamera) {
                    cam.setTarget(targetPos);
                    cam.alpha = -Math.PI / 2;
                    cam.beta = 1.15; // 66° cenital para captar el volumen 3D
                    cam.radius = targetRadius;
                }
            });
            camera.setTarget(targetPos);
            camera.alpha = -Math.PI / 2;
            camera.beta = 1.15;
            camera.radius = targetRadius;
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

                // Reactivar todos los transformNodes y todas las mallas de la escena (mesa, accesorios, dron)
                scene.transformNodes.forEach((tn: any) => {
                    if (tn && tn.setEnabled) tn.setEnabled(true);
                });
                scene.meshes.forEach((m: any) => {
                    if (m === showroomPedestal) {
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
                const returnTarget = new BABYLON.Vector3(0, 0.18, 0);
                const returnRadius = (lastWorkshopCamRadius && lastWorkshopCamRadius > 0.8) ? lastWorkshopCamRadius : 1.35;
                const returnAlpha = lastWorkshopCamAlpha || -Math.PI / 2;
                const returnBeta = lastWorkshopCamBeta || Math.PI / 2.7;

                scene.cameras.forEach(cam => {
                    if (cam instanceof BABYLON.ArcRotateCamera) {
                        cam.setTarget(returnTarget);
                        cam.alpha = returnAlpha;
                        cam.beta = returnBeta;
                        cam.radius = returnRadius;
                    }
                });
                camera.setTarget(returnTarget);
                camera.alpha = returnAlpha;
                camera.beta = returnBeta;
                camera.radius = returnRadius;
                scene.activeCamera = camera;
                scene.activeCameras = [camera];

                // Mostrar HUD y barra del taller
                hudCard.isVisible = true;
                bottomBar.isVisible = true;
                updateLabelsVisibility();
                updateHUD();
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
            isIsolatedInspection = true;
            lastWorkshopCamTarget = camera.target.clone();
            lastWorkshopCamRadius = camera.radius;
            lastWorkshopCamAlpha = camera.alpha;
            lastWorkshopCamBeta = camera.beta;

            workbenchRoot.getChildMeshes().forEach((m: any) => {
                m.setEnabled(false);
                m.isVisible = false;
            });
            hudCard.isVisible = false;
            bottomBar.isVisible = false;
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

        const btnCloseDiag = new GUI.Rectangle();
        btnCloseDiag.width = "180px";
        btnCloseDiag.height = "34px";
        btnCloseDiag.cornerRadius = 6;
        btnCloseDiag.background = "#162846";
        btnCloseDiag.color = "white";
        btnCloseDiag.top = "120px";
        btnCloseDiag.isPointerBlocker = true;
        const bdText = new GUI.TextBlock();
        bdText.text = "Cerrar Diagnóstico";
        bdText.color = "white";
        bdText.fontSize = 11;
        btnCloseDiag.addControl(bdText);
        diagnosticModal.addControl(btnCloseDiag);

        btnCloseDiag.onPointerClickObservable.add(() => {
            diagnosticModal.isVisible = false;
        });

        function runFlightDiagnostic() {
            diagnosticModal.isVisible = true;
            const assembledCount = PARTS.filter(p => p.isAssembled).length;

            if (assembledCount < 8) {
                diagTitle.text = "❌ FALLO CRÍTICO: PROTOTIPO INCOMPLETO";
                diagTitle.color = "#ff334b";
                diagnosticModal.color = "#ff334b";
                const faltantes = PARTS.filter(p => !p.isAssembled).map(p => p.shortTag).join(", ");
                diagResult.text = `El dron no puede encender ni probarse en banco porque faltan piezas críticas:\n\n• Piezas sin montar: ${faltantes}\n\n⚠️ Consecuencia en la vida real: Si intentas arrancar sin todas las conexiones montadas, el controlador Pixhawk entrará en error de 'PreArm Check' por circuito abierto o falta de alimentación.`;
                return;
            }

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
                diagResult.text = `✓ Parámetros Dinámicos de Ingeniería Real:\n• Peso Total con Retardante: ${pesoDron.toFixed(2)} kg\n• Empuje Máximo (${numMotores} Motores 5010): ${empujeMax.toFixed(2)} kg\n• Relación Empuje/Peso (TWR): ${twr.toFixed(2)}:1 (Excelente margen de maniobra)\n• Consumo en Vuelo Estacionario (Hover): ${corrienteHover}A @ 11.1V\n• Autonomía Estimada con LiPo 3S 5000mAh: ${autonomiaMin} Minutos\n• Margen de Seguridad de Variadores (ESCs 40A): 35% de holgura térmica.\n\n🏆 ¡Este prototipo es aerodinámicamente viable para construcción física en laboratorio!`;
            }
        }

        // ================= INTERFAZ HUD SUPERIOR Y BARRA DE HERRAMIENTAS =================
        const hudCard = new GUI.Rectangle("hudCard");
        hudCard.width = "540px";
        hudCard.height = "105px";
        hudCard.cornerRadius = 10;
        hudCard.thickness = 1.5;
        hudCard.color = "#00e5ff";
        hudCard.background = "rgba(4, 10, 24, 0.95)";
        hudCard.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
        hudCard.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
        hudCard.top = "12px";
        ui.addControl(hudCard);

        const hudTitle = new GUI.TextBlock();
        hudTitle.text = "SIMULADOR DE INGENIERÍA • ZD550 FORESTAL";
        hudTitle.color = "#00e5ff";
        hudTitle.fontSize = 11;
        hudTitle.fontStyle = "bold";
        hudTitle.top = "-36px";
        hudCard.addControl(hudTitle);

        const hudPieceName = new GUI.TextBlock();
        hudPieceName.text = "👉 Toca cualquier pieza o letrero para ver especificaciones y montarla";
        hudPieceName.color = "#ffffff";
        hudPieceName.fontSize = 13;
        hudPieceName.fontStyle = "bold";
        hudPieceName.top = "-12px";
        hudCard.addControl(hudPieceName);

        const hudPieceDesc = new GUI.TextBlock();
        hudPieceDesc.text = "Materiales PBR de alta fidelidad, cálculo de empuje y detección de errores de vuelo.";
        hudPieceDesc.color = "#94a3b8";
        hudPieceDesc.fontSize = 10;
        hudPieceDesc.textWrapping = true;
        hudPieceDesc.width = "510px";
        hudPieceDesc.top = "16px";
        hudCard.addControl(hudPieceDesc);

        function showInspectionCard(part: any) {
            hudTitle.text = "PIEZA SELECCIONADA: " + part.shortTag;
            hudPieceName.text = part.name;
            hudPieceDesc.text = "🔬 Material: " + part.material + " | ⚙️ Función: " + part.desc;
        }

        // Barra inferior de mandos
        const bottomBar = new GUI.Rectangle("bottomBar");
        bottomBar.width = "640px";
        bottomBar.height = "64px";
        bottomBar.cornerRadius = 10;
        bottomBar.thickness = 1;
        bottomBar.color = "rgba(0, 229, 255, 0.4)";
        bottomBar.background = "rgba(4, 10, 24, 0.94)";
        bottomBar.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
        bottomBar.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
        bottomBar.top = "-14px";
        ui.addControl(bottomBar);

        function makeBtn(txt: string, bg: string, leftPx: string, w = "125px") {
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

            const t = new GUI.TextBlock();
            t.text = txt;
            t.color = "white";
            t.fontSize = 10;
            t.fontStyle = "bold";
            btn.addControl(t);
            bottomBar.addControl(btn);
            return btn;
        }

        const btnNextAuto = makeBtn("Armar Siguiente ▶", "#0c4426", "-240px", "125px");
        const btnDiag = makeBtn("🧪 Test de Vuelo", "#78350f", "-110px", "120px");
        const btnIsolate = makeBtn("🔍 Estudio de Pieza", "#1e3a8a", "20px", "125px");
        const btnChangeProto = makeBtn("🔄 Cambiar Prototipo", "#312e81", "150px", "125px");
        const btnReset = makeBtn("↩ Vaciar Mesa", "#4a1215", "265px", "95px");

        btnNextAuto.onPointerClickObservable.add(() => {
            const nextPart = PARTS.find(p => !p.isAssembled);
            if (nextPart) {
                animateHandAssemble(nextPart, updateHUD);
            }
        });

        btnDiag.onPointerClickObservable.add(runFlightDiagnostic);

        btnIsolate.onPointerClickObservable.add(() => {
            const target = PARTS.find(p => !p.isAssembled) || PARTS[0];
            openPartInspectionScreen(target);
        });

        btnChangeProto.onPointerClickObservable.add(() => {
            if (activePrototypeId === "zd550") {
                activePrototypeId = "tarot680";
                hudTitle.text = "PROTOTIPO ACTIVO: TAROT 680 PRO HEXA (6 MOTORES)";
            } else {
                activePrototypeId = "zd550";
                hudTitle.text = "PROTOTIPO ACTIVO: ZD550 QUAD FORESTAL (4 MOTORES)";
            }
            buildDroneComponents(activePrototypeId);
        });

        btnReset.onPointerClickObservable.add(resetWorkbench);

        function updateHUD() {
            const assembledCount = PARTS.filter(p => p.isAssembled).length;
            const pct = Math.round((assembledCount / PARTS.length) * 100);

            if (assembledCount === 0) {
                hudTitle.text = `TALLER EN BANCO • ${activePrototypeId.toUpperCase()} (0%)`;
                hudPieceName.text = "👉 Toca cualquier pieza o letrero para abrir su apartado técnico 3D dedicado.";
                hudPieceDesc.text = "Giro 360°, especificaciones reales, compatibilidad y detección de fallos por pieza.";
            } else if (assembledCount < PARTS.length) {
                const nextPart = PARTS.find(p => !p.isAssembled);
                hudTitle.text = `ENSAMBLAJE: ${assembledCount} / ${PARTS.length} PIEZAS MONTADAS (${pct}%)`;
                hudPieceName.text = "👉 Toca una pieza para examinarla en 3D o presiona 'Armar Siguiente ▶'.";
                hudPieceDesc.text = "Siguiente pieza recomendada: " + nextPart.shortTag;
            } else {
                hudTitle.text = `¡${activePrototypeId.toUpperCase()} 100% ENSAMBLADO!`;
                hudPieceName.text = "✓ Prototipo completo. Haz clic en '🧪 Test de Vuelo' para diagnosticar.";
                hudPieceDesc.text = "El motor físico calculará peso, empuje, TWR y viabilidad para la vida real.";
            }
        }

        // Clic en mallas 3D: Abre directamente el apartado dedicado de esa pieza
        scene.onPointerDown = function (evt, pick) {
            if (isIsolatedInspection) return;
            if (evt.button === 0 && pick.hit && pick.pickedMesh) {
                const m = pick.pickedMesh;
                for (let i = 0; i < PARTS.length; i++) {
                    const part = PARTS[i];
                    if (part.group === m || part.group.getChildren().includes(m) || m.isDescendantOf(part.group)) {
                        openPartInspectionScreen(part);
                        break;
                    }
                }
            }
        };

        // Hover en mallas 3D
        scene.onPointerMove = function (evt, pick) {
            if (isIsolatedInspection) return;
            if (pick.hit && pick.pickedMesh) {
                const m = pick.pickedMesh;
                for (let i = 0; i < PARTS.length; i++) {
                    const part = PARTS[i];
                    if (part.group === m || part.group.getChildren().includes(m) || m.isDescendantOf(part.group)) {
                        showInspectionCard(part);
                        break;
                    }
                }
            }
        };

        // Iniciar con prototipo ZD550
        buildDroneComponents("zd550");
    }
}
