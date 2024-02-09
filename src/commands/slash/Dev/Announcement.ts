import {
  CommandInteraction,
  TextChannel,
  ApplicationCommandOptionType,
  CommandInteractionOptionResolver,
  EmbedBuilder,
} from "discord.js";
import { Manager } from "../../../manager.js";
import { Accessableby, SlashCommand } from "../../../@types/Command.js";
import { MewwmePlayer } from "mewwme.player";

export default class implements SlashCommand {
  name = ["announcement"];
  description = "Send an announcement to all servers!";
  category = "Dev";
  accessableby = Accessableby.Owner;
  lavalink = false;
  options = [
    {
      name: "description",
      description: "The description of your announcement",
      required: true,
      type: ApplicationCommandOptionType.String,
    },
    {
      name: "image",
      description: "The image of your announcement",
      required: false,
      type: ApplicationCommandOptionType.String,
    },
  ];

  async run(
    interaction: CommandInteraction,
    client: Manager,
    language: string
  ) {
    try {
      await interaction.deferReply({ ephemeral: false });

      const input = (
        interaction.options as CommandInteractionOptionResolver
      ).getString("description");
      const imageUrl = (
        interaction.options as CommandInteractionOptionResolver
      ).getString("image");

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
            const announcement = new EmbedBuilder()
              .setDescription(input)
              .setImage(imageUrl)
              .setColor(client.color);

            try {
              await playing_channel.send({ embeds: [announcement] });
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
        await interaction.editReply(
          client.i18n.get(language, "info", "announcement_success", {
            successfulGuilds: successfulGuilds.toString(), // Convert to string
            plural: successfulGuilds !== 1 ? "s" : "", // Determine plural
          })
        );
      } else {
        await interaction.editReply(
          `${client.i18n.get(language, "info", "announcement_failure")}`
        );
      }
    } catch (error) {
      client.logger.error(`Error in sending announcement: ${error}`);
    }
  }
}
