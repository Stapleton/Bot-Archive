/********************
* Alloybot Discord Musicbot
* Command: generateinvite.js
*********************/

module.exports = function(Modules) {
  const _INFO = {
    name: `generateinvite`,
    desc: `Generates a link to join the bot to other discord servers. *Bot Creator Only*`,
    _TYPE: `General`,
    _DISABLED: true,
    _REASON: 'For the bot creator only.'
  }
  Modules.Commands['generateinvite'] = main;
  Modules.Info.push(_INFO);
}

function main(Message) {
  const Core = require('../../index.js');
  /* console.log(`Channel Type: ${Message.channel.type}`);
  console.log(`Author ID: ${Message.author.id}`);
  console.log(`Creator ID: ${process.env.CREATOR_ID}`); */
  if (Message.channel.type == 'dm' && Message.author.id == process.env.CREATOR_ID) {
    console.log('DM from Creator');
    Core.DiscordBot.generateInvite(['ADMINISTRATOR']).then(function(Invite) {
      Message.channel.send(`${Invite}`);
    });
  } else {
    Message.channel.send(`Access Denied. You are either not the creator of the bot, or not sending the command in a DM.`);
  }
}
