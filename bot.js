const Discord = require("discord.js");
const settings = require("./settings.json");
const moment = require("moment");

var client = new Discord.Client();

// Fortunes for 8ball command
var fortunes = [
    "**Yes**",
    "**No**",
    "**Maybe**",
    "**Ask again**",
    "**Sometimes**",
    "**Okay**",
    "**HELL NO**",
    "**FUCK YEAH**",
    "**no no no**"
];

client.on("ready", function() {
    var clientonmessage = `
------------------------------------------------------
> Logging in...
------------------------------------------------------
Logged in as ${client.user.tag}
Working on ${client.guilds.size} servers!
${client.channels.size} channels and ${client.users.size} users cached!
I am logged in and ready to roll!
LET'S GO!
------------------------------------------------------
------------------------------------------------------
-----------------Bot's commands logs------------------`

    console.log(clientonmessage);
    //The default game.
    //client.user.setActivity(`${client.guilds.size} servers | ${settings.botPREFIX}help`, { type: settings.statusTYPE });

    // Cool interval loop for the bot's game.
    let statusArray = [
        `${settings.botPREFIX}help | Soon ~ maybe? | [162]`,
        `${settings.botPREFIX}help | You can not use me :c`,
        `${settings.botPREFIX}help | you will be able to use me soon! | [121]`,
        `${settings.botPREFIX}help | I can not help in the moment :c | [126]`,
        `${settings.botPREFIX}help | soon ~ [155]`,
        `${settings.botPREFIX}help | By : illusive! [ 143 ]`
    ];

    setInterval(function() {
        client.user.setActivity(`${statusArray[~~(Math.random() * statusArray.length)]}`, { type: settings.statusTYPE });
    }, 100000);
    
});

const Command = require('../Command');
const NekoLife = require('../../services/nekoLife');
const nekoLife = new NekoLife();
const RamMoe = require('../../services/ramMoe');
const ramMoe = new RamMoe();

const Embed = require('../../util/embed');
const Util = require('../../util/commonUtil');
const selfKiss = 'https://cdn.weeb.sh/images/H1tfQI7wZ.gif';

const info = {
    name: "kiss",
    aliases: [],
    description: "Kiss someone :3",
    runIn: ["text", "dm"],
    ownerOnly: false
}

class Kiss extends Command {
    constructor(client, module) {
		super(client, info, module);
	}

    run(msg, args) {
        var message, link;
        if (msg.mentions.members.size > 0) {
            if (msg.mentions.members.first().id == msg.author.id) {
                link = selfKiss;
                message = 'Dont be like that ;-;'
            } else if (msg.mentions.members.first().id == this.client.user.id) {
                message = `(´・ω・\`) *blushing*`;
            } else {
                message = `owo ${msg.author.toString()} kisses ${msg.mentions.members.first().toString()}. They are so cute`
            }
        } else {
            if (msg.author.id == this.client.user.id) {
                //self-bot wrong usage
                link = selfKiss;
            } else {
                message = `${this.client.user.toString()}.... kisses ${msg.author.toString()}... *run away*`
            }
        }
        link = link ? link : (Util.randomTrue() ? nekoLife.image('kiss') : ramMoe.image('kiss'));
        this.sendFromMessage(msg, {
            embed: Embed.create(link,
                msg.author.tag, message)
        });
    }
}

module.exports = Kiss;
  
client.login(process.env.BOT_TOKEN);
