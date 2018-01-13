var _ = require('lodash');
var fs = require('fs');
var path = require('path');
var osHomedir = require('os-homedir');
var logger = require('winston');

var config;
var configPath = path.join(osHomedir(), '.multiteleirc', 'config.js');

try {
    logger.info('using config file from: ' + configPath);
    config = require(configPath);
} catch (e) {
    logger.error('ERROR while reading config:\n' + e + '\n\nPlease make sure ' +
                              'it exists and is valid.');
    process.exit(1);
}

module.exports = config;
