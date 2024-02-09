import { EmbedBuilder, Message } from "discord.js";
import delay from "delay";
import { Manager } from "../../../manager.js";
import { Accessableby, PrefixCommand } from "../../../@types/Command.js";

export default class implements PrefixCommand {
  name = "playlist";
  description = "Display all the playlist commands.";
  category = "Playlist";
  usage = "";
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
    if (args[0]) {
      const embed = new EmbedBuilder()
        .setAuthor({
          name: `${message.guild!.members.me!.displayName} Help Command!`,
          iconURL: message.guild!.iconURL() as string,
        })
        .setDescription(`The bot prefix is: \`${prefix}\` or \`/\``)
        .setThumbnail(client.user!.displayAvatarURL({ size: 2048 }))
        .setColor(client.color);

      let command = client.commands.get(
        client.aliases.get(args[0].toLowerCase()) || args[0].toLowerCase()
      );
      if (!command)
        return message.reply({
          embeds: [
            embed
              .setTitle("Invalid Command.")
              .setDescription(`Do \`${prefix}help\` for the list of commands.`),
          ],
        });

      embed.setDescription(`Command details:
        **Command:** ${
          command.name.slice(0, 1).toUpperCase() + command.name.slice(1)
        }
          **Description:** ${command.description || "No Description provided."}
          **Usage:** ${
            command.usage
              ? `\`${prefix}${command.name} ${command.usage}\``
              : "No Usage"
          }
              **Accessible by:** ${command.accessableby}
              **Aliases:** ${
                command.aliases && command.aliases.length !== 0
                  ? command.aliases.join(", ")
                  : "None."
              }`);

      return message.reply({ embeds: [embed] });
    } else {
      const filterCategory = "Playlist";
      const filterCommands = client.commands.filter(
        (cmd) => cmd.category === filterCategory
      );

      let description = `**❯ ${filterCategory.toUpperCase()} Commands**\n`;
      description += `${filterCommands
        .map((cmd) => `\`${cmd.name}\``)
        .join(", ")}`;

      const embed = new EmbedBuilder()
        .setAuthor({
          name: `${message.guild!.members.me!.displayName} Playlist Menu!`,
          url: client.config.bot.SERVER_SUPPORT,
          iconURL: client.user!.displayAvatarURL() as string,
        })
        .setDescription(description)
        .setColor(client.color)
        .setFooter({
          text: `Use ${prefix}help <command> for more info on a command`,
        });

      message.reply({ embeds: [embed] });
    }
  }
}
