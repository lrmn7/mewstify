import { CommandInteraction, EmbedBuilder } from "discord.js";
import { Manager } from "../../../manager.js";
import { Accessableby, SlashCommand } from "../../../@types/Command.js";

export default class implements SlashCommand {
  name = ["shutdown"];
  description = "Shuts down the client!";
  category = "Dev";
  accessableby = Accessableby.Owner;
  lavalink = false;
  options = [];
  async run(
    interaction: CommandInteraction,
    client: Manager,
    language: string
  ) {
    await interaction.deferReply({ ephemeral: false });

    const restart = new EmbedBuilder()
      .setDescription(
        `${client.i18n.get(language, "utilities", "restart_msg")}`
      )
      .setColor(client.color);

    await interaction.editReply({ embeds: [restart] });

    process.exit();
  }
}
