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
  name = ["invite"];
  description = "Shows the invite information of the Bot";
  category = "Info";
  accessableby = Accessableby.Member;
  options = [];
  lavalink = false;

  async run(
    interaction: CommandInteraction,
    client: Manager,
    language: string
  ) {
    await interaction.deferReply({ ephemeral: false });
    const inviteembed = new EmbedBuilder()
      .setTitle(
        `${client.i18n.get(language, "info", "inv_title", {
          username: client.user!.username,
          support: client.config.bot.SERVER_SUPPORT,
        })}`
      )
      .setDescription(
        `${client.i18n.get(language, "info", "inv_desc", {
          username: client.user!.username,
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

    await interaction.editReply({
      embeds: [inviteembed],
      components: [invitebutton],
    });
  }
}
