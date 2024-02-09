import {
  PermissionsBitField,
  InteractionType,
  CommandInteraction,
  EmbedBuilder,
  CommandInteractionOptionResolver,
} from "discord.js";
import { Manager } from "../../manager.js";
import {
  GlobalInteraction,
  NoAutoInteraction,
} from "../../@types/Interaction.js";
import { Accessableby } from "../../@types/Command.js";
import chalk from "chalk";

/**
 * @param {GlobalInteraction} interaction
 */

export default class {
  async execute(client: Manager, interaction: GlobalInteraction) {
    if (
      interaction.isCommand() ||
      interaction.isContextMenuCommand() ||
      interaction.isModalSubmit() ||
      interaction.isChatInputCommand() ||
      interaction.isAutocomplete()
    ) {
      if (!interaction.guild || interaction.user.bot) return;

      if (!client.isDatabaseConnected)
        return client.logger.warn(
          "The database is not yet connected so this event will temporarily not execute. Please try again later!"
        );

      let guildModel = await client.db.language.get(`${interaction.guild.id}`);
      if (!guildModel) {
        guildModel = await client.db.language.set(
          `${interaction.guild.id}`,
          client.config.bot.LANGUAGE
        );
      }

      const language = guildModel;

      let subCommandName = "";
      try {
        subCommandName = (
          (interaction as CommandInteraction)
            .options as CommandInteractionOptionResolver
        ).getSubcommand();
      } catch {}
      let subCommandGroupName = "";
      try {
        subCommandGroupName = (
          (interaction as CommandInteraction)
            .options as CommandInteractionOptionResolver
        ).getSubcommandGroup()!;
      } catch {}

      const command = client.slash.find((command) => {
        switch (command.name.length) {
          case 1:
            return (
              command.name[0] == (interaction as CommandInteraction).commandName
            );
          case 2:
            return (
              command.name[0] ==
                (interaction as CommandInteraction).commandName &&
              command.name[1] == subCommandName
            );
          case 3:
            return (
              command.name[0] ==
                (interaction as CommandInteraction).commandName &&
              command.name[1] == subCommandGroupName &&
              command.name[2] == subCommandName
            );
        }
      });

      if (!command) return;

      if (
        Number(interaction.type) ==
          InteractionType.ApplicationCommandAutocomplete &&
        (command as any).autocomplete !== undefined
      ) {
        try {
          (command as any).autocomplete(client, interaction, language);
        } catch (error) {
          client.logger.log({
            level: "error",
            message: error,
          });
        }
        return;
      }

      const msg_cmd = [
        `[${chalk.hex("#f4e0c7").bold("MEWWME /COMMAND")}] ${chalk.hex(
          "#00D100"
        )(command.name[0])}`,
        `${chalk.hex("#00CFF0")(command.name[1] || "")}`,
        `${chalk.hex("#00CFF0")(command.name[2] || "")}`,
        `used by ${chalk.hex("#FBEC5D")(interaction.user.tag)} from ${chalk.hex(
          "#7289da"
        )(interaction.guild.name)} (${chalk.hex("#7289da")(
          interaction.guild.id
        )})`,
      ];

      client.logger.info(`${msg_cmd.join(" ")}`);

      if (
        command.accessableby == Accessableby.Owner &&
        !client.owner.includes(interaction.user.id)
      )
        return (interaction as NoAutoInteraction).reply(
          `${client.i18n.get(language, "interaction", "owner_only")}`
        );

      if (
        !interaction.guild.members.me!.permissions.has(
          PermissionsBitField.Flags.SendMessages
        )
      )
        return interaction.user.dmChannel!.send({
          embeds: [
            new EmbedBuilder()
              .setDescription(
                `${client.i18n.get(
                  language,
                  "interaction",
                  "no_perms_sendmessage"
                )}`
              )
              .setColor(client.color),
          ],
        });
      if (
        !interaction.guild.members.me!.permissions.has(
          PermissionsBitField.Flags.ViewChannel
        )
      )
        return;
      if (
        !interaction.guild.members.me!.permissions.has(
          PermissionsBitField.Flags.EmbedLinks
        )
      )
        return (interaction as NoAutoInteraction).reply({
          embeds: [
            new EmbedBuilder()
              .setDescription(
                `${client.i18n.get(
                  language,
                  "interaction",
                  "no_perms_viewchannel"
                )}`
              )
              .setColor(client.color),
          ],
        });
      if (!((interaction as CommandInteraction).commandName == "help")) {
        if (
          !interaction.guild.members.me!.permissions.has(
            PermissionsBitField.Flags.Speak
          )
        )
          return (interaction as NoAutoInteraction).reply({
            embeds: [
              new EmbedBuilder()
                .setDescription(
                  `${client.i18n.get(
                    language,
                    "interaction",
                    "no_perms_speak"
                  )}`
                )
                .setColor(client.color),
            ],
          });
        if (
          !interaction.guild.members.me!.permissions.has(
            PermissionsBitField.Flags.Connect
          )
        )
          return (interaction as NoAutoInteraction).reply({
            embeds: [
              new EmbedBuilder()
                .setDescription(
                  `${client.i18n.get(
                    language,
                    "interaction",
                    "no_perms_connect"
                  )}`
                )
                .setColor(client.color),
            ],
          });
        if (
          !interaction.guild.members.me!.permissions.has(
            PermissionsBitField.Flags.ManageMessages
          )
        )
          return (interaction as NoAutoInteraction).reply({
            embeds: [
              new EmbedBuilder()
                .setDescription(
                  `${client.i18n.get(
                    language,
                    "interaction",
                    "no_perms_managemessages"
                  )}`
                )
                .setColor(client.color),
            ],
          });
        if (
          !interaction.guild.members.me!.permissions.has(
            PermissionsBitField.Flags.ManageChannels
          )
        )
          return await (interaction as NoAutoInteraction).reply({
            embeds: [
              new EmbedBuilder()
                .setDescription(
                  `${client.i18n.get(
                    language,
                    "interaction",
                    "no_perms_managechannels"
                  )}`
                )
                .setColor(client.color),
            ],
          });
      }

      if (
        command.accessableby == Accessableby.Manager &&
        !(interaction.member!.permissions as Readonly<PermissionsBitField>).has(
          PermissionsBitField.Flags.ManageGuild
        )
      )
        return (interaction as NoAutoInteraction).reply(
          `${client.i18n.get(language, "utilities", "lang_perm")}`
        );

      if (command.lavalink) {
        if (client.lavalinkUsing.length == 0)
          return (interaction as NoAutoInteraction).reply({
            embeds: [
              new EmbedBuilder()
                .setDescription(
                  `${client.i18n.get(language, "music", "no_node")}`
                )
                .setColor(client.color),
            ],
          });
      }

      if (command) {
        try {
          command.run(interaction, client, language);
        } catch (error) {
          client.logger.log({
            level: "error",
            message: error,
          });
          return (interaction as NoAutoInteraction).editReply({
            content: `${client.i18n.get(
              language,
              "interaction",
              "error"
            )}\n ${error}`,
          });
        }
      }
    }
  }
}
