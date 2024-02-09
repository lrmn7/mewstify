import { CommandInteraction } from "discord.js";
import { Manager } from "../../../manager.js";
import { EmbedBuilder, ApplicationCommandOptionType } from "discord.js";
import { Accessableby, SlashCommand } from "../../../@types/Command.js";

export default class implements SlashCommand {
  name = ["avatar"];
  description = "Show your or someone else's profile picture";
  category = "Utils";
  accessableby = Accessableby.Member;
  lavalink = false;
  options = [
    {
      name: "user",
      description: "Type your user here",
      type: ApplicationCommandOptionType.User,
      required: false,
    },
  ];

  async run(
    interaction: CommandInteraction,
    client: Manager,
    language: string
  ) {
    await interaction.deferReply({ ephemeral: false });
    const value = interaction.options.getUser("user");

    if (value) {
      const x64 = value.displayAvatarURL({ extension: "png", size: 64 });
      const x128 = value.displayAvatarURL({ extension: "png", size: 128 });
      const x256 = value.displayAvatarURL({ extension: "png", size: 256 });
      const x512 = value.displayAvatarURL({ extension: "png", size: 512 });
      const x1024 = value.displayAvatarURL({ extension: "png", size: 1024 });
      const x2048 = value.displayAvatarURL({ extension: "png", size: 2048 });

      const embedAvatar = new EmbedBuilder()
        //        .setTitle(`${value.username} ${value.discriminator}`)
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
      await interaction.editReply({ embeds: [embedAvatar] });
    } else {
      const x256 = interaction.user.displayAvatarURL({
        extension: "png",
        size: 256,
      });
      const x64 = interaction.user.displayAvatarURL({
        extension: "png",
        size: 64,
      });
      const x128 = interaction.user.displayAvatarURL({
        extension: "png",
        size: 128,
      });
      const x512 = interaction.user.displayAvatarURL({
        extension: "png",
        size: 512,
      });
      const x1024 = interaction.user.displayAvatarURL({
        extension: "png",
        size: 1024,
      });
      const x2048 = interaction.user.displayAvatarURL({
        extension: "png",
        size: 2048,
      });

      const embedAvatar = new EmbedBuilder()
        //        .setTitle(`${interaction.user.username} ${interaction.user.discriminator}`)
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
      await interaction.editReply({ embeds: [embedAvatar] });
    }
  }
}
