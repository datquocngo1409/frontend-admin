import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {SongService} from '../../song.service';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {SongCategoryService} from '../../song-category.service';
import {ISong} from '../../song';
import {SelectionModel} from '@angular/cdk/collections';
import {Router} from '@angular/router';

@Component({
  selector: 'app-song-edit',
  templateUrl: './song-edit.component.html',
  styleUrls: ['./song-edit.component.scss']
})
export class SongEditComponent implements OnInit, AfterViewInit {
  public songList;
  public categoryList;
  public selection;
  ELEMENT_DATA: ISong[];
  data: ISong[] = [];
  displayedColumns: string[] = ['select', 'id', 'name', 'description', 'singer-name', 'mp3file', 'image', 'category', 'edit'];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public songService: SongService,
              public categoryService: SongCategoryService,
              public router: Router) {
    this.songList = new MatTableDataSource(this.ELEMENT_DATA);
    this.categoryList = new MatTableDataSource([]);
    this.selection = new SelectionModel<ISong[]>(true, []);
  }

  ngOnInit() {
    const songId = localStorage.getItem('editSongId');
    this.songService.getSongById(1);
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

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.songList.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.songList.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: ISong): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  onSubmit() {
    this.songService.updateSong(this.songList).subscribe(data => {
      this.router.navigate(['home/song-list']);
    });
  }

  deleteFunc(song: ISong) {
  }
}
