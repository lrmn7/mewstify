import { Manager } from "../../../manager.js";
import { Message, TextChannel } from "discord.js";
import { Accessableby, PrefixCommand } from "../../../@types/Command.js";
import { config } from "dotenv";
config();

export default class implements PrefixCommand {
  name = "update";
  description = "Launch the bot update informations!";
  category = "Dev";
  accessableby = Accessableby.Owner;
  usage = "";
  aliases = [];
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

      await message.channel.send(
        `${client.i18n.get(language, "info", "update_desc")}`
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

      let successfulGuilds = 0;
      const channelIdToSend = client.config.ServerSupport.UPDATE_CHANNEL_ID;

      const targetChannel = client.channels.cache.get(channelIdToSend) as
        | TextChannel
        | undefined;

      if (targetChannel) {
        try {
          await targetChannel.send(`${manualDescription}`);
          successfulGuilds = 1;
        } catch (err) {
          client.logger.error(
            `Error sending message in channel ${targetChannel.id}: ${err}`
          );
        }
      } else {
        client.logger.warn(`Channel with ID ${channelIdToSend} not found.`);
      }

      const successMessage = client.i18n.get(
        language,
        "info",
        "update_success"
      );
      const failureMessage = client.i18n.get(
        language,
        "info",
        "update_failure"
      );

      const responseMessage =
        successfulGuilds > 0 ? successMessage : failureMessage;
      await message.channel.send(responseMessage);
    } catch (error) {
      client.logger.error(`Failed to send the update: ${error}`);
      const timeoutFailureMsg = client.i18n.get(
        language,
        "info",
        "update_timeout_failure"
      );
      await message.channel.send(timeoutFailureMsg);
    }
  }
}
