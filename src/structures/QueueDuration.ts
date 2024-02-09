import { MewwmePlayer, MewwmeTrack } from "mewwme.player";

export class QueueDuration {
  parse(player: MewwmePlayer) {
    const current = player.queue.current!.length ?? 0;
    return player.queue.reduce((acc, cur) => acc + (cur.length || 0), current);
  }
}

export class StartQueueDuration {
  parse(tracks: MewwmeTrack[]) {
    const current = tracks[0].length ?? 0;
    return tracks.reduce((acc, cur) => acc + (cur.length || 0), current);
  }
}
