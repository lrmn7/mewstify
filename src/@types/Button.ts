import {
  ButtonInteraction,
  CacheType,
  InteractionCollector,
  Message,
} from "discord.js";
import { Manager } from "../manager.js";
import { MewwmePlayer } from "mewwme.player";

export class PlayerButton {
  name: string = "";
  async run(
    client: Manager,
    message: ButtonInteraction,
    language: string,
    player: MewwmePlayer,
    nplaying: Message,
    collector: InteractionCollector<ButtonInteraction<"cached">>
  ): Promise<any> {}
}
