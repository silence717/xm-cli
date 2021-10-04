'use strict';

function isObject(o) {
    return Object.prototype.toString.call(o) === '[Object Object]'
}

module.exports = {
    isObject
}
