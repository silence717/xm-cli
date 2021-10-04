#! /usr/bin/env node

'use strict'
module.exports = core;
const path = require('path')
const semver = require('semver')
const colors = require('colors/safe')
const userHome = require('user-home')
const pathExists = require('path-exists').sync

const commander = require('commander')
const log = require('@how-xm/log')
const init = require('@how-xm/init')
const pkg = require('../package.json')
const constant = require('./constant')

let args

const program = new commander.Command()

async function core() {
    try {
        checkPkgVersion()
        checkNodeVersion()
        checkRoot()
        checkUserHome()
        // checkInputArgs()
        checkEnv()
        await checkGlobalUpdate()
        registerCommand()
    } catch (e) {
        log.error(e.message)
    }
}

function registerCommand() {
    program
        .name(Object.keys(pkg.bin)[0])
        .usage('<command> [options]')
        .version(pkg.version)
        .option('-d --debug', '是否开启调试模式', false)

    program
        .command('init [name]')
        .option('-f --force', '是否强制初始化项目')
        .action(init)

    // 开启debug模式
    program.on('option:debug', function () {
        if (program.debug) {
            process.env.LOG_LEVEL = 'verbose';
        } else {
            process.env.LOG_LEVEL = 'info';
        }
        log.level = process.env.LOG_LEVEL
        log.verbose('test')
    })

    // 对未知命令的监听
    program.on('command:*', function (obj) {
        const availableCommands = program.commands.map(cmd => cmd.name())
        console.log(colors.red('未知的命令：'+ obj[0]))
        if (availableCommands.length > 0) {
            console.log(colors.green('可用命令：' + availableCommands.join(',')))
        }
    })

    if (program.args && program.args.length < 1) {
        program.outputHelp()
        console.log()
    }

    program.parse(process.argv)
}

async function checkGlobalUpdate() {
    const currentVersion = pkg.version
    const npmName = pkg.name
    const { getNpmSemverVersion } = require('@how-xm/get-npm-info')
    const lastVersion = await getNpmSemverVersion(currentVersion, npmName)
    if (lastVersion && semver.gt(lastVersion, currentVersion)) {
        log.warn(colors.yellow(`请手动更新${npmName}，当前版本：${currentVersion}，最新版本：${lastVersion}。
        更新命令： npm install -g ${npmName}`))
    }
}

function checkEnv() {
    const dotenv = require('dotenv')
    const dotEnvPath = path.resolve(userHome, '.env')
    if (pathExists(dotEnvPath)) {
        dotenv.config({
            path: dotEnvPath,
        })
    }
    createDefaultConfig()
    log.verbose('current env variables', process.env.CLI_HOME_PATH)
}

function createDefaultConfig() {
    const cliConfig = {
        home: userHome
    };
    if (process.env.ClI_HOME) {
        cliConfig['cliHome'] = path.join(userHome, process.env.ClI_HOME)
    } else {
        cliConfig['cliHome'] = path.join(userHome, constant.DEFAULT_CLI_HOME)
    }
    process.env.CLI_HOME_PATH = cliConfig.cliHome
}

function checkInputArgs() {
    const minimist = require('minimist')
    args = minimist(process.argv.slice(2))
    checkArgs()
}

function checkArgs() {
    if (args.debug) {
        process.env.LOG_LEVEL = 'verbose'
    } else {
        process.env.LOG_LEVEL = 'info'
    }
    log.level = process.env.LOG_LEVEL
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
