const express = require('express');
const router = express.Router();
const Delegado = require('../models/Delegado');




// Ruta para obtener todos los delegados
router.get('/', async (req, res) => {
  try {
    const delegados = await Delegado.findAll();
    res.json(delegados);
  } catch (error) {
    console.error('Error al obtener delegados:', error);
    res.status(500).json({ error: 'Error al obtener delegados' });
  }
});


module.exports = router;
