require('dotenv').config();
const { Client, GatewayIntentBits, Events } = require('discord.js');
const Groq = require('groq-sdk');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });


client.on(Events.MessageCreate, async message => {
    if (message.author.bot) return;

    if (message.content.startsWith('!trivia')) {
        
        try {
            const chatCompletion = await getGroqChatCompletion();
            const triviaQuestion = chatCompletion.choices[0]?.message?.content || "No question available.";
            await message.channel.send(`Here's a trivia question: ${triviaQuestion}`);
        } catch (error) {
            console.error('Error generating trivia question:', error);
            await message.channel.send('Sorry, I could not fetch a trivia question at this time.');
        }
    }
});

async function getGroqChatCompletion(category) {
    return groq.chat.completions.create({
        messages: [
            { role: "system", content: "You are a helpful assistant. You reply with very short answers." },
            { role: "user", content: `Provide a easy trivia question` }
        ],
        model: "llama3-8b-8192",
        max_tokens: 100,
        temperature: 1.2
    });
}

client.login(process.env.TOKEN);
