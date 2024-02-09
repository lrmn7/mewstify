import { MewwmePlayer } from "mewwme.player";
import { Manager } from "../../manager.js";
import { TrackExceptionEvent } from "shoukaku";
import { TextChannel } from "discord.js";

export default class {
  async execute(
    client: Manager,
    player: MewwmePlayer,
    data: TrackExceptionEvent
  ) {
    client.logger.error(
      `Player get exception in / ${player.guildId} / reason: TrackExceptionEvent`
    );
    client.logger.log({ level: "error", message: data });
    /////////// Update Music Setup //////////
    await client.UpdateMusic(player);
    /////////// Update Music Setup ///////////
    const fetch_channel = await client.channels.fetch(player.textId);
    const text_channel = fetch_channel! as TextChannel;
    if (text_channel) {
      await text_channel.send(
        "**Player get exception**, type `/report` to report this issue"
      );
    }
    await player.destroy();
  }
}
