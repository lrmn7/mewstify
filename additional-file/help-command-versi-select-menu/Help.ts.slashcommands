import {
  EmbedBuilder,
  ActionRowBuilder,
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder,
  CommandInteraction,
  ButtonBuilder,
  ButtonStyle,
} from "discord.js";
import { readdirSync } from "fs";
import { Manager } from "../../../manager.js";
import { Accessableby, SlashCommand } from "../../../@types/Command.js";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

export default class implements SlashCommand {
  name = ["help"];
  description = "Displays all commands that the bot has.";
  category = "Info";
  lavalink = false;
  accessableby = Accessableby.Member;
  options = [];

  async run(
    interaction: CommandInteraction,
    client: Manager,
    language: string
  ) {
    await interaction.deferReply({ ephemeral: false });

    const category = readdirSync(join(__dirname, "..", "..", "slash"));

    const embed = new EmbedBuilder()
      .setAuthor({
        name: `${interaction.guild!.members.me!.displayName} Help Menu!`,
        url: client.config.bot.SERVER_SUPPORT,
        iconURL: client.user!.displayAvatarURL() as string,
      })
      .setTitle(`${client.i18n.get(language, "help", "homepage_title")}`)
      .setDescription(
        `${client.i18n.get(language, "help", "homepage_desc", {
          donate: client.config.bot.DONATE_URL,
        })}`
      )
      .setImage(client.config.bot.IMGURL_MENUHELP)
      .setColor(client.color);

    const button = new ActionRowBuilder<ButtonBuilder>()
      .addComponents(
        new ButtonBuilder()
          .setLabel("Invite")
          .setEmoji(client.config.Emoji.E_INVITE || "📨")
          .setStyle(ButtonStyle.Link)
          .setURL(client.config.bot.INVITE_URL)
      )
      .addComponents(
        new ButtonBuilder()
          .setLabel("Server Support")
          .setEmoji(client.config.Emoji.E_SUPPORT || "💬")
          .setStyle(ButtonStyle.Link)
          .setURL(client.config.bot.SERVER_SUPPORT)
      )
      .addComponents(
        new ButtonBuilder()
          .setLabel("Vote")
          .setEmoji(client.config.Emoji.E_VOTE || "👍")
          .setStyle(ButtonStyle.Link)
          .setURL(client.config.bot.VOTE_URL)
      );

    const selectmenu =
      new ActionRowBuilder<StringSelectMenuBuilder>().addComponents([
        new StringSelectMenuBuilder()
          .setCustomId("help-category")
          .setPlaceholder(
            `${client.i18n.get(language, "utilities", "help_desc")}`
          )
          .setMaxValues(1)
          .setMinValues(1)
          /// Map the category to the select menu
          .setOptions([
            new StringSelectMenuOptionBuilder()
              .setLabel("Home")
              .setValue("Home")
              .setEmoji(client.config.Emoji.E_HOME || "🏠"),
            // Category: info
            new StringSelectMenuOptionBuilder()
              .setLabel("Info")
              .setValue("Info")
              .setEmoji(client.config.Emoji.E_INFO || "📚"),
            // Category: settings
            new StringSelectMenuOptionBuilder()
              .setLabel("Settings")
              .setValue("Settings")
              .setEmoji(client.config.Emoji.E_SETTING || "⚙️"),
            // Category: music
            new StringSelectMenuOptionBuilder()
              .setLabel("Music")
              .setValue("Music")
              .setEmoji(client.config.Emoji.E_MUSIC || "🎵"),
            // Category: filter
            new StringSelectMenuOptionBuilder()
              .setLabel("Filter")
              .setValue("Filter")
              .setEmoji(client.config.Emoji.E_FILTER || "🎤"),
            // Category: playlist
            new StringSelectMenuOptionBuilder()
              .setLabel("Playlist")
              .setValue("Playlist")
              .setEmoji(client.config.Emoji.E_PLAYLIST || "🎧"),
            // Category: developer
            new StringSelectMenuOptionBuilder()
              .setLabel("Dev")
              .setValue("Dev")
              .setEmoji(client.config.Emoji.E_DEV || "🛡️"),
            new StringSelectMenuOptionBuilder()
              // Category: utilities
              .setLabel("Utils")
              .setValue("Utils")
              .setEmoji(client.config.Emoji.E_UTILS || "🛡️"),
            new StringSelectMenuOptionBuilder()
              .setLabel("All Commands")
              .setValue("All")
              .setEmoji(client.config.Emoji.E_ALLCMD || "🗒️"),
          ]),
      ]);

    interaction
      .editReply({ embeds: [embed], components: [selectmenu, button] })
      .then(async (msg) => {
        let collector = await msg.createMessageComponentCollector({
          filter: (i) =>
            i.isStringSelectMenu() &&
            i.user &&
            i.message.author.id == client.user!.id &&
            i.user.id == interaction.user.id,
          time: 60000,
        });
        collector.on("collect", async (m) => {
          if (m.isStringSelectMenu()) {
            if (m.customId === "help-category") {
              await m.deferUpdate();
              const [directory] = m.values;

              if (directory === "All") {
                const categoriesAndCommands = client.commands.reduce(
                  (accumulator, command) => {
                    if (!accumulator[command.category]) {
                      accumulator[command.category] = [];
                    }
                    accumulator[command.category].push(
                      `\`${[command.name].join(", ")}\``
                    );
                    return accumulator;
                  },
                  {} as { [key: string]: string[] }
                );

                const embed2 = new EmbedBuilder()
                  .setAuthor({
                    name: `${
                      interaction.guild!.members.me!.displayName
                    } Help Menu!`,
                    url: client.config.bot.SERVER_SUPPORT,
                    iconURL: client.user!.displayAvatarURL() as string,
                  })
                  .setImage(client.config.bot.IMGURL_COMMANDMENU)
                  .setColor(client.color);

                for (const [category, commands] of Object.entries(
                  categoriesAndCommands
                )) {
                  const commandList = commands.join(", ");
                  embed2.addFields({
                    name: `${category.toUpperCase()}`,
                    value: commandList,
                    inline: false,
                  });
                }

                msg.edit({ embeds: [embed2] });
              } else if (directory === "Home") {
                msg.edit({ embeds: [embed], components: [selectmenu, button] });
              } else {
                const filteredCommands = client.commands.filter(
                  (c) => c.category === directory
                );

                const embed1 = new EmbedBuilder()
                  .setImage(client.config.bot.IMGURL_COMMANDMENU)
                  .setColor(client.color)
                  .addFields({
                    name: `${
                      client.config.Emoji.E_LOADING
                    }  ${directory.toUpperCase()}`,
                    value: `${client.slash
                      .filter((c) => c.category === directory)
                      .map((c) => `\`${c.name.at(-1)}\``)
                      .join(", ")}`,
                    inline: false,
                  });
                msg.edit({ embeds: [embed1] });
              }
            }
          }
        });

        collector.on("end", async (collected, reason) => {
          if (reason === "time") {
            const timedMessage = `${client.i18n.get(
              language,
              "utilities",
              "help_timeout",
              {
                prefix: client.prefix,
              }
            )}`;
            selectmenu.components[0].setDisabled(true);

            msg.edit({
              content: timedMessage,
              embeds: [embed],
              components: [selectmenu, button],
            });
          }
        });
      });
  }
}
