export default function shell(cmd: string, args: any, cb: any) {
    const spawn = require('child_process').spawn
    const log = require('fancy-log')
    const colours = require('ansi-colors')
    const beep = require('beeper')

    args = args || []

    const child = spawn(cmd, args, {
        cwd: process.cwd()
    })

    let stdout = ''
    let stderr = ''

    child.stdout.setEncoding('utf8')
    child.stdout.on('data', (data: any) => {
        stdout += data
        log(data.replace(/\n$/, ''))
    })

    child.stderr.setEncoding('utf8')
    child.stderr.on('data', (data: any) => {
        stderr += data
        log(colours.red(data.replace(/\n$/, '')))
        beep()
    })

    child.on('close', cb)
}
