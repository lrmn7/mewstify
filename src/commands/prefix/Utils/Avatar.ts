import { Accessableby, PrefixCommand } from "../../../@types/Command.js";
import { Manager } from "../../../manager.js";
import { EmbedBuilder, Message } from "discord.js";

export default class implements PrefixCommand {
  name = "avatar";
  description = "Show your or someone else's profile picture";
  category = "Utils";
  accessableby = Accessableby.Member;
  usage = "<mention>";
  aliases = [];
  lavalink = false;

  async run(
    client: Manager,
    message: Message,
    args: string[],
    language: string,
    prefix: string
  ) {
    const value = message.mentions.users.first();

    if (!value) {
      return message.reply({
        embeds: [
          new EmbedBuilder()
            .setDescription(
              `${client.i18n.get(language, "utilities", "arg_error", {
                text: "@mention",
              })}`
            )
            .setColor(client.color),
        ],
      });
    }

    const x64 = value.displayAvatarURL({ extension: "png", size: 64 });
    const x128 = value.displayAvatarURL({ extension: "png", size: 128 });
    const x256 = value.displayAvatarURL({ extension: "png", size: 256 });
    const x512 = value.displayAvatarURL({ extension: "png", size: 512 });
    const x1024 = value.displayAvatarURL({ extension: "png", size: 1024 });
    const x2048 = value.displayAvatarURL({ extension: "png", size: 2048 });

    if (value) {
      const embed = new EmbedBuilder()
        //      .setTitle(`${value.username} ${value.discriminator}`)
        .setImage(x256)
        .setDescription(
          `Links: • [x64](${x64}) ` +
            `• [x128](${x128}) ` +
            `• [x256](${x256}) ` +
            `• [x512](${x512}) ` +
            `• [x1024](${x1024}) ` +
            `• [x2048](${x2048}) `
        )
        .setColor(client.color);

      await message.reply({ embeds: [embed] });
    } else {
      const embed = new EmbedBuilder()
        //        .setTitle(message.author.username + (message.author.discriminator === "0"? "": "#" + message.author.discriminator))
        .setImage(x256)
        .setDescription(
          `Links: • [x64](${x64}) ` +
            `• [x128](${x128}) ` +
            `• [x256](${x256}) ` +
            `• [x512](${x512}) ` +
            `• [x1024](${x1024}) ` +
            `• [x2048](${x2048}) `
        )
        .setColor(client.color);

      await message.reply({ embeds: [embed] });
    }
  }
}
