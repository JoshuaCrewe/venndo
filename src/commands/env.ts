import {Command} from '@oclif/command'
import cli from 'cli-ux'
import fs = require('fs')
import path = require('path')

export default class Env extends Command {
    static description = 'Create an env file from a few prompts'

    async run() {
        const file = '.env'
        fs.access(file, fs.constants.F_OK, async err => {
            if (! err) {
                this.log('An .env file already exists in this location')
            } else {
                let projectName = path.basename(process.cwd())

                const host = await cli.prompt(
                    'Hostname', {
                        required: false,
                        default: '192.168.1.2'
                    }
                )
                const dbName = await cli.prompt(
                    'Database Name', {
                        required: false,
                        default: projectName
                    }
                )
                const dbUser = await cli.prompt(
                    'Database User', {
                        required: false,
                        default: 'wordpress'
                    }
                )
                const dbPassword = await cli.prompt(
                    'Database Password', {
                        required: false,
                        type: 'hide'
                    }
                )
                const dbPrefix = await cli.prompt(
                    'Database Prefix', {
                        required: false,
                        default: 'wp_'
                    }
                )
                const homeURL = await cli.prompt(
                    'Home URL', {
                        required: false,
                        default: 'example.local'
                    }
                )
                const environment = await cli.prompt(
                    'Environment', {
                        required: false,
                        default: 'development'
                    }
                )
                const webroot = await cli.prompt(
                    'Webroot', {
                        required: false,
                        default: 'public'
                    }
                )

                const file = `WP_ENV=${environment}
WEBROOT=/${webroot}

DB_HOST=${host}
DB_NAME=${dbName}
DB_USER=${dbUser}
DB_PASSWORD='${dbPassword}'
DB_PREFIX=${dbPrefix}

WP_HOME=http://${homeURL}
WP_SITEURL=\${WP_HOME}/wp`

                fs.writeFile('./.env', file, async err => {
                    if (err) {
                        return this.log(err)
                    }

                    this.log(`File saved at ${process.cwd()}/.env`)
                })
            }
        })
    }
}
