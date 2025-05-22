// NOTE: Can't use 'obj instanceof $' check because it depends on instance of the jQuery.

module.exports = function (obj) {
    return !!(obj && obj.jquery);
};
