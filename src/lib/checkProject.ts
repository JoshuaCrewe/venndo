import * as colours from 'ansi-colors'
import * as log from 'fancy-log'

export default function checkProject(name: string) {
    if (! name) {
        // Inform the user and crash out.
        log(colours.red('Your project needs a name. '))
        return false
    }

    return true
}
