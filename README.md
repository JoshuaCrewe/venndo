venndo
======

A tool for doing mundane or repetitive tasks.

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/venndo.svg)](https://npmjs.org/package/venndo)
[![Downloads/week](https://img.shields.io/npm/dw/venndo.svg)](https://npmjs.org/package/venndo)
[![License](https://img.shields.io/npm/l/venndo.svg)](https://github.com/JoshuaCrewe/venndo/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g venndo
$ venndo COMMAND
running command...
$ venndo (-v|--version|version)
venndo/0.0.0 linux-x64 node-v8.12.0
$ venndo --help [COMMAND]
USAGE
  $ venndo COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`venndo create [PROJECT]`](#venndo-create-project)
* [`venndo create:new [FILE]`](#venndo-createnew-file)
* [`venndo env`](#venndo-env)
* [`venndo hello [FILE]`](#venndo-hello-file)
* [`venndo help [COMMAND]`](#venndo-help-command)

## `venndo create [PROJECT]`

Scaffold a project from a git repo

```
USAGE
  $ venndo create [PROJECT]
```

_See code: [src/commands/create/index.ts](https://github.com/JoshuaCrewe/venndo/blob/v0.0.0/src/commands/create/index.ts)_

## `venndo create:new [FILE]`

describe the command here

```
USAGE
  $ venndo create:new [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print
```

_See code: [src/commands/create/new.ts](https://github.com/JoshuaCrewe/venndo/blob/v0.0.0/src/commands/create/new.ts)_

## `venndo env`

Create an env file from a few prompts

```
USAGE
  $ venndo env
```

_See code: [src/commands/env.ts](https://github.com/JoshuaCrewe/venndo/blob/v0.0.0/src/commands/env.ts)_

## `venndo hello [FILE]`

describe the command here

```
USAGE
  $ venndo hello [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print

EXAMPLE
  $ venndo hello
  hello world from ./src/hello.ts!
```

_See code: [src/commands/hello.ts](https://github.com/JoshuaCrewe/venndo/blob/v0.0.0/src/commands/hello.ts)_

## `venndo help [COMMAND]`

display help for venndo

```
USAGE
  $ venndo help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.1.6/src/commands/help.ts)_
<!-- commandsstop -->
