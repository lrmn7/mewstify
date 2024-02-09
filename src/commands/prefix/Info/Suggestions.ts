import { Message, EmbedBuilder, TextChannel } from "discord.js";
import { Manager } from "../../../manager.js";
import { Accessableby, PrefixCommand } from "../../../@types/Command.js";

export default class implements PrefixCommand {
  name = "suggestions";
  description = "Suggest something for the bot";
  category = "Info";
  usage = "";
  aliases = ["suggest"];
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
      const filter = (response: Message) =>
        response.author.id === message.author.id;

      const sentMessage = await message.reply(
        `${client.i18n.get(language, "info", "suggestions_askdesc")}`
      );

      const collected = await message.channel.awaitMessages({
        max: 1,
        time: 30000,
        errors: ["time"],
        filter,
      });

      const manualDescription =
        collected.first()?.content || "Default description if input is empty";

      // Delete user's message
      await collected.first()?.delete().catch(console.error);

      const embed = new EmbedBuilder()
        .setTitle(
          `${client.i18n.get(language, "info", "suggestions_title", {
            bot: client.user!.username,
          })}`
        )
        .setDescription(manualDescription)
        .setFooter({
          text: `${client.i18n.get(language, "info", "suggestions_footer", {
            username: message.author.username,
          })}`,
          iconURL: message.author.displayAvatarURL(),
        })
        .setColor(client.color);

      const channelIdToSend = client.config.ServerSupport.SUGGESTION_CHANNEL_ID;
      const targetChannel = client.channels.cache.get(channelIdToSend) as
        | TextChannel
        | undefined;

      if (targetChannel) {
        // If the channel is found
        try {
          const sentEmbed = await targetChannel.send({ embeds: [embed] });

          // If the suggestion is sent successfully, edit the original message
          if (sentMessage instanceof Message) {
            await sentMessage.edit(
              `${client.i18n.get(language, "info", "suggestions_success")}`
            );
          }
        } catch (err) {
          client.logger.error(
            `Error sending message in channel ${targetChannel.id}: ${err}`
          );

          // Edit alert messages without sending new messages
          if (sentMessage instanceof Message) {
            await sentMessage.edit(
              `${client.i18n.get(language, "info", "suggestions_failure")}`
            );
          }
        }
      } else {
        client.logger.warn(`Channel with ID ${channelIdToSend} not found.`);

        // Edit alert messages without sending new messages
        if (sentMessage instanceof Message) {
          await sentMessage.edit(
            `${client.i18n.get(language, "info", "suggestions_failure")}`
          );
        }
      }
    } catch (info) {
      client.logger.info(`Timed out submitting suggestion`);

      await message.channel.send(
        `${client.i18n.get(language, "info", "suggestions_timeout_failure")}`
      );
    }
  }
}
