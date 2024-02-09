import {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  CommandInteraction,
  ButtonStyle,
} from "discord.js";
import { Manager } from "../../../manager.js";
import { Accessableby, SlashCommand } from "../../../@types/Command.js";

export default class implements SlashCommand {
  name = ["ping"];
  description = "Shows the ping information of the Bot";
  category = "Info";
  options = [];
  lavalink = false;
  accessableby = Accessableby.Member;

  async run(
    interaction: CommandInteraction,
    client: Manager,
    language: string
  ) {
    await interaction.deferReply({ ephemeral: false });
    const pingembed = new EmbedBuilder()
      .setAuthor({
        name: `${interaction.guild!.members.me!.displayName} Pong!`,
        url: client.config.bot.SERVER_SUPPORT,
        iconURL: client.user!.displayAvatarURL() as string,
      })
      .setDescription(
        `${client.i18n.get(language, "info", "ping_desc", {
          ping: String(client.ws.ping),
        })}`
      )
      .setColor(client.color);
    const pingbutton = new ActionRowBuilder<ButtonBuilder>().addComponents(
      new ButtonBuilder()
        .setLabel("Invite Me")
        .setStyle(ButtonStyle.Link)
        .setURL(client.config.bot.INVITE_URL)
    );

    await interaction.editReply({
      embeds: [pingembed],
      components: [pingbutton],
    });
  }
}
