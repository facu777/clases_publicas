import React, { useState } from 'react';
import {
  TextField,
  Button,
  Box,
  Typography,
  Card,
  CardContent,
  Snackbar,
  Alert,
  Grid
} from '@mui/material';
import { School as SchoolIcon } from '@mui/icons-material';

const CrearUniversidad = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    especialidad: '',
    direccion: ''
  });
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.nombre.trim()) {
      setSnackbar({
        open: true,
        message: 'El nombre de la universidad es obligatorio',
        severity: 'error'
      });
      return;
    }

    setLoading(true);
    
    try {
      const response = await fetch('http://localhost:3001/api/universidades', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setSnackbar({
          open: true,
          message: 'Universidad creada exitosamente',
          severity: 'success'
        });
        
        // Limpiar el formulario
        setFormData({
          nombre: '',
          especialidad: '',
          direccion: ''
        });
      } else {
        throw new Error('Error al crear la universidad');
      }
    } catch (error) {
      console.error('Error:', error);
      setSnackbar({
        open: true,
        message: 'Error al crear la universidad',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', p: 3 }}>
      <Card elevation={3}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <SchoolIcon sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
            <Typography variant="h4" component="h1" color="primary">
              Crear Universidad
            </Typography>
          </Box>

          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Nombre de la Universidad"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  required
                  variant="outlined"
                  helperText="Campo obligatorio"
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Especialidad"
                  name="especialidad"
                  value={formData.especialidad}
                  onChange={handleChange}
                  variant="outlined"
                  helperText="Ej: Ingeniería, Medicina, Derecho (opcional)"
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Dirección"
                  name="direccion"
                  value={formData.direccion}
                  onChange={handleChange}
                  variant="outlined"
                  multiline
                  rows={2}
                  helperText="Dirección completa de la universidad (opcional)"
                />
              </Grid>
              
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2 }}>
                  <Button
                    variant="outlined"
                    onClick={() => setFormData({ nombre: '', especialidad: '', direccion: '' })}
                    disabled={loading}
                  >
                    Limpiar
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={loading}
                    sx={{ minWidth: 120 }}
                  >
                    {loading ? 'Creando...' : 'Crear Universidad'}
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CrearUniversidad;
