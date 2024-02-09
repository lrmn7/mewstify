import { Mewwme, Plugins } from "mewwme.player";
import { Manager } from "../manager.js";
import { Connectors } from "shoukaku";

export class MewwmeInit {
  client: Manager;
  constructor(client: Manager) {
    this.client = client;
  }

  get init() {
    return new Mewwme(
      {
        defaultSearchEngine: `${this.client.config.lavalink.SEARCH_ENGINE}`, // default ( youtube, youtube_music, soundcloud )
        // MAKE SURE YOU HAVE THIS
        send: (guildId, payload) => {
          const guild = this.client.guilds.cache.get(guildId);
          if (guild) guild.shard.send(payload);
        },
        plugins: this.client.config.lavalink.SPOTIFY.enable
          ? [
              new Plugins.Spotify({
                clientId: this.client.config.lavalink.SPOTIFY.id,
                clientSecret: this.client.config.lavalink.SPOTIFY.secret,
                playlistPageLimit: 100, // optional
                albumPageLimit: 50, // optional
                searchLimit: 50, // optional
              }),
              new Plugins.Deezer(),
              new Plugins.Nico({ searchLimit: 10 }),
              new Plugins.PlayerMoved(this.client),
              new Plugins.Apple({ countryCode: "us" }),
            ]
          : [
              new Plugins.Deezer(),
              new Plugins.Nico({ searchLimit: 10 }),
              new Plugins.PlayerMoved(this.client),
              new Plugins.Apple({ countryCode: "us" }),
            ],
      },
      new Connectors.DiscordJS(this.client),
      this.client.config.lavalink.NODES,
      this.client.config.features.AUTOFIX_LAVALINK.enable
        ? {
            reconnectTries:
              this.client.config.features.AUTOFIX_LAVALINK.reconnectTries,
            restTimeout:
              this.client.config.features.AUTOFIX_LAVALINK.restTimeout,
          }
        : this.client.config.lavalink.SHOUKAKU_OPTIONS
    );
  }
}
