import express from "express";
import { WebSocketServer } from "ws";
import path from "path";
import { RedisSubscriptionManager } from "./RedisClient";

const app = express();
app.use(express.static(path.join(__dirname, "../../Client")));

const server = app.listen(8080, () => {
  console.log("Express server is running on port 8080...");
});

const wss = new WebSocketServer({ server });

const users: {
  [key: string]: { roomId: string; ws: any };
} = {};

let count = 0;

wss.on("connection", (ws, req) => {
  const wsId = count++;
  
  ws.on("message", (message: string) => {
    const data = JSON.parse(message.toString());

    if (data.type === "join") {
      users[wsId] = {
        roomId: data.payload.roomId,
        ws,
      };
      RedisSubscriptionManager.getInstance().subscribe(wsId.toString(), data.payload.roomId, ws)
    }

    if (data.type === "message") {
      const roomId = users[wsId].roomId;
      const message = data.payload.message;

      RedisSubscriptionManager.getInstance().addChatMessage(roomId, message);
      // Object.keys(users).forEach(userId => {
      //   if(users[userId].roomId === roomId) {
      //     users[userId].ws.send(JSON.stringify({
      //           type: 'message',
      //           payload: { message }
      //       }))
      //    }
      // })
    }
  });

  ws.on('close', () => {
    console.log('Disconnect...');
    RedisSubscriptionManager.getInstance().unsubscribe(wsId.toString(), users[wsId].roomId);
  })
});