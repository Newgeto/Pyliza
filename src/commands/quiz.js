const { SlashCommandBuilder } = require('discord.js');
const { creerEmbedQuestion, creerEmbedResultat, creerEmbedScore } = require('../utils/embed');
const path = require('path');

// Normalise une reponse pour comparer sans majuscules ni accents
function normaliser(texte) {
  let result = texte.toLowerCase();
  result = result.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  return result.trim();
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName('quiz')
    .setDescription('Lance un quiz sur un sujet Python')
    .addStringOption(function(option) {
      option.setName('sujet');
      option.setDescription('Le sujet du quiz');
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
    const cheminFichier = path.join(__dirname, '..', 'data', 'quiz', sujet + '.json');

    let quizData;
    try {
      quizData = require(cheminFichier);
    } catch (err) {
      await interaction.reply({ content: 'Ce quiz est introuvable.', ephemeral: true });
      return;
    }

    const questions = quizData.questions;
    let score = 0;

    await interaction.reply('Quiz sur **' + sujet + '** - ' + questions.length + ' questions. C\'est parti !');

    for (let i = 0; i < questions.length; i++) {
      const question = questions[i];
      const embedQuestion = creerEmbedQuestion(question, i + 1, questions.length);

      await interaction.channel.send({ embeds: [embedQuestion] });

      // On attend la reponse de l'utilisateur pendant 30 secondes
      let reponseUtilisateur;
      try {
        const collected = await interaction.channel.awaitMessages({
          filter: function(m) { return m.author.id === interaction.user.id; },
          max: 1,
          time: 30000,
          errors: ['time'],
        });
        reponseUtilisateur = collected.first().content;
      } catch (err) {
        await interaction.channel.send('Temps ecoule ! Quiz interrompu.');
        return;
      }

      // On verifie si la reponse est correcte
      let correct = false;
      for (let j = 0; j < question.acceptedAnswers.length; j++) {
        if (normaliser(question.acceptedAnswers[j]) === normaliser(reponseUtilisateur)) {
          correct = true;
          break;
        }
      }

      if (correct) {
        score++;
      }

      const embedResultat = creerEmbedResultat(correct, question.explanation);
      await interaction.channel.send({ embeds: [embedResultat] });
    }

    const embedScore = creerEmbedScore(score, questions.length);
    await interaction.channel.send({ embeds: [embedScore] });
  },
};
