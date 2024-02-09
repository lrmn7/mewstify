import {
  EmbedBuilder,
  CommandInteraction,
  TextChannel,
  ApplicationCommandOptionType,
  CommandInteractionOptionResolver,
} from "discord.js";
import { Manager } from "../../../manager.js";
import { Accessableby, SlashCommand } from "../../../@types/Command.js";

export default class implements SlashCommand {
  name = ["suggestions"];
  description = "Send a suggestion!";
  category = "Info";
  accessableby = Accessableby.Member;
  lavalink = false;
  options = [
    {
      name: "description",
      description: "The description of your suggestion",
      required: true,
      type: ApplicationCommandOptionType.String,
    },
  ];

  async run(
    interaction: CommandInteraction,
    client: Manager,
    language: string
  ) {
    await interaction.deferReply({ ephemeral: false });

    const input = (
      interaction.options as CommandInteractionOptionResolver
    ).getString("description");

    // Mendapatkan channel untuk mengirimkan pesan
    const channelId = client.config.ServerSupport.SUGGESTION_CHANNEL_ID;
    const channel = client.channels.cache.get(channelId) as TextChannel;

    if (!channel) {
      const errorEmbed = new EmbedBuilder()
        .setColor(client.color)
        .setDescription(
          `${client.i18n.get(language, "info", "suggestions_failure")}`
        );

      return interaction.editReply({ embeds: [errorEmbed] });
    }

    const suggestionEmbed = new EmbedBuilder()
      .setAuthor({
        name: `${interaction.guild!.members.me!.displayName} Suggestion`,
        url: client.config.bot.SERVER_SUPPORT,
        iconURL: client.user!.displayAvatarURL() as string,
      })
      .setDescription(`\`\`\`${input}\`\`\``)
      .setFooter({
        text: `Suggestion by ${interaction.user.tag}`,
        iconURL: interaction.user.displayAvatarURL() as string,
      })
      .setColor(client.color);

    // Mengirim pesan ke channel yang ditentukan
    try {
      await channel.send({ embeds: [suggestionEmbed] });
      const successEmbed = new EmbedBuilder()
        .setColor(client.color)
        .setDescription(
          `${client.i18n.get(language, "info", "suggestions_success")}`
        );

      return interaction.editReply({ embeds: [successEmbed] });
    } catch (error) {
      client.logger.error("Error sending suggestion:", error);
      const errorEmbed = new EmbedBuilder()
        .setColor(client.color)
        .setDescription(
          `${client.i18n.get(language, "info", "suggestions_failure")}`
        );

      return interaction.editReply({ embeds: [errorEmbed] });
    }
  }
}
