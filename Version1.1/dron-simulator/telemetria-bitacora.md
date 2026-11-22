# Bitácora Técnica de Ensamblaje, Telemetría y Gestión de Proyecto
## Proyecto: Simulador 3D de Dron Cuadricóptero Forestal ZD550
**Materia:** Análisis y Diseño de Software  
**Corte 1 - Semana 1**  
**SLUG:** `dron-simulador-zd550-forestal`

---

## 1. Definición del Project Manager y Metodología de Desarrollo (Semana 1)

Siguiendo las recomendaciones de ingeniería de software establecidas en las tesis de referencia (Ciencia Latina, 2024 y UNAM, 2016), el desarrollo del sistema se estructura bajo el marco de trabajo **SCRUM**, estableciendo roles multidisciplinarios claros y sprints semanales de entrega continua de valor.

### 1.1 Estructura del Equipo y Asignación de Roles (SCRUM)
1. **Product Owner / Arquitecto de Software:**
   - Define los requisitos funcionales del simulador y criterios de aceptación del cliente/profesor.
   - Supervisa el cumplimiento de las restricciones: **100% Offline**, **cero frameworks**, Vanilla JS ES Modules y Babylon.js v9.
   - Diseña el `manifest.json` y la taxonomía de componentes.
2. **Scrum Master / Project Manager:**
   - Facilita las reuniones diarias de sincronización (Daily Standup de 15 min).
   - Elimina impedimentos técnicos (e.g. empaquetamiento local de Babylon.js sin CDN, configuración de MIME types en servidor nativo Node.js).
   - Mantiene la bitácora técnica de ingeniería y el control de versiones.
3. **Ingeniero de Modelado 3D y Gráficos (Babylon.js Specialist):**
   - Modela pieza por pieza en Babylon.js el chasis ZD550, brazos de fibra de carbono, motores 5010 750KV, hélices 12x4.5, ESCs, Pixhawk 2.4.8, batería LiPo y sistema de aspersión.
   - Diseña materiales PBR con texturas de fibra de carbono mate, acabados de aluminio anodizado y shaders de fuego/humo.
   - Implementa la cinemática de la vista explosionada interactiva.
4. **Ingeniero de Dinámica de Vuelo y Algoritmos (Physics & Control Lead):**
   - Transcribe y programa el modelo Newton-Euler 6-DOF y las leyes de control PID basadas en la tesis de maestría (Kemcha, 2024).
   - Integra las perturbaciones atmosféricas y térmicas del modelo NASA Ames VAERA (2024).
   - Modela el decaimiento electroquímico de la batería LiPo basado en MDPI Drones (2025).
5. **Ingeniero de Interfaz de Usuario y Experiencia (Frontend HUD & Telemetry):**
   - Diseña la interfaz web responsive en CSS3 puro sin frameworks externos.
   - Programa los instrumentos de cabina: horizonte artificial, altímetro, compás magnético, medidor de empuje individual por rotor, y registro de telemetría en tiempo real estilo MSP (MultiWii Serial Protocol).

### 1.2 Backlog del Sprint 1 (Semana 1)
- [x] **HU-01:** Configuración del entorno de desarrollo local con Node.js sin frameworks externos.
- [x] **HU-02:** Integración offline de la librería Babylon.js v9.33.0.
- [x] **HU-03:** Creación de las piezas tridimensionales independientes del cuadricóptero ZD550 con materiales PBR.
- [x] **HU-04:** Sistema de ensamblaje interactivo guiado de 8 etapas desde banco de trabajo vacío.
- [x] **HU-05:** Animación paramétrica de vista explosionada con deslizador de dispersión.
- [x] **HU-06:** Motor físico Newton-Euler 6-DOF con control de estabilidad PID.
- [x] **HU-07:** Escenario forestal 3D con conato de incendio, sistema de partículas de fuego/humo y corrientes térmicas.
- [x] **HU-08:** Sistema de carga útil de extinción con dispersión de retardante químico sobre los focos de fuego.
- [x] **HU-09:** Panel de telemetría de vuelo (Pitch, Roll, Yaw, Altitud, Velocidad, Consumo eléctrico LiPo).

