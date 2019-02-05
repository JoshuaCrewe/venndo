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
$ npm install -g @venncreative/venndo
$ venndo COMMAND
running command...
$ venndo (-v|--version|version)
@venncreative/venndo/0.2.1 darwin-x64 node-v8.11.3
$ venndo --help [COMMAND]
USAGE
  $ venndo COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`venndo add-git-ftp`](#venndo-add-git-ftp)
* [`venndo create CLONE PROJECT`](#venndo-create-clone-project)
* [`venndo create:new CLONE REPO`](#venndo-createnew-clone-repo)
* [`venndo env`](#venndo-env)
* [`venndo help [COMMAND]`](#venndo-help-command)

## `venndo add-git-ftp`

get project set up with git-ftp

```
USAGE
  $ venndo add-git-ftp

OPTIONS
  -h, --help  show CLI help

DESCRIPTION
  You will be given a series of prompts asking for configuration.

  You will need :
  * Port
  * Username
  * hostname
  * server password

  Answer the questions and the answers will add your ssh key to the server and
  set the relevant config options for git-ftp in the repo.

EXAMPLE
  $ venndo add-git-ftp
```

_See code: [src/commands/add-git-ftp.ts](https://github.com/JoshuaCrewe/venndo/blob/v0.2.1/src/commands/add-git-ftp.ts)_

## `venndo create CLONE PROJECT`

Scaffold a project from a git repo

```
USAGE
  $ venndo create CLONE PROJECT

ARGUMENTS
  CLONE    The name of the git project on which to base on
  PROJECT  The name of the new project

OPTIONS
  -h, --help  show CLI help

EXAMPLE
  $ venndo create baseProject projectName
```

_See code: [src/commands/create/index.ts](https://github.com/JoshuaCrewe/venndo/blob/v0.2.1/src/commands/create/index.ts)_

## `venndo create:new CLONE REPO`

Set a new project relationship for scaffolding

```
USAGE
  $ venndo create:new CLONE REPO

ARGUMENTS
  CLONE  A git repo to use as a base
  REPO   The git clone URL for the project

OPTIONS
  -h, --help  show CLI help

EXAMPLE
  $ venndo create:new new-project git@bitbucket.org:organisation/project.git
```

_See code: [src/commands/create/new.ts](https://github.com/JoshuaCrewe/venndo/blob/v0.2.1/src/commands/create/new.ts)_

## `venndo env`

Create an env file from a few prompts

```
USAGE
  $ venndo env

OPTIONS
  -h, --help  show CLI help

DESCRIPTION
  You will be given a series of prompts asking for configuration.
  Answer the questions and the answers will form an .env file.

EXAMPLE
  $ venndo env
```

_See code: [src/commands/env.ts](https://github.com/JoshuaCrewe/venndo/blob/v0.2.1/src/commands/env.ts)_

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
