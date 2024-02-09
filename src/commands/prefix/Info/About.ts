import {
  ButtonStyle,
  Message,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
} from "discord.js";
import { Manager } from "../../../manager.js";
import { Accessableby, PrefixCommand } from "../../../@types/Command.js";

export default class implements PrefixCommand {
  name = "about";
  description = "Shows the developer information of the Bot (Credit)";
  category = "Info";
  usage = "";
  aliases = ["dev"];
  accessableby = Accessableby.Member;
  lavalink = false;

  async run(
    client: Manager,
    message: Message,
    args: string[],
    language: string,
    prefix: string
  ) {
    const aboutembed = new EmbedBuilder()
      .setAuthor({
        name: `${message.guild!.members.me!.displayName} About`,
        url: client.config.bot.SERVER_SUPPORT,
        iconURL: client.user!.displayAvatarURL() as string,
      })
      .setFooter({ text: `${client.i18n.get(language, "info", "dev_foot")}` })
      .addFields(
        {
          name: "Developer",
          value: `**[${client.config.bot.DEVELOPER_NAME}](${client.config.bot.DEVELOPER_URL})**`,
          inline: true,
        },
        {
          name: "Type",
          value: "**Music bot**",
          inline: true,
        },
        {
          name: "Donate",
          value: `**[Patreon](${client.config.bot.DONATE_URL})**`,
          inline: true,
        }
      )
      .setImage(client.config.bot.IMGURL_MENUHELP)
      .setColor(client.color);

    const aboutbutton = new ActionRowBuilder<ButtonBuilder>()
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

    await message.reply({ embeds: [aboutembed], components: [aboutbutton] });
  }
}
