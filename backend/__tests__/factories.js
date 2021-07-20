const { factory } = require('factory-girl');
const { Vehicle } = require('../src/app/models');

factory.define('Vehicle', Vehicle, {
  plate: 'BRA2319',
  brand: 'VolksWagen',
  model: '32000 Gasolina',
  version: '2',
  year: '2021',
  imageUrl: 'http://google.com.br',
  chassi: '9BWSU19508B302158',
  type: 'moto',
});

module.exports = factory;