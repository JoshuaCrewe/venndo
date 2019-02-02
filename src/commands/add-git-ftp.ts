import {Command, flags} from '@oclif/command'
import * as execa from 'execa'
import * as inquirer from 'inquirer'

export default class AddGitFtp extends Command {
    static description = 'get project set up with git-ftp'

    static flags = {
        help: flags.help({char: 'h'}),
    }

    async run() {
        let questions = [
            {
                name: 'port',
                message: 'Port',
                type: 'input'
            },
            {
                name: 'serverUsername',
                message: 'Server Username',
                type: 'input'
            },
            {
                name: 'serverHost',
                message: 'Server Host',
                type: 'input'
            },
        ]
        let response: any = await inquirer.prompt(questions)
        let port: string = response.port
        let user: string = response.serverUsername
        let host: string = response.serverHost

        // @TODO: Add error handling
        // Check if all of these prompts have a valid response
        await execa('ssh-copy-id', [`${user}@${host}`, `-p ${port}`]).then((result: any) => {
            this.log(result)
        })

        // await execa(`git config git-ftp.url 'sftp://${host}:${port}/home/${user}/www'`).then((result: any) => {
        //     this.log(result)
        // })
        // await execa(`git config git-ftp.user ${user}`)
        // await execa('git config git-ftp.syncroot public/')
    }
}
