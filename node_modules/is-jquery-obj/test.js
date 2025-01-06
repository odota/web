const assert      = require('assert');
const isjQueryObj = require('./index');

it('Test cases', () => {
    assert.equal(isjQueryObj(void 0), false);
    assert.equal(isjQueryObj({}), false);
    assert.equal(isjQueryObj({ jquery: {}}), true);
});