---

## 2. Bitácora de Ensamblaje Paso a Paso (Del Banco de Trabajo al Vuelo)

El módulo de ensamblaje en Babylon.js permite al estudiante construir el cuadricóptero clase 550 siguiendo la secuencia estricta de ingeniería aeroespacial:

| Paso | Componente(s) a Ensamblar | Función Mecánica / Eléctrica | Especificaciones Técnicas (Fuentes: ZD550 / Pixhawk / Sunnysky) |
| :---: | :--- | :--- | :--- |
| **0** | **Mesa de Trabajo / Banco de Pruebas** | Entorno libre de estática (ESD safe) para recepción e inspección visual de componentes. | Coordenadas base $(0, 0, 0)$, iluminación de taller técnico. |
| **1** | **Chasis Inferior con PDB Integrada** | Estructura portante central y distribución de energía eléctrica desde la batería hacia los ESCs. | Placa central de fibra de carbono 3K (espesor 2.0 mm, radio 120 mm), pistas de cobre estañado de 4 capas para soportar hasta 160A continuos. |
| **2** | **4 Brazos Tubulares de Fibra de Carbono + ESCs** | Soporte estructural rígido para los motores, posicionados a 45°, 135°, 225° y 315° respecto al eje longitudinal. | Tubos huecos de fibra de carbono $\varnothing 20\text{ mm}$, longitud $240\text{ mm}$, distancia entre ejes diagonal $550\text{ mm}$. ESCs de 40A con protocolo DShot600 montados bajo los brazos. |
| **3** | **4 Motores Brushless 5010 750KV + Bancadas** | Generación de par electromagnético y rotación mecánica para las hélices. | Motores outrunner de 14 polos y 12 ranuras, bobinado de cobre OFC, imanes de neodimio N45SH. Consumo máximo: 25A @ 12V. Empuje máximo: 1250 g por motor. |
| **4** | **Controlador de Vuelo Pixhawk 2.4.8 + Mástil GPS** | Cerebro autónomo del dron. Procesa señales de sensores IMU (MPU6000 a 1 kHz) y ejecuta los bucles de control PID. | Microcontrolador STM32F427 Cortex-M4 a 168 MHz, amortiguador interno de vibraciones de silicona. Módulo GPS Neo-M8N elevado en mástil de 15 cm para aislarlo de la interferencia electromagnética (EMI). |
| **5** | **Chasis Superior + Tren de Aterrizaje** | Cierre de la caja central para rigidez torsional y patas de aterrizaje altas para proteger la carga útil. | Placa superior de fibra de carbono de 1.5 mm, separadores de aluminio CNC anodizado rojo de 35 mm. Patines de aterrizaje de fibra de carbono de 22 cm de altura. |
| **6** | **Batería LiPo 3S 11.1V 5000 mAh** | Fuente de energía química de alta densidad para alimentar propulsión y aviónica. | Configuración 3S1P (3 celdas en serie), voltaje nominal 11.1V, voltaje de carga plena 12.6V (4.2V/celda), tasa de descarga 35C continua (175A), peso aproximado 410 g. |
| **7** | **Módulo de Extinción de Incendios (Carga Útil)** | Tanque presurizado de retardante químico espumante con microbomba de diafragma y toberas de aspersión. | Capacidad del tanque: 1.2 L, microbomba 12V / 1.5 L/min a 4 bar, 2 boquillas de abanico plano TeeJet XR11002 montadas ventralmente con ángulo de aspersión de 110°. |
| **8** | **4 Hélices de Fibra de Carbono 12x4.5 (CW / CCW)** | Conversión de la energía rotacional del motor en empuje aerodinámico vertical ($T = b \omega^2$). | 2 hélices horarias (CW) en motores 1 y 3; 2 hélices antihorarias (CCW) en motores 2 y 4 para cancelar el par giroscópico total sobre el chasis. |

