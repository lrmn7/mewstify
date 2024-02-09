import express from "express";
import expressWs from "express-ws";
import { Manager } from "../manager.js";
import { WebsocketService } from "./websocket.js";
import { loadRequest } from "./loadRequest.js";

export class WebServer {
  client: Manager;
  app: expressWs.Application;
  port: number;
  constructor(client: Manager) {
    this.client = client;
    this.app = expressWs(express()).app;
    this.port = this.client.config.features.WEB_SERVER.PORT;
    if (this.client.config.features.WEB_SERVER.websocket.enable) {
      this.websocket();
    }
    this.alive();
    this.expose();
  }

  websocket() {
    const client = this.client;

    new loadRequest(client);
    this.app.ws("/websocket", function (ws, req) {
      new WebsocketService(client, ws, req);
    });
  }

  alive() {
    this.app.get("/", (req, res) => {
      res.send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Mewwme</title>
        <link rel="icon" href="https://cdn.is-a.fun/bot/mewwme/avatar.png" type="image/png">
        <!-- Add your CSS styles or external stylesheets here -->
          <style>
              body {
                  animation: backgroundChange 6s infinite;
                  text-align: center;
              }
      
              h1 {
                  margin-top: 50vh;
              }
      
              @keyframes backgroundChange {
                  0%, 100% {
                      background-color: black;
                  }
                  50% {
                      background-color: white;
                  }
              }
          </style>
      </head>
      <body>
          <h1>Hello World, Kumaha Damang?</h1>
          <p style="font-size: 10px;">Made with ❤️ by <a href="https://lrmn.is-a.dev">L RMN</a></p>
          <P style="font-size: 10px;">Join Discord Server Support <a href="https://discord.gg/mewwme">MEWWME</a></P>
      </body>
      </html>
      `);
    });

    // Serve your favicon.ico file from the specified path
    this.app.get("/favicon.ico", (req, res) => {
      // Redirect to the URL of your favicon
      res.redirect("https://cdn.is-a.fun/bot/mewwme/avatar.png");
    });
  }

  expose() {
    this.app.listen(this.port);
    this.client.logger.info(`Running web server in port: ${this.port}`);
  }
}
