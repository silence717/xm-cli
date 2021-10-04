'use strict';

const Package = require('@how-xm/package')
const log = require('@how-xm/log')

const SETTINGS = {
    init: '@how-xm/init'
}

function exec() {
    let targetPath = process.env.CLI_TARGET_PATH
    const homePath = process.env.CLI_HOME_PATH

    const cmdObj = arguments[arguments.length - 1]
    const cmdName = cmdObj.name()
    const packageName = SETTINGS[cmdName]
    const packageVersion = 'latest'

    if (!targetPath) {
        targetPath = ''
    }

    const pkg = new Package({
        targetPath,
        packageName: packageName,
        packageVersion: packageVersion,
    })

    console.log(pkg.getRootFilePath(), '=====')

    console.log(pkg)

    // 1. targetPath -> modulePath
    // 2. modulePath -> Package(npm模块)
    // 3. Package.getRootFile(获取入口文件)
    // 4. Package.install / Package.update
}

module.exports = exec;