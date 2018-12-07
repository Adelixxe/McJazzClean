const Discord = require("discord.js");
const ytdl = require("ytdl-core");
const client = new Discord.Client();

const clientOptions = { seek: 0, volume: 0.2 };

var isReady = true;
var isPaused = false;

client.on('ready', () => {
    client.user.setActivity('Jazz  @Adelixxe', { type: 'PLAYING' });
});

client.on('message', msg => {
    var voiceChannel = msg.member.voiceChannel;

    if (msg.content === "$start" && isReady === true && isPaused === false) {
        if (!voiceChannel) return msg.reply('Not in a voice channel.');
        isReady = false;
        voiceChannel.join()
            .then(connection => {
                const dispatcher = connection.playStream(ytdl('https://youtu.be/_sI_Ps7JSEk', { filter: 'audioonly' }), clientOptions);
                dispatcher.on('end', () => {
                    isReady = true;
                    voiceChannel.leave();
                });
        });
    }

    if (msg.content === "$leave" && (isReady === false || isPaused === true)) {
        if (!voiceChannel) return msg.reply('Not in a voice channel.');
        voiceChannel.leave();
        isReady = true;
        isPaused = false;
    }

    if (msg.content === "$pause" && isReady === false) {
        if (!voiceChannel) return msg.reply('Not in a voice channel.');
        voiceChannel.connection.dispatcher.pause();
        isReady = true;
        isPaused = true;
    }

    if (msg.content === "$resume" && isPaused === true) {
        if (!voiceChannel) return msg.reply('Not in a voice channel.');
        voiceChannel.connection.dispatcher.resume();
        isReady = false;
        isPaused === false;
    }


    if (msg.content === "$time" && isReady === false) {
        if (!voiceChannel) return msg.reply('Not in a voice channel.');
        msg.reply(msToTime(voiceChannel.connection.dispatcher.time));
    }

});

function msToTime(duration) {
    var milliseconds = parseInt((duration%1000)/100)
        , seconds = parseInt((duration/1000)%60)
        , minutes = parseInt((duration/(1000*60))%60)
        , hours = parseInt((duration/(1000*60*60))%24);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
}

client.login(process.env.BOT_TOKEN);
