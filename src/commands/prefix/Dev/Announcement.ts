import { Manager } from "../../../manager.js";
import { EmbedBuilder, Message, TextChannel } from "discord.js";
import { Accessableby, PrefixCommand } from "../../../@types/Command.js";
import { MewwmePlayer } from "mewwme.player";

export default class implements PrefixCommand {
  name = "announcement";
  description = "Announcement to all servers";
  category = "Dev";
  accessableby = Accessableby.Owner;
  usage = "";
  aliases = ["announce", "ann", "bc"];
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
        `${client.i18n.get(language, "info", "announcement_desc")}`
      );

      const collected = await message.channel.awaitMessages({
        max: 1,
        time: 30000,
        errors: ["time"],
        filter,
      });

      const manualDescription =
        collected.first()?.content || "Default description if input is empty";

      let manualImage = "";

      await message.channel.send(
        `${client.i18n.get(language, "info", "announcement_image")}`
      );

      const imageResponse = await message.channel.awaitMessages({
        max: 1,
        time: 30000,
        errors: ["time"],
        filter,
      });

      const responseContent = imageResponse.first()?.content.toLowerCase();

      function isValidURL(url: string) {
        const urlRegex = new RegExp(/^(ftp|http|https):\/\/[^ "]+$/, "i");
        return urlRegex.test(url);
      }

      if (responseContent === "yes") {
        await message.channel.send(
          `${client.i18n.get(language, "info", "announcement_imageURL")}`
        );

        const collectedImage = await message.channel.awaitMessages({
          max: 1,
          time: 30000,
          errors: ["time"],
          filter,
        });

        const userProvidedImage = collectedImage.first()?.content;
        if (userProvidedImage && isValidURL(userProvidedImage)) {
          manualImage = userProvidedImage;
        } else {
          await message.channel.send(
            `${client.i18n.get(language, "info", "announcement_invalidURL")}`
          );

          return; // Stop further execution as the URL provided is invalid or missing
        }
      }

      let successfulGuilds = 0;

      for (const guild of client.guilds.cache.values()) {
        const player: MewwmePlayer | undefined = client.manager.players.get(
          guild.id
        ) as MewwmePlayer | undefined;

        if (player && player.textId) {
          const playing_channel = guild.channels.cache.get(player.textId) as
            | TextChannel
            | undefined;

          if (playing_channel) {
            const restartNotice = new EmbedBuilder()
              .setDescription(manualDescription)
              .setColor(client.color);

            if (manualImage !== "") {
              restartNotice.setImage(manualImage);
            }

            try {
              await playing_channel.send({ embeds: [restartNotice] });
              successfulGuilds++;
            } catch (err) {
              client.logger.error(
                `Error sending message in channel ${playing_channel.id}`
              );
            }
          } else {
            client.logger.warn(
              `Channel with ID ${player.textId} not found in ${guild.name}.`
            );
          }
        }
      }

      if (successfulGuilds > 0) {
        await message.channel.send(
          client.i18n.get(language, "info", "announcement_success", {
            successfulGuilds: successfulGuilds.toString(), // Convert to string
            plural: successfulGuilds !== 1 ? "s" : "", // Determine plural
          })
        );
      } else {
        await message.channel.send(
          `${client.i18n.get(language, "info", "announcement_failure")}`
        );
      }
    } catch (info) {
      client.logger.info("Timeout. Failed to send the announcement");
      await message.channel.send(
        `${client.i18n.get(language, "info", "announcement_timeout_failure")}`
      );
    }
  }
}
