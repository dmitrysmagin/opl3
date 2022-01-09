var extend = require('extend');

function RAD(opl) {
    this.opl = opl;
}
module.exports = RAD;

extend(RAD.prototype, {
    load: null,
    update: null,
    rewind: null,
    refresh: null
});