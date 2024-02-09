import { EmbedBuilder, Message } from "discord.js";
import { Manager } from "../../../manager.js";
import { MewwmeLoop, MewwmeLoopMode } from "../../../@types/Lavalink.js";
import { Accessableby, PrefixCommand } from "../../../@types/Command.js";
import { MewwmePlayer } from "mewwme.player";
import { AutoReconnectBuilder } from "../../../database/build/AutoReconnect.js";

// Main code
export default class implements PrefixCommand {
  name = "loopall";
  description = "Loop all songs in queue!";
  category = "Music";
  usage = "";
  aliases = ["lq"];
  lavalink = true;
  accessableby = Accessableby.Member;

  async run(
    client: Manager,
    message: Message,
    args: string[],
    language: string,
    prefix: string
  ) {
    const msg = await message.reply({
      embeds: [
        new EmbedBuilder()
          .setDescription(
            `${client.i18n.get(language, "music", "loopall_loading")}`
          )
          .setColor(client.color),
      ],
    });

    const player = client.manager.players.get(message.guild!.id);
    if (!player)
      return msg.edit({
        embeds: [
          new EmbedBuilder()
            .setDescription(
              `${client.i18n.get(language, "noplayer", "no_player")}`
            )
            .setColor(client.color),
        ],
      });
    const { channel } = message.member!.voice;
    if (
      !channel ||
      message.member!.voice.channel !== message.guild!.members.me!.voice.channel
    )
      return msg.edit({
        embeds: [
          new EmbedBuilder()
            .setDescription(
              `${client.i18n.get(language, "noplayer", "no_voice")}`
            )
            .setColor(client.color),
        ],
      });

    if (player.loop === "queue") {
      await player.setLoop(MewwmeLoop.none);
      this.setLoop247(client, player, String(MewwmeLoop.none));

      const unloopall = new EmbedBuilder()
        .setDescription(`${client.i18n.get(language, "music", "unloopall")}`)
        .setColor(client.color);

      return msg.edit({ content: " ", embeds: [unloopall] });
    } else if (player.loop === "none") {
      await player.setLoop(MewwmeLoop.queue);
      this.setLoop247(client, player, String(MewwmeLoop.queue));

      const loopall = new EmbedBuilder()
        .setDescription(`${client.i18n.get(language, "music", "loopall")}`)
        .setColor(client.color);

      return msg.edit({ content: " ", embeds: [loopall] });
    }
  }

  async setLoop247(client: Manager, player: MewwmePlayer, loop: string) {
    const data = await new AutoReconnectBuilder(client, player).execute(
      player.guildId
    );
    if (data) {
      await client.db.autoreconnect.set(`${player.guildId}.config.loop`, loop);
    }
  }
}
