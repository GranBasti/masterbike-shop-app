// backend/app.js - Versión mejorada
const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');

const app = express();

// Configuración CORS más permisiva para desarrollo
app.use(cors({
  origin: true, // Permite todos los orígenes (solo para desarrollo)
  credentials: true
}));

// Middleware para log de todas las peticiones
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Configuración de MySQL para Laragon
const pool = mysql.createPool({
  host: '127.0.0.1', // Usar 127.0.0.1 en lugar de localhost
  user: 'root',
  password: '',
  database: 'bikeshop',
  waitForConnections: true,
  connectionLimit: 10
});

// Ruta de prueba
app.get('/api/test', (req, res) => {
  res.json({ 
    status: 'Backend funcionando',
    timestamp: new Date().toISOString()
  });
});

// Ruta de bicicletas con manejo mejorado de errores
app.get('/api/bikes', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM bikes');
    console.log(`Enviando ${rows.length} bicicletas`);
    res.json(rows);
  } catch (err) {
    console.error('Error de base de datos:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

const PORT = 5001; // Cambiado a 5001 para evitar conflictos
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor backend corriendo en http://0.0.0.0:${PORT}`);
});