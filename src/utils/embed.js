const { EmbedBuilder } = require('discord.js');

// Crée un embed pour afficher une leçon complète
function creerEmbedLecon(lecon) {
  const embed = new EmbedBuilder()
    .setTitle(lecon.title)
    .setColor(0x3498db)
    .setFooter({ text: `Durée estimée : ${lecon.estimatedMinutes} min` });

  // Ajoute chaque section de la leçon comme un champ
  for (const section of lecon.sections) {
    let valeur = section.content;

    // Si la section a des exemples de code, on les affiche en bloc Python
    if (section.examples && section.examples.length > 0) {
      valeur += '\n```python\n' + section.examples.join('\n') + '\n```';
    }

    embed.addFields({ name: section.title, value: valeur });
  }

  embed.addFields({ name: 'Resume', value: lecon.summary });

  return embed;
}

// Crée un embed pour afficher une question de quiz
function creerEmbedQuestion(question, numero, total) {
  return new EmbedBuilder()
    .setTitle(`Question ${numero}/${total}`)
    .setDescription(question.question)
    .setColor(0xe67e22)
    .setFooter({ text: 'Tu as 30 secondes pour répondre' });
}

// Crée un embed pour afficher si la réponse était correcte ou non
function creerEmbedResultat(correct, explication) {
  return new EmbedBuilder()
    .setTitle(correct ? 'Bonne reponse !' : 'Mauvaise reponse')
    .setDescription(explication)
    .setColor(correct ? 0x2ecc71 : 0xe74c3c);
}

// Crée un embed pour afficher le score final du quiz
function creerEmbedScore(score, total) {
  const pourcentage = Math.round((score / total) * 100);
  return new EmbedBuilder()
    .setTitle('Quiz termine !')
    .setDescription(`Tu as obtenu **${score}/${total}** (${pourcentage}%)`)
    .setColor(pourcentage >= 70 ? 0x2ecc71 : 0xe67e22);
}

module.exports = { creerEmbedLecon, creerEmbedQuestion, creerEmbedResultat, creerEmbedScore };
