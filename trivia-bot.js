require('dotenv').config();
const { Client, GatewayIntentBits, Events } = require('discord.js');
const Groq = require('groq-sdk');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const categories = ['science', 'history', 'sports', 'technology', 'geography'];
const triviaQuestions = {}; // Store the current trivia question and answer

client.on(Events.MessageCreate, async message => {
    if (message.author.bot) return;

    if (message.content.startsWith('!trivia')) {
        const args = message.content.split(' ').slice(1);
        const category = args[0]?.toLowerCase();

        if (!categories.includes(category)) {
            await message.channel.send(`Please provide a valid category from the following: ${categories.join(', ')}`);
            return;
        }

        try {
            const chatCompletion = await getGroqChatCompletion(category);
            const responseText = chatCompletion.choices[0]?.message?.content || "No response available.";
            const [triviaQuestion, triviaAnswer] = responseText.split('Answer:').map(part => part.trim().replace('Question:', '').trim());
            triviaQuestions[message.author.id] = {
                question: triviaQuestion || "No question available.",
                answer: triviaAnswer || "No answer available."
            };

            await message.channel.send(`Here's a ${category} trivia question: ${triviaQuestion}`);
            await message.channel.send("Please reply with your answer.");
        } catch (error) {
            console.error('Error generating trivia question:', error);
            await message.channel.send('Sorry, I could not fetch a trivia question at this time.');
        }
    } else if (message.content.startsWith('!answer')) {
        const userAnswer = message.content.split(' ').slice(1).join(' ');

        // Check if the user has a trivia question stored
        if (triviaQuestions[message.author.id]) {
            const correctAnswer = triviaQuestions[message.author.id].answer;

            if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
                await message.channel.send("Correct! Well done.");
            } else {
                await message.channel.send(`Sorry, that's not correct. The correct answer was: ${correctAnswer}`);
            }

            // Clear the trivia question for this user
            delete triviaQuestions[message.author.id];
        } else {
            await message.channel.send("You don't have an active trivia question. Start a new trivia game with !trivia [category].");
        }
    }
});

async function getGroqChatCompletion(category) {
    return groq.chat.completions.create({
        messages: [
            { role: "system", content: "You are a helpful assistant. You reply with very short answers." },
            { role: "user", content: "Provide a trivia question and its correct answer in the category of ${category}. Format it as: Question: [question]. Answer: [answer]." }
        ],
        model: "llama3-8b-8192",
        max_tokens: 100,
        temperature: 1.2
    });
}

client.login(process.env.TOKEN);
