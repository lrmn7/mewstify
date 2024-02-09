import { Message } from "discord.js";
import { Manager } from "../../../manager.js";
import { EmbedBuilder } from "discord.js";
import { Accessableby, PrefixCommand } from "../../../@types/Command.js";
import { stripIndents } from "common-tags";

export default class implements PrefixCommand {
  name = "github";
  description = "shows GitHub statistics of a user";
  category = "Utils";
  usage = "<username>";
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
      const username = args[0];

      if (!username) {
        const embed = new EmbedBuilder().setColor(client.color).setDescription(
          client.i18n.get(language, "utilities", "github_usage", {
            usage: `${prefix}github <username>`,
          })
        );

        return await message.reply({ embeds: [embed] });
      }

      const response = await fetch(`https://api.github.com/users/${username}`);

      if (response.status === 404) {
        const embed = new EmbedBuilder().setColor(client.color).setDescription(
          `${client.i18n.get(language, "utilities", "github_nouser", {
            username: username,
          })}`
        );

        return await message.reply({ embeds: [embed] });
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

      await message.reply({ embeds: [embedGithub] });
    } catch (error) {
      client.logger.error("Error fetching data in github", error);
      const errorEmbed = new EmbedBuilder()
        .setColor(client.color)
        .setDescription(
          `${client.i18n.get(language, "utilities", "github_error")}`
        );
      await message.reply({
        embeds: [errorEmbed],
      });
    }
  }
}
