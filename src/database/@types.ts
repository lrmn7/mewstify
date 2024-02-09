import { QuickDB } from "mewwme.quick.db";
import { AutoReconnect } from "./schema/AutoReconnect.js";
import { Playlist } from "./schema/Playlist.js";
import { Code } from "./schema/Code.js";
import { Control } from "./schema/Control.js";
import { Setup } from "./schema/Setup.js";
import { Language } from "./schema/Language.js";
import { Status } from "./schema/Status.js";
import { Prefix } from "./schema/Prefix.js";

export interface DatabaseTable {
  autoreconnect: QuickDB<AutoReconnect>;
  playlist: QuickDB<Playlist>;
  code: QuickDB<Code>;
  control: QuickDB<Control>;
  setup: QuickDB<Setup>;
  language: QuickDB<Language>;
  status: QuickDB<Status>;
  prefix: QuickDB<Prefix>;
}
