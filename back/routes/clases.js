const express = require('express');
const router = express.Router();
const Clase = require('../models/Clase');
const Universidad = require('../models/Universidad');

const rateLimitMiddleware = require('../middlewares/rateLimitMiddleware');



// Obtener lista de clases
router.get('/', async (req, res) => {
  try {
    const clases = await Clase.findAll({
      include: [Universidad]
    });
    res.json(clases);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las clases' });
  }
});

// Agregar una nueva clase
router.post('/', async (req, res) => {
  const { nombre_clase, profesor, hora, universidad_id, duracion, foto_referencia, descripcion, red_social} = req.body;
  console.log(req)
  if (!nombre_clase || !profesor || !hora || !universidad_id || !duracion) {
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
      foto_referencia,  
      descripcion,      
      red_social        
    });
    res.status(201).json(nuevaClase);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Error al crear la clase' });
  }
});

module.exports = router;
