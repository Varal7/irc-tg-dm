var NodeIrc = require('irc-framework');
var logger = require('winston');



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

            if (event.message.indexOf('hello') === 0) {
                    event.reply('Hi!');
            }
            console.log(text) //TODO remove
            logger.debug('got irc msg:', text);

            msgCallback({
                protocol: 'irc',
                //channel: message.channel,
                user: user,
                text: text
            });
            
    });
 return {
        send: function(message, multi) {
            //TODO
            logger.verbose('<< relaying to IRC:', message.text);
            console.log(message.text) //TODO remove
            return;

            

            if (multi) {
                logger.verbose('<< relaying to IRC w/ multiple lines:', message.text);
                message.text.split('\n').forEach(function(msg) {
                    nodeIrc.say(message.channel.ircChan, msg);
                });
                return;
            }

            // strip empty lines
            message.text = message.text.replace(/^\s*\n/gm, '');

            // replace newlines
            message.text = message.text.replace(/\n/g, config.replaceNewlines);

            // TODO: replace here any remaining newlines with username
            // (this can happen if user configured replaceNewlines to itself
            // contain newlines)

            logger.verbose('<< relaying to IRC:', message.text);
            nodeIrc.say(message.channel.ircChan, message.text);
        },
    };
};



module.exports = init;
