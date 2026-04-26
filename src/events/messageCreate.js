const { ask } = require('../llm/ollama');

module.exports = {
  name: 'messageCreate',
  once: false,

  async execute(message) {
    if (message.author.bot) return;

    const content = message.content.trim();

    if (!content.toLowerCase().startsWith('pyliza')) return;

    const prompt = content.slice(6).trim();

    if (!prompt) {
      await message.reply("Pose-moi une question après `PyLiza`.");
      return;
    }

    try {
      await message.channel.sendTyping();
      const reply = await ask(message.channel.id, prompt);
      await message.reply(reply);
    } catch (error) {
      console.error('Erreur messageCreate :', error);
      await message.reply("Je n'arrive pas à répondre pour le moment.");
    }
  },
};