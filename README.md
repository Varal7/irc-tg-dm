# Multiteleirc

A simple [Telegram](https://telegram.org/) ↔ IRC gateway for direct messages

Largerly inspired by [FruitieX/Teleirc](https://github.com/FruitieX/teleirc).

Quick start
-----------

Make sure you've installed Node.js.

1. Clone this project
2. Copy the multiteleirc.config.js file into ~/.multiteleirc/config.js and edit as will
3. Set up bots with [BotFather](https://telegram.me/botfather) (one bot per IRC user)
4. Run the multi-bot with `node .`
5. Telegram users have to initiate the conversation


Known issues
------------

* No bot authentification (subject to MITM attack)
* Does not support Telegram media files, edits, etc.
