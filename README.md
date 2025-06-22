# Neural Courier: A Hybrid Architecture for Autonomous LLM Agents

**A solo project by Aryan Raikar for the Berkeley AI Hackathon 2025.**

---

### ► Watch the Demo Video

[![Neural Courier Demo](https://youtu.be/RWS2lIp7c60/0.jpg)](https://youtu.be/RWS2lIp7c60)

*(Click the image to watch the 2-minute demonstration)*

---

### The Concept

Neural Courier is a stealth strategy game that acts as a demonstration platform for a powerful, real-world hybrid AI architecture. It tackles a core challenge in modern robotics: how can we use the creative reasoning of Large Language Models (LLMs) for real-time navigation without succumbing to their unreliability for precise, low-level tasks?

Our system proves that by elevating the LLM to the role of a **Strategic Planner** and combining it with a deterministic game engine for execution, we can build smarter, more robust autonomous agents.

### Tech Stack & Architecture

This project integrates a full stack of modern technologies to achieve real-time AI decision-making:

* **Game Client (Nitrode/Godot):** Renders the 3D world, manages physics, and uses the built-in Navigation engine to execute movement commands.
* **Backend Server (Node.js):** Acts as the communication bridge, using WebSockets for low-latency, bidirectional communication with the game client.
* **AI Brain (Groq):** The Groq platform serves the Llama 3 8b model at incredible speed, allowing us to get strategic decisions in under 400ms, which is essential for a real-time loop.
* **Voice Output (say.js/Vapi):** The AI's "thoughts" are converted to speech, providing a multimodal user experience.

Architecture Diagram: https://imgur.com/a/kBAOEG4

### How to Run It

1.  **Clone the repository.**
2.  **Create a `.env` file** in the root directory with your Groq API key:
    `GROQ_API_KEY="gsk_..."`
3.  **Install server dependencies:**
    `npm install`
4.  **Run the brain server:**
    `node brain_server.js`
5.  **Run the game:**
    Open the project in the Nitrode editor and press the Play button.

---

## License

This project is licensed under the [MIT License](LICENSE).
