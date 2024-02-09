import { Manager } from "../../../manager.js";
import {
  EmbedBuilder,
  ApplicationCommandOptionType,
  CommandInteraction,
} from "discord.js";
import { Accessableby, SlashCommand } from "../../../@types/Command.js";

export default class implements SlashCommand {
  name = ["info-member"];
  description = "Get information about a member";
  category = "Utils";
  accessableby = Accessableby.Member;
  lavalink = false;
  options = [
    {
      name: "user",
      description: "Type your user here",
      type: ApplicationCommandOptionType.User,
      required: true,
    },
  ];

  async run(
    interaction: CommandInteraction,
    client: Manager,
    language: string
  ) {
    const userOption = interaction.options.getUser("user");

    if (!userOption) {
      return interaction.reply("User not found.");
    }

    const guildMember = interaction.guild?.members.cache.get(userOption.id);

    if (!guildMember) {
      return interaction.reply("User is not a member of this server.");
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
      )
      .setColor(client.color);
    // .setFooter({ text: `Requested by ${interaction.user.tag}` });

    await interaction.reply({ embeds: [embedMemberInfo] });
  }
}
