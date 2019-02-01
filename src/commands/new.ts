import {Command} from '@oclif/command'
import * as fs from 'fs-extra'
import * as path from 'path'

export default class New extends Command {
    static description = 'Scaffold a project from a git repo'

    static args = [{
        name: 'project'
    }]

    async run() {
        const {args} = this.parse(New)
        const userConfig = await fs.readJSON(path.join(this.config.configDir, 'config.json'))
        if (userConfig.projects[0][args.project]) {
            this.log(userConfig.projects[0][args.project])
            // @TODO: Set up the prject using this name and URL
        } else {
            this.log('no project by that name')

            // @TODO: Offer to make one with prompts!
        }
    }
}
