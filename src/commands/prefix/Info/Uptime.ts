import { ButtonStyle, Message } from "discord.js";
import { Manager } from "../../../manager.js";
import { EmbedBuilder, ActionRowBuilder, ButtonBuilder } from "discord.js";
import { Accessableby, PrefixCommand } from "../../../@types/Command.js";
import os from "os";
import ms from "pretty-ms";

export default class implements PrefixCommand {
  name = "uptime";
  description = "Shows the uptime of the Bot";
  category = "Info";
  accessableby = Accessableby.Member;
  usage = "";
  aliases = [];
  lavalink = false;

  async run(
    client: Manager,
    message: Message,
    args: string[],
    language: string,
    prefix: string
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

    await message.reply({ embeds: [uptimeembed], components: [uptimebutton] });
  }
}
