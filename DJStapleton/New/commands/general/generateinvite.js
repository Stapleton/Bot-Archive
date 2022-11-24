/********************
* DJ Stapleton      *
* generateinvite.js *
*********************/
let CORE;

module.exports = function(init) {
    const meta = {
        name: `generateinvite`,
        desc: `Generates a link to join the bot to other discord servers. *Bot Creator Only*`,
        subs: null,
        _TYPE: `General`,
        _DISABLED: false,
        _REASON: null //'For the bot creator only.'
    }
    CORE = init;
    init.modules.commands[meta.name] = main;
    init.modules.meta.set(meta.name, meta);
}

function main(message) {
    if (message.channel.type == 'dm' && message.author.id == process.env.CREATOR_ID) {
        CORE.musicbot.generateInvite(['ADMINISTRATOR']).then(invite => {
            message.channel.send(`${invite}`);
        })
    } else {
        message.channel.send(`*Access Denied*. You are either not the creator of the bot, or not sending the command in a DM.`)
    }
}