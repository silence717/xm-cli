'use strict'
module.exports = core;
const semver = require('semver')
const colors = require('colors/safe')
const userHome = require('user-home')
const pathExists = require('path-exists').sync
const log = require('@how-xm/log')
const pkg = require('../package.json')
const constant = require('./constant')

function core() {
    try {
        checkPkgVersion()
        checkNodeVersion()
        checkRoot()
        checkUserHome()
    } catch (e) {
        log.error(e.message)
    }
}

function checkUserHome() {
    if (!userHome || !pathExists(userHome)) {
        throw new Error(colors.red('当前登录用户的主目录不存在！'))
    }
    console.log(userHome)
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
