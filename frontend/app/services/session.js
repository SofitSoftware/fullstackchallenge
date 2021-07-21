import Service from '@ember/service';
import { inject as service } from '@ember/service';

export default class SessionService extends Service {
    @service store;
    constructor() {
        super(...arguments);
      }
    init() {
        console.log('iniciou')
    }
}
