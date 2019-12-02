# :label: lerna-changelog-label-types

[![npm](https://img.shields.io/npm/v/lerna-changelog-label-types.svg)](https://www.npmjs.com/package/lerna-changelog-label-types)
[![CircleCI](https://circleci.com/gh/kazupon/lerna-changelog-label-types.svg?style=svg)](https://circleci.com/gh/kazupon/lerna-changelog-label-types)

Label type definition for lerna-changelog


## :notebook: Label Types

| Emojis                      | Labels                | Default                         | Full                 | Description                         |
|-----------------------------|-----------------------|---------------------------------|----------------------|-------------------------------------|
| :star:                      | `Type: Feature`       |  :white_check_mark:             |  :white_check_mark:  | **new feature** issue               |
| :bug:                       | `Type: Bug`           |  :white_check_mark:             |  :white_check_mark:  | **bug** issue                       |
| :lock:                      | `Type: Security`      |  :white_check_mark:             |  :white_check_mark:  | **security** issue                  |
| :chart_with_upwards_trend:  | `Type: Performance`   |  :white_check_mark:             |  :white_check_mark:  | **performance** issue               |
| :zap:                       | `Type: Improvement`   |  :white_check_mark:             |  :white_check_mark:  | **backwards-compatible** feature    |
| :boom:                      | `Type: Breaking`      |  :white_check_mark:             |  :white_check_mark:  | **backwards-incompatible** feature  |
| :warning:                   | `Type: Deprecated`    |  :white_check_mark:             |  :white_check_mark:  | **Deprecate** feature               |
| :globe_with_meridians:      | `Type: I18n`          |  :white_check_mark:             |  :white_check_mark:  | **internationalization** issue      |
| :wheelchair:                | `Type: A11y`          |  :white_check_mark:             |  :white_check_mark:  | **accessibility** issue             |
| :shirt:                     | `Type: Documentation` |  :white_check_mark:             |  :white_check_mark:  | **documentation** issue             |
| :white_check_mark:          | `Type: Refactoring`   |  :negative_squared_cross_mark:  |  :white_check_mark:  | **refactoring** issue               |
| :pencil:                    | `Type: Testing`       |  :negative_squared_cross_mark:  |  :white_check_mark:  | **test** issue                      |
| :wrench:                    | `Type: Configuration` |  :negative_squared_cross_mark:  |  :white_check_mark:  | **configuration**  issue            |
| :lollipop:                  | `Type: Example`       |  :negative_squared_cross_mark:  |  :white_check_mark:  | **example** or **demo** issue       |
| :push_pin:                  | `Type: Dependency`    |  :negative_squared_cross_mark:  |  :white_check_mark:  | **dependencies** issue              |
| :package:                   | `Type: Build`         |  :negative_squared_cross_mark:  |  :white_check_mark:  | **packaging** or **bundling** issue |

You can use the preset as `Default` or `Full`. In about setup, look up the following CLI section.


## :star: CLI

You can setup lerna-changelog labels to `package.json` with CLI.

### :cd: Instllation

npm:
```bash
$ npm install -g lerna-changelog-lable-types
```

yarn:
```bash
$ yarn global add lerna-changelog-lable-types
```

### :rocket: Usages

Run the following command in your repository:

```bash
$ lerna-changelog-lable-types  
apply lerna-changelog label preset 'default' to package.json
```

When labels is set successfully, a message is output.

If you want to set all labels, specify `full` as `--preset` or `-p` argument.

```bash
$ lerna-changelog-lable-types --preset=full
apply lerna-changelog label preset 'full' to package.json
```


## :scroll: Changelog
Details changes for each release are documented in the [CHANGELOG.md](https://github.com/kazupon/lerna-changelog-label-types/blob/master/CHANGELOG.md).


## :copyright: License

[MIT](http://opensource.org/licenses/MIT)
