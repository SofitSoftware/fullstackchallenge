import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import fetch from 'fetch';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class VehiclesController extends Controller {
    @tracked vehicles = [];
    @service session;
    @service router;

    queryParams = ['page', 'size'];
    page = 1;
    size = 6;
    
    constructor() {
        super(...arguments);
    }

    @action
    async deleteVehicle(id) {
        await fetch(`http://localhost:3333/vehicle/${id}`, {
            method: 'DELETE'
        });
    }
}
