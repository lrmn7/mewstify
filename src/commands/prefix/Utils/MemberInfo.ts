import { Accessableby, PrefixCommand } from "../../../@types/Command.js";
import { Manager } from "../../../manager.js";
import { EmbedBuilder, Message } from "discord.js";

export default class implements PrefixCommand {
  name = "memberinfo";
  description = "Get information about a member";
  category = "Utils";
  accessableby = Accessableby.Member;
  usage = "<mention>";
  aliases = ["meminfo"];
  lavalink = false;

  async run(
    client: Manager,
    message: Message,
    args: string[],
    language: string,
    prefix: string
  ) {
    const mentionedUser = message.mentions.users.first();

    if (!mentionedUser) {
      return message.channel.send({
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

    if (!message.guild) {
      return message.reply("This command can only be used in a server.");
    }

    // Fetch the guild member associated with the mentioned user
    const guildMember = message.guild.members.cache.get(mentionedUser.id);

    if (!guildMember) {
      return message.reply("User not found in the server.");
    }

    let rolesString = guildMember.roles.cache.map((r) => r.name).join(", ");
    if (rolesString.length > 1024)
      rolesString = rolesString.substring(0, 1020) + "...";

    const embedMemberInfo = new EmbedBuilder()
      .setAuthor({
        name: `User information for ${guildMember.displayName}`,
        iconURL: guildMember.user.displayAvatarURL(),
      })
      .setThumbnail(guildMember.user.displayAvatarURL())
      .setColor(client.color)
      .addFields(
        {
          name: "Username",
          value: `${guildMember.user.username}\n${guildMember.id}`,
          inline: true,
        },
        {
          name: "Guild Joined",
          value: guildMember.joinedAt?.toUTCString() || "Not available",
          inline: true,
        },
        {
          name: "Discord Registered",
          value: guildMember.user.createdAt.toUTCString() || "Not available",
          inline: true,
        },
        {
          name: `Roles [${guildMember.roles.cache.size}]`,
          value: rolesString,
          inline: false,
        },
        {
          name: "Avatar-URL",
          value: guildMember.user.displayAvatarURL({ extension: "png" }),
          inline: false,
        }
      );
    //     .setFooter({ text: `Requested by ${message.author.tag}` });

    await message.reply({ embeds: [embedMemberInfo] });
  }
}
