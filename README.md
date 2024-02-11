<br />
<p align="center">
  <a href="https://discord.gg/6EXgrmtkPX">
    <img src="https://cdn.is-a.fun/bot/mewwme/mewgithub.png" alt="Mewwme" >
  </a>

  <h1 align="center">Mewwme's</h1>

  <p align="center">The Discord music bot that's 100% free with no payment or votes required to access all its amazing functionalities.
    <br />
    <br />
    <a href="https://discord.com/api/oauth2/authorize?client_id=928711702596423740&permissions=551940385840&response_type=code&redirect_uri=https%3A%2F%2Fdiscord.gg%2F6EXgrmtkPX&scope=guilds.join+bot+applications.commands">Invite Mewwme's</a>
    ·
    <a href="https://discord.gg/6EXgrmtkPX">Report Issues & Give Suggestions</a>
    ·
    <a href="https://discord.gg/mewwme">Support Server</a>
  </p>
</p>

## ✨ Features
- Advanced Music System With Control Buttons
- Song Request Channel
- 24/7 Mode
- Multi Language
- Prefix & Slash Commands
- Lyrics search from GENIUS API
- 25+ Filters
- Customizable Music Card with Mewcard (added 18 themes)
- Playlist System
- Play Song Using File
- Play Lofi Mode For Soft Music
- Shard System
- Auto Reconnect
- Auto Fix Lavalink From [lavalink.darrennathanael.com](https://lavalink.darrennathanael.com/NoSSL/lavalink-without-ssl)
- New Lavalink Supported V4
- Announcement for all servers

## Additional Function
1. Announcement Feature - Now you can send messages to all connected servers effortlessly, keeping everyone informed and engaged.
2. Update Feature - A dedicated channel for support has been established to share the latest information, updates, and important bot-related news.
3. Suggestions Feature - Users can now offer suggestions for bot improvements from anywhere, sending them directly to the support channel.
4. Report Feature - Users can conveniently report errors, bugs, or any issues using the 'report' command for swift resolution.

## 📜 Command Categories

| Category   | Commands                                                                                           |
|------------|----------------------------------------------------------------------------------------------------|
| DEV      | announcement, restart, update                                                                      |
| INFO       | about, avatar, help, info, lavalink, invite, ping, privacy, profile, report, status, suggestions, termsofservice |
| MUSIC      | autoplay, clear, mp3, forward, join, lofi, loopall, loop, lyrics, music, nowplaying, pause, play, previous, queue, radio, remove, remove-duplicate, replay, resume, rewind, seek, shuffle, skip, stop, volume |
| PLAYLIST   | pl-add, pl-all, pl-create, pl-delete, pl-detail, pl-editor, pl-play, pl-info, playlist, pl-remove, pl-save-queue |
| FILTER     | 3d, bass, china, chipmunk, bassboost, darthvader, daycore, doubletime, earrape, equalizer, filter, karaoke, nightcore, pitch, pop, rate, reset, slowmotion, soft, speed, superbass, television, treblebass, tremolo, vaporwave, vibrate, vibrato |
| SETTINGS   | 24/7, setting-control, language, prefix, setup, status-channel                                   |
| UTILS      | avatar, bigemoji, emoji, github, guildinfo, memberinfo                                            |



## 🚀 Supported Sources
|           Music Source           | Without Lavalink Plugin | With Lavalink Plugin |
| :------------------------------: | :---------------------: | :------------------: |
|             YouTube              |           ✅            |          ✅          |
|            SoundCloud            |           ✅            |          ✅          |
|           (LS) Spotify           |           ⚠️            |          ✅          |
|               HTTP               |           ✅            |          ✅          |
|           (LS) Deezer            |           ⚠️            |          ✅          |
|              Twitch              |           ✅            |          ✅          |
|             Bandcamp             |           ✅            |          ✅          |
|            Nicovideo             |           ⚠️            |          ⚠️          |
|         (LS) Apple Music         |           ⚠️            |          ✅          |
|        (LS) Yandex Music         |           ❌            |          ✅          |
|         (LS) Flowery TTS         |           ❌            |          ✅          |
|          (DB) Mixcloud           |           ❌            |          ✅          |
|          (DB) OC ReMix           |           ❌            |          ✅          |
|           (DB) Clyp.it           |           ❌            |          ✅          |
|           (DB) Reddit            |           ❌            |          ✅          |
|           (DB) GetYarn           |           ❌            |          ✅          |
|       (DB) Text to Speech        |           ❌            |          ✅          |
|        (DB) TikTok (BETA)        |           ❌            |          ✅          |
| (DB) P\*\*nhub (Not recommended) |           ❌            |          ✅          |
|          (DB) Soundgasm          |           ❌            |          ✅          |

- ✅ **Full support with the default Lavalink configuration**
- ⚠️ **Supports but resolves from YouTube or SoundCloud only**
- ❌ **Unsupported**
- (LS) **Source from LavaSrc plugin**
- (DB) **Source from DuncteBot plugin**

## 📚 Supported Databases
- [x] MySQL
- [x] MongoDB
- [x] JSON
- [x] PostgresSQL
```yaml
  DATABASE:
    driver: "postgres" # Note: mongodb, mysql, json, postgres
    config:
      host: "localhost"
      user: "me"
      password: "secret"
      database: "my_db"


  DATABASE:
    driver: "mysql" # Note: mongodb, mysql, json, postgres
    config:
      host: "localhost"
      user: "me"
      password: "secret"
      database: "my_db"


  DATABASE:
    driver: "mongodb"  # Note: mongodb, mysql, json, postgres
    config:
      uri: "mongodb://127.0.0.1:27017/mewwme"  # mongodb uri



  DATABASE:
    driver: "json" # mongodb, mysql, json, postgres
    config: { path: "./mewwme.database.json" }
```

## 🏆 UI Interface of bot
![ui-bot](https://cdn.is-a.fun/bot/archive/ui.png)

## 🔮 18 Themes, easy setup
![musiccard](https://cdn.is-a.fun/bot/archive/musiccard.png)
![musiccard](https://cdn.is-a.fun/bot/archive/card.png)

## 📋 Requirements
- ![Node.js](https://img.shields.io/badge/Node.js-026E00?style=for-the-badge) Node.js Version 18+ [Download](https://nodejs.org/en/download)
- ![Discord](https://img.shields.io/badge/Discord-404EED?style=for-the-badge) Discord Bot Token [Guide](https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot)
- ![Lavalink](https://img.shields.io/badge/Lavalink-FC3F37?style=for-the-badge) Lavalink Version 4.0.0+ [Download](https://github.com/lavalink-devs/Lavalink/releases)
- ![Git](https://img.shields.io/badge/Git-F05033?style=for-the-badge) Git [Download](https://git-scm.com/downloads)

## 🛠️ Installation local or vps
1. Change the name of **config.example.yml** to **config.yml** and fill it with `TOKEN`, `NODES` and  other.
2. run `yarn install` to install the required packages.
3. run `yarn start:prod` to build & run the project in production mode.
4. run `yarn start:dev` to build & run the project in  development mode.
5. **Enjoy Listening To Music With Mewwme!**

## 🛠️ Installation with Pterodactyl Panel
1. [Click Here](https://github.com/mewwme/mewwme.github.io/blob/main/cdn/egg-node-j-s--universal.json) to download the Node.js Egg Template for Pterodactyl.
2. Change the name of **config.example.yml** to **config.yml** and fill it with `TOKEN`, `NODES` and  other.
3. In the Pterodactyl Panel, go to your server's Startup tab:
   - Set `STARTUP COMMAND 1` to `npm install`.
4. Optionally, if you have a production-ready start command:
   - Set `STARTUP COMMAND 2` to `npm run start:prod`.
5. **Enjoy Listening To Music With Mewwme!**

## Setting yaml with .env
```yaml
# Mewwme config file via .yaml
# You can use ${} to pass an enviroment varible from .env file
# Eg:
# something: ${TOKEN}
```

Make sure to follow these steps carefully to set up your server for running the Mewwme music bot. If you encounter any issues, join [server discord](https://discord.gg/6EXgrmtkPX)

## ⚙️ Guide
For advanced installation and configuration guidance, feel free to discuss on our [Discord Server](https://discord.gg/6EXgrmtkPX)

---
