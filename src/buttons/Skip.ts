import {
  ButtonInteraction,
  CacheType,
  InteractionCollector,
  Message,
} from "discord.js";
import { MewwmePlayer } from "mewwme.player";
import { PlayerButton } from "../@types/Button.js";
import { Manager } from "../manager.js";
import { ReplyInteractionService } from "../utilities/ReplyInteractionService.js";

export default class implements PlayerButton {
  name = "skip";
  async run(
    client: Manager,
    message: ButtonInteraction<CacheType>,
    language: string,
    player: MewwmePlayer,
    nplaying: Message<boolean>,
    collector: InteractionCollector<ButtonInteraction<"cached">>
  ): Promise<any> {
    if (!player || !player.queue || !player.queue.length) {
      if (player) {
        player.destroy();
      }
      collector.stop();
    } else {
      player.skip();
    }

    client.emit("playerSkip", player);

    await new ReplyInteractionService(
      client,
      message,
      `${client.i18n.get(language, "player", "skip_msg")}`
    );
  }
}
