const { SlashCommandBuilder } = require('discord.js');
const { ask } = require('../llm/ollama');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ask')
    .setDescription('Pose une question sur Python à PyLiza')
    .addStringOption(option =>
      option
        .setName('question')
        .setDescription('La question à poser')
        .setRequired(true)
    ),

  async execute(interaction) {
    const question = interaction.options.getString('question');

    await interaction.deferReply();

    try {
      const reply = await ask(interaction.channelId, question);
      await interaction.editReply(reply);
    } catch (error) {
      console.error('Erreur /ask :', error);
      await interaction.editReply("Erreur lors de la communication avec Ollama.");
    }
  },
};