/********************
* Alloybot Discord Musicbot
* Command: clear.js
*********************/

module.exports = function(Modules) {
  const _INFO = {
    name: `clear`,
    desc: `Clears the current playlist.`,
    _TYPE: `Playlist`,
    _DISABLED: false,
    _REASON: undefined
  }
  Modules.Commands['clear'] = main;
  Modules.Info.push(_INFO);
}

function main(Message) {
  const Core = require('../../index.js');

  if (Core.DB.has('Playlists')) {
    let Playlists = Core.DB.get('Playlists');
    if (Playlists[Message.guild.id]) {
      Playlists[Message.guild.id].reset();
      Core.DB.put('Playlists', Playlists);
      Message.channel.send(`Cleared the playlist.`);
    } else {
      Message.channel.send(`The playlist is empty.`);
    }
  } else {
    Message.channel.send(`The playlist is empty.`);
  }
}
