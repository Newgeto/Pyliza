// adresse d'ollama, peut être changée dans le .env
const OLLAMA_URL = process.env.OLLAMA_URL || 'http://localhost:11434';
const MODEL = 'phi3:mini';

// ce qu'on dit au modèle pour qu'il joue le rôle de pyliza
const SYSTEM_PROMPT = `Tu es PyLiza, un assistant pédagogique spécialisé dans l'apprentissage de Python.
Tu réponds en français, de façon claire et concise.
Tu donnes des exemples de code quand c'est utile, entre balises \`\`\`python\`\`\`.
Tu n'abordes que des sujets liés à Python et à la programmation.
Si on te pose une question hors sujet, ramène poliment la conversation à Python.`;

// on stocke l'historique de chaque channel séparément
const histories = new Map();

function getHistory(channelId) {
  if (!histories.has(channelId)) histories.set(channelId, []);
  return histories.get(channelId);
}

// envoie le message à ollama et retourne la réponse
async function ask(channelId, userMessage) {
  const history = getHistory(channelId);

  // on envoie le system prompt, l'historique et le nouveau message
  const messages = [
    { role: 'system', content: SYSTEM_PROMPT },
    ...history,
    { role: 'user', content: userMessage },
  ];

  const response = await fetch(`${OLLAMA_URL}/api/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ model: MODEL, messages, stream: false }),
  });

  if (!response.ok) throw new Error(`Ollama a répondu avec le statut ${response.status}`);

  const reply = (await response.json()).message.content;

  // on ajoute l'échange à l'historique du channel
  history.push({ role: 'user', content: userMessage });
  history.push({ role: 'assistant', content: reply });

  // on limite à 20 messages pour ne pas surcharger le contexte
  if (history.length > 20) history.splice(0, history.length - 20);

  return reply;
}

module.exports = { ask };