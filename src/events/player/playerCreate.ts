import { MewwmePlayer } from "mewwme.player";
import { Manager } from "../../manager.js";
import chalk from "chalk";

export default class {
  async execute(client: Manager, player: MewwmePlayer) {
    const guild = await client.guilds.cache.get(player.guildId);
    client.logger.info(
      `${chalk.hex("#f2d7b7")("Player Created in @ ")}${chalk.hex("#f2d7b7")(
        guild!.name
      )} / ${chalk.hex("#f2d7b7")(player.guildId)}`
    );

    client.emit("playerCreate", player.guildId);
  }
}
