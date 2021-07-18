const { Vehicle } = require("../app/models");
const ErrorsException = require("../exceptions/error");
const FieldMessage = require("../exceptions/fieldmessage");

module.exports = {
  async findOne(params) {
    const errors = [];
    const { id } = params;

    const vehicle = await Vehicle.findByPk(id);

    if (!vehicle) {
      errors.push(new FieldMessage('id', 'Id inválido!'))
    }
    if(errors.length > 0) {
      throw new ErrorsException(errors);
    } else {
      return errors;
    }
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