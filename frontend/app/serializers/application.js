import DS from 'ember-data';

export default class ApplicationSerializer extends DS.JSONAPISerializer {

  normalizeQueryResponse(store, clazz, payload) {
    const result = super.normalizeQueryResponse(...arguments);
    result.meta = result.links || {};

    if (payload.links) {
      result.meta.pagination = this.createPageMeta(payload.links);
    }

    return result;
  }

  createPageMeta(data) {

    let meta = {};

    Object.keys(data).forEach(type => {
      const link = data[type];
      meta[type] = {};
      let a = document.createElement('a');
      a.href = link;
      a.search.slice(1).split('&').forEach(pairs => {
          const [param, value] = pairs.split('=');
          if (param == 'page[number]') {
          meta[type].number = parseInt(value);
        }
        if (param == 'page[size]') {
          meta[type].size = parseInt(value);
        }

      });
      a = null;
    });
    return meta;

  }

}