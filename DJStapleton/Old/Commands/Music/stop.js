/********************
* Alloybot Discord Musicbot
* Command: stop.js
*********************/

module.exports = function(Modules) {
  const _INFO = {
    name: `stop`,
    desc: `Stops the currently playing song, and leaves the voice channel.`,
    _TYPE: `Music`,
    _DISABLED: false,
    _REASON: undefined
  }
  Modules.Commands['stop'] = main;
  Modules.Info.push(_INFO);
}

function main(Message) {
  const Core = require('../../index.js');
  let Dispatcher, VoiceConnection;

  if (Core.Globals[Message.guild.id].VoiceConnection) { VoiceConnection = Core.Globals[Message.guild.id].VoiceConnection; stop() }
  else { Message.channel.send(`There is no music playing nor am I in a voice channel.`) };

  function stop() {
    VoiceConnection.disconnect();
    Message.channel.send(`Stopped.`);
  }
}
