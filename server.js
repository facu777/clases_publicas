const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const sequelize = require('./database');
const clasesRoutes = require('./routes/clases');
const delegadosRoutes = require('./routes/delegados')
const universidadesRoutes = require('./routes/universidades')
const app = express();
const port = 3000;

// Middleware para parsear JSON
app.use(bodyParser.json());

// Servir archivos estáticos (HTML, CSS, JS) desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));



// Rutas para el backend (API de clases)
app.use('/api/clases', clasesRoutes);
app.use('/api/delegados', delegadosRoutes);
app.use('/api/universidades', universidadesRoutes);

// Ruta principal: Servir la página estática index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
// Ruta para servir la página de cargar nueva clase
app.get('/nueva-clase', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'nueva-clase.html'));
});

// Sincronizar modelos con la base de datos
sequelize.sync().then(() => {
  console.log('Modelos sincronizados con la base de datos.');
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
