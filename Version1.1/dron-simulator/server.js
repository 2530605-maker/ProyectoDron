import http from 'http';
import fs from 'fs';
import path from 'path';
import os from 'os';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = path.join(__dirname, 'public');
const DATA_DIR = path.join(__dirname, 'data');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Rutas de archivos de datos locales
const PROGRESS_FILE = path.join(DATA_DIR, 'progress.json');
const LOGS_FILE = path.join(DATA_DIR, 'flight_logs.json');
const EVENTS_FILE = path.join(DATA_DIR, 'events.json');

function readJsonFile(filePath, defaultVal = {}) {
  try {
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf-8');
      return JSON.parse(data);
    }
  } catch (e) {
    console.error(`Error leyendo ${filePath}:`, e);
  }
  return defaultVal;
}

function writeJsonFile(filePath, data) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
  } catch (e) {
    console.error(`Error guardando ${filePath}:`, e);
  }
}

const MIME_TYPES = {
  '.html': 'text/html; charset=UTF-8',
  '.css': 'text/css; charset=UTF-8',
  '.js': 'application/javascript; charset=UTF-8',
  '.mjs': 'application/javascript; charset=UTF-8',
  '.json': 'application/json; charset=UTF-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.glb': 'model/gltf-binary',
  '.gltf': 'model/gltf+json',
  '.bin': 'application/octet-stream',
  '.mp3': 'audio/mpeg',
  '.wav': 'audio/wav',
  '.md': 'text/markdown; charset=UTF-8'
};

function parseRequestBody(req) {
  return new Promise((resolve) => {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (e) {
        resolve({});
      }
    });
  });
}

