import {Command} from '@oclif/command'
import * as log from 'fancy-log'
import * as fs from 'fs-extra'
import * as inquirer from 'inquirer'
import * as path from 'path'

import checkProject from '../../lib/checkProject'
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
            // If there is no project name then this wont work properly
            if (checkProject(args.project)) {
                cloneProject(userConfig.projects[0][args.clone], args.project)
            }

        } else {
            log('no project by that name')
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
                    log(`Adding ${args.project} with repo ${repo}`)
                    // TODO: Load in config, add data and write to file
                    // echo`{
                    //      "projects": [ ]
                    // }`
                } else {
                    log(`Cannot add ${args.project} without a repo`)
                }

            } else {
                log('do not add anything')
            }
        }
    }
}
