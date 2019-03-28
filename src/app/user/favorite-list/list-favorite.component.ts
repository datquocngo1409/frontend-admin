import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {SongService} from '../../song.service';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Router} from '@angular/router';
import {ISong} from '../../song';
import {SelectionModel} from '@angular/cdk/collections';
import {UserService} from '../../user.service';
import {IUser} from '../../user';

@Component({
  selector: 'app-list-favorite',
  templateUrl: './list-favorite.component.html',
  styleUrls: ['./list-favorite.component.scss'],
})
export class ListFavoriteComponent implements OnInit, AfterViewInit {
  public username = localStorage.getItem('user');
  userList: IUser[] = [];
  user: IUser;
  ArrayFavorite: number[] = [];
  public songList;
  public favoriteSongList: ISong[] = [];
  public selection;
  ELEMENT_DATA: ISong[] = [];
  displayedColumns: string[] = ['id', 'name', 'description', 'singer-name', 'mp3file', 'image', 'category', 'favorite'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatPaginator;
  private songList2: ISong[];

  constructor(public songService: SongService,
              public router: Router,
              public dialog: MatDialog,
              public userService: UserService
  ) {
    this.songList = new MatTableDataSource<ISong>(this.ELEMENT_DATA);
    this.selection = new SelectionModel<ISong[]>(true, []);
  }

  ngOnInit() {
    this.songService.getSongs().subscribe(next => (this.songList.data = next), error1 => this.songList = []);
    this.songService.getSongs().subscribe(next => (this.songList2 = next), error1 => this.songList2 = []);
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
    let song: ISong;
    for (song of this.songList2) {
      if (!!this.isLiked(song.id)) {
        this.favoriteSongList.push(song);
      }
    }
    this.songList2.splice(0, this.songList2.length + 1);
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

