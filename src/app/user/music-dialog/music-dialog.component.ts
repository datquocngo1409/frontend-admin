import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatPaginator} from '@angular/material';
import {SongService} from '../../song.service';
import {ISong} from '../../song';
import {IUser} from '../../user';
import {UserService} from '../../user.service';

@Component({
  selector: 'app-music-dialog',
  templateUrl: './music-dialog.component.html',
  styleUrls: ['./music-dialog.component.scss']
})
export class MusicDialogComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  public username = localStorage.getItem('user');
  songID: string;
  idString: string;
  id: number;
  song: ISong = null;
  played = true;
  private songList: ISong[];
  loop = '';
  user: IUser;
  ArrayFavorite: number[] = [];
  public favoriteSongList: ISong[] = [];
  isRepeated = false;
  index: number;
  hasPrevious = true;
  hasNext = true;

  constructor(
    public dialogRef: MatDialogRef<MusicDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private songService: SongService,
    private userService: UserService
  ) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    // Get Song By ID
    this.songID = localStorage.getItem('song').toString();
    this.idString = localStorage.getItem('id').toString();
    console.log(this.songID);
    this.id = parseInt(this.idString, 10);
    this.songService.getSongById(this.id).subscribe(next => this.song = next);

    // Get User
    this.username = this.username.split('{"token":"jwt will come later","name":"').toString();
    this.username = this.username.substring(1, this.username.length - 2);
    this.userService.getUserByUsername(this.username).subscribe(next => this.user = next);


    this.songService.getSongs().subscribe(next => {
      this.songList = next;
      this.ArrayFavorite = this.user.favouriteMusic.split(',').map(function (item) {
        return parseInt(item, 10);
      });
      let song: ISong;
      for (song of this.songList) {
        if (!!this.isLiked(song.id)) {
          this.favoriteSongList.push(song);
        }
      }
    });
  }


  addCount(element) {
    element.listenCount++;
    this.songService.updateSong(element).subscribe();
  }

  clickPlay() {
    this.played = !this.played;
  }

  clickPause() {
    this.played = !this.played;
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

  repeat() {
    this.isRepeated = !this.isRepeated;
    this.loop = 'loop';
    console.log(this.loop);
  }

  unRepeat() {
    this.isRepeated = !this.isRepeated;
    this.loop = '';
    console.log(this.loop);
  }

  nextSong() {
    this.songService.getSongs().subscribe(next => this.songList = next);
    console.log(this.songList);

    this.idString = localStorage.getItem('id').toString();
    this.id = parseInt(this.idString, 10);
    this.songService.getSongById(this.id).subscribe(next => this.song = next);

    if (this.songList.findIndex(i => i.name === this.song.name) !== (this.songList.length - 1)) {
      this.song = this.songList[this.songList.findIndex(i => i.name === this.song.name) + 1];
    } else {
      this.song = this.songList[0];
    }

    localStorage.setItem('song', this.song.mp3File.name);
    localStorage.setItem('id', this.song.id.toString());
    this.username = localStorage.getItem('user');
    this.ngOnInit();
  }

  previousSong() {
    this.songService.getSongs().subscribe(next => this.songList = next);
    console.log(this.songList);

    this.idString = localStorage.getItem('id').toString();
    this.id = parseInt(this.idString, 10);
    this.songService.getSongById(this.id).subscribe(next => this.song = next);

    if (this.songList.findIndex(i => i.name === this.song.name) !== (this.songList.length - 1)) {
      this.song = this.songList[this.songList.findIndex(i => i.name === this.song.name) + 1];
    } else {
      this.song = this.songList[0];
    }

    localStorage.setItem('song', this.song.mp3File.name);
    localStorage.setItem('id', this.song.id.toString());
    this.username = localStorage.getItem('user');
    this.ngOnInit();
  }
}
