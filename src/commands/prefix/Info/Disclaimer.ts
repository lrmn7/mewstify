import { Manager } from "../../../manager.js";
import { EmbedBuilder, Message } from "discord.js";
import { Accessableby, PrefixCommand } from "../../../@types/Command.js";

export default class implements PrefixCommand {
  name = "disclaimer";
  description = "Shows some disclaimers!";
  category = "Info";
  usage = "";
  aliases = ["disc", "disclaim"];
  accessableby = Accessableby.Member;
  lavalink = false;

  async run(
    client: Manager,
    message: Message,
    args: string[],
    language: string,
    prefix: string
  ) {
    const DisclaimerEmbed = new EmbedBuilder()
      .setAuthor({
        name: `${message.guild!.members.me!.displayName} DISCLAIMER!`,
        url: client.config.bot.SERVER_SUPPORT,
        iconURL: client.user!.displayAvatarURL() as string,
      })
      .setDescription(
        `${client.i18n.get(language, "info", "disclaimer_desc", {
          support: client.config.bot.SERVER_SUPPORT,
        })}`
      )
      .setColor(client.color);

    await message.reply({
      embeds: [DisclaimerEmbed],
      components: [],
    });
  }
}
