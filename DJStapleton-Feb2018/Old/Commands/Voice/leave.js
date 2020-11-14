/********************
* NonShitMusicBot.js
* Command: leave.js
*********************/

module.exports = function(Modules) {
  const _INFO = {
    name: `leave`,
    desc: `Leaves the current voice channel.`,
    _TYPE: `Voice`,
    _DISABLED: false,
    _REASON: undefined
  }
  Modules.Commands['leave'] = main;
  Modules.Info.push(_INFO);
}

function main(Message) {
  const Core = require('../../index.js');

  if (Core.DB.has('CurrentDJs')) { CurrentDJs = Core.DB.get('CurrentDJs') }
  else { CurrentDJs = {} }

  if (!Core.Globals[Message.guild.id].VoiceConnection) {
    Message.channel.send(`Already Disconnected.`);
  } else {
    leave();
  }

  function leave() {
    Core.Globals[Message.guild.id].VoiceConnection.disconnect();
    Core.Globals[Message.guild.id].VoiceConnection = undefined;
    CurrentDJs[Message.guild.id] === undefined;
    Message.channel.send(`Disconnected.`);
    Core.DB.put('CurrentDJs', CurrentDJs);
  }
}
