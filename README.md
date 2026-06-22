# PyLiza

Discord bot designed to help users learn Python through lessons, quizzes, and a local AI assistant.

## Overview

PyLiza is a Discord bot that makes learning Python easier. It combines structured lessons with a local AI model (Ollama running Phi3 Mini) to answer questions, explain concepts, and generate quizzes.

You can use it directly from Discord to study, ask questions, and practice your Python skills.

## Commands

* `/ask` : ask a question and get an AI-generated answer
* `/lesson` : display a lesson about a Python topic
* `/quiz` : start a quiz to test your knowledge
* `/help` : show all available commands
* `/ping` : check if the bot is online

## Tech Stack

* Discord.js v14
* Ollama (Phi3 Mini)
* Node.js 20+
* Docker & Docker Compose
* JSON data storage

## Project Structure

```text id="5bgh8v"
├── src/
│   ├── index.js
│   ├── commands/         # ask, lesson, quiz, help, ping
│   ├── events/           # Discord event handlers
│   ├── llm/              # Ollama integration
│   ├── config/           # Configuration files
│   ├── data/
│   │   ├── lessons/      # JSON lessons
│   │   └── quiz/         # JSON quiz questions
│   └── utils/            # Utility functions
├── Dockerfile
├── docker-compose.yml
├── package.json
└── .env.exemple
```

## Installation

Before getting started, make sure you have:

* Node.js 20 or later
* Ollama running locally
* A Discord bot created in the Discord Developer Portal

### 1. Clone the repository

```bash id="tq1kdr"
git clone https://github.com/your-username/pyliza.git
cd pyliza
```

### 2. Install dependencies

```bash id="ijrb3z"
npm install
```

### 3. Create the environment file

```bash id="jz58j7"
cp .env.exemple .env
```

Fill in the following value:

* `DISCORD_TOKEN` – your bot token (the only required setting)

You can optionally override `OLLAMA_URL` (defaults to `http://localhost:11434`) if Ollama runs elsewhere.

### 4. Deploy the slash commands

The first time (and whenever you change a command), register the commands with Discord:

```bash id="dep1st"
npm run deploy
```

Commands are deployed globally, so no application or server ID is needed.

### 5. Start the bot

```bash id="w73sne"
npm start
```

## Docker

If you prefer using Docker:

```bash id="te0qzh"
docker compose up --build
```

The bot will start automatically with Ollama.

## Usage

Once the bot is running and invited to your Discord server, you can use:

* `/ask question: Why should I use lists?`
* `/lesson topic: variables`
* `/quiz topic: functions`
* `/help`
* `/ping`

## Available Topics

Current lessons include:

* Variables
* Functions
* Lists
* Loops
* Conditions

## Development

Useful commands during development:

```bash id="ry1l5n"
npm run deploy   # Redeploy slash commands
npm start        # Start the bot
```
