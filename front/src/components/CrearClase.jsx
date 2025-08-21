import React, { useState, useEffect } from 'react';
import {
  Container,
  TextField,
  Button,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Paper,
  Grid,
  Box,
  Alert,
  Snackbar,
  CircularProgress,
  Card,
  CardContent,
  Avatar,
  Divider,
  Chip,
  Stepper,
  Step,
  StepLabel,
  StepContent
} from '@mui/material';
import {
  School as SchoolIcon,
  Person as PersonIcon,
  Schedule as ScheduleIcon,
  Timer as TimerIcon,
  Description as DescriptionIcon,
  Photo as PhotoIcon,
  Share as ShareIcon,
  Save as SaveIcon,
  CheckCircle as CheckCircleIcon,
  ArrowBack as ArrowBackIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
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
    foto_referencia: '',  
    descripcion: '',      
    red_social: ''        
  });
  const [loading, setLoading] = useState(false);
  const [loadingUniversidades, setLoadingUniversidades] = useState(true);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });
  const [errors, setErrors] = useState({});
  const [activeStep, setActiveStep] = useState(0);
  
  const navigate = useNavigate();
  useEffect(() => {
    // Obtener universidades
    const fetchUniversidades = async () => {
      try {
        setLoadingUniversidades(true);
        const response = await axios.get('http://localhost:3001/api/universidades');
        setUniversidades(response.data);
      } catch (error) {
        console.error('Error al obtener universidades:', error);
        setSnackbar({
          open: true,
          message: 'Error al cargar las universidades',
          severity: 'error'
        });
      } finally {
        setLoadingUniversidades(false);
      }
    };

    fetchUniversidades();
  }, []);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.nombre_clase.trim()) {
      newErrors.nombre_clase = 'El nombre de la clase es requerido';
    }
    
    if (!formData.profesor.trim()) {
      newErrors.profesor = 'El nombre del profesor es requerido';
    }
    
    if (!formData.hora) {
      newErrors.hora = 'La fecha y hora son requeridas';
    }
    
    if (!formData.duracion || formData.duracion <= 0) {
      newErrors.duracion = 'La duración debe ser mayor a 0 minutos';
    }
    
    if (!formData.universidad_id) {
      newErrors.universidad_id = 'Debe seleccionar una universidad';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Limpiar error del campo cuando el usuario escriba
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleUniversidadChange = (e) => {
    const value = e.target.value;
    setUniversidadId(value);
    setFormData({ ...formData, universidad_id: value });
    
    if (errors.universidad_id) {
      setErrors({ ...errors, universidad_id: '' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      setSnackbar({
        open: true,
        message: 'Por favor, corrija los errores en el formulario',
        severity: 'error'
      });
      return;
    }

    try {
      setLoading(true);
      await axios.post('http://localhost:3001/api/clases', formData);
      
      setSnackbar({
        open: true,
        message: '¡Clase creada exitosamente! 🎉',
        severity: 'success'
      });

      // Limpiar formulario
      setFormData({
        nombre_clase: '',
        profesor: '',
        hora: '',
        duracion: '',
        universidad_id: '',
        foto_referencia: '',  
        descripcion: '',      
        red_social: ''        
      });
      setUniversidadId('');
      setActiveStep(0);

      // Redirigir después de 2 segundos
      setTimeout(() => {
        navigate('/lista-clases');
      }, 2000);

    } catch (error) {
      console.error('Error al crear la clase:', error);
      setSnackbar({
        open: true,
        message: 'Error al crear la clase. Por favor, intente nuevamente.',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const steps = [
    'Información básica',
    'Detalles adicionales',
    'Confirmación'
  ];

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                required
                label="Nombre de la Clase"
                name="nombre_clase"
                fullWidth
                value={formData.nombre_clase}
                onChange={handleChange}
                error={!!errors.nombre_clase}
                helperText={errors.nombre_clase}
                InputProps={{
                  startAdornment: <SchoolIcon sx={{ mr: 1, color: 'action.active' }} />
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                label="Profesor"
                name="profesor"
                fullWidth
                value={formData.profesor}
                onChange={handleChange}
                error={!!errors.profesor}
                helperText={errors.profesor}
                InputProps={{
                  startAdornment: <PersonIcon sx={{ mr: 1, color: 'action.active' }} />
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                label="Fecha y Hora"
                type="datetime-local"
                name="hora"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={formData.hora}
                onChange={handleChange}
                error={!!errors.hora}
                helperText={errors.hora}
                InputProps={{
                  startAdornment: <ScheduleIcon sx={{ mr: 1, color: 'action.active' }} />
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                label="Duración (minutos)"
                type="number"
                name="duracion"
                fullWidth
                value={formData.duracion}
                onChange={handleChange}
                error={!!errors.duracion}
                helperText={errors.duracion}
                InputProps={{
                  startAdornment: <TimerIcon sx={{ mr: 1, color: 'action.active' }} />
                }}
              />
            </Grid>
          </Grid>
        );
      case 1:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <FormControl 
                fullWidth 
                required
                error={!!errors.universidad_id}
              >
                <InputLabel>Universidad</InputLabel>
                <Select
                  value={universidadId}
                  onChange={handleUniversidadChange}
                  label="Universidad"
                  disabled={loadingUniversidades}
                >
                  {universidades.map((uni) => (
                    <MenuItem key={uni.id} value={uni.id}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <SchoolIcon sx={{ mr: 1 }} />
                        {uni.nombre} - {uni.direccion}
                      </Box>
                    </MenuItem>
                  ))}
                </Select>
                {errors.universidad_id && (
                  <Typography variant="caption" color="error" sx={{ mt: 1, ml: 2 }}>
                    {errors.universidad_id}
                  </Typography>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Descripción"
                name="descripcion"
                fullWidth
                multiline
                rows={4}
                value={formData.descripcion}
                onChange={handleChange}
                placeholder="Describe brevemente de qué trata la clase..."
                InputProps={{
                  startAdornment: <DescriptionIcon sx={{ mr: 1, color: 'action.active', alignSelf: 'flex-start', mt: 1 }} />
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Foto de Referencia (URL)"
                name="foto_referencia"
                fullWidth
                value={formData.foto_referencia}
                onChange={handleChange}
                placeholder="https://ejemplo.com/imagen.jpg"
                InputProps={{
                  startAdornment: <PhotoIcon sx={{ mr: 1, color: 'action.active' }} />
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Red Social"
                name="red_social"
                fullWidth
                value={formData.red_social}
                onChange={handleChange}
                placeholder="@usuario o enlace"
                InputProps={{
                  startAdornment: <ShareIcon sx={{ mr: 1, color: 'action.active' }} />
                }}
              />
            </Grid>
          </Grid>
        );
      case 2:
        return (
          <Card elevation={2}>
            <CardContent>
              <Typography variant="h6" gutterBottom color="primary">
                Resumen de la Clase
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <SchoolIcon sx={{ mr: 1, color: 'primary.main' }} />
                    <Typography variant="h6">{formData.nombre_clase}</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <PersonIcon sx={{ mr: 1, color: 'text.secondary' }} />
                    <Typography>Profesor: {formData.profesor}</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <TimerIcon sx={{ mr: 1, color: 'text.secondary' }} />
                    <Typography>Duración: {formData.duracion} minutos</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <ScheduleIcon sx={{ mr: 1, color: 'text.secondary' }} />
                    <Typography>
                      {formData.hora && new Date(formData.hora).toLocaleString('es-ES')}
                    </Typography>
                  </Box>
                </Grid>
                {universidadId && (
                  <Grid item xs={12}>
                    <Chip
                      icon={<SchoolIcon />}
                      label={universidades.find(u => u.id == universidadId)?.nombre}
                      color="primary"
                      variant="outlined"
                    />
                  </Grid>
                )}
              </Grid>
            </CardContent>
          </Card>
        );
      default:
        return 'Paso desconocido';
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Avatar
          sx={{
            width: 80,
            height: 80,
            bgcolor: 'primary.main',
            margin: '0 auto 16px',
            background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)'
          }}
        >
          <SchoolIcon sx={{ fontSize: 40 }} />
        </Avatar>
        <Typography 
          variant="h3" 
          component="h1" 
          gutterBottom
          sx={{ 
            fontWeight: 'bold',
            background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
        >
          ✨ Crear Nueva Clase
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Completa la información para crear una nueva clase
        </Typography>
      </Box>

      {/* Botón de volver */}
      <Box sx={{ mb: 3 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/lista-clases')}
          variant="outlined"
          sx={{ borderRadius: 2 }}
        >
          Volver a la lista
        </Button>
      </Box>

      {/* Formulario Principal */}
      <Paper elevation={3} sx={{ borderRadius: 3, overflow: 'hidden' }}>
        <Box sx={{ p: 4 }}>
          {/* Stepper */}
          <Stepper activeStep={activeStep} orientation="horizontal" sx={{ mb: 4 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          <form onSubmit={handleSubmit}>
            {/* Contenido del paso actual */}
            <Box sx={{ mb: 4 }}>
              {getStepContent(activeStep)}
            </Box>

            <Divider sx={{ my: 3 }} />

            {/* Botones de navegación */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
              <Button
                disabled={activeStep === 0}
                onClick={() => setActiveStep(activeStep - 1)}
                variant="outlined"
                sx={{ borderRadius: 2 }}
              >
                Anterior
              </Button>

              <Box>
                {activeStep === steps.length - 1 ? (
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={loading}
                    startIcon={loading ? <CircularProgress size={20} /> : <SaveIcon />}
                    sx={{
                      borderRadius: 2,
                      background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                      minWidth: 140
                    }}
                  >
                    {loading ? 'Creando...' : 'Crear Clase'}
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    onClick={() => setActiveStep(activeStep + 1)}
                    sx={{
                      borderRadius: 2,
                      background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)'
                    }}
                  >
                    Siguiente
                  </Button>
                )}
              </Box>
            </Box>
          </form>
        </Box>
      </Paper>

      {/* Información adicional */}
      <Paper elevation={1} sx={{ mt: 3, p: 3, borderRadius: 3, bgcolor: 'background.default' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <CheckCircleIcon sx={{ mr: 1, color: 'primary.main' }} />
          <Typography variant="h6" color="primary">
            Consejos para crear una clase exitosa
          </Typography>
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" color="text.secondary">
              • Usa un nombre descriptivo y atractivo
            </Typography>
            <Typography variant="body2" color="text.secondary">
              • Incluye toda la información relevante
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" color="text.secondary">
              • Agrega una descripción clara y concisa
            </Typography>
            <Typography variant="body2" color="text.secondary">
              • Especifica la duración apropiada
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      {/* Snackbar para notificaciones */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default CrearClase;
