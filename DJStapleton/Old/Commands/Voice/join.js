/********************
* NonShitMusicBot.js
* Command: join.js
*********************/

module.exports = function(Modules) {
  const _INFO = {
    name: `join`,
    desc: `Joins the voice channel that the runner of the command is in.`,
    _TYPE: `Voice`,
    _DISABLED: false,
    _REASON: undefined
  }
  Modules.Commands['join'] = main;
  Modules.Info.push(_INFO);
}

function main(Message) {
  const Core = require('../../index.js');
  let Joined = Core.DiscordBot.voiceConnections;

  if (Joined.has(Message.member.voiceChannelID)) {
    Message.channel.send(`Already Connected.`);
  } else if (!Message.member.voiceChannelID) {
    Message.channel.send(`You should be connected to a voice channel first.`);
  } else if (Message.member.voiceChannel.guild.id !== Message.guild.id) {
    Message.channel.send(`You should be connected to a voice channel in the same server as me.`);
  } else if (Message.member.voiceChannelID && !Joined.has(Message.member.voiceChannelID)) {
    join();
  }

  function join() {
    Message.member.voiceChannel.join()
    .then(function(Connection) {
      setVC(Connection);
      Message.channel.send(`Connected.`);
    }).catch(function(error) {
      console.error(error);
    });
  }

  function setVC(VC) {
    Core.Globals[Message.guild.id].VoiceConnection = VC;
  }
}
