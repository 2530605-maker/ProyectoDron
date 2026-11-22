# Objetivos Pedagógicos y Rúbricas de Evaluación
## Proyecto: Simulador 3D de Dron Cuadricóptero Forestal ZD550
**Materia:** Análisis y Diseño de Software  
**Corte / Etapa:** Corte 1 - Semana 1  
**SLUG del Proyecto:** `dron-simulador-zd550-forestal`  
**Entorno Tecnológico:** Babylon.js 9.x, Vanilla JavaScript (ES Modules), HTML5 Canvas, CSS3 puro, Node.js Offline.

---

## 1. Objetivos Pedagógicos y de Aprendizaje

### 1.1 Objetivo General
Desarrollar una plataforma interactiva de simulación y aprendizaje tridimensional basada en la web que permita a los estudiantes de ingeniería comprender, ensamblar componente a componente y operar un vehículo aéreo no tripulado (UAV cuadricóptero clase 550) orientado a la detección y mitigación de incendios forestales, fundamentándose en modelos matemáticos de dinámica de vuelo (Newton-Euler 6-DOF) y metodologías ágiles de ingeniería de software (SCRUM).

### 1.2 Objetivos Específicos
1. **Modelado y Ensamblaje Modular (Hardware en 3D):**
   - Identificar la función electromecánica, especificaciones y orden de montaje de cada subsistema: Chasis de fibra de carbono (ZD550), Placa de Distribución de Potencia (PDB), Motores Brushless (5010 750KV), Controladores de Velocidad (ESC 40A), Hélices (12x4.5 CW/CCW), Unidad de Control de Vuelo (Pixhawk 2.4.8 con IMU MPU6000), Módulo GPS/Brújula, Batería LiPo 3S 5000mAh y Carga útil de aspersión.
   - Experimentar el ensamblaje progresivo desde cero (etapa por etapa) con retroalimentación visual inmediata y validación de reglas de acoplamiento físico y eléctrico.
2. **Comprensión de la Física y Mecánica de Vuelo (6-DOF):**
   - Visualizar en tiempo real los principios físicos del vuelo cuadricóptero:
     - Relación velocidad angular-empuje ($T_i = b \omega_i^2$) y par de arrastre ($\tau_i = d \omega_i^2$).
     - Generación de momentos de actitud: Alabeo ($\phi$, Roll), Cabeceo ($\theta$, Pitch) y Guiñada ($\psi$, Yaw) mediante la aceleración diferencial de pares de rotores antiparalelos.
     - Efecto del centro de gravedad ($CG$) y estabilidad dinámica.
3. **Respuesta ante Condiciones Extremas (Incendio Forestal):**
   - Comprender el impacto aerodinámico y térmico de un incendio forestal según el modelo NASA Ames VAERA: pérdida de sustentación por disminución de densidad del aire ($\rho(T) = \frac{p}{R T}$ a altas temperaturas) y desestabilización por corrientes convectivas ascendentes (*thermal updrafts*).
4. **Ingeniería de Software y Arquitectura Limpia:**
   - Implementar un software modular, desacoplado y sin dependencias de frameworks de terceros (Zero React, Zero Vue, Zero TypeScript), demostrando dominio en Vanilla JavaScript nativo, gestión de ciclo de render en Babylon.js y arquitectura MVC/Componentes.

---

## 2. Rúbrica de Evaluación por Competencias (Corte 1)

