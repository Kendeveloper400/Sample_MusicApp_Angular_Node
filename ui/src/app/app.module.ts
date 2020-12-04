import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SongsComponent } from './components/songs/songs.component';
import { SongComponent } from './components/song/song.component';
import { SongDetailsComponent } from './components/song-details/song-details.component';
import { PlayerComponent } from './components/player/player.component';

import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxAudioPlayerModule } from 'ngx-audio-player';
import {MatInputModule} from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    SongsComponent,
    SongComponent,
    SongDetailsComponent,
    PlayerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatListModule,
    MatIconModule,
    BrowserAnimationsModule,
    NgxAudioPlayerModule,
    MatInputModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
