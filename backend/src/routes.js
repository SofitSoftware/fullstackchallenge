const vehicleController = require('./controllers/vehicle');
const vehicleValidation = require('./validations/vehicle');
const colorController = require('./controllers/Color');
const ValidateException = require('./exceptions/validate');
const routes = require('express').Router();

routes.get('/vehicle/:id', async (req, res) => {
  const { id } = req.params;
  const params = { id };

  try {
    await vehicleValidation.findOne(params)

    const result = await vehicleController.findOne(params);
    res.status(200).send(result);
  } catch (err) {
    res.status(err.code || 400).send(
      new ValidateException(err.code, 'Erro ao processar solicitação!', req.url, err.errors)
    )
  }
});

routes.post('/vehicle', async (req, res) => {
  const { chassi, model, version, year, imageUrl, brand, plate } = req.body;
  const params = { chassi, model, version, year, imageUrl, brand, plate };
  
  try {
    await vehicleValidation.create(params)

    const result = await vehicleController.create(params);
    res.status(204).send(result);
  } catch (err) {
    res.status(err.code || 400).send(
      new ValidateException(err.code, 'Erro ao processar solicitação!', req.url, err.errors)
    )
  }
});

routes.get('/vehicle', async (req, res) => {
  const {page, per_page: perPage} = req.query; 
  const params = { page, perPage }
  
  try {
    await vehicleValidation.findAll(params)

    const result = await vehicleController.findAll(params);
    res.status(200).send(result);
  } catch (err) {
    res.status(err.code || 400).send(
      new ValidateException(err.code, 'Erro ao processar solicitação!', req.url, err.errors)
    )
  }
});

routes.delete('/vehicle/:id', async (req, res) => {
  const { id } = req.params;

  const params = { id };
  
  try {
    await vehicleValidation.deleteById(params)

    const result = await vehicleController.deleteById(params);
    res.status(200).send(result);
  } catch (err) {
    res.status(err.code || 400).send(
      new ValidateException(err.code, 'Erro ao processar solicitação!', req.url, err.errors)
    )
  }
});

routes.put('/vehicle/:id', async (req, res) => {
  const { id } = req.params;
  const { 
    plate,
    brand,
    model,
    version,
    year,
    imageUrl,
    chassi,
  } = req.body;

  const params = { 
    id,
    plate,
    brand,
    model,
    version,
    year,
    imageUrl,
    chassi,
   };
  
  try {
    await vehicleValidation.updateById(params)

    const result = await vehicleController.updateById(params);
    res.status(200).send(result);
  } catch (err) {
    res.status(err.code || 400).send(
      new ValidateException(err.code, 'Erro ao processar solicitação!', req.url, err.errors)
    )
  }
});

routes.get('/colors', async (req, res)  => {  
  try {
    const result = await colorController.findAll();
    res.status(200).send(result);
  } catch (err) {
    res.status(err.code || 400).send(
      new ValidateException(err.code, 'Erro ao processar solicitação!', req.url, err.errors)
    )
  }
});

module.exports = routes;
