import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  Button,
  CircularProgress,
  Alert,
  Fab
} from '@mui/material';
import {
  School as SchoolIcon,
  LocationOn as LocationIcon,
  Category as CategoryIcon,
  Add as AddIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const ListaUniversidades = () => {
  const [universidades, setUniversidades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUniversidades();
  }, []);

  const fetchUniversidades = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3001/api/universidades');
      
      if (response.ok) {
        const data = await response.json();
        setUniversidades(data);
        setError(null);
      } else {
        throw new Error('Error al cargar las universidades');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Error al cargar las universidades');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateUniversidad = () => {
    navigate('/crear-universidad');
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 5 }}>
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ py: 3 }}>
        <Alert severity="error" action={
          <Button color="inherit" size="small" onClick={fetchUniversidades}>
            Reintentar
          </Button>
        }>
          {error}
        </Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ position: 'relative' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
        <SchoolIcon sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
        <Typography variant="h4" component="h1" color="primary">
          Universidades
        </Typography>
        <Box sx={{ ml: 'auto' }}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleCreateUniversidad}
            sx={{ borderRadius: 2 }}
          >
            Nueva Universidad
          </Button>
        </Box>
      </Box>

      {universidades.length === 0 ? (
        <Card elevation={2}>
          <CardContent sx={{ textAlign: 'center', py: 6 }}>
            <SchoolIcon sx={{ fontSize: 80, color: 'grey.400', mb: 2 }} />
            <Typography variant="h6" color="text.secondary" gutterBottom>
              No hay universidades registradas
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Comienza agregando la primera universidad al sistema
            </Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleCreateUniversidad}
              sx={{ mt: 2 }}
            >
              Crear Primera Universidad
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Grid container spacing={3}>
          {universidades.map((universidad) => (
            <Grid item xs={12} sm={6} md={4} key={universidad.id}>
              <Card
                elevation={2}
                sx={{
                  height: '100%',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    elevation: 4,
                    transform: 'translateY(-2px)'
                  }
                }}
              >
                <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <SchoolIcon sx={{ color: 'primary.main', mr: 1 }} />
                    <Typography
                      variant="h6"
                      component="h2"
                      sx={{
                        fontWeight: 'bold',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        flex: 1
                      }}
                    >
                      {universidad.nombre}
                    </Typography>
                  </Box>

                  <Box sx={{ flexGrow: 1, mb: 2 }}>
                    {universidad.especialidad && (
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <CategoryIcon sx={{ fontSize: 18, color: 'text.secondary', mr: 1 }} />
                        <Chip
                          label={universidad.especialidad}
                          size="small"
                          variant="outlined"
                          color="primary"
                        />
                      </Box>
                    )}

                    {universidad.direccion && (
                      <Box sx={{ display: 'flex', alignItems: 'flex-start', mt: 2 }}>
                        <LocationIcon sx={{ fontSize: 18, color: 'text.secondary', mr: 1, mt: 0.5 }} />
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ lineHeight: 1.4 }}
                        >
                          {universidad.direccion}
                        </Typography>
                      </Box>
                    )}
                  </Box>

                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 'auto' }}>
                    <Typography variant="caption" color="text.secondary">
                      ID: {universidad.id}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Botón flotante para agregar universidad */}
      <Fab
        color="primary"
        aria-label="add"
        onClick={handleCreateUniversidad}
        sx={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          zIndex: 1000
        }}
      >
        <AddIcon />
      </Fab>
    </Box>
  );
};

export default ListaUniversidades;
