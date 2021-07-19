const { Vehicle } = require("../app/models");
const ErrorsException = require("../exceptions/error");
const FieldMessage = require("../exceptions/fieldmessage");
const Yup = require('yup');

const schema = Yup.object().shape({
  plate: Yup.string().required('Campo Obrigatório'),
  brand: Yup.string().required('Campo Obrigatório'),
  model: Yup.string().required('Campo Obrigatório'),
  version: Yup.string().required('Campo Obrigatório'),
  year: Yup
  .string()
  .required('Campo Obrigatório')
  .test(
    'year',
    'Ano inválido', (yearTest) => {
      return Number(yearTest) <= new Date().getFullYear();
    }
  ),
  chassi: Yup.string().required('Campo Obrigatório')
});

module.exports = {
  async verifyErors(errors = [], code) {
    
    if(errors.length > 0) {
      throw new ErrorsException(errors, code);
    } else {
      return errors
    }
  },

  async findOne(params) {
    const errors = [];
    const { id } = params;

    const vehicle = await Vehicle.findByPk(id);

    if (!vehicle) {
      errors.push(new FieldMessage('id', 'Id inválido!'));
    }

    return this.verifyErors(errors, 404);
  },

  async create(params) {
    const errors = [];

    const { plate } = params;
    
    try {
      await schema.validate(params, { abortEarly: false });
    } catch (err) {
      err.inner.forEach((error) => {
        errors.push(new FieldMessage(error.path, error.message));
      });
      await this.verifyErors(errors, 400);
    }

    const vehicle = await Vehicle.findOne({
      where: { plate },
    });

    if (vehicle) {
      errors.push(new FieldMessage('plate', 'Carro com está placa já cadastrada!'));
    }

    return this.verifyErors(errors, 400);
  },

  async findAll(params) {
    const errors = [];
    const { page, perPage } = params;

    if (page && page < 1 ) {
      errors.push(new FieldMessage('page', 'Página deve ser igual ou maior que 1!'));
    }

    if (perPage && perPage < 1 ) {
      errors.push(new FieldMessage('page', 'Quantidade por página deve ser igual ou maior que 1!'));
    }

    return this.verifyErors(errors);
  },

  async deleteById(params) {
    const errors = [];
    const { id } = params;

    const vehicle = await Vehicle.findByPk(id);

    if (!vehicle) {
      errors.push(new FieldMessage('id', 'Id inválido!'));
    }

    return this.verifyErors(errors, 404);
  },

  async updateById(params) {
    const errors = [];
    const { id, plate } = params;
    const vehicle = await Vehicle.findByPk(id);
    
    if (!vehicle) {
      errors.push(new FieldMessage('id', 'Id inválido!'));
    }
    
    try {
      await schema.validate(params, { abortEarly: false });
    } catch (err) {
      err.inner.forEach((error) => {
        errors.push(new FieldMessage(error.path, error.message));
      });
      await this.verifyErors(errors, 400);
    };
    
    const vehiclePlate = await Vehicle.findOne({
      where: { plate },
    });

    if (vehiclePlate && vehiclePlate.id !== id) {
      errors.push(new FieldMessage('plate', 'Carro com está placa já cadastrada!'));
    }
    
    return this.verifyErors(errors, 404);
  }
}
