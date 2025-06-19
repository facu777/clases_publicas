const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const sequelize = require('./database');
const clasesRoutes = require('./routes/clases');
const universidadesRoutes = require('./routes/universidades')
const app = express();
const port = 3001;
const cors = require('cors')

// Middleware para parsear JSON
app.use(bodyParser.json());
app.use(cors());


app.use('/api/clases', clasesRoutes);
app.use('/api/universidades', universidadesRoutes);


sequelize.sync().then(() => {
  console.log('Modelos sincronizados con la base de datos.');
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
