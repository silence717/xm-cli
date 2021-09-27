#! /usr/bin/env node

const commander = require('commander')
const pkg = require('../package.json')

// 获取 commander d的单例
// const { program } = commander

// 实例化一个Command示例
const program = new commander.Command()

program
    .name(Object.keys(pkg.bin)[0])
    .usage('<command> [options]')
    .version(pkg.version)
    .option('-d, --debug', '是否开启调试模式', false)
    .option('-e, --envName <envName>', '获取环境变量名称')

// command 注册命令
const clone = program.command('clone <source> [destination]')
clone
    .description('clone a repo into newly created directory')
    .option('-f --force', '是否强制克隆')
    .action((source, destination, cmdObj) => {
        console.log('do clone', source, destination, cmdObj.force)
    })

// addCommand 注册子命令，对service进行分组
const service = new commander.Command('service')
service
    .command('start [port]')
    .description('start service at some port')
    .action((port) => {
        console.log('do service start', port)
    })

service
    .command('stop [port]')
    .description('stop service at some port')
    .action((port) => {
        console.log('do service stop', port)
    })

program.addCommand(service)

program.parse(process.argv)

