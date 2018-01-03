var Telegram = require('node-telegram-bot-api');
var logger = require('winston');

const token = '481561599:AAGDjtpWfPOMnsXCEDN3X8Fy_UcNPXH3tbY';
    

var init = function(msgCallback) {
    var tg = new Telegram(token, {
        polling: true,
        emojification: true,
    });

    // get our own Telegram user
    tg.getMe().then(function(me) {
        myUser = me;

        tg.on('message', function(msg) {
            logger.debug('got tg msg:', msg);
	    msgCallback({
                protocol: 'tg',
                text: msg.text
            });
        });
    });

    return {
        send: function(message) {
            //TODO
            logger.verbose('>> relaying to TG:', message.text);
            //tg.sendMessage(message.channel.tgChatId, message.text);
        }
    };
};

module.exports = init;
