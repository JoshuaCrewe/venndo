import {Command, flags} from '@oclif/command'
import * as fs from 'fs'
import * as inquirer from 'inquirer'
import path = require('path')

export default class Env extends Command {
    static description = `Create an env file from a few prompts
You will be given a series of prompts asking for configuration.
Answer the questions and the answers will form an .env file.
`
    static examples = [
        '$ venndo env'
    ]

    static flags = {
        help: flags.help({char: 'h'}),
    }

    async run() {
        const file = '.env'
        fs.access(file, fs.constants.F_OK, async err => {
            if (! err) {
                // TODO: Offer to force with a flag ?
                this.log('An .env file already exists in this location')

            } else {
                let projectName = path.basename(process.cwd())
                let questions = [
                    {
                        name: 'host',
                        message: 'Hostname',
                        type: 'input',
                        default: '192.168.1.2'
                    },
                    {
                        name: 'dbName',
                        message: 'Database Name',
                        type: 'input',
                        default: projectName
                    },
                    {
                        name: 'dbUser',
                        message: 'Database Username',
                        type: 'input',
                        default: 'wordpress'
                    },
                    {
                        name: 'dbPassword',
                        message: 'Database Password',
                        type: 'password',
                        mask: '*'
                    },
                    {
                        name: 'dbPrefix',
                        message: 'Database Prefix',
                        type: 'input',
                        default: 'wp_'
                    },
                    {
                        name: 'homeURL',
                        message: 'Home URL',
                        type: 'input',
                        default: 'example.local'
                    },
                    {
                        name: 'webroot',
                        message: 'Webroot path',
                        type: 'input',
                        default: 'public'
                    },
                    {
                        name: 'environment',
                        message: 'choose the environment',
                        type: 'list',
                        choices: [{name: 'development'}, {name: 'staging'}, {name: 'production'}],
                    },

                ]

                let responses: any = await inquirer.prompt(questions)

                let host: string = responses.host
                let dbName: string = responses.dbName
                let dbUser: string = responses.dbUser
                let dbPassword: string = responses.dbPassword
                let dbPrefix: string = responses.dbPrefix
                let homeURL: string = responses.homeURL
                let webroot: string = responses.webroot
                let environment: string = responses.environment

                const file = `WP_ENV=${environment}
WEBROOT=/${webroot}

DB_HOST=${host}
DB_NAME=${dbName}
DB_USER=${dbUser}
DB_PASSWORD='${dbPassword}'
DB_PREFIX=${dbPrefix}

WP_HOME=http://${homeURL}
WP_SITEURL=\${WP_HOME}/wp`

                fs.writeFile('./.env', file, async (err: any) => {
                    if (err) {
                        return this.log(err)
                    }

                    this.log(`File saved at ${process.cwd()}/.env`)
                })
            }
        })
    }
}
