import {Command, flags} from '@oclif/command'
import * as Conf from 'conf'
import * as log from 'fancy-log'
import * as fs from 'fs-extra'
import * as inquirer from 'inquirer'
import * as path from 'path'

import checkProject from '../../lib/checkProject'
import cloneProject from '../../lib/clone'

export default class New extends Command {
    static description = 'Scaffold a project from a git repo'

    static examples = [
        '$ venndo create baseProject projectName',
    ]

    static flags = {
        help: flags.help({char: 'h'}),
    }

    static args = [
        {
            name: 'clone',               // name of arg to show in help and reference with args[name]
            required: true,            // make the arg required with `required: true`
            description: 'The name of the git project on which to base on', // help description
        },
        {
            name: 'project',               // name of arg to show in help and reference with args[name]
            required: true,            // make the arg required with `required: true`
            description: 'The name of the new project', // help description
        },
    ]

    async run() {
        const {args} = this.parse(New)
        let configPath

        const config = new Conf({
            cwd: this.config.configDir,
            configName: 'config'
        })

        // config.clear()

        configPath = 'projects'
        configPath = configPath + '.' + args.clone

        if (config.has(configPath)) {
            // If there is no project name then this wont work properly
            if (checkProject(args.project)) {
                cloneProject(config.get(configPath), args.project)
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
                    // log(`Adding ${args.project} with repo ${repo}`)
                    let configPath = 'projects.' + args.clone
                    config.set(configPath, repo)
                    log(`Added ${args.project} with repo ${repo}`)
                } else {
                    log(`Cannot add ${args.project} without a repo`)
                }

            } else {
                log('do not add anything')
            }
        }
    }
}
