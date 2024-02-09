import { EmbedBuilder, Message } from "discord.js";
import { Manager } from "../../../manager.js";
import axios from "axios";
import { Accessableby, PrefixCommand } from "../../../@types/Command.js";
import Genius from "genius-lyrics";
// Main code
export default class implements PrefixCommand {
  name = "lyrics";
  description = "Display lyrics of a song.";
  category = "Music";
  usage = "<song_name>";
  aliases = [];
  lavalink = true;
  accessableby = Accessableby.Member;

  async run(
    client: Manager,
    message: Message,
    args: string[],
    language: string,
    prefix: string
  ) {
    const value = args.join(" ");

    // Replace this with your actual Genius API access token
    const genius = new Genius.Client(client.config.bot.GENIUS_APIKEY);

    const msg = await message.reply({
      embeds: [
        new EmbedBuilder()
          .setDescription(
            `${client.i18n.get(language, "music", "lyrics_loading")}`
          )
          .setColor(client.color),
      ],
    });

    const player = client.manager.players.get(message.guild!.id);
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

    const { channel } = message.member!.voice;
    if (
      !channel ||
      message.member!.voice.channel !== message.guild!.members.me!.voice.channel
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

    let song = value || ""; // Initialize with an empty string if no song is provided

    // If no song title is provided, attempt to use the current song playing
    if (!song) {
      const CurrentSong = player.queue.current;
      if (CurrentSong) {
        song = `${CurrentSong.title} ${CurrentSong.author}`;
      } else {
        return msg.edit({
          embeds: [
            new EmbedBuilder()
              .setDescription(
                `${client.i18n.get(language, "music", "lyrics_notfound")}`
              )
              .setColor(client.color),
          ],
        });
      }
    }

    try {
      const songs = await genius.songs.search(song);
      if (songs.length === 0 || !songs[0].lyrics)
        return msg.edit({
          embeds: [
            new EmbedBuilder()
              .setDescription(
                `${client.i18n.get(language, "music", "lyrics_notfound")}`
              )
              .setColor(client.color),
          ],
        });

      const lyrics = await songs[0].lyrics();
      let lyricsEmbed = new EmbedBuilder()
        .setColor(client.color)
        .setTitle(
          `${client.i18n.get(language, "music", "lyrics_title", {
            song: value,
          })}`
        )
        .setDescription(`${lyrics}`)
        .setFooter({ text: `Requested by ${message.author.username}` })
        .setTimestamp();

      if (lyrics.length > 4048) {
        lyricsEmbed.setDescription(
          `${client.i18n.get(language, "music", "lyrics_toolong")}`
        );
      }

      msg.edit({ content: " ", embeds: [lyricsEmbed] });
    } catch (err) {
      client.logger.log({ level: "error", message: String(err) });
      return msg.edit({
        embeds: [
          new EmbedBuilder()
            .setDescription(
              `${client.i18n.get(language, "music", "lyrics_notfound")}`
            )
            .setColor(client.color),
        ],
      });
    }
  }
}
