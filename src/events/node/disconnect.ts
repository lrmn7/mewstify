import { MewwmePlayer } from "mewwme.player";
import { Manager } from "../../manager.js";
import { AutoFixLavalink } from "../../autofix/AutoFixLavalink.js";

export default class {
  execute(
    client: Manager,
    name: string,
    players: MewwmePlayer[],
    moved: boolean
  ) {
    if (moved) return;
    if (players) players.map((player: MewwmePlayer) => player.destroy());
    client.logger.debug(`Lavalink ${name}: Disconnected`);
    if (client.config.features.AUTOFIX_LAVALINK.enable) {
      new AutoFixLavalink(client);
    }
  }
}
