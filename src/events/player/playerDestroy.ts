import { MewwmePlayer } from "mewwme.player";
import chalk from "chalk";
import { Manager } from "../../manager.js";
import { EmbedBuilder, TextChannel } from "discord.js";
import { ClearMessageService } from "../../utilities/ClearMessageService.js";
import { AutoReconnectBuilder } from "../../database/build/AutoReconnect.js";

export default class PlayerDestroyHandler {
  async execute(client: Manager, player: MewwmePlayer) {
    try {
      if (!client.isDatabaseConnected) {
        client.logger.warn(
          "The database is not yet connected, so this event will temporarily not execute. Please try again later!"
        );
        return;
      }

      const guild = client.guilds.cache.get(player.guildId);
      if (!guild) {
        client.logger.warn("Guild not found.");
        return;
      }

      client.logger.info(
        `${chalk.hex("#dc143c")("Player Destroy in @ ")}${chalk.hex("#dc143c")(
          guild!.name
        )} / ${chalk.hex("#dc143c")(player.guildId)}`
      );

      // Update Music Setup
      await client.UpdateMusic(player);

      client.emit("playerDestroy", player);

      const channel = client.channels.cache.get(player.textId) as TextChannel;
      if (!channel) {
        client.logger.warn("Channel not found.");
        return;
      }

      client.sentQueue.set(player.guildId, false);

      let data = await new AutoReconnectBuilder(client, player).get(
        player.guildId
      );

      if (player.state === 5 && data !== null && data) {
        if (data.twentyfourseven) {
          await new AutoReconnectBuilder(client, player).build247(
            player.guildId,
            true,
            data.voice
          );
          await client.manager.createPlayer({
            guildId: data.guild!,
            voiceId: data.voice!,
            textId: data.text!,
            deaf: true,
          });
        } else {
          await client.db.autoreconnect.delete(player.guildId);
        }
      }

      let guildModel = await client.db.language.get(`${channel.guild.id}`);
      if (!guildModel) {
        guildModel = await client.db.language.set(`${channel.guild.id}`, "en");
      }

      const language = guildModel;

      const embed = new EmbedBuilder()
        .setColor(client.color)
        .setDescription(
          `${client.i18n.get(language, "player", "queue_end_desc")}`
        );

      if (player.queue.current) {
        const msg = await channel.send({ embeds: [embed] });
        setTimeout(async () => {
          try {
            await msg.delete();
          } catch (error) {
            client.logger.info(
              `Already deleted message in @ ${guild!.name} / ${player.guildId}`
            );
            // Handle the error, e.g., logging, notifying, etc.
          }
        }, client.config.bot.DELETE_MSG_TIMEOUT);
      }

      const setupdata = await client.db.setup.get(`${player.guildId}`);
      if (setupdata?.channel !== player.textId) {
        new ClearMessageService(client, channel, player);
      }
    } catch (error) {
      client.logger.error(`Error in PlayerDestroyHandler`);
    }
  }
}
