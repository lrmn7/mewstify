// topgg.ts

import { Manager } from "../../manager.js";
import { AutoPoster } from "topgg-autoposter";

export default class TopGGPoster {
  async execute(client: Manager) {
    const topggToken = client.config.bot.TOPGG_TOKEN;

    if (!topggToken) {
      client.logger.warn(
        `TOPGG_TOKEN is not defined. Please set it in your environment variables.`
      );
      return;
    }

    const ap = AutoPoster(topggToken, client);

    ap.on("posted", (stats) => {
      client.logger.info(
        `Posted stats to Top.gg! 🟢 SUCCESSFUL | ${stats.serverCount} servers`
      );
    });

    ap.on("error", (err: Error) => {
      client.logger.warn(`Posted stats to Top.gg! 🔴 FAILED - ${err}`);
    });
  }
}
