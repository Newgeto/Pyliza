module.exports = {
  name: 'clientReady',
  once: true,

  // Se déclenche une seule fois quand le bot est connecté à Discord
  execute(client) {
    console.log(`Bot connecté en tant que ${client.user.tag}`);
  },
};
