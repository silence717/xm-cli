#! /usr/bin/env node
const yarns = require('yargs/yargs');

const { hideBin } = require('yargs/helpers')
const dedent = require('dedent')

const pkg = require('../package.json')
const cli = yarns();
const argv = process.argv.slice(2)



const context = {
    xmVersion: pkg.version,
};

cli
    .usage('Usage: $0 [command] <options>')
    .demandCommand(1, 'A command is required. Pass --help to see all available commands and options.')
    .strict()
    .recommendCommands()
    .fail((error, msg) => {
        console.log(error)
        console.log(msg)
    })
    .alias("h", "help")
    .alias("v", "version")
    .wrap(cli.terminalWidth())
    .epilogue(dedent`
      When a command fails, all logs are written to lerna-debug.log in the current working directory.

      For more information, find our manual at https://github.com/lerna/lerna
    `)
    .options({
        debug: {
            type: 'boolean',
            description: 'Bootstrap debug mode',
            alias: 'd'
        }
    })
    .option("registry", {
        type: "string",
        alias: 'r',
        description: 'Define a code registry'
    })
    .group(['debug'], 'Dev Options:')
    .group(['registry'], 'Extra Options:')
    .command('init [name]', 'do init a project', (yarns) => {
        yarns
            .option('name', {
                type: 'string',
                description: 'Name of project',
                alias: 'n'
            })
    }, (argv) => {
        console.log(argv)
    })
    .command({
        command: 'list',
        aliases: ['ll', 'la', 'ls'],
        description: 'List all packages',
        builder: (yargs) => {

        },
        handler: (argv) => {
            console.log(argv)
        }
    })
    .parse(argv, context);
