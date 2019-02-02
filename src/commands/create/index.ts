import {Command} from '@oclif/command'
import * as fs from 'fs-extra'
import * as inquirer from 'inquirer'
import * as path from 'path'

import cloneProject from '../../lib/clone'

export default class New extends Command {
    static description = 'Scaffold a project from a git repo'

    static args = [
        {name: 'clone'},
        {name: 'project'}
    ]

    async run() {
        const {args} = this.parse(New)
        const userConfig = await fs.readJSON(path.join(this.config.configDir, 'config.json'))
        if (userConfig.projects[0][args.clone]) {
            this.log(userConfig.projects[0][args.clone])

            // @TODO: Set up the prject using this name and URL
            cloneProject(userConfig.projects[0][args.clone], args.project)

        } else {
            this.log('no project by that name')
            let responses: any = await inquirer.prompt([
                {
                    name: 'newConfigEntry',
                    message: 'Do you want to add this project?',
                    type: 'confirm'
                }
            ])
            let createConfigEntry = responses.newConfigEntry

            if (createConfigEntry) {
                let responses: any = await inquirer.prompt([
                    {
                        name: 'repo',
                        message: 'What is the repo clone url',
                        type: 'input'
                    }
                ])
                let repo: string = responses.repo
                if (repo) {
                    this.log(`Adding ${args.project} with repo ${repo}`)
                    // TODO: Load in config, add data and write to file
                    // echo`{
                    //      "projects": [ ]
                    // }`
                } else {
                    this.log(`Cannot add ${args.project} without a repo`)
                }

            } else {
                this.log('do not add anything')
            }
        }
    }
}
