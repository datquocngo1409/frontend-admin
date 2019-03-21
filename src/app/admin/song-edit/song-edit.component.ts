import { Component, OnInit } from '@angular/core';
import {SongService} from '../../song.service';
import {MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-song-edit',
  templateUrl: './song-edit.component.html',
  styleUrls: ['./song-edit.component.scss']
})
export class SongEditComponent implements OnInit {
  public songList;
  displayedColumns: string[] = ['id', 'name', 'description', 'singer-name', 'mp3file', 'image', 'category', 'edit', 'delete'];

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.songList.filter = filterValue;
  }
  constructor(public songService: SongService) {
    this.songList = new MatTableDataSource([]);
  }

  ngOnInit() {
    this.songService.getSongs().subscribe(next => (this.songList = next), error1 => (this.songList = []));
  }

}
