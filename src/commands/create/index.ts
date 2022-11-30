import {Command, flags} from '@oclif/command'
import * as Conf from 'conf'
import * as del from 'del'
import * as execa from 'execa'
import * as log from 'fancy-log'
import * as inquirer from 'inquirer'
import * as Listr from 'listr'

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

        configPath = 'projects'
        configPath = configPath + '.' + args.clone

        if (config.has(configPath)) {
            const repo = config.get(configPath)
            const projectName = args.project
            const tasks = new Listr([
                {
                    title: 'download source code',
                    task: () => execa('git', ['clone', `${repo}`, `${projectName}`])
                },
                {
                    title: 'Stage environment',
                    task: () => process.chdir(projectName)
                },
                {
                    title: 'Clean Up',
                    task: () => del(['.git/**'])
                },
                {
                    title: 'Initialise Git',
                    task: () => execa('git', ['init'])
                },
                {
                    title: 'Install package dependencies with npm',
                    task: () => execa('npm', ['install'])
                },
                {
                    title: 'Install php dependencies with composer',
                    task: () => execa('composer', ['install'])
                }
            ])

            tasks.run().catch(err => {
                log.error(err)
            })

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
