import { Manager } from "../../manager.js";
import { stripIndents } from "common-tags";
import {
  EmbedBuilder,
  WebhookClient,
  ChannelType,
  TextChannel,
  Guild,
} from "discord.js";
export default class BotLogs {
  async execute(client: Manager) {
    // Guild Create Event
    const webhookURL = client.config.ServerSupport.BOTLOGS_JOINLEFT;
    const webhookClient = new WebhookClient({ url: webhookURL });
    client.on("guildCreate", async (guild: Guild) => {
      client.logger.info(`Joined guild: ${guild.name} - ${guild.id}`);

      try {
        const owner = await client.users.fetch(guild.ownerId);

        const embed = new EmbedBuilder()
          .setThumbnail(guild.iconURL({ size: 1024 }))
          .setTitle("📥 Joined a Guild !!")
          .addFields(
            {
              name: "Name Server",
              value: `\`${guild.name}\` \n \`${guild.id}\``,
              inline: true,
            },
            {
              name: "Member Count",
              value: `\`${guild.memberCount}\` Members`,
              inline: true,
            },
            {
              name: "Server Owner",
              value: `\`${owner.tag ?? "Unknown user"}\` (${owner.id})`,
              inline: true,
            },
            {
              name: "Created At",
              value: `<t:${Math.floor(guild.createdTimestamp / 1000)}:F>`,
              inline: true,
            },
            {
              name: "Joined At",
              value: `<t:${Math.floor(guild.joinedTimestamp / 1000)}:F>`,
              inline: true,
            },
            {
              name: `${client.user!.username}'s Server Count`,
              value: `\`${client.guilds.cache.size}\` Servers`,
              inline: true,
            }
          )
          .setColor(client.color)
          .setTimestamp();
        webhookClient.send({ embeds: [embed] });

        // Introduce the bot
        let PREFIX = client.prefix;
        let guildChannel = guild.channels.cache.find((channel) => {
          if (
            channel.type === ChannelType.GuildText &&
            channel.permissionsFor(client.user!)?.has("SendMessages")
          ) {
            return channel.name.toLowerCase().includes("bot");
          }
          return false;
        });

        if (!guildChannel) {
          const textChannels = guild.channels.cache.filter(
            (channel) =>
              channel.type === ChannelType.GuildText &&
              channel.permissionsFor(client.user!)?.has("SendMessages")
          );
          const randomChannel = textChannels.random();
          if (randomChannel) {
            guildChannel = randomChannel;
          }
        }
        if (guildChannel) {
          const welcomeEmbed = new EmbedBuilder()
            .setAuthor({
              name: `${client.user!.username} Thankyou!`,
              url: client.config.bot.SERVER_SUPPORT,
              iconURL: client.user!.displayAvatarURL() as string,
            })
            .setThumbnail(client.user!.displayAvatarURL())
            .setColor(client.color)
            .setDescription(
              stripIndents`
            ${client.i18n.get("en", "help", "introadd1", {
              bot: client.user!.username,
            })}
            ${client.i18n.get("en", "help", "prefixadd", {
              prefix: PREFIX,
              bot: client.user!.username,
              serversupport: client.config.bot.SERVER_SUPPORT,
            })}
            ${client.i18n.get("en", "help", "introadd2", {
              prefix: PREFIX,
              bot: client.user!.username,
              serversupport: client.config.bot.SERVER_SUPPORT,
            })}
          `
            )
            .setImage(client.config.bot.IMGURL_GUILDADD);

          await (guildChannel as TextChannel).send({
            embeds: [welcomeEmbed],
            components: [],
          });
        }
      } catch (error) {
        client.logger.warn("Error sending guildCreate event to webhook");
      }
    });

    // Guild Delete Event
    client.on("guildDelete", async (guild: Guild) => {
      client.logger.info(`Left guild: ${guild.name} - ${guild.id}`);

      try {
        const owner = await client.users.fetch(guild.ownerId);

        const embed = new EmbedBuilder()
          .setThumbnail(guild.iconURL({ size: 1024 }))
          .setTitle("📤 Left a Guild !!")
          .addFields(
            {
              name: "Name Server",
              value: `\`${guild.name}\` \n \`${guild.id}\``,
              inline: true,
            },
            {
              name: "Member Count",
              value: `\`${guild.memberCount}\` Members`,
              inline: true,
            },
            {
              name: "Server Owner",
              value: `\`${owner.tag ?? "Unknown user"}\` (${owner.id})`,
              inline: true,
            },
            {
              name: "Created At",
              value: `<t:${Math.floor(guild.createdTimestamp / 1000)}:F>`,
              inline: true,
            },
            {
              name: "Joined At",
              value: `<t:${Math.floor(guild.joinedTimestamp / 1000)}:F>`,
              inline: true,
            },
            {
              name: `${client.user!.username}'s Server Count`,
              value: `\`${client.guilds.cache.size}\` Servers`,
              inline: true,
            }
          )
          .setColor(client.color)
          .setTimestamp();

        webhookClient.send({ embeds: [embed] });
      } catch (error) {
        client.logger.warn("Error sending guildDelete event to webhook");
      }
    });
  }
}
