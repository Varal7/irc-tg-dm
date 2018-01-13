var Telegram = require('node-telegram-bot-api');
var logger = require('winston');
var fs = require('fs');
var utils = require('./utils');
var config = require('../config');


var init = function(msgCallback) {
    var bots = [];
    config.tgbots.forEach(function(botConfig) {
        var bot = new Telegram(botConfig.token, {
            polling: true,
            emojification: true,
        });
        bots.push({
            bot: bot,
            nick: botConfig.nick,
        });
    });

    bots.forEach(function(bot) {

        bot.bot.on('message', function(msg) {
            var chatId = msg.chat.id;
            var text = msg.text

            logger.debug('got tg msg from ' + chatId + ': ' + text);

            var ircbot = utils.lookUpIrcBot(chatId, config.ircbots);
            if (!ircbot) {
                logger.debug('User not in config');
                bot.bot.sendMessage(chatId, "You are not allowed to talk to me, chatId: " + chatId);
                return;
            }

            msgCallback({
                protocol: 'irc',
                to: bot.nick,
                from: chatId,
                text: text
            });
        });
    });


    return {
        send: function(message) {
            var bot = utils.lookUpTgBot(message.from, bots);
            if (!bot) {
                logger.error('TG Bot not in config');
                return;
            }
            logger.verbose('>> ' +  message.from  + '->'  + message.to 
                + ': ' +  message.text);
            bot.bot.sendMessage(message.to, message.text);
        }
    };
};

module.exports = init;
