import { Manager } from "../../../manager.js";
import { Accessableby, SlashCommand } from "../../../@types/Command.js";
import {
  EmbedBuilder,
  ApplicationCommandOptionType,
  CommandInteraction,
  CommandInteractionOptionResolver,
} from "discord.js";
import { stripIndents } from "common-tags";

export default class implements SlashCommand {
  name = ["github"];
  description = "shows GitHub statistics of a user";
  category = "Utils";
  accessableby = Accessableby.Member;
  lavalink = false;
  options = [
    {
      name: "username",
      description: "GitHub username",
      type: ApplicationCommandOptionType.String,
      required: true,
    },
  ];

  async run(
    interaction: CommandInteraction,
    client: Manager,
    language: string
  ) {
    await interaction.deferReply({ ephemeral: false });
    try {
      // Use the 'username' directly from the parameter
      const username = (
        interaction.options as CommandInteractionOptionResolver
      )?.getString("username")!;

      const response = await fetch(`https://api.github.com/users/${username}`);
      if (response.status === 404) {
        const embed = new EmbedBuilder().setColor(client.color).setDescription(
          client.i18n.get(language, "utilities", "github_nouser", {
            username: username,
          })
        );

        return await interaction.editReply({ embeds: [embed] });
      }

      const json = await response.json();
      const {
        login,
        name,
        id: githubId,
        avatar_url: avatarUrl,
        html_url: userPageLink,
        followers,
        following,
        bio,
        location,
        blog,
      } = json;

      const website =
        blog && (blog.startsWith("http://") || blog.startsWith("https://"))
          ? `[Click me](${blog})`
          : "Not Provided";

      const embedGithub = new EmbedBuilder()
        .setAuthor({
          name: `GitHub User: ${login}`,
          url: userPageLink,
          iconURL: avatarUrl,
        })
        .addFields(
          {
            name: "User Info",
            value: stripIndents`
              **Real Name**: *${name || "Not Provided"}*
              **Location**: *${location || "Not Provided"}*
              **GitHub ID**: *${githubId}*
              **Website**: *${website}*\n`,
            inline: true,
          },
          {
            name: "Social Stats",
            value: `**Followers**: *${followers}*\n**Following**: *${following}*`,
            inline: true,
          }
        )
        .setDescription(`**Bio**:\n${bio || "Not Provided"}`)
        .setImage(avatarUrl)
        .setColor(client.color);
      //       .setFooter({ text: `Requested by ${interaction.user.username}` });

      await interaction.editReply({ embeds: [embedGithub] });
    } catch (error) {
      client.logger.error("Error fetching data in github");
      const errorEmbed = new EmbedBuilder()
        .setColor(client.color)
        .setDescription(
          `${client.i18n.get(language, "utilities", "github_error")}`
        );
      await interaction.editReply({
        embeds: [errorEmbed],
      });
    }
  }
}
