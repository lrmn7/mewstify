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
  name = ["update"];
  description = "Launch the bot update informations!";
  category = "Dev";
  accessableby = Accessableby.Owner;
  lavalink = false;
  options = [
    {
      name: "description",
      description: "The description of your update",
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
    const channelId = client.config.ServerSupport.UPDATE_CHANNEL_ID; // Ganti dengan ID channel yang sesuai
    const channel = interaction.guild?.channels.cache.get(
      channelId
    ) as TextChannel;

    if (!channel) {
      const errorEmbed = new EmbedBuilder()
        .setColor(client.color)
        .setDescription(
          `${client.i18n.get(language, "info", "update_failure")}`
        );

      return interaction.editReply({ embeds: [errorEmbed] });
    }

    // Mengirim pesan ke channel yang ditentukan
    try {
      await channel.send(`${input}`);
      const successEmbed = new EmbedBuilder()
        .setColor(client.color)
        .setDescription(
          `${client.i18n.get(language, "info", "update_success")}`
        );

      return interaction.editReply({ embeds: [successEmbed] });
    } catch (error) {
      client.logger.error("Error sending update:", error);
      const errorEmbed = new EmbedBuilder()
        .setColor(client.color)
        .setDescription(
          `${client.i18n.get(language, "info", "update_failure")}`
        );

      return interaction.editReply({ embeds: [errorEmbed] });
    }
  }
}
