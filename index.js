var logger = require('./log');
var fs = require('fs');

logger.level = "verbose";

if (!fs.existsSync('chatid.json')) {
    conv = {'nick2chatid': {}, 'chatid2nick': {}};
    json = JSON.stringify(conv);
    try {
        fs.writeFileSync('chatid.json', json);
        logger.info('Created chatid.json');
    } catch (e) {
        logger.error('Error while creating chatid.json: ', e)
    }
}


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
