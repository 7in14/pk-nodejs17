# sample

Sample generated Rest API

[![Dependency Status](https://david-dm.org/7in14/pk-nodejs17.svg)](https://david-dm.org/7in14/pk-nodejs17)
[![devDependency Status](https://david-dm.org/7in14/pk-nodejs17/dev-status.svg?theme=shields.io)](https://david-dm.org/7in14/pk-nodejs17?type=dev)
[![Build Status](https://travis-ci.org/7in14/pk-nodejs17.svg?branch=master)](https://travis-ci.org/7in14/pk-nodejs17)
[![Maintainability](https://api.codeclimate.com/v1/badges/ffb71be3b54db3f9382b/maintainability)](https://codeclimate.com/github/7in14/pk-nodejs17/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/ffb71be3b54db3f9382b/test_coverage)](https://codeclimate.com/github/7in14/pk-nodejs17/test_coverage)

# Description
Simple REST API build with Hapi v17

## Usage

```bash
$ yarn
$ yarn start
```

## Build with
Yeoman generator for scaffolding hapi apps and plugins. https://github.com/jedireza/generator-hapi-style

Migrated to latest dependencies (Hapi 17.0) with the idea to create PR to jedireza repo

# API
## ping
```
$ curl .:8080/api/ping
```

## Read all notifiers
```
$ curl .:8080/api/notifier
```

## Read one notifier
```
$ curl .:8080/api/notifier/1
```

## Delete notifier
```
$ curl -X 'DELETE' .:8080/api/notifier/1
```
## Add notifier
```
$ curl -X 'PUT' .:8080/api/notifier -d '{"name":"new", "url":"http://google.com"}' -H 'content-type: application/json'
```

## Crimes
```
curl ".:8080/api/raleigh/crime?query=Drug"
```

## License

MIT
