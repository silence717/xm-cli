'use strict'
module.exports = core;
const semver = require('semver')
const colors = require('colors/safe')
const log = require('@how-xm/log')

const pkg = require('../package.json')
const constant = require('./constant')

function core() {
    try {
        checkPkgVersion()
        checkNodeVersion()
        checkRoot()
    } catch (e) {
        log.error(e.message)
    }
}

function checkRoot() {
    const rootCheck = require('root-check')
    rootCheck()
    console.log(process.geteuid())
}

function checkNodeVersion() {
    const currentVersion = process.version
    const lowestVersion = constant.LOWEST_NODE_VERSION
    if (!semver.gte(currentVersion, lowestVersion)) {
        throw new Error(colors.red(`how-xm 需要安装 v${lowestVersion} 以上版本的 nodejs`))
    }

}

function checkPkgVersion() {
    log.notice('cli', pkg.version)
}
