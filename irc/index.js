var NodeIrc = require('irc-framework');
var logger = require('winston');
var config = require('../config');
var utils = require('./utils');


var init = function(msgCallback) {
    var bots = [];
    config.ircbots.forEach(function(botConfig) {
        var bot = new NodeIrc.Client();
        bot.connect({
            host: config.ircServer,
            nick: botConfig.nick,
            port: config.ircOptions.port,
            gecos: config.ircOptions.realName
        });
        logger.info('Conneting as ', botConfig.nick);
        bots.push({
            chatId: botConfig.chatId,
            bot: bot
        });
    });

    bots.forEach(function(bot) {

        bot.bot.on('message', function(event) {
                var nick = event.nick;
                var text = event.message;

                logger.debug('got irc msg from ' + nick + ': ' + text);

                var tgbot = utils.lookUpTgBot(nick, config.tgbots);
                if (!tgbot) {
                    logger.debug('User not in config');
                    return;
                }

                msgCallback({
                    protocol: 'tg',
                    to: bot.chatId,
                    from: nick,
                    text: text
                });
        });

    });
 return {
        send: function(message) {
            var bot = utils.lookUpIrcBot(message.from, bots);
            if (!bot) {
                logger.error('IRC Bot not in config');
                return;
            }
            // strip empty lines
            message.text = message.text.replace(/^\s*\n/gm, '');

            // replace newlines
            message.text = message.text.replace(/\n/g, ' … ');

            logger.verbose('<< ' +  message.from  + '->'  + message.to
                + ': ' +  message.text);
            bot.bot.say(message.to, message.text);
        },
    };
};

module.exports = init;
