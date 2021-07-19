const { Color } = require("../app/models");
const ErrorsException = require("../exceptions/error");

module.exports = {
  async findAll() {
    try {
      const colors = await Color.findAll({
        attributes: { exclude: ['createdAt', 'updatedAt'] }
      });

      return colors;
    } catch (err) {
      console.log(err);
      throw new ErrorsException(errors, 400);
    }
  }
};
