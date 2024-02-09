import { Manager } from "../../../manager.js";
import {
  EmbedBuilder,
  ApplicationCommandOptionType,
  parseEmoji,
  CommandInteraction,
  CommandInteractionOptionResolver,
} from "discord.js";
import { Accessableby, SlashCommand } from "../../../@types/Command.js";

export default class implements SlashCommand {
  name = ["big-emoji"];
  description = "emoji to enlarge";
  category = "Utils";
  accessableby = Accessableby.Member;
  lavalink = false;
  options = [
    {
      name: "emoji",
      description: "The emoji you want to enlarge",
      type: ApplicationCommandOptionType.String,
      required: true,
    },
  ];

  async run(
    interaction: CommandInteraction,
    client: Manager,
    language: string
  ) {
    try {
      await interaction.deferReply({ ephemeral: false });

      const emoji = (
        interaction.options as CommandInteractionOptionResolver
      )?.getString("emoji")!;

      const custom = parseEmoji(emoji);

      if (!custom || !custom.id) {
        await interaction.editReply(
          `${client.i18n.get(language, "utilities", "invalid_emoji")}`
        );
        return;
      }

      const embedBigEmoji = new EmbedBuilder()
        .setColor(client.color)
        .setAuthor({ name: "Big Emoji" })
        .setImage(
          `https://cdn.discordapp.com/emojis/${custom.id}.${custom.animated ? "gif" : "png"}`
        );

      await interaction.editReply({ embeds: [embedBigEmoji] });
    } catch (error) {
      client.logger.error("Error in 'emoji' command:", error);
      await interaction.editReply(
        `${client.i18n.get(language, "utilities", "error_emoji")}`
      );
    }
  }
}
