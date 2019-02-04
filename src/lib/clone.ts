import * as colours from 'ansi-colors'
import cli from 'cli-ux'
import * as execa from 'execa'
import * as log from 'fancy-log'
import * as git from 'gift'
import * as Listr from 'listr'

import shell from './shell'

export default function cloneProject(repo: string, projectName: string) {
    // TODO: Make some checks on the name of the project?

    // Scaffold the project in the project name
    cli.action.start('Scaffolding project')

    // Do a git clone of the static project repo and name it what the user wants
    git.clone(repo, projectName, 1, 'master', function (err: any, _repo: any) {
        // Stop the spinner
        cli.action.stop()

        // If there is an error then stop everything thing
        if (err) {
            log(colours.red('There was an error with downloading the project files'))
            log(colours.red('Here is the error report for reference'))
            log('')
            log(colours.red(err))
            return
        }

        // Change into the directory
        process.chdir(projectName)

        const tasks = new Listr([
            {
                title: 'Cleaning Up',
                // task: () => execa('rm', ['-rf', '.git'])
                task: () => shell('rm -rf .git')
            },
            {
                title: 'Setting up Git',
                task: () => execa('git', ['init'])
            },
            {
                title: 'Install package dependencies with Yarn',
                task: (ctx, task) => execa('yarn')
                    .catch(() => {
                        ctx.yarn = false

                        task.skip('Yarn not available, install it via `npm install -g yarn`')
                    })
            },
            {
                title: 'Install package dependencies with npm',
                enabled: ctx => ctx.yarn === false,
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
    })
}
