let WhatsAlexa = require('../events');
let {MessageType} = require('@adiwajshing/baileys');
let Config = require('../config');
let Language = require('../language');
let Lang = Language.getString('tagall');

if (Config.WORKTYPE == 'private') {
  
    WhatsAlexa.addCommand({ pattern: 'scan ?(.*)', fromMe: true, desc: Lang.SCAN}, (async (message, match) => { 

        if (match[1] == '') return await message.client.sendMessage(message.jid, Lang.NO, MessageType.text, {contextInfo: { forwardingScore: 1000, isForwarded: true }, quoted: message.data })

        var exists = await message.client.isOnWhatsApp(match[1])
        if (exists) {
            await message.client.sendMessage(message.jid, '```' + match[1] + '``` \n' + Lang.SUC + '\n' + exists.jid, MessageType.text, {contextInfo: { forwardingScore: 1000, isForwarded: true }, quoted: message.data })
        }
        else {
            await message.client.sendMessage(message.jid,'```' + match[1] + '``` \n' + Lang.UNSUC, MessageType.text, {contextInfo: { forwardingScore: 1000, isForwarded: true }, quoted: message.data })
        }
    }));
}
else if (Config.WORKTYPE == 'public') {
  
    WhatsAlexa.addCommand({ pattern: 'scan ?(.*)', fromMe: false, desc: Lang.SCAN}, (async (message, match) => { 

        if (match[1] == '') return await message.client.sendMessage(message.jid, Lang.NO, MessageType.text, {contextInfo: { forwardingScore: 1000, isForwarded: true }, quoted: message.data })

        var exists = await message.client.isOnWhatsApp(match[1])
        if (exists) {
            await message.client.sendMessage(message.jid, '```' + match[1] + '``` \n' + Lang.SUC + '\n' + exists.jid, MessageType.text, {contextInfo: { forwardingScore: 1000, isForwarded: true }, quoted: message.data })
        }
        else {
            await message.client.sendMessage(message.jid,'```' + match[1] + '``` \n' + Lang.UNSUC, MessageType.text, {contextInfo: { forwardingScore: 1000, isForwarded: true }, quoted: message.data })
        }
    }));
}
