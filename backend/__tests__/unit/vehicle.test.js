const truncate = require('../utils/truncate');
const factory = require('../factories');

describe('Vehicle', () => {
  beforeEach(async () => { await truncate() });

  it('create a vehicle', async () => {
    const vehicle = await factory.create('Vehicle');

    expect(!!vehicle).toBe(true);
  });
})
