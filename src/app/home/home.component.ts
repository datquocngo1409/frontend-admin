import { Component, OnInit } from '@angular/core';
import {ISong} from '../song';
import {SongService} from '../song.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  songList: ISong[] = [];

  constructor(
    private songService: SongService
  ) { }

  ngOnInit() {
    this.songService.getSongs().subscribe(next => (this.songList = next), error1 => (this.songList = []));
  }

}
