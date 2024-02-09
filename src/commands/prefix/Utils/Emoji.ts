import { Message, parseEmoji } from "discord.js";
import { Manager } from "../../../manager.js";
import { EmbedBuilder } from "discord.js";
import { Accessableby, PrefixCommand } from "../../../@types/Command.js";

export default class implements PrefixCommand {
  name = "emoji";
  description = "Display emoji information ID";
  category = "Utils";
  usage = "<emoji> or <unicode>";
  aliases = [];
  accessableby = Accessableby.Member;
  lavalink = false;

  async run(
    client: Manager,
    message: Message,
    args: string[],
    language: string,
    prefix: string
  ) {
    try {
      if (args.length === 0) {
        const embed = new EmbedBuilder().setColor(client.color).setDescription(
          client.i18n.get(language, "utilities", "usage_emoji", {
            usage: `${prefix}emoji <emoji>`,
          })
        );

        return await message.reply({ embeds: [embed] });
      }

      const emoji = args[0];

      const custom = parseEmoji(emoji);

      if (!custom || !custom.id) {
        const embedInvalid = new EmbedBuilder()
          .setColor(client.color)
          .setDescription(
            client.i18n.get(language, "utilities", "invalid_emoji")
          );
        return await message.reply({ embeds: [embedInvalid] });
      }

      let url = `https://cdn.discordapp.com/emojis/${custom.id}.${custom.animated ? "gif?v=1" : "png"}`;

      const embedEmoji = new EmbedBuilder()
        .setColor(client.color)
        .setAuthor({ name: "Emoji Information" })
        .setDescription(
          `**Id:** ${custom.id}\n` +
            `**Name:** ${custom.name}\n` +
            `**Animated:** ${custom.animated ? "Yes" : "No"}`
        )
        .setImage(url);

      await message.reply({ embeds: [embedEmoji] });
    } catch (error) {
      client.logger.error("Error in 'emoji' command:", error);
      const embedError = new EmbedBuilder()
        .setColor(client.color)
        .setDescription(
          `${client.i18n.get(language, "utilities", "error_emoji")}`
        );
      message.reply({ embeds: [embedError] });
    }
  }
}
