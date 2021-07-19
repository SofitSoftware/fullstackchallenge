const request = require('supertest');
const { Color } = require('../../src/app/models')

const app = require('../../src/app');

describe('Color', () => {
  it('should get all colors', async () => {
    const response = await request(app)
      .get(`/colors`);

    expect(response.status).toBe(200);
  });
})