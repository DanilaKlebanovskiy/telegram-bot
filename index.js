const {gameOptions, againOptions} = require('./options')
const TelegramApi = require('node-telegram-bot-api')//импорт покета
//node_mon автоматическая перезагрузка сервера при изменении
const token = '1848404192:AAGKWU9FSljuHEHJFPJh2ldjFimvzUWA10M'
const bot = new TelegramApi(token, {polling: true})
const chats = {}



let startGame = async (Chatid) => {
    await bot.sendMessage(Chatid, "Сейчас я загадаю цифру ты отгадываешь")
    const randomeNumber = Math.floor(Math.random()*10)
    chats[Chatid]= randomeNumber;
    await bot.sendMessage(Chatid, "Отгадай", gameOptions)
}

let start = () => {
    bot.setMyCommands([{command: '/start', description: 'приветствие'},
        {command: '/info', description: 'описание'},
        {command: '/game', description: 'игра'}])
    bot.on('message', async msg => {
        const text = msg.text
        const Chatid = msg.chat.id
        const name = msg.chat.first_name

        if (text === "/start") {
            await bot.sendMessage(Chatid, `Привет друг`)
            return  bot.sendSticker(Chatid, 'https://tlgrm.ru/_/stickers/8d7/6f1/8d76f159-6795-37fd-8c64-04e195af9c61/43.webp')

        }
        if (text === "/info") {
            return  bot.sendMessage(Chatid, `Я начинающий веб разработчик, меня зовут Данила, а тебя ${name} ?`)
        }
        if (text === "/game"){
           return startGame(Chatid)
        }
        if (text ==="/sobaka"){
            return bot.sendMessage(Chatid, "пкшд")
        }

        return bot.sendMessage(Chatid, `${name} я вас не понимаю`)
    })



    bot.on('callback_query', async msg => {
        const data = msg.data
        const Chatid= msg.message.chat.id
        if (data === "/again"){
            return startGame(Chatid)
        }
        if(data == chats[Chatid]){
            console.log(data, chats[Chatid])
            return  bot.sendMessage(Chatid, `Ты угадал бот загадал цифру ${chats[Chatid]}`,againOptions)
        }else{
            console.log(data,chats[Chatid])
            return  bot.sendMessage(Chatid, `Ты не угадал бот загадал цифру ${chats[Chatid]}`,againOptions)
        }
    })
}

start()