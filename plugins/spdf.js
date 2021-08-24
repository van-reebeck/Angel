let WhatsAlexa = require('../events');
let {MessageType, MessageOptions, Mimetype} = require('@adiwajshing/baileys');
let fs = require('fs');
let axios = require('axios');
let request = require('request');
let got = require("got");
let Config = require('../config');
let Language = require('../language');
let Lang = Language.getString('unvoice');

if (Config.WORKTYPE == 'private') {

    WhatsAlexa.addCommand({pattern: 'spdf ?(.*)', fromMe: true, desc: Lang.SPDF_DESC }, (async (message, match) => {

    if (match[1] === '') return await message.client.sendMessage(message.jid, Lang.SPDF_LINK, MessageType.text, {contextInfo: { forwardingScore: 1000, isForwarded: true }, quoted: message.data })

    var webimage = await axios.get(`https://api.html2pdf.app/v1/generate?url=${match[1]}&apiKey=begC4dFAup1b8LyRXxAfjetfqDg2uYx8PWmh9YJ59tTZXiUyh2Vs72HdYQB68vyc`, { responseType: 'arraybuffer' })

    await message.client.sendMessage(message.jid, Lang.SPDF_PROC, MessageType.text, {contextInfo: { forwardingScore: 1000, isForwarded: true }, quoted: message.data })

    await message.sendMessage(Buffer.from(webimage.data), MessageType.document, {mimetype: Mimetype.pdf, contextInfo: { forwardingScore: 1000, isForwarded: true }, quoted: message.data, filename: 'WhatsAlexa-Site-To-PDF-Feature-Made-By-Toxic-Devil.pdf'})

    }));  
}
else if (Config.WORKTYPE == 'public') {

    WhatsAlexa.addCommand({pattern: 'spdf ?(.*)', fromMe: false, desc: Lang.SPDF_DESC }, (async (message, match) => {

    if (match[1] === '') return await message.sendMessage(message.jid, Lang.SPDF_LINK, MessageType.text, {contextInfo: { forwardingScore: 1000, isForwarded: true }, quoted: message.data })

    var webimage = await axios.get(`https://api.html2pdf.app/v1/generate?url=${match[1]}&apiKey=begC4dFAup1b8LyRXxAfjetfqDg2uYx8PWmh9YJ59tTZXiUyh2Vs72HdYQB68vyc`, { responseType: 'arraybuffer' })

    await message.sendMessage(message.jid, Lang.SPDF_PROC, MessageType.text, {contextInfo: { forwardingScore: 1000, isForwarded: true }, quoted: message.data })

    await message.sendMessage(Buffer.from(webimage.data), MessageType.document, {mimetype: Mimetype.pdf, contextInfo: { forwardingScore: 1000, isForwarded: true }, quoted: message.data, filename: 'WhatsAlexa-Site-To-PDF-Feature-Made-By-Toxic-Devil.pdf'})

    }));   
}
