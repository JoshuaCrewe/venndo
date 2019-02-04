import {Command} from '@oclif/command'
import * as Conf from 'conf'

export default class CreateNew extends Command {
    static description = 'WIP: Set a new project relationship for scaffolding'

    static args = [
        {
            name: 'clone',               // name of arg to show in help and reference with args[name]
            required: true,            // make the arg required with `required: true`
            description: 'The name of the git project on which to base on', // help description
        },
        {
            name: 'repo',               // name of arg to show in help and reference with args[name]
            required: true,            // make the arg required with `required: true`
            description: 'the git clone URL for the project', // help description
        },
    ]

    async run() {
        const {args} = this.parse(CreateNew)
        let configPath

        const config = new Conf({
            cwd: this.config.configDir,
            configName: 'config'
        })

        configPath = 'projects'
        configPath = configPath + '.' + args.clone

        if (config.has(configPath)) {
            this.log('the project already exists')
        } else {
            config.set(configPath, args.repo)
            this.log('Project has been added')
        }

    }
}
