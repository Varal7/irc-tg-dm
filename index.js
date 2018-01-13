var logger = require('./log');
var fs = require('fs');
var config = require('./config');

logger.level = config.logLevel;

var msgCallback = function(message) {
    switch (message.protocol) {
        case 'tg':
            tg.send(message);
            break;
        case 'irc':
            irc.send(message);
            break;
        default:
            logger.warn('unknown protocol: ' + message.protocol);
    }
};

var irc = require('./irc')(msgCallback);
var tg = require('./tg')(msgCallback);
