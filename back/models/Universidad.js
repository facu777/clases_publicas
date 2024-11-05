const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Universidad = sequelize.define('Universidad', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  especialidad: {
    type: DataTypes.STRING,
    allowNull: true // Puede ser null si no se proporciona
  },
  direccion: {
    type: DataTypes.STRING,
    allowNull: true // Puede ser null si no se proporciona
  },
}, {
  tableName: 'universidades',
  timestamps: false // Desactiva el uso de createdAt y updatedAt

});

module.exports = Universidad;
