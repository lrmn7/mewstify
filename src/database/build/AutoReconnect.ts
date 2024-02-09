import { MewwmePlayer } from "mewwme.player";
import { Manager } from "../../manager.js";

export class AutoReconnectBuilder {
  client: Manager;
  player?: MewwmePlayer;
  constructor(client: Manager, player?: MewwmePlayer) {
    this.client = client;
    this.player = player;
  }

  async execute(guildId: string) {
    const check = await this.client.db.autoreconnect.get(guildId);
    if (check) return check;
    if (!this.player) return await this.noPlayerBuild(guildId);
    return await this.playerBuild(guildId);
  }

  async get(guildId: string) {
    const check = await this.client.db.autoreconnect.get(guildId);
    if (check) return check;
    else null;
  }

  async noPlayerBuild(guildId: string) {
    return await this.client.db.autoreconnect.set(`${guildId}`, {
      guild: guildId,
      text: "",
      voice: "",
      current: "",
      config: {
        loop: "none",
        volume: 100,
      },
      queue: [],
      twentyfourseven: false,
    });
  }

  async playerBuild(guildId: string) {
    return await this.client.db.autoreconnect.set(`${guildId}`, {
      guild: this.player?.guildId,
      text: this.player?.textId,
      voice: this.player?.voiceId,
      current: this.player?.queue.current?.uri ?? "",
      config: {
        loop: this.player?.loop,
        volume: this.player?.volume,
      },
      queue: this.player?.queue.length !== 0 ? this.queueUri() : [],
      twentyfourseven: false,
    });
  }

  async build247(guildId: string, mode: boolean = true, voiceId: string = "") {
    return await this.client.db.autoreconnect.set(`${guildId}`, {
      guild: this.player?.guildId,
      text: this.player?.textId,
      voice: voiceId,
      current: "",
      config: {
        loop: "none",
        volume: 100,
      },
      queue: [],
      twentyfourseven: mode,
    });
  }

  queueUri() {
    const res = [];
    for (let data of this.player?.queue!) {
      res.push(data.uri);
    }
    return res;
  }
}
