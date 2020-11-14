/********************
* Alloybot Discord Musicbot
* Command: now.js
*********************/

module.exports = function(Modules) {
  const _INFO = {
    name: `now`,
    desc: `Lists the upcoming songs in the playlist.`,
    _TYPE: `Playlist`,
    _DISABLED: false,
    _REASON: undefined
  }
  Modules.Commands['now'] = main;
  Modules.Info.push(_INFO);
}

function main(Message) {
  const Core = require('../../index.js');
  let Playlists, Embed = new Core.DiscordJS.RichEmbed();

  if (Core.DB.has('Playlists')) { Playlists = Core.DB.get('Playlists') }
  else { Playlists = {}; Core.DB.put('Playlists', Playlists) };

  if (Playlists[Message.guild.id]) { list() }
  else if (!Playlists[Message.guild.id]) { Message.channel.send(`The current playlist is empty.`) };

  function list() {
    for (i in Playlists[Message.guild.id]) {
      if (i >= Playlists[Message.guild.id].pos) {
        let song = Playlists[Message.guild.id][i];
        i = Number(i) + 1;
        Embed.setColor('RED');
        Embed.setFooter('Alloybot - Music', Core.DiscordBot.user.avatarURL);
        Embed.addField(`Song #${i}`, song.title);
      }
    }
    Message.channel.send(`Current Playlist`, Embed);
  }
}
