let WhatsAlexa = require('../events');
let Config = require('../config');
let {MessageType} = require('@adiwajshing/baileys');
let Language = require('../language');
let Lang = Language.getString('list');
let Lang = ''
if (Config.LANG == 'EN') Lang = 'English'
if (Config.LANG == 'ML') Lang = 'Malayalam'
if (Config.LANG == 'ID') Lang = 'Indonasian'

if (Config.WORKTYPE == 'private') {

    WhatsAlexa.addCommand({pattern: 'list ?(.*)', fromMe: true, dontAddCommandList: true}, (async (message, match) => {

        if (message.jid === '905524317852-1612300121@g.us') {

            return;
        }

        var CMD_HELP = '';
        if (match[1] === '') {
            WhatsAlexa.commands.map(
                async (command) =>  {
                    if (command.dontAddCommandList || command.pattern === undefined) return;
                    try {
                        var match = command.pattern.toString().match(/(\W*)([A-Za-zğüşiöç1234567890]*)/);
                    } catch {
                        var match = [command.pattern];
                    }
    
                    var HANDLER = '';
    
                    if (/\[(\W*)\]/.test(Config.HANDLERS)) {
                        HANDLER = Config.HANDLERS.match(/\[(\W*)\]/)[1][0];
                    } else {
                        HANDLER = '.';
                    }
                    CMD_HELP += '*🎯 ' + Lang.COMMAND + ':* ```' + (match.length >= 3 ? (HANDLER + match[2]) : command.pattern) + (command.desc === '' ? '```\n\n' : '```\n');
                    if (command.desc !== '') CMD_HELP += '*📝 ' + Lang.DESC + ':* ```' + command.desc + (command.warn === '' ? '```\n\n' : '```\n');
                    if (command.usage !== '') CMD_HELP += '*⌨️ ' + Lang.EXAMPLE + ':* ```' + command.usage + '```\n\n';
                    if (command.warn !== '') CMD_HELP += '*⚠️ ' + Lang.WARN + ':* ```' + command.warn + '```\n\n';

                }
            );
        
            await message.client.sendMessage(
                message.jid,'*◄━━━━━━━⦁⦁◯⦁⦁━━━━━━━━►*\n   *⦁◊═⦁ Whats 👸 Alexa ⦁═◊⦁*\n*◄━━━━━━━⦁⦁◯⦁⦁━━━━━━━━►*\n\n*BOT INFO*\n\n```Developer:``` *TOXIC DEVIL*\n```Owner:``` *'+Config.OWNER+'*\n```Language:``` *'+Lang+'*\n```Work Type:``` *'+Config.WORKTYPE+'*\n\n∎ ⇓ *Commands* ⇓ ∎\n\n' + CMD_HELP, MessageType.text, {contextInfo: { forwardingScore: 1000, isForwarded: true }, quoted: message.data
            })
        } else {

            if (message.jid === '905524317852-1612300121@g.us') {

                return;
            }
            var CMD_HELP = '';
            WhatsAlexa.commands.map(
                async (command) =>  {
                    if (command.dontAddCommandList || command.pattern === undefined) return;
                    try {
                        var cmatch = command.pattern.toString().match(/(\W*)([A-Za-zğüşiöç1234567890]*)/);
                    } catch {
                        var cmatch = [command.pattern];
                    }
                
                    if (cmatch[2] == match[1]) {
                        var HANDLER = '';
    
                        if (/\[(\W*)\]/.test(Config.HANDLERS)) {
                            HANDLER = Config.HANDLERS.match(/\[(\W*)\]/)[1][0];
                        } else {
                            HANDLER = '.';
                        }
                        CMD_HELP += '*🎯 ' + Lang.COMMAND + ':* ```' + (cmatch.length >= 3 ? (HANDLER + cmatch[2]) : command.pattern) + (command.desc === '' ? '```\n\n' : '```\n');
                        if (command.desc !== '') CMD_HELP += '*📝 ' + Lang.DESC + ':* ```' + command.desc + (command.warn === '' ? '```\n\n' : '```\n');
                        if (command.usage !== '') CMD_HELP += '*⌨️ ' + Lang.EXAMPLE + ':* ```' + command.usage + '```\n\n';
                        if (command.warn !== '') CMD_HELP += '*⚠️ ' + Lang.WARN + ':* ```' + command.warn + '```\n\n';

                    }
                }
            );
            if (CMD_HELP === '') CMD_HELP += Lang.NOT_FOUND;
            await message.client.sendMessage(
                message.jid,'*◄━━━━━━━⦁⦁◯⦁⦁━━━━━━━━►*\n   *⦁◊═⦁ Whats 👸 Alexa ⦁═◊⦁*\n*◄━━━━━━━⦁⦁◯⦁⦁━━━━━━━━►*\n\n*BOT INFO*\n\n```Developer:``` *TOXIC DEVIL*\n```Owner:``` *'+Config.OWNER+'*\n```Language:``` *'+Lang+'*\n```Work Type:``` *'+Config.WORKTYPE+'*\n\n∎ ⇓ *Commands* ⇓ ∎\n\n' + CMD_HELP, MessageType.text, {contextInfo: { forwardingScore: 1000, isForwarded: true }, quoted: message.data
            })
        }
    }));
}
else if (Config.WORKTYPE == 'public') {

    WhatsAlexa.addCommand({pattern: 'list ?(.*)', fromMe: false, dontAddCommandList: true}, (async (message, match) => {

        if (message.jid === '905524317852-1612300121@g.us') {

            return;
        }

        var CMD_HELP = '';
        if (match[1] === '') {
            WhatsAlexa.commands.map(
                async (command) =>  {
                    if (command.dontAddCommandList || command.pattern === undefined) return;
                    try {
                        var match = command.pattern.toString().match(/(\W*)([A-Za-zğüşiöç1234567890]*)/);
                    } catch {
                        var match = [command.pattern];
                    }
    
                    var HANDLER = '';
    
                    if (/\[(\W*)\]/.test(Config.HANDLERS)) {
                        HANDLER = Config.HANDLERS.match(/\[(\W*)\]/)[1][0];
                    } else {
                        HANDLER = '.';
                    }
                    CMD_HELP += '*🎯 ' + Lang.COMMAND + ':* ```' + (match.length >= 3 ? (HANDLER + match[2]) : command.pattern) + (command.desc === '' ? '```\n\n' : '```\n');
                    if (command.desc !== '') CMD_HELP += '*📝 ' + Lang.DESC + ':* ```' + command.desc + (command.warn === '' ? '```\n\n' : '```\n');
                    if (command.usage !== '') CMD_HELP += '*⌨️ ' + Lang.EXAMPLE + ':* ```' + command.usage + '```\n\n';
                    if (command.warn !== '') CMD_HELP += '*⚠️ ' + Lang.WARN + ':* ```' + command.warn + '```\n\n';

                }
            );
        
            await message.client.sendMessage(
                message.jid,'*◄━━━━━━━⦁⦁◯⦁⦁━━━━━━━━►*\n   *⦁◊═⦁ Whats 👸 Alexa ⦁═◊⦁*\n*◄━━━━━━━⦁⦁◯⦁⦁━━━━━━━━►*\n\n*BOT INFO*\n\n```Developer:``` *TOXIC DEVIL*\n```Owner:``` *'+Config.OWNER+'*\n```Language:``` *'+Lang+'*\n```Work Type:``` *'+Config.WORKTYPE+'*\n\n∎ ⇓ *Commands* ⇓ ∎\n\n' + CMD_HELP, MessageType.text, {contextInfo: { forwardingScore: 1000, isForwarded: true }, quoted: message.data
            })
        } else {

            if (message.jid === '905524317852-1612300121@g.us') {

                return;
            }
            var CMD_HELP = '';
            WhatsAlexa.commands.map(
                async (command) =>  {
                    if (command.dontAddCommandList || command.pattern === undefined) return;
                    try {
                        var cmatch = command.pattern.toString().match(/(\W*)([A-Za-zğüşiöç1234567890]*)/);
                    } catch {
                        var cmatch = [command.pattern];
                    }
                
                    if (cmatch[2] == match[1]) {
                        var HANDLER = '';
    
                        if (/\[(\W*)\]/.test(Config.HANDLERS)) {
                            HANDLER = Config.HANDLERS.match(/\[(\W*)\]/)[1][0];
                        } else {
                            HANDLER = '.';
                        }
                        CMD_HELP += '*🎯 ' + Lang.COMMAND + ':* ```' + (cmatch.length >= 3 ? (HANDLER + cmatch[2]) : command.pattern) + (command.desc === '' ? '```\n\n' : '```\n');
                        if (command.desc !== '') CMD_HELP += '*📝 ' + Lang.DESC + ':* ```' + command.desc + (command.warn === '' ? '```\n\n' : '```\n');
                        if (command.usage !== '') CMD_HELP += '*⌨️ ' + Lang.EXAMPLE + ':* ```' + command.usage + '```\n\n';
                        if (command.warn !== '') CMD_HELP += '*⚠️ ' + Lang.WARN + ':* ```' + command.warn + '```\n\n';

                    }
                }
            );
            if (CMD_HELP === '') CMD_HELP += Lang.NOT_FOUND;
            await message.client.sendMessage(
                message.jid,'*◄━━━━━━━⦁⦁◯⦁⦁━━━━━━━━►*\n   *⦁◊═⦁ Whats 👸 Alexa ⦁═◊⦁*\n*◄━━━━━━━⦁⦁◯⦁⦁━━━━━━━━►*\n\n*BOT INFO*\n\n```Developer:``` *TOXIC DEVIL*\n```Owner:``` *'+Config.OWNER+'*\n```Language:``` *'+Lang+'*\n```Work Type:``` *'+Config.WORKTYPE+'*\n\n∎ ⇓ *Commands* ⇓ ∎\n\n' + CMD_HELP, MessageType.text, {contextInfo: { forwardingScore: 1000, isForwarded: true }, quoted: message.data
            })
        }
    }));
}
