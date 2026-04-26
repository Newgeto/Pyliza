module.exports = {
  name: 'interactionCreate',
  once: false,

  // Se déclenche à chaque fois qu'un utilisateur utilise une slash command
  async execute(interaction, client) {
    if (!interaction.isChatInputCommand()) {
      return;
    }

    // Recherche la commande dans la collection par son nom
    const command = client.commands.get(interaction.commandName);

    if (!command) {
      return;
    }

    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(error);
      await interaction.reply({
        content: 'Une erreur est survenue.',
        ephemeral: true,
      });
    }
  },
};
