const express = require('express');
const router = express.Router();
const Universidad = require('../models/Universidad');


// Ruta para obtener todas las universidades
router.get('/', async (req, res) => {
  try {
    const universidades = await Universidad.findAll();
    res.json(universidades);
  } catch (error) {
    console.error('Error al obtener universidades:', error);
    res.status(500).json({ error: 'Error al obtener universidades' });
  }
});
router.post('/', async (req, res) => {
  const { nombre, especialidad, direccion } = req.body;
  
  try {
    await Universidad.create({ nombre, especialidad, direccion });
    res.redirect('/cargar-clases'); // Redirige después de cargar
  } catch (error) {
    console.error("Error al cargar universidad:", error);
    res.status(500).send("Error al cargar universidad");
  }
});
module.exports = router;
