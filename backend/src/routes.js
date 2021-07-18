const vehicleController = require('./controllers/vehicle');
const vehicleValidation = require('./validations/vehicle');
const ValidateException = require('./exceptions/validate');
const routes = require('express').Router();

routes.get('/:id', async (req, res) => {
  const { id } = req.params;
  const params = { id };
  
  try {
    await vehicleValidation.findOne(params)

    const result = await vehicleController.findOne(params);
    res.send(result);
  } catch (err) {
    res.status(400).send(
      new ValidateException(400, 'Erro ao processar solicitação!', req.url, err.errors)
    )
  }
});

module.exports = routes;