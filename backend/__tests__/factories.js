const { factory } = require('factory-girl');
const { Vehicle } = require('../src/app/models');

factory.define('Vehicle', Vehicle, {
  plate: 'BRA2319',
  brand: '2',
  model: '1',
  version: '2',
  year: '2021',
  imageUrl: 'http://google.com.br',
  chassi: '9BWSU19508B302158',
  type: 'moto',
});

module.exports = factory;