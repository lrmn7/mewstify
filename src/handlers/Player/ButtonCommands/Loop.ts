import { ButtonInteraction, EmbedBuilder, VoiceBasedChannel } from "discord.js";
import { Manager } from "../../../manager.js";
import { MewwmePlayer } from "mewwme.player";
import { MewwmeLoop } from "../../../@types/Lavalink.js";
import { AutoReconnectBuilder } from "../../../database/build/AutoReconnect.js";

export class ButtonLoop {
  client: Manager;
  interaction: ButtonInteraction;
  language: string;
  player: MewwmePlayer;
  constructor(
    client: Manager,
    interaction: ButtonInteraction,
    language: string,
    player: MewwmePlayer
  ) {
    this.client = client;
    this.language = language;
    this.player = player;
    this.interaction = interaction;
    this.execute();
  }

  async execute() {
    if (!this.player) {
      return;
    }

    switch (this.player.loop) {
      case "none":
        await this.player.setLoop(MewwmeLoop.track);

        this.setLoop247(String(MewwmeLoop.track));

        const looptrack = new EmbedBuilder()
          .setDescription(
            `${this.client.i18n.get(this.language, "music", "loop_current")}`
          )
          .setColor(this.client.color);
        await this.interaction.reply({
          content: " ",
          embeds: [looptrack],
        });
        break;

      case "track":
        await this.player.setLoop(MewwmeLoop.queue);

        this.setLoop247(String(MewwmeLoop.queue));

        const loopall = new EmbedBuilder()
          .setDescription(
            `${this.client.i18n.get(this.language, "music", "loop_all")}`
          )
          .setColor(this.client.color);
        await this.interaction.reply({
          content: " ",
          embeds: [loopall],
        });
        break;

      case "queue":
        await this.player.setLoop(MewwmeLoop.none);

        this.setLoop247(String(MewwmeLoop.none));

        const unloopall = new EmbedBuilder()
          .setDescription(
            `${this.client.i18n.get(this.language, "music", "unloopall")}`
          )
          .setColor(this.client.color);
        await this.interaction.reply({
          content: " ",
          embeds: [unloopall],
        });
        break;
    }
  }

  async setLoop247(loop: string) {
    const check = await new AutoReconnectBuilder(
      this.client,
      this.player
    ).execute(this.player.guildId);
    if (check) {
      await this.client.db.autoreconnect.set(
        `${this.player.guildId}.config.loop`,
        loop
      );
    }
  }
}
