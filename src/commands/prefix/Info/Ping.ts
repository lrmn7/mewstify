import { ButtonStyle, Message } from "discord.js";
import { Manager } from "../../../manager.js";
import { EmbedBuilder, ActionRowBuilder, ButtonBuilder } from "discord.js";
import { Accessableby, PrefixCommand } from "../../../@types/Command.js";

export default class implements PrefixCommand {
  name = "ping";
  description = "Shows the ping information of the Bot";
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
    const pingembed = new EmbedBuilder()
      .setAuthor({
        name: `${message.guild!.members.me!.displayName} Pong!`,
        url: client.config.bot.SERVER_SUPPORT,
        iconURL: client.user!.displayAvatarURL() as string,
      })
      .setDescription(
        `${client.i18n.get(language, "info", "ping_desc", {
          ping: String(client.ws.ping),
        })}`
      )
      .setColor(client.color);

    const pingbutton = new ActionRowBuilder<ButtonBuilder>().addComponents(
      new ButtonBuilder()
        .setLabel("Invite Me")
        .setStyle(ButtonStyle.Link)
        .setURL(client.config.bot.INVITE_URL)
    );

    await message.reply({ embeds: [pingembed], components: [pingbutton] });
  }
}
