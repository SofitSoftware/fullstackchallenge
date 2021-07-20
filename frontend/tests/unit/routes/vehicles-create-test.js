import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | vehicles-create', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:vehicles-create');
    assert.ok(route);
  });
});
