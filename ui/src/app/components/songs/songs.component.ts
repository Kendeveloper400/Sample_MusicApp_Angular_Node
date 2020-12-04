import { MusicService } from './../../services/music.service';
import { Component, OnInit, Input } from '@angular/core';
import { Song } from '../../model/song.model';

@Component({
  selector: 'app-songs',
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.scss']
})
export class SongsComponent implements OnInit {

  @Input() songs: Song[];
  sngs: Song[];
  value: string;

  selectedSong: Song;

  constructor(private musicService: MusicService) {
    this.selectedSong = {
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
    this.musicService.getSongs().subscribe(resp => {
      this.sngs = resp.data;
      this.selectedSong = this.sngs[0];
    });
  }

  clickHandler(song) {
    this.selectedSong = song;
    this.musicService.selectedSong.next(song);
  }

  applyFilter(searchTxt) {
    this.songs = this.sngs.filter(song => song.songame.toLocaleLowerCase().indexOf(searchTxt.toLocaleLowerCase()) !== -1);
  }
}
