import { createServer } from "http";
import WebSocket, { WebSocketServer } from "ws";
import express from "express";
import readLastLines from "read-last-lines";
const wss = new WebSocketServer({ port: 8080 });
import fs from "fs";
const app = express();

wss.on("connection", function connection(ws) {

  readLastLines.read('message.txt', 5)
  .then((lines) => 
    {
      ws.send(lines)
    });
    ws.on("message", function message(data) {
    console.log("received: %s", data);
    // const resp = JSON.parse(data);
    // console.log(resp);

    fs.appendFile("message.txt", data + "|^ \n", function (err) {
      if (err) throw err;
      console.log("Saved!");
    });

    wss.clients.forEach(function each(client) {
      // if (client.readyState === WebSocket.OPEN) {
      //   client.send(Buffer.from(data).toString()+"\n");
      // }
    });
  });

  //   ws.on('message', function message(data, isBinary) {

  //   });
});

fs.watch("message.txt", (eventType, filename) => {
  readLastLines.read("message.txt", 1).then((lines) => {
    console.log("line:");
    console.log(lines);
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(lines);
      }
    });
  });
});
app.get("/", (req, res) => {
  res.send("hello siddhartha");
});
app.listen(3001, () => {
  console.log("listening on 3001");
});
