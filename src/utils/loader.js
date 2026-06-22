const { REST, Routes } = require('discord.js');
const fs = require('fs');
const path = require('path');
const { token } = require('../config/config');

// Récupération de toutes les commandes du dossier commands
const commands = [];
const commandsPath = path.join(__dirname, '..', 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(path.join(commandsPath, file));

  if (command.data) {
    commands.push(command.data.toJSON());
  }
}

const rest = new REST().setToken(token);

// Enregistre les slash commands auprès de Discord via l'API
async function deployCommands() {
  // Récupère l'ID de l'application directement à partir du token
  const application = await rest.get(Routes.currentApplication());

  console.log(`Déploiement global de ${commands.length} commande(s)...`);
  await rest.put(Routes.applicationCommands(application.id), { body: commands });
  console.log('Commandes déployées avec succès.');
}

deployCommands();
