import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {SongService} from '../../song.service';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Router} from '@angular/router';
import {ISong} from '../../song';

@Component({
  selector: 'app-song-list',
  templateUrl: './song-list.component.html',
  styleUrls: ['./song-list.component.scss'],
})
export class SongListComponent implements OnInit, AfterViewInit {
  public songList;
  ELEMENT_DATA: ISong[] = [];
  displayedColumns: string[] = ['id', 'name', 'description', 'singer-name', 'mp3file', 'image', 'category', 'edit'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatPaginator;
  constructor(public songService: SongService,
              public router: Router) {
    this.songList = new MatTableDataSource(this.ELEMENT_DATA);
  }
  ngOnInit() {
    this.songService.getSongs().subscribe(next => (this.songList.data = next));
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.songList.filter = filterValue;
  }

  ngAfterViewInit() {
    this.songList.paginator = this.paginator;
    this.songList.sort = this.sort;
  }

  showEditForm(song: ISong) {
    localStorage.removeItem('editSongId');
    localStorage.setItem('editSongId', song.id.toString());
    this.router.navigate(['home/song-edit']);
  }
}

