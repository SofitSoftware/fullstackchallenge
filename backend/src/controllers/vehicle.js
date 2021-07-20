const { Vehicle, Color } = require("../app/models");
const ErrorsException = require("../exceptions/error");

module.exports = {
  async findOne(params) {
    const { id } = params;

    try {
      const vehicle = await Vehicle.findByPk(id, {
        include: [{
          model: Color,
          as: 'color',
        }]
      });

      return vehicle;
    }catch(e) {
      console.log(e)
    }
  
  },

  async create(params) {
    const errors = [];
    try {
      await Vehicle.create(params);

      return {};
    }catch(err) {
      console.log(err);
      throw new ErrorsException(errors, 400);
    }
  },

  async findAll(params) {
    const { perPage = 5, page = 1 } = params;

    try {
      const vehicles = await Vehicle.findAndCountAll({
        limit: perPage,
        offset: (page - 1) * perPage,
        attributes: { exclude: ['createdAt', 'updatedAt', 'colorId'] }
      });
      const findDTO = {};
      findDTO.data = vehicles.rows.map(resu => {
        return  {id: resu.id, type: 'vehicles', attributes: {...resu.dataValues}}
      })

      const maxPage = Math.ceil((vehicles.count / perPage))
      const next = (Number(page) + 1) <= maxPage ? (Number(page) + 1) : page;
      findDTO.links = {
          "Anterior": `${process.env.FRONT_END_ADDRESS}/vehicles?page[number]=${(page - 1) || 1}&page[size]=${perPage}`,
          "Proximo": `${process.env.FRONT_END_ADDRESS}/vehicles?page[number]=${next}&page[size]=${perPage}`,
        };
      
      return findDTO;
    }catch(err) {
      console.log(err);
      throw new ErrorsException(errors, 400);
    }
  },

  async deleteById(params) {
    const { id } = params;

    try {
      const vehicle = await Vehicle.findByPk(id);

      await vehicle.destroy();

      return {};
    } catch(err) {
      console.log(err);
      throw new ErrorsException(errors, 400);
    };
  },

  async updateById(params) {
    const { id } = params;
    delete params.id;
    try {
      const vehicle = await Vehicle.findByPk(id);
      await vehicle.update(params);
      return {};
    }catch(err) {
      console.log(err);
      throw new ErrorsException(errors, 400);
    }
  }
}
