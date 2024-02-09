import {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  CommandInteraction,
  ButtonStyle,
} from "discord.js";
import { Manager } from "../../../manager.js";
import { Accessableby, SlashCommand } from "../../../@types/Command.js";

export default class implements SlashCommand {
  name = ["about"];
  description = "Shows the developer information of the Bot (Credit)";
  category = "Info";
  lavalink = false;
  options = [];
  accessableby = Accessableby.Member;

  async run(
    interaction: CommandInteraction,
    client: Manager,
    language: string
  ) {
    await interaction.deferReply({ ephemeral: false });
    const aboutembed = new EmbedBuilder()
      .setAuthor({
        name: `${interaction.guild!.members.me!.displayName} About`,
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
      .setThumbnail(client.user!.displayAvatarURL({ size: 2048 }))
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

    await interaction.editReply({
      embeds: [aboutembed],
      components: [aboutbutton],
    });
  }
}
