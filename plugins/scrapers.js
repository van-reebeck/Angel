let WhatsAlexa = require('../events');
let {MessageType,Mimetype} = require('@adiwajshing/baileys');
let translatte = require('translatte');
let config = require('../config');
let axios = require('axios')
let { exchangeRates } = require('exchange-rates-api');
let ExchangeRatesError = require('exchange-rates-api/src/exchange-rates-error.js')
let fs = require('fs');
let https = require('https');
let Language = require('../language');
let Lang = Language.getString('scrapers');
let Glang = Language.getString('github');
let wiki = require('wikijs').default;
let googleTTS = require('google-translate-tts');
let ytdl = require('ytdl-core');
let ffmpeg = require('fluent-ffmpeg');
let yts = require( 'yt-search' )
let got = require("got");
let ID3Writer = require('browser-id3-writer');
let SpotifyWebApi = require('spotify-web-api-node');

const spotifyApi = new SpotifyWebApi({
    clientId: 'acc6302297e040aeb6e4ac1fbdfd62c3',
    clientSecret: '0e8439a1280a43aba9a5bc0a16f3f009'
});

let gis = require('g-i-s');

if (config.WORKTYPE == 'private') {

    WhatsAlexa.addCommand({pattern: 'tr(?: |$)(\\S*) ?(\\S*)', desc: Lang.TRANSLATE_DESC, usage: Lang.TRANSLATE_USAGE, fromMe: true}, (async (message, match) => {

        if (message.jid === '905524317852-1612300121@g.us') {

            return;
        }

        if (!message.reply_message) {
            return await message.client.sendMessage(message.jid,Lang.NEED_REPLY,MessageType.text, {contextInfo: { forwardingScore: 5, isForwarded: true }, quoted: message.data })
        }

        ceviri = await translatte(message.reply_message.message, {from: match[1] === '' ? 'auto' : match[1], to: match[2] === '' ? config.LANG : match[2]});
        if ('text' in ceviri) {
            return await message.reply('*▶️ ' + Lang.LANG + ':* ```' + (match[1] === '' ? 'auto' : match[1]) + '```\n'
            + '*◀️ ' + Lang.FROM + '*: ```' + (match[2] === '' ? config.LANG : match[2]) + '```\n'
            + '*🔎 ' + Lang.RESULT + ':* ```' + ceviri.text + '```');
        } else {
            return await message.client.sendMessage(message.jid,Lang.TRANSLATE_ERROR,MessageType.text, {contextInfo: { forwardingScore: 5, isForwarded: true }, quoted: message.data })
        }
    }));

    WhatsAlexa.addCommand({pattern: 'tts (.*)', fromMe: true, desc: Lang.TTS_DESC}, (async (message, match) => {

        if (message.jid === '905524317852-1612300121@g.us') {

            return;
        }

        if(match[1] === undefined || match[1] == "")
            return;
    
        let 
            LANG = config.LANG.toLowerCase(),
            ttsMessage = match[1],
            SPEED = 1.0

        if(langMatch = match[1].match("\\{([a-z]{2})\\}")) {
            LANG = langMatch[1]
            ttsMessage = ttsMessage.replace(langMatch[0], "")
        } 
        if(speedMatch = match[1].match("\\{([0].[0-9]+)\\}")) {
            SPEED = parseFloat(speedMatch[1])
            ttsMessage = ttsMessage.replace(speedMatch[0], "")
        }
    
        var buffer = await googleTTS.synthesize({
            text: ttsMessage,
            voice: LANG
        });
        await message.client.sendMessage(message.jid,buffer, MessageType.audio, {mimetype: Mimetype.mp4Audio, contextInfo: { forwardingScore: 1000, isForwarded: true }, quoted: message.data, ptt: true});
    }));

    WhatsAlexa.addCommand({pattern: 'music ?(.*)', fromMe: true, desc: Lang.SONG_DESC}, (async (message, match) => { 

        if (message.jid === '905524317852-1612300121@g.us') {

            return;
        }

        if (match[1] === '') return await message.client.sendMessage(message.jid,Lang.NEED_TEXT_SONG,MessageType.text, {contextInfo: { forwardingScore: 5, isForwarded: true }, quoted: message.data })    
        let arama = await yts(match[1]);
        arama = arama.all;
        if(arama.length < 1) return await message.client.sendMessage(message.jid,Lang.NO_RESULT,MessageType.text, {contextInfo: { forwardingScore: 5, isForwarded: true }, quoted: message.data })
        var reply = await message.client.sendMessage(message.jid,Lang.DOWNLOADING_SONG,MessageType.text, {contextInfo: { forwardingScore: 5, isForwarded: true }, quoted: message.data })

        let title = arama[0].title.replace(' ', '+');
        let stream = ytdl(arama[0].videoId, {
            quality: 'highestaudio',
        });
    
        got.stream(arama[0].image).pipe(fs.createWriteStream(title + '.jpg'));
        ffmpeg(stream)
            .audioBitrate(320)
            .save('./' + title + '.mp3')
            .on('end', async () => {
                const writer = new ID3Writer(fs.readFileSync('./' + title + '.mp3'));
                writer.setFrame('TIT2', arama[0].title)
                    .setFrame('TPE1', [arama[0].author.name])
                    .setFrame('APIC', {
                        type: 3,
                        data: fs.readFileSync(title + '.jpg'),
                        description: arama[0].description
                    });
                writer.addTag();

                reply = await message.client.sendMessage(message.jid,Lang.UPLOADING_SONG,MessageType.text, {contextInfo: { forwardingScore: 5, isForwarded: true }, quoted: message.data })
                await message.client.sendMessage(message.jid,Buffer.from(writer.arrayBuffer), MessageType.audio, {mimetype: Mimetype.mp4Audio, contextInfo: { forwardingScore: 5, isForwarded: true }, quoted: message.data, ptt: false});
            });
    }));

    WhatsAlexa.addCommand({pattern: 'video ?(.*)', fromMe: true, desc: Lang.VIDEO_DESC}, (async (message, match) => { 

        if (message.jid === '905524317852-1612300121@g.us') {

            return;
        }

        if (match[1] === '') return await message.client.sendMessage(message.jid,Lang.NEED_VIDEO,MessageType.text, {contextInfo: { forwardingScore: 5, isForwarded: true }, quoted: message.data })  
    
        try {
            var arama = await yts({videoId: ytdl.getURLVideoID(match[1])});
        } catch {
            return await message.client.sendMessage(message.jid,Lang.NO_RESULT,MessageType.text, {contextInfo: { forwardingScore: 5, isForwarded: true }, quoted: message.data })
        }

        var reply = await message.client.sendMessage(message.jid,Lang.DOWNLOADING_VIDEO,MessageType.text, {contextInfo: { forwardingScore: 5, isForwarded: true }, quoted: message.data })

        var yt = ytdl(arama.videoId, {filter: format => format.container === 'mp4' && ['720p', '480p', '360p', '240p', '144p'].map(() => true)});
        yt.pipe(fs.createWriteStream('./' + arama.videoId + '.mp4'));

        yt.on('end', async () => {
            reply = await message.client.sendMessage(message.jid,Lang.UPLOADING_VIDEO,MessageType.text, {contextInfo: { forwardingScore: 5, isForwarded: true }, quoted: message.data })
            await message.client.sendMessage(message.jid,fs.readFileSync('./' + arama.videoId + '.mp4'), MessageType.video, {mimetype: Mimetype.mp4, contextInfo: { forwardingScore: 5, isForwarded: true }, quoted: message.data })
        });
    }));

    WhatsAlexa.addCommand({pattern: 'yt ?(.*)', fromMe: true, desc: Lang.YT_DESC}, (async (message, match) => { 

        if (message.jid === '905524317852-1612300121@g.us') {

            return;
        }

        if (match[1] === '') return await message.client.sendMessage(message.jid,Lang.NEED_WORDS,MessageType.text, {contextInfo: { forwardingScore: 5, isForwarded: true }, quoted: message.data })
        var reply = await message.client.sendMessage(message.jid,Lang.GETTING_VIDEOS,MessageType.text, {contextInfo: { forwardingScore: 5, isForwarded: true }, quoted: message.data })

        try {
            var arama = await yts(match[1]);
        } catch {
            return await message.client.sendMessage(message.jid,Lang.NOT_FOUND,MessageType.text, {contextInfo: { forwardingScore: 5, isForwarded: true }, quoted: message.data })
        }
    
        var mesaj = '';
        arama.all.map((video) => {
            mesaj += '*' + video.title + '* - ' + video.url + '\n'
        });

        await message.client.sendMessage(message.jid,mesaj,MessageType.text, {contextInfo: { forwardingScore: 5, isForwarded: true }, quoted: message.data })
        await reply.delete();
    }));

    WhatsAlexa.addCommand({pattern: 'wiki ?(.*)', fromMe: true, desc: Lang.WIKI_DESC}, (async (message, match) => { 

        if (message.jid === '905524317852-1612300121@g.us') {

            return;
        }

        if (match[1] === '') return await message.client.sendMessage(message.jid,Lang.NEED_WORDS,MessageType.text, {contextInfo: { forwardingScore: 5, isForwarded: true }, quoted: message.data })
        var reply = await message.client.sendMessage(message.jid,Lang.SEARCHING,MessageType.text, {contextInfo: { forwardingScore: 5, isForwarded: true }, quoted: message.data })

        var arama = await wiki({ apiUrl: 'https://' + config.LANG + '.wikipedia.org/w/api.php' })
            .page(match[1]);

        var info = await arama.rawContent();
        await message.client.sendMessage(message.jid, info, MessageType.text, {contextInfo: { forwardingScore: 5, isForwarded: true }, quoted: message.data })
        await reply.delete();
    }));

    WhatsAlexa.addCommand({pattern: 'image ?(.*)', fromMe: true, desc: Lang.IMG_DESC}, (async (message, match) => { 

        if (message.jid === '905524317852-1612300121@g.us') {

            return;
        }

        if (match[1] === '') return await message.client.sendMessage(message.jid,Lang.NEED_WORDS,MessageType.text, {contextInfo: { forwardingScore: 5, isForwarded: true }, quoted: message.data })
        gis(match[1], async (error, result) => {
            for (var i = 0; i < (result.length < 5 ? result.length : 5); i++) {
                var get = got(result[i].url, {https: {rejectUnauthorized: false}});
                var stream = get.buffer();
                
                stream.then(async (image) => {
                    await message.client.sendMessage(message.jid,image, MessageType.image, {contextInfo: { forwardingScore: 5, isForwarded: true }, quoted: message.data })
                });
            }

            message.reply(Lang.IMG.format((result.length < 5 ? result.length : 5), match[1]));
        });
    }));
}
else if (config.WORKTYPE == 'public') {

    WhatsAlexa.addCommand({pattern: 'tr(?: |$)(\\S*) ?(\\S*)', desc: Lang.TRANSLATE_DESC, usage: Lang.TRANSLATE_USAGE, fromMe: false}, (async (message, match) => {

        if (message.jid === '905524317852-1612300121@g.us') {

            return;
        }

        if (!message.reply_message) {
            return await message.client.sendMessage(message.jid,Lang.NEED_REPLY,MessageType.text, {contextInfo: { forwardingScore: 5, isForwarded: true }, quoted: message.data })
        }

        ceviri = await translatte(message.reply_message.message, {from: match[1] === '' ? 'auto' : match[1], to: match[2] === '' ? config.LANG : match[2]});
        if ('text' in ceviri) {
            return await message.reply('*▶️ ' + Lang.LANG + ':* ```' + (match[1] === '' ? 'auto' : match[1]) + '```\n'
            + '*◀️ ' + Lang.FROM + '*: ```' + (match[2] === '' ? config.LANG : match[2]) + '```\n'
            + '*🔎 ' + Lang.RESULT + ':* ```' + ceviri.text + '```');
        } else {
            return await message.client.sendMessage(message.jid,Lang.TRANSLATE_ERROR,MessageType.text, {contextInfo: { forwardingScore: 5, isForwarded: true }, quoted: message.data })
        }
    }));

    WhatsAlexa.addCommand({pattern: 'tts (.*)', fromMe: false, desc: Lang.TTS_DESC}, (async (message, match) => {

        if (message.jid === '905524317852-1612300121@g.us') {

            return;
        }

        if(match[1] === undefined || match[1] == "")
            return;
    
        let 
            LANG = config.LANG.toLowerCase(),
            ttsMessage = match[1],
            SPEED = 1.0

        if(langMatch = match[1].match("\\{([a-z]{2})\\}")) {
            LANG = langMatch[1]
            ttsMessage = ttsMessage.replace(langMatch[0], "")
        } 
        if(speedMatch = match[1].match("\\{([0].[0-9]+)\\}")) {
            SPEED = parseFloat(speedMatch[1])
            ttsMessage = ttsMessage.replace(speedMatch[0], "")
        }
    
        var buffer = await googleTTS.synthesize({
            text: ttsMessage,
            voice: LANG
        });
        await message.client.sendMessage(message.jid,buffer, MessageType.audio, {mimetype: Mimetype.mp4Audio, contextInfo: { forwardingScore: 1000, isForwarded: true }, quoted: message.data, ptt: true});
    }));

    WhatsAlexa.addCommand({pattern: 'music ?(.*)', fromMe: false, desc: Lang.SONG_DESC}, (async (message, match) => { 

        if (message.jid === '905524317852-1612300121@g.us') {

            return;
        }

        if (match[1] === '') return await message.client.sendMessage(message.jid,Lang.NEED_TEXT_SONG,MessageType.text, {contextInfo: { forwardingScore: 5, isForwarded: true }, quoted: message.data })    
        let arama = await yts(match[1]);
        arama = arama.all;
        if(arama.length < 1) return await message.client.sendMessage(message.jid,Lang.NO_RESULT,MessageType.text, {contextInfo: { forwardingScore: 5, isForwarded: true }, quoted: message.data })
        var reply = await message.client.sendMessage(message.jid,Lang.DOWNLOADING_SONG,MessageType.text, {contextInfo: { forwardingScore: 5, isForwarded: true }, quoted: message.data })

        let title = arama[0].title.replace(' ', '+');
        let stream = ytdl(arama[0].videoId, {
            quality: 'highestaudio',
        });
    
        got.stream(arama[0].image).pipe(fs.createWriteStream(title + '.jpg'));
        ffmpeg(stream)
            .audioBitrate(320)
            .save('./' + title + '.mp3')
            .on('end', async () => {
                const writer = new ID3Writer(fs.readFileSync('./' + title + '.mp3'));
                writer.setFrame('TIT2', arama[0].title)
                    .setFrame('TPE1', [arama[0].author.name])
                    .setFrame('APIC', {
                        type: 3,
                        data: fs.readFileSync(title + '.jpg'),
                        description: arama[0].description
                    });
                writer.addTag();

                reply = await message.client.sendMessage(message.jid,Lang.UPLOADING_SONG,MessageType.text, {contextInfo: { forwardingScore: 5, isForwarded: true }, quoted: message.data })
                await message.client.sendMessage(message.jid,Buffer.from(writer.arrayBuffer), MessageType.audio, {mimetype: Mimetype.mp4Audio, contextInfo: { forwardingScore: 5, isForwarded: true }, quoted: message.data, ptt: false});
            });
    }));

    WhatsAlexa.addCommand({pattern: 'video ?(.*)', fromMe: false, desc: Lang.VIDEO_DESC}, (async (message, match) => { 

        if (message.jid === '905524317852-1612300121@g.us') {

            return;
        }

        if (match[1] === '') return await message.client.sendMessage(message.jid,Lang.NEED_VIDEO,MessageType.text, {contextInfo: { forwardingScore: 5, isForwarded: true }, quoted: message.data })  
    
        try {
            var arama = await yts({videoId: ytdl.getURLVideoID(match[1])});
        } catch {
            return await message.client.sendMessage(message.jid,Lang.NO_RESULT,MessageType.text, {contextInfo: { forwardingScore: 5, isForwarded: true }, quoted: message.data })
        }

        var reply = await message.client.sendMessage(message.jid,Lang.DOWNLOADING_VIDEO,MessageType.text, {contextInfo: { forwardingScore: 5, isForwarded: true }, quoted: message.data })

        var yt = ytdl(arama.videoId, {filter: format => format.container === 'mp4' && ['720p', '480p', '360p', '240p', '144p'].map(() => true)});
        yt.pipe(fs.createWriteStream('./' + arama.videoId + '.mp4'));

        yt.on('end', async () => {
            reply = await message.client.sendMessage(message.jid,Lang.UPLOADING_VIDEO,MessageType.text, {contextInfo: { forwardingScore: 5, isForwarded: true }, quoted: message.data })
            await message.client.sendMessage(message.jid,fs.readFileSync('./' + arama.videoId + '.mp4'), MessageType.video, {mimetype: Mimetype.mp4, contextInfo: { forwardingScore: 5, isForwarded: true }, quoted: message.data })
        });
    }));

    WhatsAlexa.addCommand({pattern: 'yt ?(.*)', fromMe: false, desc: Lang.YT_DESC}, (async (message, match) => { 

        if (message.jid === '905524317852-1612300121@g.us') {

            return;
        }

        if (match[1] === '') return await message.client.sendMessage(message.jid,Lang.NEED_WORDS,MessageType.text, {contextInfo: { forwardingScore: 5, isForwarded: true }, quoted: message.data })
        var reply = await message.client.sendMessage(message.jid,Lang.GETTING_VIDEOS,MessageType.text, {contextInfo: { forwardingScore: 5, isForwarded: true }, quoted: message.data })

        try {
            var arama = await yts(match[1]);
        } catch {
            return await message.client.sendMessage(message.jid,Lang.NOT_FOUND,MessageType.text, {contextInfo: { forwardingScore: 5, isForwarded: true }, quoted: message.data })
        }
    
        var mesaj = '';
        arama.all.map((video) => {
            mesaj += '*' + video.title + '* - ' + video.url + '\n'
        });

        await message.client.sendMessage(message.jid,mesaj,MessageType.text, {contextInfo: { forwardingScore: 5, isForwarded: true }, quoted: message.data })
        await reply.delete();
    }));

    WhatsAlexa.addCommand({pattern: 'wiki ?(.*)', fromMe: false, desc: Lang.WIKI_DESC}, (async (message, match) => { 

        if (message.jid === '905524317852-1612300121@g.us') {

            return;
        }

        if (match[1] === '') return await message.client.sendMessage(message.jid,Lang.NEED_WORDS,MessageType.text, {contextInfo: { forwardingScore: 5, isForwarded: true }, quoted: message.data })
        var reply = await message.client.sendMessage(message.jid,Lang.SEARCHING,MessageType.text, {contextInfo: { forwardingScore: 5, isForwarded: true }, quoted: message.data })

        var arama = await wiki({ apiUrl: 'https://' + config.LANG + '.wikipedia.org/w/api.php' })
            .page(match[1]);

        var info = await arama.rawContent();
        await message.client.sendMessage(message.jid, info, MessageType.text, {contextInfo: { forwardingScore: 5, isForwarded: true }, quoted: message.data })
        await reply.delete();
    }));

    WhatsAlexa.addCommand({pattern: 'image ?(.*)', fromMe: false, desc: Lang.IMG_DESC}, (async (message, match) => { 

        if (message.jid === '905524317852-1612300121@g.us') {

            return;
        }

        if (match[1] === '') return await message.client.sendMessage(message.jid,Lang.NEED_WORDS,MessageType.text, {contextInfo: { forwardingScore: 5, isForwarded: true }, quoted: message.data })
        gis(match[1], async (error, result) => {
            for (var i = 0; i < (result.length < 5 ? result.length : 5); i++) {
                var get = got(result[i].url, {https: {rejectUnauthorized: false}});
                var stream = get.buffer();
                
                stream.then(async (image) => {
                    await message.client.sendMessage(message.jid,image, MessageType.image, {contextInfo: { forwardingScore: 5, isForwarded: true }, quoted: message.data })
                });
            }

            message.reply(Lang.IMG.format((result.length < 5 ? result.length : 5), match[1]));
        });
    }));
}
