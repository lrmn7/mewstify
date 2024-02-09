export interface Config {
  bot: Bot;
  lavalink: Lavalink;
  features: Features;
  Emoji: Emoji;
  ServerSupport: ServerSupport;
}

export interface Bot {
  TOKEN: string;
  EMBED_COLOR: string;
  OWNER_IDS: string[];
  LANGUAGE: string;
  LIMIT_TRACK: number;
  LIMIT_PLAYLIST: number;
  SAFE_ICONS_MODE: boolean;
  SAFE_PLAYER_MODE: boolean;
  DELETE_MSG_TIMEOUT: number;
  DEBUG_MODE: boolean;
  DEVELOPER_NAME: string;
  DEVELOPER_URL: string;
  DONATE_URL: string;
  SERVER_SUPPORT: string;
  INVITE_URL: string;
  VOTE_URL: string;
  BOT_ACTIVITY_TYPE: number;
  BOT_ACTIVITY1: string;
  BOT_ACTIVITY2: string;
  BOT_ACTIVITY3: string;
  IMGURL_GUILDADD: string;
  IMGURL_MENUHELP: string;
  IMGURL_COMMANDMENU: string;
  IMGURL_MENTION: string;
  STREAM_URL: string;
  BOT_STATUS: string;
  CUSTOM_STATUS: string;
  REQUEST_IMAGE: string;
  THEMES_MUSIC: string;
  GENIUS_APIKEY: string;
  TOPGG_TOKEN: string;
}

export interface Features {
  DATABASE: Database;
  MESSAGE_CONTENT: MessageContent;
  AUTOFIX_LAVALINK: AutofixLavalink;
  WEB_SERVER: WebServer;
  DEV_ID: string[];
}

export interface AutofixLavalink {
  enable: boolean;
  reconnectTries: number;
  restTimeout: number;
}

export interface Database {
  driver: string;
  config: any;
}

export interface MessageContent {
  enable: boolean;
  commands: Commands;
}

export interface Commands {
  enable: boolean;
  prefix: string;
}

export interface WebServer {
  enable: boolean;
  PORT: number;
  websocket: Websocket;
}

export interface Websocket {
  enable: boolean;
  host: string;
  secret: string;
  auth: boolean;
  trusted: string[];
}

export interface Lavalink {
  SPOTIFY: Spotify;
  DEFAULT: string[];
  NP_REALTIME: boolean;
  LEAVE_TIMEOUT: number;
  NODES: Node[];
  SHOUKAKU_OPTIONS: ShoukakuOptions;
  SEARCH_ENGINE: string;
}

export interface Node {
  url: string;
  name: string;
  auth: string;
  secure: boolean;
}

export interface ShoukakuOptions {
  moveOnDisconnect: boolean;
  resumable: boolean;
  resumableTimeout: number;
  reconnectTries: number;
  restTimeout: number;
}

export interface Spotify {
  enable: boolean;
  id: string;
  secret: string;
}

export interface Emoji {
  E_HOME: string;
  E_SETTING: string;
  E_ADMIN: string;
  E_DEV: string;
  E_UTILS: string;
  E_INFO: string;
  E_PLAYLIST: string;
  E_FILTER: string;
  E_ALLCMD: string;
  E_MUSIC: string;
  E_LOADING: string;
}

export interface ServerSupport {
  UPDATE_CHANNEL_ID: string;
  SUGGESTION_CHANNEL_ID: string;
  BUG_REPORT_CHANNEL_ID: string;
  BOTLOGS_JOINLEFT: string;
}
