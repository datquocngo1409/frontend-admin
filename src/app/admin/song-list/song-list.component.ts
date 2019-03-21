import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {SongService} from '../../song.service';
import {ISong} from '../../song';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {Router} from '@angular/router';

@Component({
  selector: 'app-song-list',
  templateUrl: './song-list.component.html',
  styleUrls: ['./song-list.component.scss'],
})
export class SongListComponent implements OnInit, AfterViewInit {
  private songList;
  displayedColumns: string[] = ['id', 'name', 'description', 'singer-name', 'mp3file', 'image', 'category', 'edit', 'delete'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngOnInit() {
    this.songService.getSongs().subscribe(next => (this.songList = next), error1 => (this.songList = []));
  }
  constructor(public songService: SongService,
              public router: Router) {
    this.songList = new MatTableDataSource([]);
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.songList.filter = filterValue;
  }

  ngAfterViewInit(): void {
    this.songList.paginator = this.paginator;
  }

  showEditForm() {
    this.router.navigate(['home/song-edit']);
  }
}

