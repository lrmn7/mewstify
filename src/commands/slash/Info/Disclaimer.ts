import { EmbedBuilder, CommandInteraction } from "discord.js";
import { Manager } from "../../../manager.js";
import {
  Accessableby,
  CommandOptionInterface,
  SlashCommand,
} from "../../../@types/Command.js";

export default class implements SlashCommand {
  name = ["disclaimer"];
  description = "Shows some disclaimers!";
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
    const DisclaimerEmbed = new EmbedBuilder()
      .setAuthor({
        name: `${interaction.guild!.members.me!.displayName} DISCLAIMER!`,
        url: client.config.bot.SERVER_SUPPORT,
        iconURL: client.user!.displayAvatarURL() as string,
      })
      .setDescription(
        `${client.i18n.get(language, "info", "disclaimer_desc", {
          support: client.config.bot.SERVER_SUPPORT,
        })}`
      )
      .setColor(client.color);

    await interaction.editReply({
      embeds: [DisclaimerEmbed],
      components: [],
    });
  }
}
