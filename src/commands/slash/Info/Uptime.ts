import {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  CommandInteraction,
  ButtonStyle,
} from "discord.js";
import { Manager } from "../../../manager.js";
import { Accessableby, SlashCommand } from "../../../@types/Command.js";
import os from "os";
import ms from "pretty-ms";

export default class implements SlashCommand {
  name = ["uptime"];
  description = "Shows the uptime of the Bot";
  category = "Info";
  options = [];
  lavalink = false;
  accessableby = Accessableby.Member;

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

    await interaction.deferReply({ ephemeral: false });

    const uptimeembed = new EmbedBuilder()
      .setTitle(`⏲ Uptime Information!`)
      .setDescription(
        `\`\`\`yml\nStatus: Online\nUptime: ${ms(client.uptime as number)}\nSystem Uptime: ${dDisplay + hDisplay + mDisplay + sDisplay}\n\`\`\``
      )
      .setColor(client.color);
    const uptimebutton = new ActionRowBuilder<ButtonBuilder>().addComponents(
      new ButtonBuilder()
        .setLabel("Invite Me")
        .setStyle(ButtonStyle.Link)
        .setURL(client.config.bot.INVITE_URL)
    );

    await interaction.editReply({
      embeds: [uptimeembed],
      components: [uptimebutton],
    });
  }
}
