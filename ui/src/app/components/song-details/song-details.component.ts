import { MusicService } from './../../services/music.service';
import { Component, OnInit, Input } from '@angular/core';
import { Song } from '../../model/song.model';

@Component({
  selector: 'app-song-details',
  templateUrl: './song-details.component.html',
  styleUrls: ['./song-details.component.scss']
})
export class SongDetailsComponent implements OnInit {

  @Input() song: Song;

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
      this.song = song;
    });
  }

}
