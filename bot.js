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
    var guildMSG = guild.channels.find('name', 'chat');

    if (guildMSG) {
        guildMSG.send(`
**Thank You For Add Me In Your Server ! **
**For more info type** \`${settings.botPREFIX}help\`!\n\ `);
    } else {
        return;
    }
});

// Message function
client.on("message", async message => {
    if (message.author.equals(client.user)) return;

    if (!message.content.startsWith(settings.botPREFIX)) return;

    if (message.author.bot) return;

    const logsCommands = client.channels.get(settings.logsChannelID);

    //Disables commands in a private chat
    if  (message.channel.type == "dm") {
        console.log(`${message.author.tag} tried to use a command in DM!`);
    }
    
       //Users blacklist
    if (message.author.id == "") {
        console.log(`[BlackList] ${message.author.tag} tried to use a command!`);
        return logsCommands.send(`[BlackList] ${message.author.tag} tried to use a command!`);
    }

    //Channels blacklist
    if (message.channel.id == "") return;

    //Servers blacklist
    if (message.guild.id == "") return;

    var args = message.content.substring(settings.botPREFIX.length).split(" ");
 
client.login(process.env.BOT_TOKEN);
