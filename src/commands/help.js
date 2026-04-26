const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Affiche les commandes disponibles et infos sur PyLiza'),

  async execute(interaction) {
    const embed = new EmbedBuilder()
      .setTitle('Aide — PyLiza')
      .setDescription("PyLiza est un assistant pédagogique spécialisé en Python.")
      .addFields(
        {
          name: '/ask',
          value: 'Pose une question sur Python et obtiens une réponse.',
        },
        {
          name: '/lesson',
          value: 'Affiche une leçon disponible.',
        },
        {
          name: '/quiz',
          value: 'Lance un quiz pour t’entraîner.',
        },
        {
          name: 'Message direct',
          value: "Tu peux aussi écrire `PyLiza` suivi de ta question dans un salon.",
        }
      )
      .setColor(0x5865f2);

    await interaction.reply({ embeds: [embed] });
  },
};