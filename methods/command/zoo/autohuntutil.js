const macro = require('../../../../tokens/macro.js');
const traits= {"efficiency":{"inc":10,"pow":1.748,"base":25,"upg":1,"max":215,"prefix":"/H"},
		"duration":{"inc":10,"pow":1.7,"base":.5,"upg":.1,"max":235,"prefix":"H"},
		"cost":{"inc":1000,"pow":3.4,"base":10,"upg":-1,"max":5,"prefix":" cowoncy"},
		"gain":{"inc":10,"pow":1.8,"base":0,"upg":25,"max":200,"prefix":" essence/H"},
		"exp":{"inc":10,"pow":1.8,"base":0,"upg":35,"max":200,"prefix":" xp/H"}};
const bots = ["<:cbot:459996048379609098>","<:ubot:459996048660889600>","<:rbot:459996049361338379>","<:ebot:459996050174902272>","<:mbot:459996049784963073>","<a:lbot:459996050883608576>"];
//test(traits.efficiency);
//test(traits.duration);
//test(traits.cost);
//test(traits.exp);
//test(traits.gain);

exports.getLvl = function(xp,gain,trait){
	totalxp = 0;
	var temp = {};
	var hit = false;
	var prevlvl = 0;
	trait = traits[trait];

	for(var i=1;i<=trait.max+1;i++){
		var lvlxp = Math.trunc(trait.inc*Math.pow(i,trait.pow));
		totalxp += lvlxp;
		if(!hit&&totalxp>xp){
			prevlvl = i-1;
			hit = true;
		}
		if(hit||i==trait.max+1){
			if(totalxp>xp+gain||i==trait.max+1){
				temp.lvl = i-1;
				if(temp.lvl==trait.max)
					temp.max= true;
				temp.currentxp = (xp+gain) - (totalxp - lvlxp);
				temp.maxxp = lvlxp;
				if(prevlvl<temp.lvl){
					temp.lvlup = true;
					temp.gain = trait.upg;
				}
				temp.stat = trait.base + (trait.upg*temp.lvl);
				temp.stat = Math.trunc(temp.stat*10)/10;
				temp.prefix = trait.prefix;
				return temp;
			}
		}
	}
}

exports.getMaxXp = function(lvl,trait){
	return Math.trunc(traits[trait].inc*Math.pow(lvl,trait.pow));
}

function test(trait){
	var total = 0;
	var result = trait.base;
	for(var i=1;i<=trait.max;i++){
		var xp = Math.trunc(trait.inc*Math.pow(i,trait.pow));
		total += xp;
		result += trait.upg;
		console.log("["+i+"] "+total +" | "+xp+"xp - "+result+trait.prefix);
	}
}

exports.captcha = function(msg,word,text){
	macro.generateBuffer(word,function(buffer){
		msg.channel.send(text,buffer);
	});
}

exports.getBot = function(result){
	if(result==undefined) return bots[0];

	var rank = result.rank;
	var total = result.total;
	if(rank==undefined||total==undefined) return bots[0];
	if(rank<=1) return bots[5];

	var percent = (rank/total)*100;

	if(percent>=61) // Common 39%
		return bots[0];
	else if(percent>=31) // Uncommon 30%
		return bots[1];
	else if(percent>=11) // Rare 20%
		return bots[2];
	else if(percent>=1) // Epic 10%
		return bots[3];
	else // Mythic 1%
		return bots[4];
}
