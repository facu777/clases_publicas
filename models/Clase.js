const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const Universidad = require('./Universidad');

const Clase = sequelize.define('Clase', {
    nombre_clase: {
      type: DataTypes.STRING,
      allowNull: false
    },
    profesor: {
      type: DataTypes.STRING,
      allowNull: false
    },
    hora: {
      type: DataTypes.DATE,  // Cambiado a DATE para manejar fecha y hora
      allowNull: false
    },
    duracion: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    foto_referencia:{
      type: DataTypes.STRING
    },
    descripcion:{
      type: DataTypes.STRING
    },
    red_social:{
      type: DataTypes.STRING
    }

}, {
  tableName: 'clases',
  timestamps: false // Desactiva el uso de createdAt y updatedAt

});

// Relación con Universidad 
Clase.belongsTo(Universidad, { foreignKey: 'universidad_id' });

module.exports = Clase;
