'use strict';
const pkgDir = require('pkg-dir')
const path = require('path')
// const { isObject } = require('@how-xm/utils')
const formatPath = require('@how-xm/format-path')

class Package {
    constructor(options) {
        if (!options) {
            throw new Error('Package类 的options参数不能为空！')
        }
        // if (!isObject(options)) {
        //     throw new Error('Package类 的options参数必须是一个对象！')
        // }

        this.targetPath = options.targetPath
        this.storePath = options.storePath
        this.packageName = options.packageName
        this.packageVersion = options.packageVersion
    }

    // 判断当前package是否存在
    exits() {

    }

    // 安装
    install() {

    }

    update() {

    }

    getRootFilePath() {
        // 1. 获取package.json所在目录 - pkh-dir
        const dir = pkgDir.sync(this.targetPath)
        if (dir) {
            // 2. 读取package.json - require() js/json
            const pkgFile = require(path.resolve(dir, 'package.json'))
            // 3. main/lib - path
            if (pkgFile && (pkgFile.main)) {
                // 4. 路径兼容(macOs/windows)
                return formatPath(path.resolve(dir, pkgFile.main))
            }
        }
        return null
    }

}

module.exports = Package;