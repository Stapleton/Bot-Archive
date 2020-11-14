/********************
* Alloybot Discord Musicbot
* Command: pause.js
*********************/

let Core;

module.exports = function(Modules, init) {
  const _INFO = {
    name: `pause`,
    desc: `Pauses the currently playing song.`,
    _TYPE: `Music`,
    _DISABLED: false,
    _REASON: undefined
  }
  Modules.Commands['pause'] = main;
  Modules.Info.push(_INFO);
  Core = init;
}

function main(Message) {
  let Dispatcher, VoiceConnection;

  if (Core.Globals[Message.guild.id].VoiceConnection) { VoiceConnection = Core.Globals[Message.guild.id].VoiceConnection }
  else { Message.channel.send(`There is no music playing nor am I in a voice channel.`) };

  if (VoiceConnection.dispatcher) { Dispatcher = VoiceConnection.dispatcher; pause() }
  else { Message.channel.send(`There is no music playing.`) };

  function pause() {
    Dispatcher.pause();
    Message.channel.send(`Paused.`);
  }
}
