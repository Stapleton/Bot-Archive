/***************
* DJ Stapleton *
* help.js      *
****************/
let CORE, meta;

module.exports = function(init) {
    meta = {
        name: `help`,
        desc: `Get more info on any listed command.`,
        subs: {
            here: {
                desc: `Displays command list in the current channel.`,
                usage: `${init.parsedCmd.prefix}help here <command> <subcommand>`
            }
        },
        usage: `${init.parsedCmd.prefix}help <dm|here> <command> <subcommand>`,
        example:`Example: \`${init.parsedCmd.prefix}help dm join\``,
        _TYPE: `General`,
        _DISABLED: false,
        _REASON: undefined
    }
    CORE = init;
    init.modules.commands.set(meta.name, main);
    init.modules.meta.set(meta.name, meta);
}

function main(message) {
    const discordJS = require('discord.js');
    let embed = new discordJS.RichEmbed(CORE.richEmbed);
    embed.fields[0] = {
        name: meta.desc,
        value: `*Usage*: \`${meta.usage}\`\r\n*Example*:`
    }

    let help = {
        General: [],
        Music: [],
        Other: [],
        Playlist: [],
        Voice: []
    }

    CORE.modules.meta.forEach(meta => {
        switch (meta._TYPE) {
            case 'General':
                if (!meta._DISABLED) help.General.push(meta);
                break;
            case 'Music':
                if (!meta._DISABLED) help.Music.push(meta);
                break;
            case 'Other':
                if (!meta._DISABLED) help.Other.push(meta);
                break;
            case 'Playlist':
                if (!meta._DISABLED) help.Playlist.push(meta);
                break;
            case 'Voice':
                if (!meta._DISABLED) help.Voice.push(meta);
                break;
            default:
                // Do Nothing
        }
    });

    Object.keys(help).forEach(key => {
        embed.addField(key, help[key].join(', '));
    });

    switch(CORE.parsedCmd.sub) {
        case 'dm':
            CORE.utils.messageDMChannel(message, embed);
            break;
        case 'here':
            message.channel.send(embed);
            break;
        default:
            CORE.utils.messageDMChannel(message, embed);
    }
}

function buildHelpEmbed(commandName, embed) {
    let meta = CORE.modules.meta.get(commandName);
    embed.addField(`Command: ${meta.name}`, meta.desc, true);
    embed.addField(`Type`, meta._TYPE, true);
    if (meta.subs) {

    }
}