const express = require('express');
const router = express.Router();
const Clase = require('../models/Clase');
const Universidad = require('../models/Universidad');
const Delegado = require('../models/Delegado');
const rateLimitMiddleware = require('../middlewares/rateLimitMiddleware');


// Ruta para obtener todas las universidades
router.get('/universidades', async (req, res) => {
  try {
    const universidades = await Universidad.findAll();
    res.json(universidades);
  } catch (error) {
    console.error('Error al obtener universidades:', error);
    res.status(500).json({ error: 'Error al obtener universidades' });
  }
});

// Ruta para obtener todos los delegados
router.get('/delegados', async (req, res) => {
  try {
    const delegados = await Delegado.findAll();
    res.json(delegados);
  } catch (error) {
    console.error('Error al obtener delegados:', error);
    res.status(500).json({ error: 'Error al obtener delegados' });
  }
});
// Obtener lista de clases
router.get('/', async (req, res) => {
  try {
    const clases = await Clase.findAll({
      include: [Universidad, Delegado]
    });
    res.json(clases);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las clases' });
  }
});

// Agregar una nueva clase
router.post('/',rateLimitMiddleware, async (req, res) => {
  const { nombre_clase, profesor, hora, universidad_id, delegado_id, duracion } = req.body;
  console.log(req)
  if (!nombre_clase || !profesor || !hora || !universidad_id || !delegado_id || !duracion) {
    console.log("Faltan campos")
    return res.status(400).json({ error: 'Todos los campos son requeridos' });
  }

  try {
    const nuevaClase = await Clase.create({
      nombre_clase,
      profesor,
      hora,
      duracion,
      universidad_id,
      delegado_id
    });
    res.status(201).json(nuevaClase);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Error al crear la clase' });
  }
});

module.exports = router;
