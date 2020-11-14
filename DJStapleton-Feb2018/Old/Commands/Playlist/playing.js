/********************
* Alloybot Discord Musicbot
* Command: playing.js
*********************/

module.exports = function(Modules) {
  const _INFO = {
    name: `playing`,
    desc: `Says what song is currently playing.`,
    _TYPE: `Playlist`,
    _DISABLED: true,
    _REASON: 'Not yet implemented.'
  }
  Modules.Commands['playing'] = main;
  Modules.Info.push(_INFO);
}

function main() {

}
