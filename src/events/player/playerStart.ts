import { MewwmePlayer, MewwmeTrack } from "mewwme.player";
import { Manager } from "../../manager.js";
import {
  AttachmentBuilder,
  ButtonInteraction,
  ComponentType,
  TextChannel,
  User,
  Events,
  GuildMember,
  EmbedBuilder,
} from "discord.js";
import {
  playerRowOne,
  playerRowOneEdited,
  playerRowTwo,
} from "../../utilities/PlayerControlButton.js";
import { ControlEnum } from "../../database/schema/Control.js";
import { AutoReconnectBuilder } from "../../database/build/AutoReconnect.js";
import { mewcard } from "mewcard";
import chalk from "chalk";

export default class {
  async execute(client: Manager, player: MewwmePlayer, track: MewwmeTrack) {
    if (!client.isDatabaseConnected)
      return client.logger.warn(
        "The database is not yet connected so this event will temporarily not execute. Please try again later!"
      );

    const guild = client.guilds.cache.get(player.guildId);
    client.logger.info(
      `${chalk.hex("#53ec53")("Player Started in @ ")}${chalk.hex("#53ec53")(
        guild!.name
      )} / ${chalk.hex("#53ec53")(player.guildId)}`
    );

    let Control = await client.db.control.get(`${player.guildId}`);
    if (!Control) {
      await client.db.control.set(`${player.guildId}`, ControlEnum.Enable);
      Control = await client.db.control.get(`${player.guildId}`);
    }

    if (!player) return;

    /////////// Update Music Setup ///////////

    await client.UpdateQueueMsg(player);

    /////////// Update Music Setup ///////////

    const channel = client.channels.cache.get(player.textId) as TextChannel;
    if (!channel) return;

    let data = await client.db.setup.get(`${channel.guild.id}`);
    if (data && player.textId === data.channel) return;

    let guildModel = await client.db.language.get(`${channel.guild.id}`);
    if (!guildModel) {
      guildModel = await client.db.language.set(
        `language.guild_${channel.guild.id}`,
        "en"
      );
    }

    const language = guildModel;

    const song = player.queue.current;
    const position = player.shoukaku.position;

    client.emit("playerStart", player);
    client.emit("playerQueue", player);

    const autoreconnect = new AutoReconnectBuilder(client, player);

    if (await autoreconnect.get(player.guildId)) {
      await client.db.autoreconnect.set(
        `${player.guildId}.current`,
        player.queue.current?.uri
      );
      await client.db.autoreconnect.set(
        `${player.guildId}.config.volume`,
        player.volume
      );
      await client.db.autoreconnect.set(
        `${player.guildId}.config.loop`,
        player.loop
      );

      function queueUri() {
        const res = [];
        for (let data of player.queue) {
          res.push(data.uri);
        }
        return res.length !== 0 ? res : [];
      }

      await client.db.autoreconnect.set(`${player.guildId}.queue`, queueUri());
    } else {
      await autoreconnect.playerBuild(player.guildId);
    }

    if (Control == ControlEnum.Disable) return;

    const card = new mewcard()
      .setName(String(song?.title).toUpperCase())
      .setAuthor(String(song?.author).toUpperCase())
      .setColor("auto")
      .setTheme(client.config.bot.THEMES_MUSIC)
      .setBrightness(50)
      .setThumbnail(
        track.thumbnail
          ? track.thumbnail
          : `https://img.youtube.com/vi/${track.identifier}/hqdefault.jpg`
      )
      .setRequester((song?.requester as User).username.toUpperCase());

    const cardBuffer = await card.build();

    const attachment = new AttachmentBuilder(cardBuffer, {
      name: "mewwme.png",
    });

    const embeded = new EmbedBuilder()
      .setAuthor({
        name: `${client.i18n.get(language, "player", "track_title")}`,
        iconURL: `${client.i18n.get(language, "player", "track_icon")}`,
      })
      .setDescription(
        `**[${track.title}](${client.config.bot.SERVER_SUPPORT})**`
      )
      .setImage(`attachment://mewwme.png`)
      .setColor(client.color);

    const playing_channel = client.channels.cache.get(
      player.textId
    ) as TextChannel;

    const nplaying = await playing_channel.send({
      embeds: client.config.bot.SAFE_PLAYER_MODE ? [embeded] : [],
      components: [playerRowOne, playerRowTwo],
      files: client.config.bot.SAFE_PLAYER_MODE ? [attachment] : [],
    });

    client.nplayingMsg.set(player.guildId, nplaying);

    const collector = nplaying.createMessageComponentCollector({
      componentType: ComponentType.Button,
      filter: (message) => {
        if (
          message.guild!.members.me!.voice.channel &&
          message.guild!.members.me!.voice.channelId ===
            message.member!.voice.channelId
        )
          return true;
        else {
          message.reply({
            content: `${client.i18n.get(language, "player", "join_voice")}`,
            ephemeral: true,
          });
          return false;
        }
      },
      time: song!.length,
    });

    collector.on(
      "end",
      async (collected: ButtonInteraction, reason: string) => {
        if (reason === "time") {
          try {
            await nplaying.delete();
          } catch (error) {
            client.logger.warn(
              `Already deleted message in @ ${guild!.name} / ${player.guildId}`
            );
          }
        }
      }
    );

    collector.on(
      "collect",
      async (message: ButtonInteraction): Promise<void> => {
        const id = message.customId;
        const button = client.plButton.get(id);
        if (button)
          await button.run(
            client,
            message,
            language,
            player,
            nplaying,
            collector
          );
      }
    );
  }
}
