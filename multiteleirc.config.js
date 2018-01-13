var config = {};
module.exports = config;

/////////////////////
//  General config //
/////////////////////

// verbosity of console output
// possible options from most to least verbose:
// silly, debug, verbose, info, warn, error
config.logLevel = 'debug';

config.ircServer = 'irc.rezosup.org';

config.ircNick = 'bot3865346';

config.tgbots = [
    {
        token: 'the-telegram-token-for-the-bot-1',
        nick: 'irc-nick-of-person-1'
    },

    {
        token: 'the-telegram-token-for-the-bot-2',
        nick: 'irc-nick-of-person-2'
    }
]

config.ircbots = [
    {
        nick: 'the-irc-nick-for-the-bot-a',
        chatId: 30000000 // chatId of tg user a
    },
    {
        nick: 'the-irc-nick-for-the-bot-b',
        chatId: 30000001 // chatId of tg user a
    }
]


config.ircOptions = {
    userName: 'bot3865346',
    realName: 'Telegram IRC Bot',
    port: 6667,
    localAddress: null,
    showErrors: false,
    autoRejoin: true,
    autoConnect: true,
    channels: [], // auto generated, do not touch
    secure: false,
    selfSigned: false,
    certExpired: false,
    floodProtection: true,
    floodProtectionDelay: 1000,
    sasl: false,
    stripColors: true,
    channelPrefixes: '&#!',
    messageSplit: 512,
    encoding: ''
};

