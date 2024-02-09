import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js";
import { NormalModeIcons } from "../assets/normalMode.js";
import { SafeModeIcons } from "../assets/safeMode.js";
import { ConfigDataService } from "../services/ConfigDataService.js";
import { Config } from "../@types/Config.js";
const data: Config = new ConfigDataService().data;
let icons = data.bot.SAFE_ICONS_MODE ? SafeModeIcons : NormalModeIcons;

const playerRowOne = new ActionRowBuilder<ButtonBuilder>().addComponents([
  new ButtonBuilder()
    .setCustomId("stop")
    .setEmoji(icons.stop)
    .setLabel("Stop")
    .setStyle(ButtonStyle.Secondary),

  new ButtonBuilder()
    .setCustomId("replay")
    .setEmoji(icons.previous)
    .setLabel("Previous")
    .setStyle(ButtonStyle.Secondary),

  new ButtonBuilder()
    .setCustomId("pause")
    .setEmoji(icons.pause)
    .setLabel("Pause")
    .setStyle(ButtonStyle.Secondary),

  new ButtonBuilder()
    .setCustomId("skip")
    .setEmoji(icons.skip)
    .setLabel("Skip")
    .setStyle(ButtonStyle.Secondary),

  new ButtonBuilder()
    .setCustomId("loop")
    .setEmoji(icons.loop)
    .setLabel("Loop")
    .setStyle(ButtonStyle.Secondary),
]);

const playerRowTwo = new ActionRowBuilder<ButtonBuilder>().addComponents([
  new ButtonBuilder()
    .setCustomId("shuffle")
    .setEmoji(icons.shuffle)
    .setLabel("Shuffle")
    .setStyle(ButtonStyle.Secondary),

  new ButtonBuilder()
    .setCustomId("voldown")
    .setEmoji(icons.voldown)
    .setLabel("Volume -")
    .setStyle(ButtonStyle.Secondary),

  new ButtonBuilder()
    .setCustomId("clear")
    .setEmoji(icons.delete)
    .setLabel("Clear")
    .setStyle(ButtonStyle.Secondary),

  new ButtonBuilder()
    .setCustomId("volup")
    .setEmoji(icons.volup)
    .setLabel("Volume +")
    .setStyle(ButtonStyle.Secondary),

  new ButtonBuilder()
    .setCustomId("queue")
    .setEmoji(icons.queue)
    .setLabel("Queue")
    .setStyle(ButtonStyle.Secondary),
]);

const playerRowOneEdited = new ActionRowBuilder<ButtonBuilder>().addComponents([
  new ButtonBuilder()
    .setCustomId("stop")
    .setEmoji(icons.stop)
    .setLabel("Stop")
    .setStyle(ButtonStyle.Secondary),

  new ButtonBuilder()
    .setCustomId("replay")
    .setEmoji(icons.previous)
    .setLabel("Previous")
    .setStyle(ButtonStyle.Secondary),

  new ButtonBuilder()
    .setCustomId("pause")
    .setEmoji(icons.play)
    .setLabel("Play")
    .setStyle(ButtonStyle.Secondary),

  new ButtonBuilder()
    .setCustomId("skip")
    .setEmoji(icons.skip)
    .setLabel("Skip")
    .setStyle(ButtonStyle.Secondary),

  new ButtonBuilder()
    .setCustomId("loop")
    .setEmoji(icons.loop)
    .setLabel("Loop")
    .setStyle(ButtonStyle.Secondary),
]);

export { playerRowOne, playerRowOneEdited, playerRowTwo };
