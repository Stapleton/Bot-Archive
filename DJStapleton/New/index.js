require('dotenv').config({
	path: './private.env'
});
//"erlpack": "github:hammerandchisel/erlpack",
const fs = require('fs');
const path = require('path');
const discordJS = require('discord.js');
const cassette = require('cassette');
const googleapis = require('googleapis');
const ytservice = new cassette.YouTubeService(process.env.YOUTUBE_API_KEY);
const musicbot = new discordJS.Client();
musicbot.login(process.env.DISCORD_TOKEN);

/******************
 * Shared Objects *
 ******************/

let CORE = {
	musicbot: musicbot,
	modules: {
		commands: new Map(),
		meta: new Map()
	},
	guilds: new Map(),
	richEmbed: {
		color: 'RED',
		footer: {
			text: musicbot.user.username,
			icon_url: musicbot.user.avatarURL
		},
		timestamp: Date().now()
	},
	parsedCmd: {},
	utils: {
		messageDMChannel: require('./utils/messageDMChannel.js')
	}
}

/*****************
 * Module Loader *
 *****************/

function loadModules(dir) {
	// Get 'dir' stats
	fs.lstat(dir, function (err, stat) {
		// If 'dir' is a directory
		if (stat.isDirectory()) {
			// Get all files in 'dir'
			let files = fs.readdirSync(dir);
			let f, l = files.length;
			for (let i = 0; i < l; i++) {
				// Join the current directory and each file
				f = path.join(dir, files[i]);
				// Run this function again but with the newly joined file/dir
				loadModules(f);
			}
		// If 'dir' is a file, load it. Also call an init function in the module on load.
		} else {
			require(dir)(CORE);
		}
	});
}

loadModules(path.join(__dirname, 'commands'));

/*************
 * Bot Stuff *
 *************/

musicbot.on('ready', function() {
	console.log(`Connected to ${musicbot.guilds.size} servers.`);
});

musicbot.on('message', function(message) {

	// If the message was created by the bot, return.
	if (message.author.id == musicbot.user.id) return;

	// Parse message content.
	let parsing = message.content.toLowerCase().split(' ');
	CORE.parsedCmd.prefix = process.env.CMD_PREFIX;
	CORE.parsedCmd.clean = parsing.shift().replace(process.env.CMD_PREFIX, '');
	CORE.parsedCmd.sub = parsing.shift();
	CORE.parsedCmd.arguments = parsing.join(' ');

	// If the message starts with the command prefix set in private.env and the core object has the command being called;
	// Then get the command module and run it.
	if (message.content.startsWith(CORE.parsedCmd.prefix) && CORE.modules.commands.has(CORE.parsedCmd.clean)) {
		CORE.modules.commands.get(CORE.parsedCmd.clean)(message);
	}

	// Apply some RichEmbed defaults to the core object.
	CORE.richEmbed.thumbnail = { url: message.guild.iconURL };
});

module.exports = CORE;