const { Vehicle } = require("../app/models");

module.exports = {
  async findOne(params) {
    const { id } = params;

    const vehicle = await Vehicle.findByPk(id);

    return vehicle;
  },

  async create(req, res) {
    const {
      id,
      plate,
      brand,
      model,
      version,
      year,
      imageUrl,
      chassi,
      colorId,
    } = req.body;

    await Vehicle.create({
      id,
      plate,
      brand,
      model,
      version,
      year,
      imageUrl,
      chassi,
      colorId
    });

    return res.json()
  }
}