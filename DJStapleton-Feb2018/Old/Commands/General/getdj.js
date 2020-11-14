/********************
* Alloybot Discord Musicbot
* Command: getdj.js
*********************/

module.exports = function(Modules) {
  const _INFO = {
    name: `getdj`,
    desc: `Gets the current DJ that is in control of the bot, aside from the owner.`,
    _TYPE: `General`,
    _DISABLED: true,
    _REASON: undefined
  }
  Modules.Commands['getdj'] = main;
  Modules.Info.push(_INFO);
}

function main(Message) {
  const Core = require('../../index.js');
  let CurrentDJs;

  if (Core.DB.has('CurrentDJs')) {
    CurrentDJs = Core.DB.get('CurrentDJs');
    if (CurrentDJs[Message.guild.id]) { Message.channel.send(`The Current DJ is <@${CurrentDJs[Message.guild.id]}>.`) }
    else { Message.channel.send(`No one has been set as the DJ.`) }
  } else {
    CurrentDJs = {}; Core.DB.put('CurrentDJs', CurrentDJs);
    Message.channel.send(`No one has been set as the DJ.`);
  };
}
