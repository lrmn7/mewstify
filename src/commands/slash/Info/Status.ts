import {
  CommandInteraction,
  EmbedBuilder,
  version,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
} from "discord.js";
import { Accessableby, SlashCommand } from "../../../@types/Command.js";
import { Manager } from "../../../manager.js";
import os from "os";
import ms from "pretty-ms";

export default class implements SlashCommand {
  name = ["status"];
  description = "Display the bot status";
  accessableby = Accessableby.Member;
  lavalink = false;
  category = "Info";
  options = [];

  async run(
    interaction: CommandInteraction,
    client: Manager,
    language: string
  ) {
    let uptime = await os.uptime();

    let d = Math.floor(uptime / (3600 * 24));
    let h = Math.floor((uptime % (3600 * 24)) / 3600);
    let m = Math.floor((uptime % 3600) / 60);
    let s = Math.floor(uptime % 60);
    let dDisplay = d > 0 ? `${d} day${d === 1 ? "" : "s"}, ` : "";
    let hDisplay = h > 0 ? `${h} hour${h === 1 ? "" : "s"}, ` : "";
    let mDisplay = m > 0 ? `${m} minute${m === 1 ? "" : "s"}, ` : "";
    let sDisplay = s > 0 ? `${s} second${s === 1 ? "" : "s"}` : "";
    const cpuCores = os.cpus().length; // Number of CPU cores
    const total = os.totalmem() / 1024 / 1024;
    const used = process.memoryUsage().rss / 1024 / 1024;
    await interaction.deferReply({ ephemeral: false });
    const statusembed = new EmbedBuilder()
      .setAuthor({
        name: `${interaction.guild!.members.me!.displayName} Status`,
        url: client.config.bot.SERVER_SUPPORT,
        iconURL: client.user!.displayAvatarURL() as string,
      })
      .setDescription(
        `\`\`\`yml\nStatus: Online\nUptime: ${ms(client.uptime as number)}\nSystem Uptime: ${dDisplay + hDisplay + mDisplay + sDisplay}\n\`\`\``
      )
      .addFields([
        {
          name: "Uptime",
          value: `\`\`\`${ms(client.uptime as number)}\`\`\``,
          inline: true,
        },
        {
          name: "WebSocket Ping",
          value: `\`\`\`${client.ws.ping}ms\`\`\``,
          inline: true,
        },
        {
          name: "Memory",
          value: `\`\`\`${(process.memoryUsage().rss / 1024 / 1024).toFixed(
            2
          )} MB RSS\n${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(
            2
          )} MB Heap\`\`\``,
          inline: true,
        },
        {
          name: "Guild Count",
          value: `\`\`\`${client.guilds.cache.size} guilds\`\`\``,
          inline: true,
        },
        {
          name: "User Count",
          value: `\`\`\`${client.guilds.cache.reduce(
            (a, b) => a + b.memberCount,
            0
          )}\`\`\``,
          inline: true,
        },
        {
          name: "Node",
          value: `\`\`\`${process.version}\`\`\``,
          inline: true,
        },
        {
          name: "Cached Data",
          value: `\`\`\`${client.guilds.cache.reduce(
            (a, b) => a + b.memberCount,
            0
          )} users\n${client.emojis.cache.size} emojis\`\`\``,
          inline: true,
        },
        {
          name: "RAM Usage",
          value: `\`\`\`${used.toFixed(2)}/${total.toFixed(2)} (MB)\`\`\``,
          inline: true,
        },
        {
          name: "RAM Total",
          value: `\`\`\`${(total / 1024).toFixed(2)} GB\`\`\``,
          inline: true,
        },
        {
          name: "vCore",
          value: `\`\`\`${cpuCores}\`\`\``,
          inline: true,
        },
        {
          name: "OS",
          value: `\`\`\`${os.type()} ${os.release()} (${os.arch()})\`\`\``,
          inline: true,
        },
        { name: "Discord.js", value: `\`\`\`${version}\`\`\``, inline: true },
        {
          name: "Bot Version",
          value: `\`\`\`${client.metadata.version}\`\`\``,
          inline: true,
        },
        {
          name: "Autofix",
          value: `\`\`\`${client.metadata.autofix}\`\`\``,
          inline: true,
        },
        {
          name: "Codename",
          value: `\`\`\`${client.metadata.codename}\`\`\``,
          inline: true,
        },
      ])
      .setColor(client.color);

    const statusbutton = new ActionRowBuilder<ButtonBuilder>()
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
    await interaction.editReply({
      embeds: [statusembed],
      components: [statusbutton],
    });
  }
}
