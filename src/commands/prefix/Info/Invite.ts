import { Manager } from "../../../manager.js";
import {
  ButtonStyle,
  Message,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
} from "discord.js";
import { Accessableby, PrefixCommand } from "../../../@types/Command.js";

export default class implements PrefixCommand {
  name = "invite";
  description = "Shows the invite information of the Bot";
  category = "Info";
  usage = "";
  aliases = [];
  accessableby = Accessableby.Member;
  lavalink = false;

  async run(
    client: Manager,
    message: Message,
    args: string[],
    language: string,
    prefix: string
  ) {
    const inviteembed = new EmbedBuilder()
      .setAuthor({
        name: `${message.guild!.members.me!.displayName} Invite`,
        url: client.config.bot.SERVER_SUPPORT,
        iconURL: client.user!.displayAvatarURL() as string,
      })
      .setTitle(
        `${client.i18n.get(language, "info", "inv_title", {
          username: client.user!.username,
          support: client.config.bot.SERVER_SUPPORT,
        })}`
      )
      .setDescription(
        `${client.i18n.get(language, "info", "inv_desc", {
          support: client.config.bot.SERVER_SUPPORT,
        })}`
      )
      .setColor(client.color);

    const invitebutton = new ActionRowBuilder<ButtonBuilder>().addComponents(
      new ButtonBuilder()
        .setLabel("Invite Me")
        .setStyle(ButtonStyle.Link)
        .setURL(client.config.bot.INVITE_URL)
    );

    await message.reply({ embeds: [inviteembed], components: [invitebutton] });
  }
}
