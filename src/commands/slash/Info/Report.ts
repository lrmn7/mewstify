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
  name = ["report"];
  description = "Send a report bugs!";
  category = "Info";
  accessableby = Accessableby.Member;
  lavalink = false;
  options = [
    {
      name: "description",
      description: "The description of your bugs report",
      required: true,
      type: ApplicationCommandOptionType.String,
    },
    {
      name: "image",
      description: "The image of your bugs report",
      required: false,
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
    const imageUrl = (
      interaction.options as CommandInteractionOptionResolver
    ).getString("image");

    // Mendapatkan channel untuk mengirimkan pesan
    const channelId = client.config.ServerSupport.BUG_REPORT_CHANNEL_ID; // Ganti dengan ID channel yang sesuai
    const channel = client.channels.cache.get(channelId) as TextChannel;

    if (!channel) {
      const errorEmbed = new EmbedBuilder()
        .setColor(client.color)
        .setDescription(
          `${client.i18n.get(language, "info", "report_failure")}`
        );

      return interaction.editReply({ embeds: [errorEmbed] });
    }

    const suggestionEmbed = new EmbedBuilder()
      .setAuthor({
        name: `${interaction.guild!.members.me!.displayName} Report`,
        url: client.config.bot.SERVER_SUPPORT,
        iconURL: client.user!.displayAvatarURL() as string,
      })
      .setDescription(`\`\`\`${input}\`\`\``)
      .setFooter({
        text: `Report by ${interaction.user.tag}`,
        iconURL: interaction.user.displayAvatarURL() as string,
      })
      .setColor(client.color);

    // Mengirim pesan ke channel yang ditentukan
    try {
      if (imageUrl) {
        if (imageUrl.match(/\.(jpeg|jpg|gif|png)$/)) {
          suggestionEmbed.setImage(imageUrl);
        } else {
          const errorEmbed = new EmbedBuilder()
            .setColor(client.color)
            .setDescription(
              `${client.i18n.get(language, "info", "report_img_invalid")}`
            );

          return interaction.editReply({ embeds: [errorEmbed] });
        }
      }

      await channel.send({ embeds: [suggestionEmbed] });
      const successEmbed = new EmbedBuilder()
        .setColor(client.color)
        .setDescription(
          `${client.i18n.get(language, "info", "report_success")}`
        );

      return interaction.editReply({ embeds: [successEmbed] });
    } catch (error) {
      client.logger.error("Error sending report:", error);
      const errorEmbed = new EmbedBuilder()
        .setColor(client.color)
        .setDescription(
          `${client.i18n.get(language, "info", "report_failure")}`
        );

      return interaction.editReply({ embeds: [errorEmbed] });
    }
  }
}