const server = http.createServer(async (req, res) => {
  const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const pathname = decodeURI(parsedUrl.pathname);

  // Headers CORS para integración con LMS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // =========================================================================
  // API REST: MODO PROFESOR, EVENTOS Y PERSISTENCIA DE APRENDIZAJE
  // =========================================================================

  // 1. GET /api/manifest
  if (pathname === '/api/manifest') {
    const manifestPath = path.join(__dirname, 'manifest.json');
    const manifest = readJsonFile(manifestPath, {});
    res.writeHead(200, { 'Content-Type': 'application/json; charset=UTF-8' });
    res.end(JSON.stringify(manifest));
    return;
  }

  // 2. GET /api/lecciones
  if (pathname === '/api/lecciones') {
    const leccionesPath = path.join(__dirname, 'lecciones.json');
    const lecciones = readJsonFile(leccionesPath, {});
    res.writeHead(200, { 'Content-Type': 'application/json; charset=UTF-8' });
    res.end(JSON.stringify(lecciones));
    return;
  }

  // 3. GET /api/objectives
  if (pathname === '/api/objectives') {
    const objPath = path.join(__dirname, 'objectives.json');
    const objectives = readJsonFile(objPath, {});
    res.writeHead(200, { 'Content-Type': 'application/json; charset=UTF-8' });
    res.end(JSON.stringify(objectives));
    return;
  }

  // 4. GET /api/rubrics
  if (pathname === '/api/rubrics') {
    const rubricsPath = path.join(__dirname, 'rubrics.json');
    const rubrics = readJsonFile(rubricsPath, {});
    res.writeHead(200, { 'Content-Type': 'application/json; charset=UTF-8' });
    res.end(JSON.stringify(rubrics));
    return;
  }

  // 5. GET y POST /api/progress (Progreso del estudiante)
  if (pathname === '/api/progress') {
    const studentId = parsedUrl.searchParams.get('alumno') || 'alumno-local-demo';
    const allProgress = readJsonFile(PROGRESS_FILE, {});

    if (req.method === 'GET') {
      const studentData = allProgress[studentId] || {
        studentId,
        currentPhase: 'M',
        completedPhases: [],
        scoreTotal: 0,
        lastUpdated: new Date().toISOString()
      };
      res.writeHead(200, { 'Content-Type': 'application/json; charset=UTF-8' });
      res.end(JSON.stringify(studentData));
      return;
    }

    if (req.method === 'POST') {
      const body = await parseRequestBody(req);
      const sid = body.studentId || studentId;
      allProgress[sid] = {
        ...allProgress[sid],
        ...body,
        studentId: sid,
        lastUpdated: new Date().toISOString()
      };
      writeJsonFile(PROGRESS_FILE, allProgress);
      res.writeHead(200, { 'Content-Type': 'application/json; charset=UTF-8' });
      res.end(JSON.stringify({ success: true, studentId: sid }));
      return;
    }
  }

  // 6. GET y POST /api/flight-log (Bitácora de vuelos)
  if (pathname === '/api/flight-log') {
    const studentId = parsedUrl.searchParams.get('alumno');
    const allLogs = readJsonFile(LOGS_FILE, []);

    if (req.method === 'GET') {
      const filtered = studentId ? allLogs.filter(l => l.studentId === studentId) : allLogs;
      res.writeHead(200, { 'Content-Type': 'application/json; charset=UTF-8' });
      res.end(JSON.stringify(filtered));
      return;
    }

    if (req.method === 'POST') {
      const record = await parseRequestBody(req);
      allLogs.unshift(record);
      if (allLogs.length > 200) allLogs.pop(); // Mantener hasta 200 vuelos
      writeJsonFile(LOGS_FILE, allLogs);
      res.writeHead(201, { 'Content-Type': 'application/json; charset=UTF-8' });
      res.end(JSON.stringify({ success: true, record }));
      return;
    }
  }

  // 7. GET y POST /api/events (Eventos pedagógicos estandarizados)
  if (pathname === '/api/events') {
    const studentId = parsedUrl.searchParams.get('alumno');
    const allEvents = readJsonFile(EVENTS_FILE, []);

    if (req.method === 'GET') {
      const filtered = studentId ? allEvents.filter(e => e.student_id === studentId) : allEvents;
      res.writeHead(200, { 'Content-Type': 'application/json; charset=UTF-8' });
      res.end(JSON.stringify(filtered));
      return;
    }

    if (req.method === 'POST') {
      const event = await parseRequestBody(req);
      allEvents.unshift(event);
      if (allEvents.length > 500) allEvents.pop();
      writeJsonFile(EVENTS_FILE, allEvents);
      res.writeHead(201, { 'Content-Type': 'application/json; charset=UTF-8' });
      res.end(JSON.stringify({ success: true }));
      return;
    }
  }

  // 8. GET /api/students (Lista de alumnos registrados para Modo Profesor)
  if (pathname === '/api/students') {
    const allProgress = readJsonFile(PROGRESS_FILE, {});
    const studentList = Object.keys(allProgress).map(id => ({
      id,
      ...allProgress[id]
    }));
    res.writeHead(200, { 'Content-Type': 'application/json; charset=UTF-8' });
    res.end(JSON.stringify(studentList));
    return;
  }

  // =========================================================================
  // SERVIDOR DE ARCHIVOS ESTÁTICOS
  // =========================================================================
  let reqPath = pathname;
  if (reqPath === '/' || reqPath === '') reqPath = '/index.html';

  let filePath = path.join(PUBLIC_DIR, reqPath);

  if (!filePath.startsWith(PUBLIC_DIR)) {
    res.writeHead(403, { 'Content-Type': 'text/plain; charset=UTF-8' });
    res.end('403 Prohibido');
    return;
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      // Buscar en directorio raíz si no está en public
      const rootFallback = path.join(__dirname, reqPath);
      if (fs.existsSync(rootFallback) && fs.statSync(rootFallback).isFile()) {
        filePath = rootFallback;
      } else {
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=UTF-8' });
        res.end('404 Archivo no encontrado');
        return;
      }
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, {
      'Content-Type': contentType,
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Access-Control-Allow-Origin': '*'
    });

    const stream = fs.createReadStream(filePath);
    stream.pipe(res);
  });
});

function getLocalIP() {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal && !iface.address.startsWith('169.254')) {
        return iface.address;
      }
    }
  }
  return 'localhost';
}

function startServer(portToTry) {
  server.listen(portToTry, '127.0.0.1', () => {
    const localIp = getLocalIP();
    console.log(`=======================================================`);
    console.log(`🚁 SIMULADOR DE DRON FORESTAL ZD550 (Babylon.js 3D)`);
    console.log(`💻 Local (PC):         http://localhost:${portToTry}`);
    console.log(`📱 En Red Wi-Fi:       http://${localIp}:${portToTry}`);
    console.log(`👨‍🏫 Modo Profesor:      http://localhost:${portToTry}/?alumno=2530605`);
    console.log(`📋 Catálogo Proyectos: http://localhost:${portToTry}/proyectos.html`);
    console.log(`Modo: 100% Offline | REST API Activa | Vanilla JS`);
    console.log(`=======================================================`);
  });
}

server.on('error', (err) => {
  if (err.code === 'EACCES' || err.code === 'EADDRINUSE') {
    const nextPort = PORT + 1;
    console.warn(`Puerto ${PORT} ocupado o restringido, intentando puerto ${nextPort}...`);
    server.listen(nextPort, '127.0.0.1', () => {
      console.log(`🚁 Servidor activo en http://localhost:${nextPort}`);
    });
  } else {
    console.error('Error del servidor:', err);
  }
});

startServer(PORT);
