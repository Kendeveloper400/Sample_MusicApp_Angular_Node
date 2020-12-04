import { SongResp } from './../model/song-resp.model';
import { SongsResp } from './../model/songs-resp.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Song } from '../model/song.model';

@Injectable({
  providedIn: 'root'
})
export class MusicService {
  baseUrl = 'http://localhost:8000/';
  selectedSong = new Subject<Song>();

  constructor(private http: HttpClient) { }

  public getSongs(): Observable<SongsResp> {
    return this.http.get<SongsResp>(this.baseUrl + 'songs');
  }

  public getSongDetails(id): Observable<SongResp> {
    return this.http.get<SongResp>(this.baseUrl + 'songs/' + id);
  }

}
