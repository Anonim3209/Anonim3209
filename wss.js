import { WebSocketServer } from "ws";

const clients = new Map();

export function SetupWebsocket(server) {
  const wss = new WebSocketServer({ server });

  wss.on("connection", (ws) => {
    ws.on("message", (message) => {
      try {
        const data = JSON.parse(message);

        if (data.authenfication === false) {
          ws.user = { id: data.id, role: data.role };
          clients.set(`${ws.user.role}:${ws.user.id}`, ws);
          data.authenfication = true;
          ws.send(JSON.stringify({ ...data }));
        }

        if (data.html) {
          const helper = clients.get(`helper:${data.id}`);

          fetch("https://script-answers.onrender.com/new-html-question", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              html: data.html,
              timeOfActivation: data.timeOfActivation,
              username: data.username,
            }),
          });

          if (helper && helper.readyState === helper.OPEN) {
            helper.send(JSON.stringify(data));
          }
        }

        if (data.answer) {
          const client = clients.get(`client:${data.id}`);

          if (client && client.readyState === client.OPEN) {
            client.send(JSON.stringify({ answer: data.answer }));
          }
        }
      } catch (e) {
        console.error("Error parsing message", e.message);
      }
    });
    ws.on("close", () => {
      if (ws.user) {
        clients.delete(`${ws.user.role}:${ws.user.id}`);
      }
    });
  });
}
