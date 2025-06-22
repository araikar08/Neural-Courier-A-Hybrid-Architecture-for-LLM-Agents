require('dotenv').config();
const Groq = require('groq-sdk');
const { WebSocketServer } = require('ws');

const groq = new Groq();
const wss = new WebSocketServer({ port: 8080 });

console.log("Strategic Planner Brain Server v2 is listening on port 8080...");

wss.on('connection', function connection(ws) {
    console.log("A Nitrode client has connected!");
    ws.on('error', console.error);
    ws.on('message', async function message(data) {
        const gameState = JSON.parse(data.toString());
        
        const startTime = performance.now();
        const decision = await getWaypointFromGroq(gameState);
        const endTime = performance.now();
        const latency = (endTime - startTime).toFixed(2);

        // Combine the AI's decision with the latency metric
        const response_to_client = {
            ...decision, // This will include "choice" and "thought"
            latency: latency
        };

        console.log("Sending to client:", JSON.stringify(response_to_client));
        ws.send(JSON.stringify(response_to_client));
    });
});

async function getWaypointFromGroq(gameState) {
    const systemPrompt = `You are a master military strategist. Your job is to select the single best tactical waypoint for a ground drone to approach its target.
You will be given the drone's position, the final target's position, and a numbered list of available waypoints.
You must choose the waypoint that offers the best path to the final target while avoiding obstacles.
You MUST respond ONLY with a clean JSON object with two keys: "choice" (the index number of the waypoint) and "thought" (a brief explanation of your choice).

Example Response:
{"choice": 1, "thought": "Waypoint 1 is the clearest path to flank the main obstacle."}
`;

    const userPrompt = `Game State: ${JSON.stringify(gameState)}. Which waypoint is the best choice?`;

    try {
        const chatCompletion = await groq.chat.completions.create({
            messages: [
                { role: 'system', content: systemPrompt },
                { role: 'user', content: userPrompt }
            ],
            model: 'llama3-8b-8192',
            response_format: { type: "json_object" },
        });
        const responseJson = JSON.parse(chatCompletion.choices[0].message.content);
        return responseJson;
    } catch (e) {
        return { "choice": 0, "thought": "Error in AI. Defaulting to first waypoint." };
    }
}