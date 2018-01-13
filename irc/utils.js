var config = require('../config');
var logger = require('winston');

exports.lookUpTgBot = function(nick, tgbots) {
    return tgbots.filter(function(tgbot) {
        return tgbot.nick.toLowerCase() === nick.toLowerCase();
    })[0];
};

exports.lookUpIrcBot = function(chatId, ircbots) {
    return ircbots.filter(function(ircbot) {
        return ircbot.chatId === chatId;
    })[0];
};
