const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    id:{
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey:true 
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description:{
      type: DataTypes.STRING,
      allowNull: false,
     },
    released:{
      type: DataTypes.STRING,
      allowNull: false,
     },
    rating:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    background_image:{
      type: DataTypes.STRING,
      allowNull: true,
    },

  });
};
