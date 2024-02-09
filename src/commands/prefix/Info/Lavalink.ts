import { Manager } from "../../../manager.js";
import {
  ButtonStyle,
  Message,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
} from "discord.js";
import { Accessableby, PrefixCommand } from "../../../@types/Command.js";
import os from "os";
import ms from "pretty-ms";

export default class implements PrefixCommand {
  name = "lavalink";
  description = "Shows the Lavalink information of the Bot";
  category = "Info";
  accessableby = Accessableby.Member;
  usage = "";
  aliases = ["nodes", "lava"];
  lavalink = false;

  async run(
    client: Manager,
    message: Message,
    args: string[],
    language: string,
    prefix: string
  ) {
    const totalMemory = os.totalmem() / 1024 / 1024;
    const usedMemory = process.memoryUsage().rss / 1024 / 1024;
    const node = Array.from(client.manager.shoukaku.nodes.values())[0];
    if (node) {
      const nodeStats = node.stats;

      const lavalinkembed = new EmbedBuilder().setAuthor({
        name: `${message.guild!.members.me!.displayName} Lavalink`,
        url: client.config.bot.SERVER_SUPPORT,
        iconURL: client.user!.displayAvatarURL() as string,
      });

      if (nodeStats != null) {
        lavalinkembed.addFields(
          {
            name: "Name",
            value: `\`\`\`${node.name} ${nodeStats ? "🟢" : "🔴"}\`\`\``,
            inline: true,
          },
          {
            name: "Player",
            value: `\`\`\`${nodeStats.players}\`\`\``,
            inline: true,
          },
          {
            name: "Playing Players",
            value: `\`\`\`${nodeStats.playingPlayers}\`\`\``,
            inline: true,
          },
          {
            name: "Uptime",
            value: `\`\`\`${ms(nodeStats.uptime)}\`\`\``,
            inline: true,
          },
          {
            name: "Cores",
            value: `\`\`\`${nodeStats.cpu.cores} Core(s)\`\`\``,
            inline: true,
          },
          {
            name: "Memory Usage",
            value: `\`\`\`${usedMemory.toFixed(2)}/${totalMemory.toFixed(
              2
            )} (MB)\`\`\``,
            inline: true,
          },
          {
            name: "System Load",
            value: `\`\`\`${(
              Math.round(nodeStats.cpu.systemLoad * 100) / 100
            ).toFixed(2)}%\`\`\``,
            inline: true,
          },
          {
            name: "Lavalink Load",
            value: `\`\`\`${(
              Math.round(nodeStats.cpu.lavalinkLoad * 100) / 100
            ).toFixed(2)}%\`\`\``,
            inline: true,
          }
        );
      } else {
        lavalinkembed.setDescription("Node stats not available");
      }
      lavalinkembed.setColor(client.color);

      const lavalinkbutton = new ActionRowBuilder<ButtonBuilder>()
        .addComponents(
          new ButtonBuilder()
            .setLabel("Invite Me")
            .setStyle(ButtonStyle.Link)
            .setURL(client.config.bot.INVITE_URL)
        )
        .addComponents(
          new ButtonBuilder()
            .setLabel("Server Support")
            .setStyle(ButtonStyle.Link)
            .setURL(client.config.bot.SERVER_SUPPORT)
        )
        .addComponents(
          new ButtonBuilder()
            .setLabel("Vote Me")
            .setStyle(ButtonStyle.Link)
            .setURL(client.config.bot.VOTE_URL)
        );
      await message.reply({
        embeds: [lavalinkembed],
        components: [lavalinkbutton],
      });
    }
  }
}
