'use strict';

const log  = require('npmlog')

log.level = process.env.LOG_LEVEL ? process.env.LOG_LEVEL : 'info'
// edit prefix
log.heading = 'how-xm'
// add custom
log.addLevel('success', 2000, { fg: 'green', blod: true })

module.exports = log
