
module.exports = (sequelize, DataTypes) => {
    const Vehicle = sequelize.define('Vehicle', {
      plate: DataTypes.STRING,
      brand: DataTypes.STRING,
      model: DataTypes.STRING,
      version: DataTypes.STRING,
      year: DataTypes.STRING,
      imageUrl: DataTypes.STRING,
      chassi: DataTypes.STRING,
      type: DataTypes.STRING,
    });

    Vehicle.associate = (models) => {
      Vehicle.hasOne(models.Color, {
        foreignKey: 'id',
        as: 'color'
      })
    }
    return Vehicle
  }
  