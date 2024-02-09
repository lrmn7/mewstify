import {
  CommandInteraction,
  ApplicationCommandOptionType,
  CommandInteractionOptionResolver,
  EmbedBuilder,
} from "discord.js";
import { Manager } from "../../../manager.js";
import { Accessableby, SlashCommand } from "../../../@types/Command.js";
import Prefix from "../../prefix/Settings/Prefix.js";

export default class implements SlashCommand {
  name = ["new-prefix"];
  description = "Specify the new prefix you want to use!";
  category = "Settings";
  accessableby = Accessableby.Manager;
  lavalink = false;
  options = [
    {
      name: "input",
      description: "Set new prefix you want to use!",
      required: true,
      type: ApplicationCommandOptionType.String,
    },
  ];

  async run(
    interaction: CommandInteraction,
    client: Manager,
    language: string
  ) {
    await interaction.deferReply({ ephemeral: false });

    const prefix: string = (
      interaction.options as CommandInteractionOptionResolver
    ).getString("input")!;

    if (Prefix.length > 10) {
      const embed = new EmbedBuilder()
        .setDescription(
          `${client.i18n.get(language, "utilities", "prefix_length")}`
        )
        .setColor(client.color);

      return interaction.editReply({ embeds: [embed] });
    }

    await client.db.prefix.set(`${interaction.guild!.id}`, prefix);

    const embed = new EmbedBuilder()
      .setDescription(
        `${client.i18n.get(language, "utilities", "prefix_set", {
          prefix: prefix,
        })}`
      )
      .setColor(client.color);

    return interaction.editReply({ embeds: [embed] });
  }
}
