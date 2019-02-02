import {Command} from '@oclif/command'

export default class CreateNew extends Command {
    static description = 'WIP: Set a new project relationship for scaffolding'

    static args = [
        {name: 'name'},
        {name: 'repo'}
    ]

    async run() {
        const {args} = this.parse(CreateNew)

        // Take the label and repo URl and add it to the config
        this.log(args.name)
        this.log(args.repo)
    }
}
