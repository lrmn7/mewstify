import {
  CommandInteraction,
  ApplicationCommandOptionType,
  CommandInteractionOptionResolver,
  EmbedBuilder,
} from "discord.js";
import { Manager } from "../../../manager.js";
import { Accessableby, SlashCommand } from "../../../@types/Command.js";

export default class implements SlashCommand {
  name = ["animated-avatar"];
  description = "Change avatar of the bot with animated";
  category = "Dev";
  accessableby = Accessableby.Owner;
  lavalink = false;
  options = [
    {
      name: "avatar",
      description: "The avatar of the bot",
      required: true,
      type: ApplicationCommandOptionType.Attachment,
    },
  ];

  async run(
    interaction: CommandInteraction,
    client: Manager,
    language: string
  ) {
    try {
      await interaction.deferReply({ ephemeral: false });

      // Dapatkan attachment dari opsi "avatar"
      const avatar = await (
        interaction.options as CommandInteractionOptionResolver
      ).getAttachment("avatar");

      // Menampilkan pesan sementara
      const msg = await interaction.editReply({
        embeds: [
          new EmbedBuilder()
            .setDescription(
              `${client.i18n.get(language, "utilities", "new_avatar_loading")}`
            )
            .setColor(client.color),
        ],
      });

      if (avatar?.contentType !== "image/gif")
        return msg.edit({
          embeds: [
            new EmbedBuilder()
              .setDescription(
                `${client.i18n.get(language, "utilities", "new_avatar_not_gif")}`
              )
              .setColor(client.color),
          ],
        });

      // Mengubah avatar bot dengan gambar yang diberikan
      // Setel avatar bot dengan URL attachment
      await client.user?.setAvatar(avatar.url);

      // Memberi tahu bahwa avatar telah berhasil diubah
      await interaction.editReply({
        embeds: [
          new EmbedBuilder()
            .setDescription(
              `${client.i18n.get(language, "utilities", "new_avatar_success")}`
            )
            .setColor(client.color),
        ],
      });
    } catch (error) {
      // Tangani kesalahan
      client.logger.error("Error changing avatar:", error);
      await interaction.editReply({
        content: "An error occurred while changing the avatar.",
      });
    }
  }
}
