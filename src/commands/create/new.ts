import {Command, flags} from '@oclif/command'
import * as Conf from 'conf'

export default class CreateNew extends Command {
    static description = 'Set a new project relationship for scaffolding'

    static args = [
        {
            name: 'clone',
            required: true,
            description: 'A git repo to use as a base',
        },
        {
            name: 'repo',
            required: true,
            description: 'The git clone URL for the project',
        },
    ]

    static examples = [
        '$ venndo create:new new-project git@bitbucket.org:organisation/project.git',
    ]

    static flags = {
        help: flags.help({char: 'h'}),
    }

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
