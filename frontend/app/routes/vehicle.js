import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class VehicleRoute extends Route {
    @service router;
    model(params) {
        const { vehicle_id } = params;
        
        return vehicle_id;
    }
}
