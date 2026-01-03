import { WebSocketServer } from "ws";

const clients = new Map();

export function SetupWebsocket(server) {
  const wss = new WebSocketServer({ server });

  wss.on("connection", (ws) => {
    ws.on("message", (message) => {
      try {
        const data = JSON.parse(message);

        // Authenfication of users and sending htmls to helpers
        if (data.authenfication === false) {
          ws.user = { id: data.id, role: data.role };

          clients.set(`${ws.user.role}:${ws.user.id}`, {
            ws,
            data: data?.allQuestions,
            username: data?.username,
            timeOfActivation: data?.timeOfActivation,
          });
          data.authenfication = true;

          let htmlToHelper;
          ws.user.role === "helper"
            ? (htmlToHelper = clients.get(`client:${ws.user.id}`))
            : undefined;

          ws.send(
            JSON.stringify({
              ...data,
              htmlToHelper: htmlToHelper?.data,
              username: htmlToHelper?.username,
              timeOfActivation: htmlToHelper?.timeOfActivation,
            })
          );
        }

        // Saving html questions and send them to helpers
        // if (data.html) {
        //   const helper = clients.get(`helper:${data.id}`);

        //   fetch("https://script-answers.onrender.com/new-html-question", {
        //     method: "POST",
        //     headers: { "Content-Type": "application/json" },
        //     body: JSON.stringify({
        //       html: data.html,
        //       timeOfActivation: data.timeOfActivation,
        //       username: data.username,
        //     }),
        //   });

        //   if (helper && helper.readyState === helper.OPEN) {
        //     helper.send(JSON.stringify(data));
        //   }
        // }

        // Sending the answers to clients
        if (data.answer) {
          const client = clients.get(`client:${data.id}`).ws;

          if (client && client.readyState === client.OPEN) {
            client.send(JSON.stringify({ answer: data.answer }));
          }
        }

        // Sending the list of client connections to admin
        if (
          data.authenfication &&
          !data.hasList &&
          data.hasList !== undefined
        ) {
          const obj = Object.fromEntries(clients);
          ws.send(JSON.stringify(obj));
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