| Criterio / Dimensión | Nivel Insuficiente (0 - 59%) | Nivel Aceptable (60 - 79%) | Nivel Sobresaliente (80 - 94%) | Nivel Excelente / Experto (95 - 100%) |
| :--- | :--- | :--- | :--- | :--- |
| **1. Modelado 3D de Piezas y Fidelidad en Babylon.js (25%)** | Modelo estático monolítico sin piezas separables o uso de librerías ajenas sin detalle. | Piezas separadas pero sin proporciones reales ni materiales adecuados. | Piezas individuales detalladas (ZD550, motores, hélices, Pixhawk, batería) con rotación y materiales diferenciados. | Modelado paramétrico de alta precisión para cada subsistema (10 piezas clave), materiales PBR con texturas de fibra de carbono/metales, rotores independientes y vista explosionada animada interactiva. |
| **2. Taller de Ensamblaje Paso a Paso desde Cero (20%)** | No permite ensamblaje o solo muestra un botón de alternancia genérico. | Ensamblaje secuencial rígido sin explicación técnica de los componentes. | Secuencia guiada de 8 pasos con panel informativo de especificaciones electromecánicas para cada pieza. | Flujo de ensamblaje interactivo con inspección 360°, ficha técnica exhaustiva (peso, voltaje, KV, empuje), validación de ensamblaje completo antes de habilitar despegue y modo explosión/ensamblado. |
| **3. Dinámica de Vuelo 6-DOF y Control PID (25%)** | Movimiento traslacional simple sin inercia ni física real (tipo arcade básico). | Física básica de caída libre pero sin cálculo de momentos angulares ni empuje por motor. | Modelo cinemático con aceleración por empuje total, inclinación de actitud y controles de Pitch/Roll/Yaw/Throttle. | Implementación fiel del modelo Newton-Euler de 6 grados de libertad (Kemcha / UNAM) con bucle de control PID, matriz de rotación Euler-cuerpo, cálculo dinámico de empuje por rotor y par reactivo. |
| **4. Entorno de Incendio Forestal y Misión (15%)** | Escenario vacío o sin relación con la problemática ambiental. | Fondo con fuego estático o plano sin interacción física. | Terreno 3D con árboles, partículas de fuego/humo y telemetría de proximidad al foco térmico. | Simulación realista con mapa térmico, perturbación aerodinámica por térmicas ascendentes (modelo NASA VAERA), sistema de descarga de retardante con física de partículas y extinción activa de conatos. |
| **5. Arquitectura de Software, Código Limpio y Modo Offline (15%)** | Dependencias de internet obligatorias, uso de frameworks prohibidos o código espagueti. | Funciona en local pero con código monolítico y sin modularidad clara. | Estructura modular ES Modules (`import`/`export`), servidor nativo Node.js sin frameworks externos y cero advertencias. | 100% Offline, Vanilla JS modular desacoplado (`parts.js`, `assembly.js`, `physics.js`, `forest.js`), documentación completa (`manifest.json`, bitácora, objetivos), soporte para teclado/HUD interactivo. |

---

## 3. Matriz de Cobertura de Tesis y Literatura Científica

| Referencia Académica | Parámetros Técnicos Extraídos | Módulo de Aplicación en el Proyecto |
| :--- | :--- | :--- |
| **Tesis de Maestría (Kemcha, 2024)** | Ecuaciones de estado 6-DOF, coeficientes $b = 2.98\times 10^{-5}\text{ N}\cdot\text{s}^2$, $d = 3.2\times 10^{-7}\text{ N}\cdot\text{m}\cdot\text{s}^2$, constantes PID optimizadas con ITAE. | `public/js/drone/physics.js` (Mapeo de comandos de radio a empuje y momentos de cabeceo/alabeo/guiñada). |
| **Tesis UNAM (2016)** | Arquitectura de hardware en árbol funcional, protocolo MSP de telemetría (108 Attitude, 109 Altitude), dimensionamiento de motor/hélice. | `telemetria-bitacora.md`, `public/js/drone/parts.js` e interfaz de HUD de telemetría. |
| **NASA Ames Research Center (2024)** | Modelo VAERA: Efecto de temperaturas de 49°C a 121°C sobre la densidad del aire, sustentación y rachas térmicas verticales $w_t$. | `public/js/scene/forest.js` y perturbaciones aerodinámicas sobre el dron al volar bajo sobre el fuego. |
| **Ciencia Latina (2024)** | Especificaciones reales del chasis ZD550, motores 5010 750KV, hélices 12x4.5, ESC 40A, Pixhawk 2.4.8 y metodología SCRUM. | Dimensionamiento geométrico 3D, masa total (1.85 kg), capacidades de carga útil y organización del equipo de trabajo. |
| **MDPI Drones (2025)** | Modelo electroquímico Thevenin para batería LiPo 3S 5000mAh, cálculo de SOC, advertencias de corte por bajo voltaje (10.5V). | `public/js/drone/physics.js` (Monitoreo de voltaje, corriente consumida $I(t)$ y autonomía en tiempo real). |
