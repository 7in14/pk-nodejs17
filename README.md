# sample

Sample generated Rest API

[![Dependency Status](https://david-dm.org/7in14/pk-nodejs17.svg)](https://david-dm.org/7in14/pk-nodejs17)
[![devDependency Status](https://david-dm.org/7in14/pk-nodejs17/dev-status.svg?theme=shields.io)](https://david-dm.org/7in14/pk-nodejs17?type=dev)
[![Build Status](https://travis-ci.org/7in14/pk-nodejs17.svg?branch=master)](https://travis-ci.org/7in14/pk-nodejs17)
[![Maintainability](https://api.codeclimate.com/v1/badges/ffb71be3b54db3f9382b/maintainability)](https://codeclimate.com/github/7in14/pk-nodejs17/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/ffb71be3b54db3f9382b/test_coverage)](https://codeclimate.com/github/7in14/pk-nodejs17/test_coverage)
[![Known Vulnerabilities](https://snyk.io/test/github/7in14/pk-nodejs17/badge.svg?targetFile=package.json)](https://snyk.io/test/github/7in14/pk-nodejs17?targetFile=package.json)

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

## Read all data sources
```
$ curl .:8080/api/dataSources
```

## Read one data source
```
$ curl .:8080/api/dataSource/1
```

## Delete notifier
```
$ curl -X 'DELETE' .:8080/api/dataSource/1
```
## Add notifier
```
$ curl -X 'PUT' .:8080/api/dataSource -d '{"name":"new", "url":"http://google.com"}' -H 'content-type: application/json'
```

## Crimes
```
curl ".:8080/api/raleigh/crime?query=Drug"
```

## License

MIT
