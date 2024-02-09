import { MewwmePlayer } from "mewwme.player";
import { Manager } from "../manager.js";
import { TextChannel } from "discord.js";

export class ClearMessageService {
  client: Manager;
  channel: TextChannel;
  player: MewwmePlayer;
  constructor(client: Manager, channel: TextChannel, player: MewwmePlayer) {
    this.channel = channel;
    this.client = client;
    this.player = player;
    this.execute();
  }

  async execute() {
    const guild = this.client.guilds.cache.get(this.player.guildId);
    if (!guild) {
      this.client.logger.warn("Guild not found.");
      return;
    }

    try {
      const nplayingMsg = this.client.nplayingMsg.get(this.player.guildId);
      if (!nplayingMsg) return;

      await nplayingMsg.delete();
      this.client.nplayingMsg.delete(this.player.guildId);
    } catch (error) {
      this.client.logger.info(
        `Already deleted message in @ ${guild!.name} / ${this.player.guildId}`
      );
      // Handle the error, e.g., logging, notifying, etc.
    }
  }
}
