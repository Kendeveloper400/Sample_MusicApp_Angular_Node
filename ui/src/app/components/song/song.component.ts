import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Song } from '../../model/song.model';

@Component({
  selector: 'app-song',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.scss']
})
export class SongComponent implements OnInit {

  @Input() song: Song;

  @Input() isSelected: boolean;

  @Output() selectSong = new EventEmitter();

  constructor() {
    this.isSelected = false;
  }

  ngOnInit() {
  }

  songClicked() {
    this.selectSong.emit(this.song);
  }
}
