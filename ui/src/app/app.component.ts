import { MusicService } from './services/music.service';
import { Component, OnInit } from '@angular/core';
import { Song } from './model/song.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'musicapp';
  $songs: Song[] = [];

  constructor(private musicService: MusicService) {}

  ngOnInit() {
    this.musicService.getSongs().subscribe(resp => {
      this.$songs = resp.data;
      this.musicService.selectedSong.next(this.$songs[0]);
    });
  }
}
