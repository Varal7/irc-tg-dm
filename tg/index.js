var Telegram = require('node-telegram-bot-api');
var logger = require('winston');
var conv = require('../chatid.json');
var fs = require('fs');

const token = '481561599:AAGDjtpWfPOMnsXCEDN3X8Fy_UcNPXH3tbY';
    

var init = function(msgCallback) {
    var tg = new Telegram(token, {
        polling: true,
        emojification: true,
    });


    tg.onText(/\/nick (.+)/, (msg, match) => {
	var chatId = msg.chat.id;
	var nick = match[1].split(" ", 2)[0]; 

	conv.nick2chatid[nick] = chatId;
	conv.chatid2nick[chatId] = nick;
	var json = JSON.stringify(conv);
        try {
            fs.writeFileSync('chatid.json', json);
            logger.info('successfully stored new nick');
            tg.sendMessage(chatid, "Ok, new nick: " + nick);
        } catch (e) {
            logger.error('error while storing nick:', e);
        }
    }); 


    tg.on('message', function(msg) {
        logger.debug('got tg msg:', msg);

        var chatid = msg.chat.id;
        try {
            var nick = conv.chatid2nick[chatid];
        } catch (e) { 
            tg.sendMessage(chatid, "Please set your nickname with me using /nick [nickname]");
            return;
        }

        text = '<' + nick + '> ' + msg.text;

        msgCallback({
            protocol: 'irc',
            text: text,
        });
    });


    return {
        send: function(message) {
            logger.verbose('>> relaying to TG:', message.text);
            tg.sendMessage(message.chatid, message.text);
        }
    };
};

module.exports = init;
