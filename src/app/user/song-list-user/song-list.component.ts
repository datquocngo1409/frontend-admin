import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {SongService} from '../../song.service';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Router} from '@angular/router';
import {ISong} from '../../song';
import {SelectionModel} from '@angular/cdk/collections';
// import {PostDialogComponent} from '../post-dialog/post-dialog.component';
// import {Dialog} from 'primeng/dialog';
// import {SongEditComponent} from '../song-edit/song-edit.component';

@Component({
  selector: 'app-song-list-user',
  templateUrl: './song-list.component.html',
  styleUrls: ['./song-list.component.scss'],
})
export class SongListUserComponent implements OnInit, AfterViewInit {
  public songList;
  public selection;
  ELEMENT_DATA: ISong[] = [];
  displayedColumns: string[] = ['select', 'id', 'name', 'description', 'singer-name', 'mp3file', 'image', 'category', 'edit', 'delete'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatPaginator;

  constructor(public songService: SongService,
              public router: Router,
              public dialog: MatDialog) {
    this.songList = new MatTableDataSource<ISong>(this.ELEMENT_DATA);
    this.selection = new SelectionModel<ISong[]>(true, []);
  }

  // removeSelectedRows(song: ISong) {
  //   this.selection.selected.forEach(item => {
  //       const index = this.songService.getSongById(song.id);
  //       console.log(this.songService.getSongById(song.id));
  //       this.selection = new SelectionModel<ISong[]>(true, []);
  //       this.selection = new MatTableDataSource<ISong>(this.ELEMENT_DATA);
  //     }
  //   );
  // }

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

  // openDialog(song: ISong): void {
  //   const dialogRef = this.dialog.open(SongEditComponent, {
  //     width: '600px',
  //   });
  //   dialogRef.componentInstance.event.subscribe((result) => {
  //     this.songService.createSong(result.data);
  //   });
  //   localStorage.removeItem('editSongId');
  //   localStorage.setItem('editSongId', song.id.toString());
  // }

  deleteFunc(song: ISong) {
    this.songService.deleteSong(song.id).subscribe(() => this.songList = this.songList.filter(t => t.id !== song.id));
    alert('Deleted!');
    this.router.navigate(['home/song-list']);
    location.reload();
  }
}

