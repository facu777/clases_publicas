import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, CssBaseline, Container } from '@mui/material';
import CrearClase from './components/CrearClase';
import ListaClases from './components/ListaClases';
import CrearUniversidad from './components/CrearUniversidad';
import ListaUniversidades from './components/ListaUniversidades';

function App() {
  return (
    <Router>
      <CssBaseline />
      {/* Barra de navegación */}
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Clases Públicas
          </Typography>
          <Button color="inherit" component={Link} to="/">
            Ver Clases
          </Button>
          <Button color="inherit" component={Link} to="/clase">
            Crear Clase
          </Button>
          <Button color="inherit" component={Link} to="/universidades">
            Universidades
          </Button>
          <Button color="inherit" component={Link} to="/universidad">
            Nueva Universidad
          </Button>
        </Toolbar>
      </AppBar>

      {/* Contenido principal con enrutamiento */}
      <Container sx={{ mt: 5 }}>
        <Routes>
          <Route path="/" element={<ListaClases />} />
          <Route path="/clase" element={<CrearClase />} />
          <Route path="/universidades" element={<ListaUniversidades />} />
          <Route path="/universidad" element={<CrearUniversidad />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
