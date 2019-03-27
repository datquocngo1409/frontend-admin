import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {SongService} from '../../song.service';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Router} from '@angular/router';
import {ISong} from '../../song';
import {SelectionModel} from '@angular/cdk/collections';
import {IUser} from '../../user';
import {UserService} from '../../user.service';
// import {PostDialogComponent} from '../post-dialog/post-dialog.component';
// import {Dialog} from 'primeng/dialog';
// import {SongEditComponent} from '../song-edit/song-edit.component';

@Component({
  selector: 'app-new-list-user',
  templateUrl: './new-list.component.html',
  styleUrls: ['./new-list.component.scss'],
})
export class NewListUserComponent implements OnInit, AfterViewInit {
  public username = localStorage.getItem('user');
  userList: IUser[] = [];
  user: IUser;
  ArrayFavorite: number[] = [];
  public songList;
  public selection;
  selectedSong: ISong[] = [];
  ELEMENT_DATA: ISong[] = [];
  displayedColumns: string[] = ['id', 'name', 'description', 'singer-name', 'mp3file', 'image', 'category', 'favorite'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatPaginator;

  constructor(public songService: SongService,
              public router: Router,
              public dialog: MatDialog,
              public userService: UserService
  ) {
    this.songList = new MatTableDataSource<ISong>(this.ELEMENT_DATA);
    this.selection = new SelectionModel<ISong[]>(true, []);
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

  ngOnInit() {
    this.songService.getSongs().subscribe(next => (this.songList.data = next));
    this.userService.getUsers().subscribe(next => this.userList = next);
    this.username = this.username.split('{"token":"jwt will come later","name":"').toString();
    this.username = this.username.substring(1, this.username.length - 2);
    this.userService.getUserByUsername(this.username).subscribe(next => this.user = next);
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

  deleteFunc(song: ISong) {
    this.songService.deleteSong(song.id).subscribe(() => this.songList = this.songList.filter(t => t.id !== song.id));
    alert('Deleted!');
    this.router.navigate(['home/song-list']);
    location.reload();
  }

  onMouseMove() {
    this.ArrayFavorite = this.user.favouriteMusic.split(',').map(function (item) {
      return parseInt(item, 10);
    });
  }

  like(id: number) {
    if (!this.isLiked(id)) {
      this.ArrayFavorite.push(id);
      this.user.favouriteMusic = this.ArrayFavorite.toString();
      this.userService.updateUser(this.user).subscribe();
    } else {
      this.ArrayFavorite.splice(this.ArrayFavorite.indexOf(id), 1);
      this.user.favouriteMusic = this.ArrayFavorite.toString();
      this.userService.updateUser(this.user).subscribe();
    }
  }

  isLiked(id: number) {
    if (this.ArrayFavorite.includes(id)) {
      return true;
    }
    return false;
  }
}

