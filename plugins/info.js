/* let WhatsAlexa = require('../events');
let {MessageType,Mimetype} = require('@adiwajshing/baileys');
let fs = require('fs');
let ffmpeg = require('fluent-ffmpeg');
let {execFile} = require('child_process');
let cwebp = require('cwebp-bin');
let Config = require('../config');
let Language = require('../language');
let Lang = Language.getString('ai');

if (Config.WORKTYPE == 'private') {

    WhatsAlexa.addCommand({pattern: 'info', fromMe: true, desc: Lang.INFO_BOT}, (async (message, match) => {    
      
    let pp = await message.client.getProfilePicture()
    let buff = await axios.get(pp, {responseType: 'arraybuffer'})
    
    let status
    try { status = await message.client.getStatus() } catch { status = if (status.includes('Auto Bio By WhatsAlexa')) return status = '*Auto Bio Feature is Enabled as Bio!*'
      
    let name = await message.client.getName() 
    let auto_bio = Config.AUTOBIO == 'true' ? 'on' : 'off'
    let full_alexa = Config.FULLALEXA == 'true' ? 'on' : 'off'
    
    let caption = `『 WhatsAlexa Info 』\n\nName: WhatsAlexa ( ${name} )\nStatus: ${status.status}\n\nGit: ${Config.GIT}\nBranch: ${Config.BRANCH}\nDeveloper & Author: ${Config.DEVELOPER}\nOwner: ${Config.OWNER}\n\n『 WhatsAlexa Settings 』\n\nWork Type: ${Config.WORKTYPE}\nBot Presence: ${Config.BOT_PRESENCE}\nLanguage: ${Config.LANG}\nFull Alexa: ${full_alexa}\nAuto Bio: ${auto_bio}`
    
    await message.client.sendMessage(message.jid, buff, MessageType.image, {mimetype: Mimetype.png, contextInfo: { forwardingScore: 1000, isForwarded: true }, quoted: message.data, caption: caption })
        
    }));
}
else if (Config.WORKTYPE == 'public') {      
                          
    WhatsAlexa.addCommand({pattern: 'info', fromMe: false, desc: Lang.INFO_BOT}, (async (message, match) => {    
      
    let pp = await message.client.getProfilePicture()
    let buff = await axios.get(pp, {responseType: 'arraybuffer'})
    
    let status
    try { status = await message.client.getStatus() } catch { status = if (status.includes('Auto Bio By WhatsAlexa')) return status = '*Auto Bio Feature is Enabled as Bio!*'
      
    let name = await message.client.getName() 
    let auto_bio = Config.AUTOBIO == 'true' ? 'on' : 'off'
    let full_alexa = Config.FULLALEXA == 'true' ? 'on' : 'off'
    
    let caption = `*『 WhatsAlexa Info 』*\n\n*💫 Name:* WhatsAlexa ( ${name} )\n*💬 Status:* ${status.status}\n\n*💠 Git:* ${Config.GIT}\n*💮 Branch:* ${Config.BRANCH}\n*🥇 Developer & Author:* ${Config.DEVELOPER}\n*🥉Owner:* ${Config.OWNER}\n\n*『 WhatsAlexa Settings 』*\n\n*💿 Work Type:* ${Config.WORKTYPE}\n*🎲 Bot Presence:* ${Config.BOT_PRESENCE}\n*🔊 Language:* ${Config.LANG}\n*🧩 Full Alexa:* ${full_alexa}\n*🔄 Auto Bio:* ${auto_bio}`
    
    await message.client.sendMessage(message.jid, buff, MessageType.image, {mimetype: Mimetype.png, contextInfo: { forwardingScore: 1000, isForwarded: true }, quoted: message.data, caption: caption })
        
    }));
} */
