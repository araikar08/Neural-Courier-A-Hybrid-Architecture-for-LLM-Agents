require('dotenv').config();
const Groq = require('groq-sdk');
const groq = new Groq();
const { WebSocketServer } = require('ws');

const wss = new WebSocketServer({ port: 8080 });
console.log("Brain Server is listening on port 8080...");

wss.on('connection', function connection(ws) {
    console.log("A robot client has connected!");

    ws.on('error', console.error);

    ws.on('message', async function message(data) {
        console.log('Received game state:', data.toString());

        // You can call Groq here with the game state
        const groqResponse = await getDecisionFromGroq(data.toString());

        console.log("Sending command back to robot:", groqResponse);
        ws.send(JSON.stringify({ command: groqResponse }));
    });
});

async function getDecisionFromGroq(gameState) {
    // This is your Groq logic from before
    const chatCompletion = await groq.chat.completions.create({
        messages: [{ role: 'user', content: `Based on this game state: ${gameState}, what is the next action? (e.g., MOVE_FORWARD)` }],
        model: 'llama3-8b-8192',
    });
    return chatCompletion.choices[0].message.content;
}