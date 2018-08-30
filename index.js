const Discord = require("discord.js");
const ytdl = require("ytdl-core");
const client = new Discord.Client();

const clientOptions = { seek: 0, volume: 0.2 };

var isReady = true;
var isPaused = false;

var url =[
/*01*/  "https://youtu.be/vmDDOFXSgAs",
/*02*/  "https://youtu.be/iCwGQXJqu5s",
/*03*/  "https://youtu.be/sgn7VfXH2GY",
/*04*/  "https://youtu.be/sR13ECD71xU",
/*05  "https://youtu.be/HYwdiv7AOkY",
06  "https://youtu.be/ecrE80rnjhw",
07  "https://youtu.be/G4H9k-d9fBk",
08  "https://youtu.be/PoPL7BExSQU",
09  "https://youtu.be/KV0HX9sk_04",
10  "https://youtu.be/OCqZE6oBSsQ",
11  "https://youtu.be/8B1oIXGX0Io",
12  "https://youtu.be/7toKjKtbeeI",
13  "https://youtu.be/cb2w2m1JmCY",
14  "https://youtu.be/u_XHWIOJiKA",
15  "https://youtu.be/qJi03NqXfk8",
16  "https://youtu.be/YjRbmtrDJI4",
17  "https://youtu.be/k94zDsJ-JMU",
18  "https://youtu.be/qDHqLDxONR8",
19  "https://youtu.be/g-jsW61e_-w",
20  "https://youtu.be/_ooeMXnPuIg",
21  "https://youtu.be/t2kdBtSVCig",
22  "https://youtu.be/W3FLd1eBmTU",
23  "https://youtu.be/3XvJFW0DHbU",
24  "https://youtu.be/TeqqhebRzTc",
25  "https://youtu.be/UTORd2Y_X6U",
26  "https://youtu.be/QTMqes6HDqU",
27  "https://youtu.be/OBWr_cjBDhU",
28  "https://youtu.be/GrK4HEfkl7U",
29  "https://youtu.be/Otzyz_9RSKk",
30  "https://youtu.be/RJEjFh2FOzA",
31  "https://youtu.be/3rge_DbPxx8",
32  "https://youtu.be/rMTlthu5V0g",
33  "https://youtu.be/-yg7aZpIXRI",
34  "https://youtu.be/ZAkv0nZ9GTw",
35  "https://youtu.be/RUVryuEdpak",
36  "https://youtu.be/t4HXWcUMRnE",
37  "https://youtu.be/Wt3D5uzN7wU",
38  "https://youtu.be/VGB5U5nW3fw",
39  "https://youtu.be/U7eOs5lERww",
40  "https://youtu.be/GDS_nqHaUvc",
41  "https://youtu.be/q7X2X7LDFok",
42  "https://youtu.be/83hpBgrNiFY",
43  "https://youtu.be/lBnwDTAoAC8",
44  "https://youtu.be/2DCpApGVXWg",
45  "https://youtu.be/AteiC_TPwoI",
46  "https://youtu.be/M93W8uFrcQA",
47  "https://youtu.be/HYwdiv7AOkY",
48  "https://youtu.be/exPeEvdSxf8",
49  "https://youtu.be/7tnPkQufnZY",
50  "https://youtu.be/8vJ2VuKb1fQ",
51  "https://youtu.be/0nI-n6fCKWs",
52  "https://youtu.be/6BBzO-vferY",
53  "https://youtu.be/Mg4eOHc3Rpg",
54  "https://youtu.be/OJzQis4jOrM",
55  "https://youtu.be/hwmRQ0PBtXU",
56  "https://youtu.be/8urhUop-ouI",
57  "https://youtu.be/haVlcMsRIHE",
58  "https://youtu.be/haVlcMsRIHE",
59  "https://youtu.be/szU0DbdAMEA",
60  "https://youtu.be/UA2XIWZxMKM",
61  "https://youtu.be/2ybTybmIo8w",
62  "https://youtu.be/-cRl1CxwKjw",
63  "https://youtu.be/J0FcKOfRgvE",
64  "https://youtu.be/DHTrHER5YlM"*/
];

client.on('ready', () => {
    client.user.setActivity('Jazz', { type: 'PLAYING' });
});

client.on('message', msg => {
    var voiceChannel = msg.member.voiceChannel;

    if (msg.content === "$start" && isReady === true && isPaused === false) {
        if (!voiceChannel) return msg.reply('Not in a voice channel.');
        isReady = false;
        voiceChannel.join()
            .then(connection => {
                const dispatcher = connection.playStream(ytdl(url, { filter: 'audioonly' }), clientOptions);
                dispatcher.on('end', () => {
                   
                });
        });
        /*function music () {
            const dispatcher = connection.playStream(ytdl(url, { filter: 'audioonly' }), clientOptions);
            dispatcher.on('end', () => {
                music();
             });*/
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
