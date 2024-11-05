import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, Typography, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import axios from 'axios';




const CrearClase = () => {
  const [universidades, setUniversidades] = useState([]);
  const [universidadId, setUniversidadId] = useState('');
  const [formData, setFormData] = useState({
    nombre_clase: '',
    profesor: '',
    hora: '',
    duracion: '',
    universidad_id: '',
    foto_referencia: '',  // Nuevo campo
    descripcion: '',      // Nuevo campo
    red_social: ''        // Nuevo campo
  });
  useEffect(() => {
    // Obtener universidades y delegados
    axios.get('http://localhost:3001/api/universidades')
      .then(response => setUniversidades(response.data))
      .catch(error => console.error('Error al obtener universidades:', error));

  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/api/clases', formData);
      // Redirigir o mostrar mensaje de éxito
    } catch (error) {
      console.error('Error al crear la clase', error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" align="center">Crear Nueva Clase</Typography>
      <form onSubmit={handleSubmit}>
        <TextField required label="Nombre de la Clase" name="nombre_clase" fullWidth margin="normal" value={formData.nombre_clase} onChange={handleChange} />
        <TextField required label="Profesor" name="profesor" fullWidth margin="normal" value={formData.profesor} onChange={handleChange} />
        <TextField required label="Fecha y Hora" type="datetime-local" name="hora" fullWidth margin="normal" InputLabelProps={{ shrink: true }} value={formData.hora} onChange={handleChange} />
        <TextField label="Duración (minutos)" type="number" name="duracion" fullWidth margin="normal" value={formData.duracion} onChange={handleChange} />
        <TextField label="Foto de Referencia" name="foto_referencia" fullWidth margin="normal" value={formData.foto_referencia} onChange={handleChange} />
        <TextField label="Descripción" name="descripcion" fullWidth margin="normal" value={formData.descripcion} onChange={handleChange} />
        <TextField label="Red Social" name="red_social" fullWidth margin="normal" value={formData.red_social} onChange={handleChange} />
        <FormControl fullWidth margin="normal" required>
          <InputLabel shrink htmlFor="universidad-select">Universidad</InputLabel>
          <Select
            labelId="universidad-select"
            id="universidad-select"
            name="universidad_id"
            value={universidadId}
            onChange={(e) => {
              setUniversidadId(e.target.value);
              setFormData({ ...formData, [e.target.name]: e.target.value })
            }}
            label="Universidad"
            displayEmpty
          >
            <MenuItem value="" disabled>
              Seleccione una universidad
            </MenuItem>
            {universidades.map((uni) => (
              <MenuItem key={uni.id} value={uni.id}>
                {uni.nombre + " - " + uni.direccion}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button type="submit" variant="contained" color="primary">Crear Clase</Button>

      </form>
    </Container>
  );
};

export default CrearClase;
