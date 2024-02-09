import {
  EmbedBuilder,
  CommandInteraction,
  GuildMember,
  ApplicationCommandOptionType,
  CommandInteractionOptionResolver,
} from "discord.js";
import { Manager } from "../../../manager.js";
import { MewwmeLoop } from "../../../@types/Lavalink.js";
import { Accessableby, SlashCommand } from "../../../@types/Command.js";
import { MewwmePlayer } from "mewwme.player";
import { AutoReconnectBuilder } from "../../../database/build/AutoReconnect.js";

export default class implements SlashCommand {
  name = ["loop"];
  description = "Loop song in queue type all/current!";
  category = "Music";
  lavalink = true;
  accessableby = Accessableby.Member;
  options = [
    {
      name: "type",
      description: "Type of loop",
      type: ApplicationCommandOptionType.String,
      required: true,
      choices: [
        {
          name: "Current",
          value: "current",
        },
        {
          name: "Queue",
          value: "queue",
        },
        {
          name: "None",
          value: "none",
        },
      ],
    },
  ];

  async run(
    interaction: CommandInteraction,
    client: Manager,
    language: string
  ) {
    await interaction.deferReply({ ephemeral: false });
    const msg = await interaction.editReply({
      embeds: [
        new EmbedBuilder()
          .setDescription(
            `${client.i18n.get(language, "music", "loop_loading")}`
          )
          .setColor(client.color),
      ],
    });

    const player = client.manager.players.get(interaction.guild!.id);
    if (!player)
      return msg.edit({
        embeds: [
          new EmbedBuilder()
            .setDescription(
              `${client.i18n.get(language, "noplayer", "no_player")}`
            )
            .setColor(client.color),
        ],
      });
    const { channel } = (interaction.member as GuildMember)!.voice;
    if (
      !channel ||
      (interaction.member as GuildMember)!.voice.channel !==
        interaction.guild!.members.me!.voice.channel
    )
      return msg.edit({
        embeds: [
          new EmbedBuilder()
            .setDescription(
              `${client.i18n.get(language, "noplayer", "no_voice")}`
            )
            .setColor(client.color),
        ],
      });

    const mode = (interaction.options as CommandInteractionOptionResolver).get(
      "type"
    )!.value;

    if (mode == "current") {
      await player.setLoop(MewwmeLoop.track);
      this.setLoop247(client, player, String(MewwmeLoop.track));
      const looped = new EmbedBuilder()
        .setDescription(`${client.i18n.get(language, "music", "loop_current")}`)
        .setColor(client.color);
      msg.edit({ content: " ", embeds: [looped] });
    } else if (mode == "queue") {
      await player.setLoop(MewwmeLoop.queue);
      this.setLoop247(client, player, String(MewwmeLoop.queue));
      const looped_queue = new EmbedBuilder()
        .setDescription(`${client.i18n.get(language, "music", "loop_all")}`)
        .setColor(client.color);
      msg.edit({ content: " ", embeds: [looped_queue] });
    } else if (mode === "none") {
      await player.setLoop(MewwmeLoop.none);
      this.setLoop247(client, player, String(MewwmeLoop.none));
      const looped = new EmbedBuilder()
        .setDescription(`${client.i18n.get(language, "music", "unloop_all")}`)
        .setColor(client.color);
      msg.edit({ content: " ", embeds: [looped] });
    }
  }

  async setLoop247(client: Manager, player: MewwmePlayer, loop: string) {
    const check = await new AutoReconnectBuilder(client, player).execute(
      player.guildId
    );
    if (check) {
      await client.db.autoreconnect.set(`${player.guildId}.config.loop`, loop);
    }
  }
}
