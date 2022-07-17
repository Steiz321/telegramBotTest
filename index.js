const telegramApi = require('node-telegram-bot-api');
const {gameOptions, againOptions} = require('./options');

const token = '5554355959:AAE-Zkp7NkjO8WXhqWZQfi-86V2SMwTM85Y';

const bot = new telegramApi(token, {polling: true});

const chats = {};


const startGame = async (chatId) => {
    await bot.sendMessage(chatId, 'Ну шо голова, попробуй угадать число от 0 до 9. Я загадываю...');
    const randomNumber = Math.floor(Math.random() * 10);
    chats[chatId] = randomNumber;
    await bot.sendMessage(chatId, 'Ну давай, я загадал, отгадывай', gameOptions);
}

const start = () => {
    bot.setMyCommands([
        {command: '/start', description: 'Начать юзать меф'},
        {command: '/info', description: 'Інфа про спермо-шлюху'},
        {command: '/game', description: 'Сыграть в игру на душу матери'}
    ])
    
    bot.on('message', async msg => {
        const text = msg.text;
        const chatId = msg.chat.id;
        if(text === '/start') {
           await bot.sendDocument(chatId, './img/doc_2022-07-16_22-53-05.mp4');
           await bot.sendAudio(chatId, './audio/Элвин_и_Бурундуки_Вставай_Донбасс.mp3');
           return bot.sendMessage(chatId, 'Добро пожаловтаь в моего бота, здесь вы можете отсосай мой член!');
        }
        if(text === '/info') {
           return bot.sendMessage(chatId, `Тебя зовут ${msg.from.first_name}!`)
        }
        if(text === '/game') {
            return startGame(chatId);
        }
        return bot.sendMessage(chatId, 'Слышишь ты, ебучий мякиш, не неси хуйни!');
    });

    bot.on('callback_query', async msg => {
        const data = msg.data;
        const chatId = msg.message.chat.id;
        if(data === '/again') {
            return startGame(chatId);
        }
        
        if(data == chats[chatId]) {
            return bot.sendMessage(chatId, `Фраерок, а ты циферку ${chats[chatId]} то угадал, неплох, будем с тобой иметь дело`, againOptions);
        } else {
            return bot.sendMessage(chatId, `Да ты рил долбоебка, даже цифру не можешь отгадать, я загадал цифру ${chats[chatId]}`, againOptions);
        }
    })
}

start();