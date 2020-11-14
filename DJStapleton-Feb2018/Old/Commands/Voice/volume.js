/********************
* NonShitMusicBot.js
* Command: volume.js
*********************/

module.exports = function(Modules) {
  const _INFO = {
    name: `volume`,
    desc: `Changes the volume of the bot.`,
    _TYPE: `Voice`,
    _DISABLED: false,
    _REASON: undefined
  }
  Modules.Commands['volume'] = main;
  Modules.Info.push(_INFO);
}

function main(Message) {
  const Core = require('../../index.js');
  let Dispatcher, VoiceConnection, Content, MinVol = Number('-100'), MaxVol = Number('100');

  if (Core.Globals[Message.guild.id].VoiceConnection) { VoiceConnection = Core.Globals[Message.guild.id].VoiceConnection }
  else { Message.channel.send(`There is no music playing nor am I in a voice channel.`) };

  if (!VoiceConnection) { Message.channel.send(`I need to be in a channel first.`) }
  else { Dispatcher = VoiceConnection.dispatcher };

  Content = Message.content.replace('>volume ', '');
  Content = Number(Content);

  if (Content < MinVol || Content > MaxVol) {
    Message.channel.send(`Volume must be in between ${MinVol} and ${MaxVol}. (Ex. >volume 10)`);
  } else {
    volume(Content);
  }

  function volume(Content) {
    Dispatcher.setVolumeDecibels(Content);
  }
}
