import React, { useEffect, useState } from 'react';
import { Container, Typography, Card, CardContent } from '@mui/material';
import axios from 'axios';

const ListaClases = () => {
  const [clases, setClases] = useState([]);

  useEffect(() => {
    const fetchClases = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/clases');
        setClases(response.data);
      } catch (error) {
        console.error('Error al obtener las clases:', error);
      }
    };

    fetchClases();
  }, []);

  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom>Lista de Clases</Typography>
      {clases.map((clase) => (
        <Card key={clase.id} style={{ marginBottom: '20px' }}>
          <CardContent>
            <Typography variant="h5">{clase.nombre_clase}</Typography>
            <Typography variant="body1">Profesor: {clase.profesor}</Typography>
            <Typography variant="body1">Hora: {new Date(clase.hora).toLocaleString()}</Typography>
            <Typography variant="body1">Duración: {clase.duracion} minutos</Typography>
            {clase.foto_referencia && <img src={clase.foto_referencia} alt="Referencia" style={{ maxWidth: '100%' }} />} {/* Nuevo campo */}
            <Typography variant="body1">Descripción: {clase.descripcion}</Typography>  {/* Nuevo campo */}
            <Typography variant="body1">Red Social: {clase.red_social}</Typography>  {/* Nuevo campo */}
            <Typography variant="body1">Universidad: {clase.Universidad?.nombre}</Typography>
          </CardContent>
        </Card>
      ))}
    </Container>
  );
};

export default ListaClases;
