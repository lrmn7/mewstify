import { EmbedBuilder, CommandInteraction } from "discord.js";
import { Manager } from "../../../manager.js";
import { Accessableby, SlashCommand } from "../../../@types/Command.js";

export default class implements SlashCommand {
  name = ["terms-of-service"];
  description = "Shows the terms of service of the Bot";
  category = "Info";
  options = [];
  lavalink = false;
  accessableby = Accessableby.Member;

  async run(
    interaction: CommandInteraction,
    client: Manager,
    language: string
  ) {
    await interaction.deferReply({ ephemeral: false });
    const termsembed = new EmbedBuilder()
      .setAuthor({
        name: `${interaction.guild!.members.me!.displayName} Terms of Service`,
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

    await interaction.editReply({
      embeds: [termsembed],
      components: [],
    });
  }
}
