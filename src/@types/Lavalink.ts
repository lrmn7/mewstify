export type LavalinkDataType = {
  host: string;
  port: number;
  pass: string;
  secure: boolean;
  name: string;
  online: boolean;
};

export type LavalinkUsingDataType = {
  host: string;
  port: number;
  pass: string;
  secure: boolean;
  name: string;
};

export type Headers = {
  "Client-Name": string;
  "User-Agent": string;
  Authorization: string;
  "User-Id": string;
  "Resume-Key": string;
};

export type MewwmeLoopMode = "none" | "queue" | "track" | undefined;

export const MewwmeLoop = {
  none: "none" as MewwmeLoopMode,
  queue: "queue" as MewwmeLoopMode,
  track: "track" as MewwmeLoopMode,
};
