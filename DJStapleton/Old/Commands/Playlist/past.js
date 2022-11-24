/********************
* Alloybot Discord Musicbot
* Command: past.js
*********************/

module.exports = function(Modules) {
  const _INFO = {
    name: `past`,
    desc: `Lists the songs that have already played.`,
    _TYPE: `Playlist`,
    _DISABLED: false,
    _REASON: undefined
  }
  Modules.Commands['past'] = main;
  Modules.Info.push(_INFO);
}

function main(Message) {
  const Core = require('../../index.js');
  let PastPlaylists, PastEmbed = new Core.DiscordJS.RichEmbed();

  if (Core.DB.has('PastPlaylists')) { PastPlaylists = Core.DB.get('PastPlaylists') }
  else { PastPlaylists = {}; Core.DB.put('PastPlaylists', PastPlaylists) };

  if (PastPlaylists[Message.guild.id]) { pastList() }
  else if (!PastPlaylists[Message.guild.id]) { Message.channel.send(`The past playlist is empty.`) };

  function pastList() {
    for (i in PastPlaylists[Message.guild.id]) {
      if (i >= PastPlaylists[Message.guild.id].pos) {
        let song = PastPlaylists[Message.guild.id][i];
        i = Number(i) + 1;
        PastEmbed.setColor('RED');
        PastEmbed.setFooter('Alloybot - Music', Core.DiscordBot.user.avatarURL);
        PastEmbed.addField(`Song #${i}`, song.title);
      }
    }
    Message.channel.send(`Previously Played`, PastEmbed);
  }
}
