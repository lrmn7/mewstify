import { Manager } from "../../manager.js";
import { EmbedBuilder, TextChannel, AttachmentBuilder, User } from "discord.js";
import { FormatDuration } from "../../structures/FormatDuration.js";
import { QueueDuration } from "../../structures/QueueDuration.js";
import { MewwmePlayer } from "mewwme.player";
import { mewcard } from "mewcard";

export class playerLoadUpdate {
  client: Manager;
  constructor(client: Manager) {
    this.client = client;
    this.loader(this.client);
  }

  async loader(client: Manager) {
    client.UpdateQueueMsg = async function (player: MewwmePlayer) {
      let data = await client.db.setup.get(`${player.guildId}`);
      if (!data) return;
      if (data.enable === false) return;

      let channel = (await client.channels.cache.get(
        data.channel
      )) as TextChannel;
      if (!channel) return;

      let playMsg = await channel.messages.fetch(data.playmsg);
      if (!playMsg) return;

      let guildModel = await client.db.language.get(`${player.guildId}`);
      if (!guildModel) {
        guildModel = await client.db.language.set(
          `language.guild_${player.guildId}`,
          client.config.bot.LANGUAGE
        );
      }

      const language = guildModel;

      const songStrings = [];
      const queuedSongs = player.queue.map(
        (song, i) =>
          `${client.i18n.get(language, "setup", "setup_content_queue", {
            index: `${i + 1}`,
            title: song.title,
            duration: new FormatDuration().parse(song.length),
            request: `${song.requester}`,
            serversupport: `${client.config.bot.SERVER_SUPPORT}`,
          })}`
      );

      const current_song = `${client.i18n.get(
        language,
        "setup",
        "setup_content_queue",
        {
          index: `${1}`,
          title: player.queue.current!.title,
          duration: new FormatDuration().parse(player.queue.current!.length),
          request: `${player.queue.current!.requester}`,
          serversupport: `${client.config.bot.SERVER_SUPPORT}`,
        }
      )}`;

      await songStrings.push(...queuedSongs);

      await songStrings.unshift(current_song);

      const Str = songStrings.slice(1, 10).join("\n");

      const TotalDuration = new QueueDuration().parse(player);

      let cSong = player.queue.current;
      let qDuration = `${new FormatDuration().parse(TotalDuration)}`;

      const card = new mewcard()
        .setName(String(cSong?.title).toUpperCase())
        .setAuthor(String(cSong?.author).toUpperCase())
        .setColor("auto")
        .setTheme(client.config.bot.THEMES_MUSIC)
        .setBrightness(50)
        .setThumbnail(
          cSong?.thumbnail
            ? cSong?.thumbnail
            : `https://img.youtube.com/vi/${cSong?.identifier}/hqdefault.jpg`
        )
        .setRequester((cSong?.requester as User).username.toUpperCase());

      const cardBuffer = await card.build();

      const attachment = new AttachmentBuilder(cardBuffer, {
        name: "mewwme.png",
      });

      let embed = new EmbedBuilder()
        .setAuthor({
          name: `${client.i18n.get(language, "setup", "setup_author")}`,
          iconURL: `${client.i18n.get(language, "setup", "setup_author_icon")}`,
        })
        .setColor(client.color)
        .setImage("attachment://mewwme.png");

      return await playMsg
        .edit({
          content: `${client.i18n.get(language, "setup", "setup_content")}\n${
            Str == ""
              ? `${client.i18n.get(language, "setup", "setup_content_empty")}`
              : "\n" + Str
          }`,
          embeds: [embed],
          components: [client.enSwitchMod],
          files: [attachment], // Add the attachment here
        })
        .catch((error) => {
          client.logger.error(
            `Error editing message in @ ${playMsg.guild!.name} / ${
              playMsg.guildId
            }`
          );
        });
    };

    /**
     *
     * @param {Player} player
     */
    client.UpdateMusic = async function (player: MewwmePlayer) {
      let data = await client.db.setup.get(`${player.guildId}`);
      if (!data) return;
      if (data.enable === false) return;

      let channel = (await client.channels.cache.get(
        data.channel
      )) as TextChannel;
      if (!channel) return;

      let playMsg = await channel.messages.fetch(data.playmsg);
      if (!playMsg) return;

      let guildModel = await client.db.language.get(`${player.guildId}`);
      if (!guildModel) {
        guildModel = await client.db.language.set(
          `language.guild_${player.guildId}`,
          client.config.bot.LANGUAGE
        );
      }

      const language = guildModel;

      const queueMsg = `${client.i18n.get(
        language,
        "setup",
        "setup_queuemsg"
      )}`;

      const playEmbed = new EmbedBuilder()
        .setColor(client.color)
        .setAuthor({
          name: `${client.i18n.get(
            language,
            "setup",
            "setup_playembed_author"
          )}`,
        })
        .setImage(client.config.bot.REQUEST_IMAGE);

      return await playMsg
        .edit({
          content: `${queueMsg}`,
          embeds: [playEmbed],
          components: [client.diSwitch],
          files: [], // Add the attachment here
        })
        .catch((error) => {
          client.logger.error(
            `Error editing message in @ ${playMsg.guild!.name} / ${
              playMsg.guildId
            }`
          );
        });
    };
  }
}
