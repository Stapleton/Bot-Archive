/********************
* Alloybot Discord Musicbot
* Command: addyt.js
*********************/

module.exports = function(Modules) {
  const _INFO = {
    name: `addyt`,
    desc: `Adds a song from youtube to the playlist via Link or Search terms. (Picks the first video in the search results) *aliased to >add*`,
    _TYPE: `Playlist`,
    _DISABLED: false,
    _REASON: undefined
  }
  Modules.Commands[`addyt`] = main;
  Modules.Info.push(_INFO);
}

function main(Message) {
  const Core = require('../../index.js');
  let Embed = new Core.DiscordJS.RichEmbed(), Playlists, PastPlaylists, Content;

  if (Core.DB.has('Playlists')) { Playlists = Core.DB.get('Playlists') }
  else { Playlists = {}; Core.DB.put('Playlists', Playlists) };

  if (Core.DB.has('PastPlaylists')) { PastPlaylists = Core.DB.get('PastPlaylists') }
  else { PastPlaylists = {}; Core.DB.put('PastPlaylists', PastPlaylists) };

  if (Playlists[Message.guild.id]) { addsong() }
  else { Playlists[Message.guild.id] = new Core.Cassette.Playlist(); addsong() };

  if (!PastPlaylists[Message.guild.id]) { PastPlaylists[Message.guild.id] = new Core.Cassette.Playlist() };

  Content = Message.content.split(' ');
  Content.shift();
  Content = Content.join(' ');

  //if (Content.search('&list=')) { addplaylist() }
  //else { addsong() };

  function addsong() {
    Playlists[Message.guild.id].add(Message.content.replace('>add ', ''), [Core.YTService])
    .then(function(Song) {
      Embed.setColor('RED');
      Embed.setFooter('Alloybot - Music', Core.DiscordBot.user.avatarURL);
      Embed.fields = [{name: 'Song Name', value: Song[0].title}];
      Message.channel.send(`**Added song to playlist.**`, Embed);
      Core.DB.put('Playlists', Playlists);
      Core.DB.put('PastPlaylists', PastPlaylists);
    }).catch(function(error) {
      console.error(error);
    });
  }

  /*function addplaylist() {
    Playlists[Message.guild.id].add(Content, [Core.YTService], { searchType: 'playlist' })
    .then(function(Song) {
      let embedplaylist = [];
      Song.forEach(function(item) {
        embedplaylist.push(`**${embedplaylist.length + 1}**. [${item.title}](${item.streamURL})`);
      });
      Embed.fields = [{name: 'Song list', value: embedplaylist.join('\r\n')}];
      Message.channel.send(`**Added songs to playlist.**`, Embed);
      self.Core.DB.put('PastPlaylists', PastPlaylists);
      self.Core.DB.put('Playlists', Playlists);
      Embed = undefined;
    }).catch(function(error) {
      console.error(error);
    });
  }*/
}
