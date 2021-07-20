const request = require('supertest');
const { Vehicle } = require('../../src/app/models')

const app = require('../../src/app');
const factory = require('../factories');
const truncate = require('../utils/truncate');

describe('Vehicle', () => {
  beforeEach(async () => { await truncate() });

  const vehicleData = {
    plate: 'BRA2319',
    brand: 'VolksWagen',
    model: '32000 Gasolina',
    version: '2',
    year: '2021',
    imageUrl: 'http://google.com.br',
    chassi: '9BWSU19508B302158',
    type: 'moto'
  };

  it('should receive a vehicle when pass valid id', async () => {
    const vehicle = await factory.create('Vehicle', {});

    const response = await request(app)
      .get(`/vehicle/${vehicle.id}`);

    expect(response.status).toBe(200);
  });

  it('should not find a vehicle with invalid id', async () => {
    const response = await request(app)
      .get(`/vehicle/0`);

    expect(response.status).toBe(404);
  });

  it('should create a vehicle with valid fields', async () => {
    const response = await request(app)
      .post('/vehicle').send(vehicleData);

    expect(response.status).toBe(204);
  });

  it('should not create a vehicle with invalid fields', async () => {
    const response = await request(app)
      .post('/vehicle').send({});

    expect(response.status).toBe(400);
  });

  it('should not create a vehicle with duplicated plate', async () => {
    await request(app)
      .post('/vehicle').send(vehicleData);

    const response =  await request(app)
      .post('/vehicle').send(vehicleData);

    expect(response.status).toBe(400);
  });

  it('should find all vehicles with valid pagination', async () => {
    const response = await request(app).get('/vehicles/?page=1&per_Page=10');

    expect(response.status).toBe(200);
  });

  it('should not find vehicles with invalid pagination', async () => {
    const response = await request(app).get('/vehicles/?page=-1&per_Page=-10');

    expect(response.status).toBe(400);
  });

  it('should delete a vehicle', async () => {
    const vehicle = await factory.create('Vehicle');
    const response = await request(app).delete(`/vehicle/${vehicle.id}`);

    expect(response.status).toBe(200);
  });

  it('should update a vehicle', async () => {
    const vehicle = await factory.create('Vehicle');
    const response = await request(app)
      .put(`/vehicle/${vehicle.id}`)
      .send({...vehicleData, plate: 'ABC-1234'});

    const updatedVehicle = await Vehicle.findByPk(vehicle.id);

    expect(response.status).toBe(200);
    expect(updatedVehicle.plate).toBe('ABC-1234');
  })
})