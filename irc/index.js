var NodeIrc = require('irc-framework');
var logger = require('winston');
var conv = require('../chatid.json');

const owner = "Varal7";


var init = function(msgCallback) {

    var bot = new NodeIrc.Client();
    bot.connect({
            host: 'irc.rezosup.org',
            port: 6667,
            nick: 'TisanePrivateBot'
    });



    bot.on('message', function(event) {
            var user = event.nick;
            var text = event.message;
            
            logger.debug('got irc msg :', text);
            if (user !== owner) {
                return;
            }
            
            var splits = text.split(" ");
            var nick = splits.shift();
            var text = splits.join(" ");
            var chatid = conv.nick2chatid[nick];

            if (chatid === undefined) {
                bot.say(owner, "Nick " + nick + " not found");
                return;
            }
            
            msgCallback({
                protocol: 'tg',
                chatid: chatid,
                text: text
            });
            
    });
 return {
        send: function(message, multi) {
            logger.verbose('<< relaying to IRC:', message.text);
            bot.say(owner, message.text);
        },
    };
};

module.exports = init;
