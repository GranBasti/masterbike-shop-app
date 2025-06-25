// backend/app.js - Versión mejorada
const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');

const app = express();

// Configuración CORS más permisiva para desarrollo
app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type,Authorization',
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

/** 
 * CÓDIGO PARTE 2
 * INTEGRACIÓN PPROVEEDOR 
 * TABLA DATABASE
 * 
 * 
 * **/

// Añade estas rutas después de las existentes

// Ruta para obtener todos los proveedores
app.get('/api/suppliers', async (req, res) => {
  console.log('Llegó petición a /api/suppliers'); // Debug 1
  
  try {
    const [rows, fields] = await pool.query('SELECT * FROM suppliers');
    console.log('Resultado de query:', rows); // Debug 2
    res.json(rows);
  } catch (err) {
    console.error('Error completo:', err); // Debug detallado
    res.status(500).json({ 
      error: 'Database error',
      details: err.message,
      sql: err.sql 
    });
  }
});

// Ruta para agregar nuevo proveedor
app.post('/api/suppliers', async (req, res) => {
  const { name, contact_email, phone, component_specialty } = req.body;
  
  try {
    const [result] = await pool.query(
      'INSERT INTO suppliers (name, contact_email, phone, component_specialty) VALUES (?, ?, ?, ?)',
      [name, contact_email, phone, component_specialty]
    );
    res.status(201).json({ id: result.insertId, ...req.body });
  } catch (err) {
    console.error('Error adding supplier:', err);
    res.status(500).json({ error: 'Failed to add supplier' });
  }
});

// Ruta para actualizar proveedor
app.put('/api/suppliers/:id', async (req, res) => {
  const { id } = req.params;
  const { name, contact_email, phone, component_specialty } = req.body;
  
  try {
    await pool.query(
      'UPDATE suppliers SET name = ?, contact_email = ?, phone = ?, component_specialty = ? WHERE id = ?',
      [name, contact_email, phone, component_specialty, id]
    );
    res.json({ id, ...req.body });
  } catch (err) {
    console.error('Error updating supplier:', err);
    res.status(500).json({ error: 'Failed to update supplier' });
  }
});

// Ruta para eliminar proveedor
app.delete('/api/suppliers/:id', async (req, res) => {
  const { id } = req.params;
  
  try {
    await pool.query('DELETE FROM suppliers WHERE id = ?', [id]);
    res.json({ success: true });
  } catch (err) {
    console.error('Error deleting supplier:', err);
    res.status(500).json({ error: 'Failed to delete supplier' });
  }
});

/**
 * CÓDIGO BACKEND PARTE 2
 * INTEGRACIÓN PROVEEDORES
 * 
 * 
 * 
 */

const PORT = 5001; // Cambiado a 5001 para evitar conflictos
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor backend corriendo en http://0.0.0.0:${PORT}`);
});