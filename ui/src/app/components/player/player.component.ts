import { MusicService } from './../../services/music.service';
import { Component, OnInit, Input } from '@angular/core';
import { Song } from '../../model/song.model';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {

  @Input() song: Song;

  songUrl: string;

  constructor(private musicService: MusicService) {
    this.song = {
      id: '',
      songame: '',
      artist: '',
      songimage: '',
      duration: '',
      releaseDate: '',
      filmName: '',
      company: '',
      songurl: ''
    };
  }

  ngOnInit() {
    this.musicService.selectedSong.subscribe(song => {
      this.musicService.getSongDetails(song.id).subscribe(res => {
        this.songUrl = res.data.songurl;
      });
    });
  }

}
