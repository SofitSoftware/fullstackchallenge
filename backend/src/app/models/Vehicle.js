
module.exports = (sequelize, DataTypes) => {
    const Vehicle = sequelize.define('Vehicle', {
      plate: DataTypes.STRING,
      brand: DataTypes.STRING,
      model: DataTypes.STRING,
      version: DataTypes.STRING,
      year: DataTypes.DATE,
      imageUrl: DataTypes.STRING,
      chassi: DataTypes.STRING,
      colorId: DataTypes.INTEGER,
    });

    return Vehicle
  }