import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {SongService} from '../../song.service';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Router} from '@angular/router';
import {ISong} from '../../song';
import {SelectionModel} from '@angular/cdk/collections';
import {UserService} from '../../user.service';
import {IUser} from '../../user';
// import {MusicDialogComponent} from '../post-dialog/post-dialog.component';
// import {Dialog} from 'primeng/dialog';
// import {SongEditComponent} from '../song-edit/song-edit.component';

@Component({
  selector: 'app-list-top',
  templateUrl: './list-top.component.html',
  styleUrls: ['./list-top.component.scss'],
})
export class ListTopComponent implements OnInit, AfterViewInit {
  public username = localStorage.getItem('user');
  userList: IUser[] = [];
  user: IUser;
  ArrayFavorite: number[] = [];
  public songList;
  public selection;
  ELEMENT_DATA: ISong[] = [];
  displayedColumns: string[] = ['id', 'name', 'description', 'singer-name', 'mp3file', 'image', 'category', 'favorite', 'listenCount'];

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

  ngOnInit() {
    this.songService.getSongs().subscribe(next => (this.songList.data = next));
    this.userService.getUsers().subscribe(next => this.userList = next);
    this.username = this.username.split('{"token":"jwt will come later","name":"').toString();
    this.username = this.username.substring(1, this.username.length - 2);
    this.userService.getUserByUsername(this.username).subscribe(next => this.user = next);
  }

  ngAfterViewInit() {
    this.songList.paginator = this.paginator;
    this.songList.sort = this.sort;
  }


  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.songList.filter = filterValue;
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

  addCount(element) {
    element.listenCount++;
    this.songService.updateSong(element).subscribe();
  }
}

