// https://stackoverflow.com/questions/20643470/execute-a-command-line-binary-with-node-js
// Add a callback or set up promise based
const {execSync} = require('child_process')
// const log = require('fancy-log')

export default function shell(cmd: string, output: bool = false) {
    let stdio
    if (output) {
        stdio = 'pipe'
    } else {
        stdio = 'ignore'
    }

    execSync(cmd, {cwd: process.cwd(), stdio: `${stdio}`})
}
