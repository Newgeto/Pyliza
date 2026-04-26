# PyLiza

Bot Discord pour apprendre Python avec des tutoriels, des quiz et une IA en local.

## A quoi ça sert

PyLiza est un bot Discord qui aide à apprendre Python. Il combine des leçons structurées et une IA locale (Ollama avec Phi3 Mini) pour répondre à tes questions, t'expliquer des concepts et te proposer des quiz.

Tu peux l'utiliser directement sur Discord pour réviser, poser des questions ou t'entraîner.

## Les commandes

- `/ask` : pose une question, le bot répond
- `/lesson` : affiche une leçon sur un sujet (variables, fonctions, listes, boucles, conditions)
- `/quiz` : lance un quiz pour tester tes connaissances
- `/help` : affiche toutes les commandes
- `/ping` : vérifie que le bot répond

## Les technologies

- Bot : Discord.js v14
- IA locale : Ollama (Phi3 Mini)
- Node.js 20
- Docker + Docker Compose
- Données : JSON

## Structure du projet

```
├── src/
│   ├── index.js
│   ├── commands/         (ask, lesson, quiz, help, ping)
│   ├── events/           (gestion du bot)
│   ├── llm/              (intégration Ollama)
│   ├── config/           (configuration)
│   ├── data/
│   │   ├── lessons/      (tutoriels JSON)
│   │   └── quiz/         (questions JSON)
│   └── utils/            (utilitaires)
├── Dockerfile
├── docker-compose.yml
├── package.json
└── .env.exemple
```

## Installation

Avant de commencer, tu dois avoir :
- Node.js 20 ou plus
- Ollama en cours d'exécution
- Un bot Discord créé sur https://discord.com/developers/applications

Ensuite :

1. Clone le repo
```bash
git clone https://github.com/votre-username/pyliza.git
cd pyliza
```

2. Installe les dépendances
```bash
npm install
```

3. Crée un fichier `.env` à partir du `.env.exemple` et remplis tes infos Discord
```bash
cp .env.exemple .env
```

Remplis dans le fichier `.env` :
- DISCORD_TOKEN (token de ton bot)
- CLIENT_ID (ID de l'app)
- GUILD_ID (ID du serveur Discord)
- OLLAMA_HOST (http://localhost:11434 en local)

4. Lance le bot
```bash
npm start
```

## Avec Docker

Si tu préfères utiliser Docker :

```bash
docker-compose up --build
```

Le bot démarre automatiquement avec Ollama.

## Utilisation

Une fois le bot lancé et invite sur ton serveur Discord, tu peux utiliser les commandes :

- `/ask question: pourquoi utiliser les listes?` - pose une question libre
- `/lesson sujet: variables` - obtiens une leçon
- `/quiz sujet: fonctions` - fais un quiz
- `/help` - vois toutes les commandes
- `/ping` - vérifie que le bot répond

## Les sujets disponibles

Tu peux apprendre sur :
- Variables
- Fonctions
- Listes
- Boucles
- Conditions

## Développement

Pour modifier le bot :

```bash
npm run deploy    (redéploie les commandes)
npm start         (redémarre le bot)
```