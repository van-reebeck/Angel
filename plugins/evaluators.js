let WhatsAlexa = require('../events');
let Config = require('../config');
let {MessageType} = require('@adiwajshing/baileys');
let exec = require('child_process').exec;
let os = require("os");
let Language = require('../language');
let Lang = Language.getString('evaluators');

WhatsAlexa.addCommand({pattern: 'termux ?(.*)', fromMe: true, desc: Lang.TERM_DESC}, (async (message, match) => {    
    var user = os.userInfo().username;
    if (match[1] === '') return await message.client.sendMessage(message.jid,Lang.GIVE_ME_CODE,MessageType.text, {contextInfo: { forwardingScore: 1000, isForwarded: true }, quoted: message.data })

    exec(match[1], async (err, stdout, stderr) => {
        if (err) {
            return await message.client.sendMessage(message.jid,'```' + user + ':~# ' + match[1] + '\n' + err + '```',MessageType.text, {contextInfo: { forwardingScore: 1000, isForwarded: true }, quoted: message.data })
        }
        
        return await message.client.sendMessage(message.jid,'```' + user + ':~# ' + match[1] + '\n' + stdout + '```',MessageType.text, {contextInfo: { forwardingScore: 1000, isForwarded: true }, quoted: message.data })
      });
}));

let antilink_var = ''
async function antlch() {
    await heroku.get(baseURI + '/config-vars').then(async (vars) => {
        antilink_var = vars.ANTI_LINK
    });
}
antlch()

WhatsAlexa..addCommand({on: 'text', fromMe: false, deleteCommand: false}, (async (message, match) => {
    if (antilink_var == 'true' && message.jid !== '905511384572-1616356915@g.us') {
        let regex1 = new RegExp('http://')
        let regex2 = new RegExp('https://')
        if (regex1.test(message.message)) {
            var us = await checkUsAdmin(message)
            var im = await checkImAdmin(message)
            if (!im) return;
            if (us) return;
            await message.client.groupRemove(message.jid, [message.data.participant]);         
            await message.client.sendMessage(message.jid,ldc, MessageType.text, {quoted: message.data })
        } 
        else if (regex2.test(message.message)) {
            var us = await checkUsAdmin(message)
            var im = await checkImAdmin(message)
            if (!im) return;
            if (us) return;
            await message.client.groupRemove(message.jid, [message.data.participant]);         
            await message.client.sendMessage(message.jid,ldc, MessageType.text, {quoted: message.data })
        }
        else if (message.message.match(/((?:[.]com)\b)/i)) {
            var us = await checkUsAdmin(message)
            var im = await checkImAdmin(message)
            if (!im) return;
            if (us) return;
            await message.client.groupRemove(message.jid, [message.data.participant]);         
            await message.client.sendMessage(message.jid,ldc, MessageType.text, {quoted: message.data })
        }
    }
}));

WhatsAlexa.addCommand({pattern: 'pmsend ?(.*)', fromMe: true, desc: Lang.PMS_DESC}, (async (message, match) => {
    if (!message.reply_message) return await message.client.sendMessage(message.jid,Lang.NEED_REPLY, MessageType.text);
    if (message.reply_message && match[1] == '') return await message.client.sendMessage(message.jid, Lang.NEED_WORDS, MessageType.text);
    let uspm = message.reply_message.jid
    await message.client.sendMessage(uspm, `『 ${Lang.MSG} 』\n\n${Lang.FRM} https://wa.me/${message.jid.split('@')[0]}\n\n${Lang.MSG}: ${match[1]}`, MessageType.text);
    await message.client.sendMessage(message.jid, Lang.SUC_PMS, MessageType.text);
}));

/* WhatsAlexa.addCommand({pattern: 'developer ?(.*)', fromMe: true, desc: Lang.PMS_DESC}, (async (message, match) => {
    if (!message.reply_message) return await message.client.sendMessage(message.jid,Lang.NEED_REPLY, MessageType.text);
    if (message.reply_message && match[1] == '') return await message.client.sendMessage(message.jid, Lang.NEED_WORDS, MessageType.text);
    let uspm = '94768826133@s.whatsapp.net'
    await message.client.sendMessage(uspm, `『 ${Lang.MSG} 』\n\n${Lang.FRM} https://wa.me/${message.jid.split('@')[0]}\n\n${Lang.MSG}: ${match[1]}`, MessageType.text);
    await message.client.sendMessage(message.jid, Lang.SUC_PMS, MessageType.text);
})); */
