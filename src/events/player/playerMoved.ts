import {
  MewwmePlayer,
  PlayerMovedChannels,
  PlayerMovedState,
} from "mewwme.player";
import { Manager } from "../../manager.js";
import chalk from "chalk";

export default class {
  async execute(
    client: Manager,
    player: MewwmePlayer,
    state: PlayerMovedState,
    channels: PlayerMovedChannels
  ) {
    const guild = await client.guilds.cache.get(player.guildId);
    client.logger.info(
      `${chalk.hex("#e619e5")("Player Moved in @ ")}${chalk.hex("#e619e5")(
        guild!.name
      )} / ${chalk.hex("#e619e5")(player.guildId)}`
    );
    return player.setVoiceChannel(player.voiceId!);
  }
}
