import { MewwmePlayer } from "mewwme.player";
import { Manager } from "../../manager.js";
import chalk from "chalk";

export default class {
  async execute(client: Manager, player: MewwmePlayer) {
    const guild = await client.guilds.cache.get(player.guildId);
    client.logger.info(
      `${chalk.hex("#ff7f50")("Player Resumed in @ ")}${chalk.hex("#ff7f50")(
        guild!.name
      )} / ${chalk.hex("#ff7f50")(player.guildId)}`
    );
  }
}
