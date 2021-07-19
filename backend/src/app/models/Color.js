
module.exports = (sequelize, DataTypes) => {
    const Color = sequelize.define('Color', {
      name: DataTypes.STRING,
    });
    
    Color.associate = (models) => {
        Color.hasMany(models.Vehicle, {
            foreignKey: 'id',
            as: 'vehicles',
        })
    }
    return Color
  }
  