const { Client, GatewayIntentBits, Collection } = require('discord.js');
const { token } = require('./config/config');
const fs = require('fs');
const path = require('path');

// Création du client Discord avec les permissions nécessaires
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

// Collection qui stocke toutes les commandes du bot
client.commands = new Collection();

// Lecture du dossier commands et chargement de chaque fichier
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(path.join(commandsPath, file));

  if (command.data && command.execute) {
    client.commands.set(command.data.name, command);
  }
}

// Lecture du dossier events et enregistrement de chaque event sur le client
const eventsPath = path.join(__dirname, 'events');

if (fs.existsSync(eventsPath)) {
  const eventFiles = fs.readdirSync(eventsPath).filter((file) => file.endsWith('.js'));

  for (const file of eventFiles) {
    const event = require(path.join(eventsPath, file));

    // once: true = l'event se déclenche une seule fois (ex: ready)
    if (event.once) {
      client.once(event.name, (...args) => {
        event.execute(...args, client);
      });
    } else {
      client.on(event.name, (...args) => {
        event.execute(...args, client);
      });
    }
  }
}

client.login(token);
