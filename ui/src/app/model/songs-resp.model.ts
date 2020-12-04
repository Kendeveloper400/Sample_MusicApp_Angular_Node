import { Song } from './song.model';

export interface SongsResp {
  msg: string;
  data: Song[];
}
