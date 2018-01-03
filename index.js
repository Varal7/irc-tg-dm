var logger = require('./log');

logger.level = 5;

var msgCallback = function(message) {
    switch (message.protocol) {
        case 'irc':
            tg.send(message);
            break;
        case 'tg':
            irc.send(message);
            break;
        default:
            logger.warn('unknown protocol: ' + message.protocol);
    }
};

var irc = require('./irc')(msgCallback);
var tg = require('./tg')(msgCallback);
