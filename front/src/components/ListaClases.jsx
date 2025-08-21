import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Chip,
  Avatar,
  Box,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Alert,
  Fab,
  IconButton,
  Tooltip,
  Paper,
  Divider
} from '@mui/material';
import {
  Search as SearchIcon,
  School as SchoolIcon,
  Person as PersonIcon,
  Schedule as ScheduleIcon,
  Timer as TimerIcon,
  Share as ShareIcon,
  Refresh as RefreshIcon,
  Add as AddIcon,
  AccessTime as AccessTimeIcon,
  LocationOn as LocationIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ListaClases = () => {
  const [clases, setClases] = useState([]);
  const [clasesOriginales, setClasesOriginales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterUniversidad, setFilterUniversidad] = useState('');
  const [universidades, setUniversidades] = useState([]);
  const navigate = useNavigate();

  // Función para formatear y abrir enlaces de redes sociales
  const handleSocialMediaClick = (redSocial) => {
    if (!redSocial) return;
    
    let url = redSocial.trim();
    
    // Si ya es una URL completa, usarla directamente
    if (url.startsWith('http://') || url.startsWith('https://')) {
      window.open(url, '_blank', 'noopener,noreferrer');
      return;
    }
    
    // Si empieza con @, asumir que es Twitter/X
    if (url.startsWith('@')) {
      url = `https://twitter.com/${url.substring(1)}`;
      window.open(url, '_blank', 'noopener,noreferrer');
      return;
    }
    
    // Si es solo un username, asumir Instagram
    if (!url.includes('.')) {
      url = `https://instagram.com/${url}`;
      window.open(url, '_blank', 'noopener,noreferrer');
      return;
    }
    
    // Si contiene un dominio pero no protocolo, agregar https
    if (!url.startsWith('http')) {
      url = `https://${url}`;
    }
    
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const fetchClases = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get('http://localhost:3001/api/clases');
      setClases(response.data);
      setClasesOriginales(response.data);
      
      // Extraer universidades únicas para el filtro
      const universidadesUnicas = [...new Set(response.data.map(clase => clase.Universidad?.nombre).filter(Boolean))];
      setUniversidades(universidadesUnicas);
    } catch (error) {
      console.error('Error al obtener las clases:', error);
      setError('Error al cargar las clases. Por favor, intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClases();
  }, []);

  // Filtrar clases basado en búsqueda y filtros
  useEffect(() => {
    let clasesFiltradas = [...clasesOriginales];

    // Filtro por término de búsqueda
    if (searchTerm) {
      clasesFiltradas = clasesFiltradas.filter(clase =>
        clase.nombre_clase.toLowerCase().includes(searchTerm.toLowerCase()) ||
        clase.profesor.toLowerCase().includes(searchTerm.toLowerCase()) ||
        clase.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtro por universidad
    if (filterUniversidad) {
      clasesFiltradas = clasesFiltradas.filter(clase =>
        clase.Universidad?.nombre === filterUniversidad
      );
    }

    setClases(clasesFiltradas);
  }, [searchTerm, filterUniversidad, clasesOriginales]);

  const formatearFecha = (fecha) => {
    return new Date(fecha).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const formatearHora = (fecha) => {
    return new Date(fecha).toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <Box textAlign="center">
          <CircularProgress size={60} />
          <Typography variant="h6" sx={{ mt: 2 }}>Cargando clases...</Typography>
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ mt: 4 }}>
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
        <Box textAlign="center">
          <IconButton onClick={fetchClases} color="primary" size="large">
            <RefreshIcon />
          </IconButton>
          <Typography variant="body2">Reintentar</Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4, textAlign: 'center' }}>
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
          📚 Lista de Clases
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Descubre y explora todas las clases disponibles
        </Typography>
      </Box>

      {/* Filtros y Búsqueda */}
      <Paper elevation={2} sx={{ p: 3, mb: 4, borderRadius: 3 }}>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Buscar clases, profesores o descripción..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" />
                  </InputAdornment>
                )
              }}
              sx={{ 
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2
                }
              }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel>Filtrar por Universidad</InputLabel>
              <Select
                value={filterUniversidad}
                label="Filtrar por Universidad"
                onChange={(e) => setFilterUniversidad(e.target.value)}
                sx={{ borderRadius: 2 }}
              >
                <MenuItem value="">
                  <em>Todas las universidades</em>
                </MenuItem>
                {universidades.map((universidad) => (
                  <MenuItem key={universidad} value={universidad}>
                    {universidad}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={2}>
            <Box display="flex" gap={1}>
              <Tooltip title="Refrescar">
                <IconButton onClick={fetchClases} color="primary">
                  <RefreshIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Estadísticas */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" color="text.secondary">
          Mostrando {clases.length} de {clasesOriginales.length} clases
        </Typography>
      </Box>

      {/* Lista de Clases */}
      {clases.length === 0 ? (
        <Paper elevation={1} sx={{ p: 6, textAlign: 'center', borderRadius: 3 }}>
          <SchoolIcon sx={{ fontSize: 80, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h5" gutterBottom>
            No se encontraron clases
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {searchTerm || filterUniversidad 
              ? 'Intenta ajustar tus filtros de búsqueda'
              : 'Aún no hay clases disponibles'
            }
          </Typography>
        </Paper>
      ) : (
        <Grid container spacing={3}>
          {clases.map((clase) => (
            <Grid item xs={12} sm={6} lg={4} key={clase.id}>
              <Card 
                elevation={3}
                sx={{ 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: 3,
                  overflow: 'hidden',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 6
                  }
                }}
              >
                {/* Imagen de la clase */}
                {clase.foto_referencia ? (
                  <CardMedia
                    component="img"
                    height="200"
                    image={clase.foto_referencia}
                    alt={clase.nombre_clase}
                    sx={{ objectFit: 'cover' }}
                  />
                ) : (
                  <Box
                    sx={{
                      height: 200,
                      backgroundColor: 'primary.main',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                    }}
                  >
                    <SchoolIcon sx={{ fontSize: 60, color: 'white' }} />
                  </Box>
                )}

                <CardContent sx={{ flexGrow: 1, p: 3 }}>
                  {/* Título */}
                  <Typography 
                    variant="h5" 
                    component="h2" 
                    gutterBottom
                    sx={{ 
                      fontWeight: 'bold',
                      color: 'primary.main',
                      mb: 2
                    }}
                  >
                    {clase.nombre_clase}
                  </Typography>

                  {/* Profesor */}
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar sx={{ mr: 2, bgcolor: 'secondary.main' }}>
                      <PersonIcon />
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle1" fontWeight="medium">
                        {clase.profesor}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Profesor
                      </Typography>
                    </Box>
                  </Box>

                  <Divider sx={{ my: 2 }} />

                  {/* Información de tiempo */}
                  <Box sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <ScheduleIcon sx={{ mr: 1, color: 'text.secondary' }} />
                      <Typography variant="body2">
                        {formatearFecha(clase.hora)} a las {formatearHora(clase.hora)}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <TimerIcon sx={{ mr: 1, color: 'text.secondary' }} />
                      <Typography variant="body2">
                        Duración: {clase.duracion} minutos
                      </Typography>
                    </Box>
                  </Box>

                  {/* Descripción */}
                  <Typography 
                    variant="body2" 
                    color="text.secondary" 
                    sx={{ 
                      mb: 2,
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}
                  >
                    {clase.descripcion}
                  </Typography>

                  {/* Chips de información */}
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                    {clase.Universidad?.nombre && (
                      <Chip
                        icon={<SchoolIcon />}
                        label={clase.Universidad.nombre}
                        color="primary"
                        variant="outlined"
                        size="small"
                      />
                    )}
                    {clase.red_social && (
                      <Tooltip title="Clic para abrir enlace" arrow>
                        <Chip
                          icon={<ShareIcon />}
                          label={clase.red_social}
                          color="secondary"
                          variant="outlined"
                          size="small"
                          onClick={() => handleSocialMediaClick(clase.red_social)}
                          sx={{ 
                            cursor: 'pointer',
                            '&:hover': {
                              backgroundColor: 'secondary.light',
                              transform: 'scale(1.05)',
                              transition: 'all 0.2s ease-in-out'
                            }
                          }}
                        />
                      </Tooltip>
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* FAB para agregar nueva clase */}
      <Tooltip title="Crear nueva clase">
        <Fab
          color="primary"
          aria-label="add"
          sx={{
            position: 'fixed',
            bottom: 24,
            right: 24,
            background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)'
          }}
          onClick={() => navigate('/crear-clase')}
        >
          <AddIcon />
        </Fab>
      </Tooltip>
    </Container>
  );
};

export default ListaClases;
