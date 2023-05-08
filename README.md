# gendiff
[![hexlet-check](https://github.com/mrandrewer/frontend-project-46/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/mrandrewer/frontend-project-46/actions/workflows/hexlet-check.yml)
[![Node CI](https://github.com/mrandrewer/frontend-project-46/actions/workflows/nodejs.yml/badge.svg)](https://github.com/mrandrewer/frontend-project-46/actions/workflows/nodejs.yml)
[![Maintainability](https://api.codeclimate.com/v1/badges/d84111bb81319aec2520/maintainability)](https://codeclimate.com/github/mrandrewer/frontend-project-46/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/d84111bb81319aec2520/test_coverage)](https://codeclimate.com/github/mrandrewer/frontend-project-46/test_coverage)

A lightweight nodejs comparison tool for configuration files

## Getting started
Clone this repo to your computer. Then at the root of the project run

```shell
make install
sudo npm link
```

The code above installs gendiff module locally from cloned repository.

## Usage

```
gendiff [options] <filepath1> <filepath2>

Options:
  -V, --version        output the version number
  -f, --format <type>  output format (choices: "stylish", "plain", "json", default: "stylish")
  -h, --help           display help for command
```
## Examples

#### Compare two simple json files
[![asciicast](https://asciinema.org/a/mkM7YtIP9HlJnkb3o8mDBltUK.svg)](https://asciinema.org/a/mkM7YtIP9HlJnkb3o8mDBltUK)

#### Compare two simple yml files
[![asciicast](https://asciinema.org/a/q6fiHG8xVHHwDlhI9OglmiKtr.svg)](https://asciinema.org/a/q6fiHG8xVHHwDlhI9OglmiKtr)

#### Compare two complex files
[![asciicast](https://asciinema.org/a/vFlzgHco6gpuLFBbRUqShpsiz.svg)](https://asciinema.org/a/vFlzgHco6gpuLFBbRUqShpsiz)

#### Use plain output format
[![asciicast](https://asciinema.org/a/yH6NSLp5eXXexIxL5bskz6JLZ.svg)](https://asciinema.org/a/yH6NSLp5eXXexIxL5bskz6JLZ)

#### Use json output format
[![asciicast](https://asciinema.org/a/Xkeb1XXqqkO76HdNoLmHJ7XHJ.svg)](https://asciinema.org/a/Xkeb1XXqqkO76HdNoLmHJ7XHJ)
