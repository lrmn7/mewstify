import { EmbedBuilder, ButtonInteraction } from "discord.js";
import { Manager } from "../manager.js";

export class ReplyInteractionService {
  client: Manager;
  message: ButtonInteraction;
  content: string;

  constructor(client: Manager, message: ButtonInteraction, content: string) {
    this.client = client;
    this.content = content;
    this.message = message;
    this.execute();
  }

  async execute() {
    const embed = new EmbedBuilder()
      .setDescription(this.content)
      .setColor(this.client.color);

    const msg = await this.message.reply({ embeds: [embed], ephemeral: false });

    setTimeout(async () => {
      try {
        await msg.delete();
      } catch (error) {
        this.client.logger.info(
          `Already deleted message in @ ${this.message.guild!.name} / ${
            this.message.guildId
          }`
        );
        // Handle the error, e.g., logging, notifying, etc.
      }
    }, this.client.config.bot.DELETE_MSG_TIMEOUT);
  }
}
