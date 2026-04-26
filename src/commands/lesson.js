const { SlashCommandBuilder } = require('discord.js');
const { creerEmbedLecon } = require('../utils/embed');
const path = require('path');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('lesson')
    .setDescription('Affiche une lecon sur un sujet Python')
    .addStringOption(function(option) {
      option.setName('sujet');
      option.setDescription('Le sujet de la lecon');
      option.setRequired(true);
      option.addChoices(
        { name: 'variables', value: 'variables' },
        { name: 'fonctions', value: 'fonctions' },
        { name: 'boucles', value: 'boucles' },
        { name: 'conditions', value: 'conditions' },
        { name: 'listes', value: 'listes' }
      );
      return option;
    }),

  async execute(interaction) {
    const sujet = interaction.options.getString('sujet');

    // On construit le chemin vers le fichier JSON de la lecon
    const cheminFichier = path.join(__dirname, '..', 'data', 'lessons', sujet + '.json');

    let lecon;

    // On essaie de charger le fichier, si ca echoue on previent l'utilisateur
    try {
      lecon = require(cheminFichier);
    } catch (err) {
      await interaction.reply({ content: 'Cette lecon est introuvable.', ephemeral: true });
      return;
    }

    const embed = creerEmbedLecon(lecon);
    await interaction.reply({ embeds: [embed] });
  },
};
