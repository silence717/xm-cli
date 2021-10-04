'use strict';

const Package = require('@how-xm/package')

function exec() {
    const pkg = new Package()
    console.log(pkg.version)
    console.log(process.env.CLI_TARGET_PATH)
    console.log(process.env.CLI_HOME_PATH)
    // 1. targetPath -> modulePath
    // 2. modulePath -> Package(npm模块)
    // 3. Package.getRootFile(获取入口文件)
    // 4. Package.install / Package.update
}

module.exports = exec;