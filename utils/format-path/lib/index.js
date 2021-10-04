'use strict';
const path = require('path')


function formatPath(p) {
    if (p) {
        const sep = path.sep
        if (sep === '/') {
            return p
        } else {
            return p.replace(/\\/g, p)
        }
    }
    return p
}

module.exports = formatPath;
