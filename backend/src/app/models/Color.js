
module.exports = (sequelize, DataTypes) => {
    const Color = sequelize.define('Vehicle', {
      name: DataTypes.STRING,
    });

    Color.associate = (models) => {
        Color.hasMany(models.Vehicle, {
            foreignKey: 'color_id',
            as: 'vehicles',
        })
    }
    return Color
  }