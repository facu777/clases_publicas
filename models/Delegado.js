const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const Universidad = require('./Universidad');

const Delegado = sequelize.define('Delegado', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  telefono: {
    type: DataTypes.STRING
  },
  red_social:{
    type: DataTypes.STRING
  }
}, {
  tableName: 'delegados',
  timestamps: false // Desactiva el uso de createdAt y updatedAt

});

// Relación con Universidad
Delegado.belongsTo(Universidad, { foreignKey: 'universidad_id' });

module.exports = Delegado;
