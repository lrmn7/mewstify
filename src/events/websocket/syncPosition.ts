import { MewwmePlayer } from "mewwme.player";
import { Manager } from "../../manager.js";

export default class {
  async execute(client: Manager, player: MewwmePlayer) {
    if (!client.websocket) return;
    client.websocket.send(
      JSON.stringify({
        op: "sync_position",
        guild: player.guildId,
        position: player.shoukaku.position,
      })
    );
  }
}
