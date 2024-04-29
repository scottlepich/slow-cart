import { serve } from "bun";

import products from "../../fixtures/mock-products.json";

const PORT = 3000;

const SOCKET_INIT_MESSAGE = "Connected, successful";

const server = serve({
  PORT,
  fetch(req) {
    if (server.upgrade(req)) {
      return undefined;
    }
    const url = new URL(req.url);
    switch (url.pathname) {
      case "/api/products":
        return new Response(JSON.stringify({ products }), {
          headers: {
            "Access-Control-Allow-Headers": "accept,content-type",
            "Access-Control-Allow-Methods": "GET, OPTIONS",
            "Access-Control-Allow-Origin": "http://localhost:5173",
            "Content-Type": "application/json",
          },
        });
      default:
        return new Response("Unfound", { status: 404 });
    }
  },

  websocket: {
    open(ws) {
      ws.send(JSON.stringify({ action: SOCKET_INIT_MESSAGE }));
      // console.log("opened", { ws });
    },

    async message(ws, message) {
      // console.log({ message });
      const { name, id, quantity } = JSON.parse(message);
      ws.send(JSON.stringify({ action: "ACK" }));

      // simulate slow responses
      if (id === 2) {
        // simulate reconcile
        setTimeout(() => {
          ws.send(JSON.stringify({ action: "reconcile", id, quantity: 2 }));
        }, 2e3);
      } else {
        setTimeout(() => {
          ws.send(JSON.stringify({ action: "added", name, id, quantity }));
        }, 2e3);
      }
    },

    close() {
      console.log("closed");
    },
  },
});

console.log(`Listening on http://localhost:${server.port}`);
