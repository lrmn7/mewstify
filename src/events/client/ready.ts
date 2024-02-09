import { Manager } from "../../manager.js";
import { PresenceStatusData } from "discord.js";
export default class {
  async execute(client: Manager) {
    client.logger.info(`Logged in ${client.user!.tag}`);

    let guilds = client.guilds.cache.size;
    let members = client.guilds.cache.reduce((a, b) => a + b.memberCount, 0);
    let channels = client.channels.cache.size;

    const activities = [
      `${client.config.bot.BOT_ACTIVITY1}` || `with ${guilds} servers!`,
      `${client.config.bot.BOT_ACTIVITY2}` || `with ${members} users!`,
      `${client.config.bot.BOT_ACTIVITY3}` || `with ${channels} channels!`,
    ];

    setInterval(() => {
      const randomActivity =
        activities[Math.floor(Math.random() * activities.length)];
      const activityObj: {
        name: string;
        type: number;
        url: string;
        state?: string;
      } = {
        name: `${randomActivity}`,
        type: client.config.bot.BOT_ACTIVITY_TYPE,
        url: `${client.config.bot.STREAM_URL}`,
      };

      if (client.config.bot.BOT_ACTIVITY_TYPE === 4) {
        activityObj.state = `${client.config.bot.CUSTOM_STATUS}`;
      }

      client.user!.setPresence({
        activities: [activityObj],
        status: client.config.bot.BOT_STATUS as PresenceStatusData,
      });
    }, 10000);
  }
}
