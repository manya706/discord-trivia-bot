<div align="center" style="margin-bottom:30px;">
  <img style="width:1000px; height:350px;" src="https://github.com/manya706/discord-trivia-bot/blob/main/discord2.gif" alt="Discord Loading Animation" />
</div>

# <div align="center">**Discord Trivia Bot**</div>
![Node.js](https://img.shields.io/badge/Node.js-v20.17.0-green)
![Discord.js](https://img.shields.io/badge/Discord.js-v14.0.0-blue)
![Groq](https://img.shields.io/badge/Groq-API-orange)
![Status](https://img.shields.io/badge/Status-Active-brightgreen)



## 📜 Description

Welcome to the **Discord Trivia Bot**! This bot brings fun and engaging trivia questions to your Discord server, utilizing the powerful Groq API. It’s a great way to challenge your friends and add some excitement to your server!

## 🚀 Features

- **Trivia Questions**: Fetch trivia questions dynamically using the Groq API.
- **Answer Validation**: Check if users’ answers to trivia questions are correct.

## 🛠️ Setup Instructions

### Prerequisites

- **Node.js**: Ensure you have Node.js installed. Download it from [Node.js official website](https://nodejs.org/).
- **Git**: Make sure Git is installed. Get it from [Git official website](https://git-scm.com/).
- **Groq API Key**: Obtain your Groq API key from [Groq](https://groq.ai) and keep it handy.

### Steps to Set Up

1. **Clone the Repository**

 ```bash
 git clone https://github.com/yourusername/discord-trivia-bot.git
 cd discord-trivia-bot
```
2. Install Dependencies

  ```bash
  npm install
  Configure Environment Variables
  ```
3. Create a .env file in the root directory and add your API keys:

  ```bash
  TOKEN=your_discord_bot_token
  GROQ_API_KEY=your_groq_api_key
```
Replace your_discord_bot_token and your_groq_api_key with your actual credentials.

4. Run the Bot

```bash
node trivia-bot.js
```
5. Invite the Bot to Your Server

Visit the Discord Developer Portal.
Select your application and go to the "OAuth2" tab.
Under "OAuth2 URL Generator", choose the bot scope and the Send Messages permission.
Copy the generated URL and use it to invite the bot to your Discord server.
Close the Terminal

---

### 📝 Usage
Get a Trivia Question: Type !trivia in any text channel where the bot has access. The bot will send a trivia question in response.
Answering: Reply with your answer to see if it’s correct!

### 🤝 Contributing
Contributions are welcome! Feel free to open issues or submit pull requests with improvements or bug fixes. Please adhere to coding standards and provide clear commit messages.

---

### 📜 License
This project is licensed under the MIT License. See the LICENSE file for details.

Enjoy your trivia bot and have fun! 🎉



