import { Component, OnInit } from '@angular/core';
import {SongService} from '../../song.service';
import {ISong} from '../../song';

@Component({
  selector: 'app-song-list',
  templateUrl: './song-list.component.html',
  styleUrls: ['./song-list.component.scss']
})
export class SongListComponent implements OnInit {

  songList: ISong[] = [];

  constructor(public songService: SongService) { }

  ngOnInit() {
    this.songService.getSongs().subscribe(next => (this.songList = next), error1 => (this.songList = []));
  }

}
