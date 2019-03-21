import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {SongService} from '../../song.service';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {SongCategoryService} from '../../song-category.service';
import {ISong} from '../../song';

@Component({
  selector: 'app-song-edit',
  templateUrl: './song-edit.component.html',
  styleUrls: ['./song-edit.component.scss']
})
export class SongEditComponent implements OnInit, AfterViewInit {
  public songList;
  public categoryList;
  ELEMENT_DATA: ISong[] = [];
  displayedColumns: string[] = ['id', 'name', 'description', 'singer-name', 'mp3file', 'image', 'category', 'edit', 'delete'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(public songService: SongService,
              public categoryService: SongCategoryService) {
    this.songList = new MatTableDataSource(this.ELEMENT_DATA);
    this.categoryList = new MatTableDataSource([]);
  }
  ngOnInit() {
    this.songService.getSongs().subscribe(next => (this.songList.data = next), error1 => (this.songList = []));
    this.categoryService.getSongCaegories().subscribe(data => (this.categoryList = data));
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.songList.filter = filterValue;
  }

  ngAfterViewInit(): void {
    this.songList.paginator = this.paginator;
  }
}
