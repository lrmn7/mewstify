import { MewwmePlayer } from "mewwme.player";
import { Manager } from "../../manager.js";
import { PlayerUpdate } from "shoukaku";

export default class {
  async execute(client: Manager, player: MewwmePlayer, data: PlayerUpdate) {
    client.emit("syncPosition", player);
  }
}
