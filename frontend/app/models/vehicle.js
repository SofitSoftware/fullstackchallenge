import Model, { attr } from '@ember-data/model';

export default class VehicleModel extends Model {
  @attr plate;
  @attr brand;
  @attr model;
  @attr version;
  @attr year;
  @attr chassi;  
}