---

## 3. Especificaciones y Variables de Telemetría en Tiempo Real

El sistema implementa un bus de telemetría digital de alta frecuencia inspirado en el estándar **MSP** (MultiWii Serial Protocol) y **MAVLink v2**:

### 3.1 Paquete de Actitud y Orientación (`MSP_ATTITUDE` / `MAVLINK_ATTITUDE`)
- **Roll ($\phi$):** Ángulo de alabeo en grados $[-45^\circ, +45^\circ]$.
- **Pitch ($\theta$):** Ángulo de cabeceo en grados $[-45^\circ, +45^\circ]$.
- **Yaw ($\psi$):** Rumbo magnético / ángulo de guiñada $[0^\circ, 360^\circ]$.
- **Velocidades Angulares:** $\dot{\phi}$ (p), $\dot{\theta}$ (q), $\dot{\psi}$ (r) en $\text{rad/s}$.

### 3.2 Paquete de Altitud y Cinemática (`MSP_ALTITUDE` / `MAVLINK_GLOBAL_POSITION_INT`)
- **Altitud Barométrica ($Z$):** Altura sobre el terreno expresada en metros $[0, 100\text{ m}]$.
- **Velocidad Vertical ($V_z$):** Tasa de ascenso o descenso en $\text{m/s}$ (calculada por el filtro de Kalman fusionando barómetro e IMU).
- **Velocidad Terrestre Horizontal ($V_{xy}$):** Velocidad de desplazamiento en $\text{km/h}$.

### 3.3 Paquete de Estado de Propulsión (`MAVLINK_SERVO_OUTPUT_RAW`)
- **PWM Motores 1, 2, 3 y 4:** Señal de modulación de ancho de pulso enviada a cada ESC $[1000\text{ }\mu\text{s} - 2000\text{ }\mu\text{s}]$, mapeada a $\omega_i \in [0, 850\text{ rad/s}]$.
- **Empuje Individual:** $T_i = b \omega_i^2$ en Newtons ($N$).
- **Empuje Total:** $U_1 = \sum_{i=1}^4 T_i$. Relación Empuje/Peso: $\frac{U_{1,\max}}{mg} \approx \frac{4 \times 12.26\text{ N}}{18.15\text{ N}} = 2.7:1$ (ideal para maniobras de extinción con ráfagas de viento).

### 3.4 Paquete Eléctrico y Batería (`MAVLINK_BATTERY_STATUS`)
- **Voltaje del Pack ($V_{\text{bat}}$):** Rango operativo de $12.6\text{V}$ (100% SOC) a $10.5\text{V}$ (corte crítico de seguridad / RTL).
- **Corriente Instantánea ($I_{\text{bat}}$):** Consumo total en Amperios ($A$), variando desde $1.2\text{A}$ en reposo (aviónica activa) hasta $65\text{A}$ en trepada vertical máxima.
- **Estado de Carga (SOC):** Porcentaje remanente basado en el modelo Thevenin de celda electroquímica.

### 3.5 Paquete de Carga Útil y Misión Forestal (`MISSION_EXTINGUISHER_STATUS`)
- **Nivel de Retardante:** Porcentaje de fluido químico remanente en el tanque $[100\% \to 0\%]$.
- **Estado de la Válvula / Bomba:** Activa / Inactiva con tasa de descarga de $0.025\text{ L/s}$.
- **Temperatura Ambiental Sensada:** Medición térmica en grados Celsius ($^\circ\text{C}$), que aumenta progresivamente según la proximidad a los árboles en llamas (de 25°C a 115°C, simulando la columna convectiva descrita en el paper de NASA Ames VAERA).
