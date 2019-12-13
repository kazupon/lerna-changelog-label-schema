# :label: lerna-changelog-label-schema

[![npm](https://img.shields.io/npm/v/lerna-changelog-label-schema.svg)](https://www.npmjs.com/package/lerna-changelog-label-schema)
[![CircleCI](https://circleci.com/gh/kazupon/lerna-changelog-label-schema.svg?style=svg)](https://circleci.com/gh/kazupon/lerna-changelog-label-schema)

Label schema definition for lerna-changelog


## :notebook: Label Schema

| Emojis                      | Category      | Label Display         | Preset: default      | Preset: full         | Description                                               |
|-----------------------------|---------------|-----------------------|----------------------|----------------------|-----------------------------------------------------------|
| :star:                      | Feature       | `Type: Feature`       |  :white_check_mark:  |  :white_check_mark:  | Includes new features                                     |
| :bug:                       | Bug           | `Type: Bug`           |  :white_check_mark:  |  :white_check_mark:  | Bug or Bug fixes                                          |
| :lock:                      | Security      | `Type: Security`      |  :white_check_mark:  |  :white_check_mark:  | Security fixes                                            |
| :chart_with_upwards_trend:  | Performance   | `Type: Performance`   |  :white_check_mark:  |  :white_check_mark:  | Includes performance fixes                                |
| :zap:                       | Improvement   | `Type: Improvement`   |  :white_check_mark:  |  :white_check_mark:  | Includes backwards-compatible fixes                       |
| :boom:                      | Breaking      | `Type: Breaking`      |  :white_check_mark:  |  :white_check_mark:  | Includes backwards-incompatible fixes                     |
| :warning:                   | Deprecated    | `Type: Deprecated`    |  :white_check_mark:  |  :white_check_mark:  | Includes deprecate fixes                                  |
| :globe_with_meridians:      | I18n          | `Type: I18n`          |  :white_check_mark:  |  :white_check_mark:  | An internationalization fixes                             |
| :wheelchair:                | A11y          | `Type: A11y`          |  :white_check_mark:  |  :white_check_mark:  | An accessibility fixes                                    |
| :pencil:                    | Documentation | `Type: Documentation` |  :white_check_mark:  |  :white_check_mark:  | A documetation fixes                                      |
| :shirt:                     | Refactoring   | `Type: Refactoring`   |                      |  :white_check_mark:  | A code change that neither fixes a bug nor adds a feature |
| :white_check_mark:          | Testing       | `Type: Testing`       |                      |  :white_check_mark:  | Adding missing tests or correcting existing tests         |
| :wrench:                    | Maintenance   | `Type: Maintenance`   |                      |  :white_check_mark:  | Repository Maintenance                                    |
| :lollipop:                  | Example       | `Type: Example`       |                      |  :white_check_mark:  | Includes example and demo code fixes                      |
| :pushpin:                   | Dependency    | `Type: Dependency`    |                      |  :white_check_mark:  | Dependencies fixes                                        |
| :package:                   | Build         | `Type: Build`         |                      |  :white_check_mark:  | A packaging or a building fixes                           |

You can use the preset as `default` or `full`. In about setup, look up the following CLI section.


## :star: CLI

You can setup lerna-changelog labels to `package.json` with CLI.

### :cd: Instllation

npm:
```bash
$ npm install -g lerna-changelog-label-schema
```

yarn:
```bash
$ yarn global add lerna-changelog-label-schema
```

### :rocket: Usages

```bash

  Label schema definition for lerna-changelog

  Usage
    $ lerna-changelog-label-schema <command> [options]

  Commands:
    define, d      define lerna-changelog labels in your package.json 
    generate, g    generate lerna-changelog labels for GitHub labels, output for stdout
    version, v     show the version

  Options:
    --preset, -p   Label schema preset option, for define and generate command. 'default' or 'full', default: 'default'
    --output, -o   Output option, for generate command. if specified, stdout is suppressed.

  Examples:
    $ lerna-changelog-label-schema define --preset=full
    $ lerna-changelog-label-schema generate --preset=default
```

e.g. `define` command

```bash
$ cd /path/to/project
$ lerna-changelog-label-schema define --preset=full
apply lerna-changelog label schema 'full' to package.json
```


## :scroll: Changelog
Details changes for each release are documented in the [CHANGELOG.md](https://github.com/kazupon/lerna-changelog-label-schema/blob/master/CHANGELOG.md).


## :copyright: License

[MIT](http://opensource.org/licenses/MIT)
