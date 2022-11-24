/********************
* Alloybot Discord Musicbot
* Command: setdj.js
*********************/

module.exports = function(Modules) {
  const _INFO = {
    name: `setdj`,
    desc: `If there is no DJ, it sets the author of this message to the DJ. If the DJ sends the message, it sets whoever is mentioned as the DJ.`,
    _TYPE: `General`,
    _DISABLED: true,
    _REASON: undefined
  }
  Modules.Commands['setdj'] = main;
  Modules.Info.push(_INFO);
}

function main(Message) {
  const Core = require('../../index.js');
  let CurrentDJs;

  if (Core.DB.has('CurrentDJs')) { CurrentDJs = Core.DB.get('CurrentDJs'); setdj() }
  else { CurrentDJs = {}; setdj() }

  function setdj() {
    if (CurrentDJs[Message.guild.id] === undefined) { CurrentDJs[Message.guild.id] = Message.author.id }
    else if (CurrentDJs[Message.guild.id] === Message.author.id && Message.mentions.users.firstKey() !== undefined && Message.mentions.users.firstKey() !== Core.DiscordBot.user.id) { CurrentDJs[Message.guild.id] = Message.mentions.users.firstKey() }
    else if (CurrentDJs[Message.guild.id] === Message.author.id && Message.mentions.users.firstKey() !== undefined && Message.mentions.users.firstKey() === Core.DiscordBot.user.id) { Message.channel.send(`I cannot assign myself as the DJ.`) };
    Message.channel.send(`The Current DJ is now <@${CurrentDJs[Message.guild.id]}>.`);
    Core.DB.put('CurrentDJs', CurrentDJs);
  }
}
