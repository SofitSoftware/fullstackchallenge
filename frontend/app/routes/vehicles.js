import Route from '@ember/routing/route';

export default class VehiclesRoute extends Route {
  queryParams = {
    page: {
      refreshModel: true
    },
    size: {
      refreshModel: true
    }
  }
  model(params) {
    return this.store.query('vehicle', {
      page: params.page,
      per_page: params.size
    });
  }
}
