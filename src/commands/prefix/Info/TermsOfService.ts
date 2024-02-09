import { Manager } from "../../../manager.js";
import { EmbedBuilder, Message } from "discord.js";
import { Accessableby, PrefixCommand } from "../../../@types/Command.js";

export default class implements PrefixCommand {
  name = "termsofservice";
  description = "Shows the terms of service of the Bot";
  category = "Info";
  accessableby = Accessableby.Member;
  usage = "";
  aliases = ["terms", "tos"];
  lavalink = false;

  async run(
    client: Manager,
    message: Message,
    args: string[],
    language: string,
    prefix: string
  ) {
    const termsembed = new EmbedBuilder()
      .setAuthor({
        name: `${message.guild!.members.me!.displayName} Terms Of Service`,
        url: client.config.bot.SERVER_SUPPORT,
        iconURL: client.user!.displayAvatarURL() as string,
      })
      .setDescription(
        `${client.i18n.get(language, "info", "termsofservice", {
          bot: client.user!.username,
          serversupport: client.config.bot.SERVER_SUPPORT,
          developer: client.config.bot.DEVELOPER_URL,
        })}`
      )
      .setColor(client.color);

    await message.reply({ embeds: [termsembed], components: [] });
  }
}
