import {
  ButtonInteraction,
  CacheType,
  InteractionCollector,
  Message,
} from "discord.js";
import { MewwmePlayer } from "mewwme.player";
import { PlayerButton } from "../@types/Button.js";
import { Manager } from "../manager.js";
import { MewwmeLoop } from "../@types/Lavalink.js";
import { ReplyInteractionService } from "../utilities/ReplyInteractionService.js";

export default class implements PlayerButton {
  name = "loop";
  async run(
    client: Manager,
    message: ButtonInteraction<CacheType>,
    language: string,
    player: MewwmePlayer,
    nplaying: Message<boolean>,
    collector: InteractionCollector<ButtonInteraction<"cached">>
  ): Promise<any> {
    if (!player) {
      collector.stop();
    }

    async function setLoop247(loop: string) {
      if (await client.db.autoreconnect.get(player.guildId)) {
        await client.db.autoreconnect.set(
          `${player.guildId}.config.loop`,
          loop
        );
      }
    }

    switch (player.loop) {
      case "none":
        await player.setLoop(MewwmeLoop.track);

        setLoop247(String(MewwmeLoop.none));

        new ReplyInteractionService(
          client,
          message,
          `${client.i18n.get(language, "music", "loop_current")}`
        );

        break;

      case "track":
        await player.setLoop(MewwmeLoop.queue);

        setLoop247(String(MewwmeLoop.none));

        new ReplyInteractionService(
          client,
          message,
          `${client.i18n.get(language, "music", "loop_all")}`
        );

        break;

      case "queue":
        await player.setLoop(MewwmeLoop.none);

        setLoop247(String(MewwmeLoop.none));

        new ReplyInteractionService(
          client,
          message,
          `${client.i18n.get(language, "music", "unloopall")}`
        );

        break;
    }
  }
}
