const truncate = require('../utils/truncate');
const factory = require('../factories');

describe('Vehicle', () => {
  beforeEach(async () => { await truncate() });
  const vehicleData = {
    plate: 'BRA2319',
    brand: 'VolksWagen',
    model: '32000 Gasolina',
    version: '2',
    year: new Date(),
    imageUrl: 'http://google.com.br',
    chassi: '9BWSU19508B302158',
  };

  it('create a vehicle', async () => {
    const vehicle = await factory.create('Vehicle');

    expect(!!vehicle).toBe(true);
  });
})
