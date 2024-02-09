import {
  GuildVerificationLevel,
  EmbedBuilder,
  ChannelType,
  CommandInteraction,
} from "discord.js";
import { Manager } from "../../../manager.js";
import { Accessableby, SlashCommand } from "../../../@types/Command.js";
import moment from "moment";

export default class implements SlashCommand {
  name = ["info-guild"];
  description = "shows information about the server";
  category = "Utils";
  accessableby = Accessableby.Member;
  options = [];
  lavalink = false;

  async run(
    interaction: CommandInteraction,
    client: Manager,
    language: string
  ) {
    await interaction.deferReply({ ephemeral: false });
    const guild = interaction.guild;
    if (!guild) {
      return;
    }

    const owner = await guild.members.fetch(guild.ownerId);

    const id = guild.id;
    const name = guild.name;
    const preferredLocale = guild.preferredLocale;
    await guild.members.fetch(); // Fetches the latest member information

    // Assuming memberCache is supposed to be a property of guild.members
    const memberCache = guild.members.cache;
    const all = memberCache.size;
    const bots = memberCache.filter((m) => m.user.bot).size;
    const users = all - bots;

    const onlineUsers = memberCache.filter(
      (m) => !m.user.bot && m.presence?.status === "online"
    ).size;
    const onlineBots = memberCache.filter(
      (m) => m.user.bot && m.presence?.status === "online"
    ).size;
    const onlineAll = onlineUsers + onlineBots;

    await guild.channels.fetch(); // Fetches the latest channel information
    const totalChannels = guild.channels.cache.size;

    // Filter channels by type
    const categories = guild.channels.cache.filter(
      (channel) => channel.type === ChannelType.GuildCategory
    ).size;
    const textChannels = guild.channels.cache.filter(
      (channel) => channel.type === ChannelType.GuildText
    ).size;
    const voiceChannels = guild.channels.cache.filter(
      (channel) => channel.type === ChannelType.GuildVoice
    ).size;
    const threadChannels = guild.channels.cache.filter(
      (channel) =>
        channel.isThread() &&
        (channel.type === ChannelType.PublicThread ||
          channel.type === ChannelType.PrivateThread)
    ).size;

    const rolesCount = guild.roles.cache.size;
    const rolesString = guild.roles.cache.map((role) => role.name).join(", ");
    let verificationLevel: GuildVerificationLevel = guild.verificationLevel;
    switch (guild.verificationLevel) {
      case GuildVerificationLevel.VeryHigh:
        verificationLevel = GuildVerificationLevel.VeryHigh;
        break;

      case GuildVerificationLevel.High:
        verificationLevel = GuildVerificationLevel.High;
        break;

      default:
        break;
    }
    const createdAt = guild.createdAt;

    const embedGuildInfo = new EmbedBuilder()
      .setTitle("GUILD INFORMATION")
      .setThumbnail(guild.iconURL() || "")
      .setColor(client.color)
      .setDescription(
        `❯ **Id:** ${id}\n❯ **Name:** ${name}\n❯ **Owner:** ${owner.user.username}\n❯ **Region:** ${preferredLocale}\n\n`
      )
      .addFields(
        {
          name: `Server Members [${all}]`,
          value: `\`\`\`Members: ${users} | Bots: ${bots}\`\`\``,
          inline: true,
        },
        {
          name: `Categories and channels [${totalChannels}]`,
          value: `\`\`\`Categories: ${categories} | Text: ${textChannels} | Voice: ${voiceChannels} | Thread: ${threadChannels}\`\`\``,
          inline: false,
        },
        {
          name: `Roles [${rolesCount}]`,
          value: `\`\`\`${rolesString}\`\`\``,
          inline: false,
        },
        {
          name: "Verification",
          value: `\`\`\`${verificationLevel}\`\`\``,
          inline: true,
        },
        {
          name: "Boost Count",
          value: `\`\`\`${guild.premiumSubscriptionCount}\`\`\``,
          inline: true,
        },
        {
          name: `Server Created [${moment(createdAt).fromNow()}]`,
          value: `\`\`\`${moment(createdAt).format("dddd, Do MMMM YYYY")}\`\`\``,
          inline: false,
        }
      );

    if (guild.bannerURL())
      embedGuildInfo.setImage(guild.bannerURL({ extension: "png", size: 256 }));

    await interaction.editReply({ embeds: [embedGuildInfo] });
  }
}
