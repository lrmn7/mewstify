import { Message, parseEmoji } from "discord.js";
import { Manager } from "../../../manager.js";
import { EmbedBuilder } from "discord.js";
import { Accessableby, PrefixCommand } from "../../../@types/Command.js";

export default class implements PrefixCommand {
  name = "bigemoji";
  description = "emoji to enlarge";
  category = "Utils";
  usage = "<emoji>";
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
        const embedUsage = new EmbedBuilder()
          .setColor(client.color)
          .setDescription(
            `${client.i18n.get(language, "utilities", "usage_bigemoji", {
              usage: `${prefix}bigemoji <emoji>`,
            })}`
          );

        return await message.reply({ embeds: [embedUsage] });
      }

      const emoji = args[0];

      const custom = parseEmoji(emoji);

      if (!custom || !custom.id) {
        const embedInvalid = new EmbedBuilder()
          .setColor(client.color)
          .setDescription(
            `${client.i18n.get(language, "utilities", "invalid_emoji", {
              usage: `${prefix}bigemoji <emoji>`,
            })}`
          );
        return await message.reply({ embeds: [embedInvalid] });
      }

      const embedEmoji = new EmbedBuilder()
        .setColor(client.color)
        .setAuthor({ name: "Big Emoji" })
        .setImage(
          `https://cdn.discordapp.com/emojis/${custom.id}.${custom.animated ? "gif" : "png"}`
        );

      message.channel.send({ embeds: [embedEmoji] });
    } catch (error) {
      client.logger.error("Error in 'bigemoji' command:", error);
      message.channel.send(
        `${client.i18n.get(language, "utilities", "error_emoji")}`
      );
    }
  }
}
