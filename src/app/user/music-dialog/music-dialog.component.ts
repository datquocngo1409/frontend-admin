import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatPaginator} from '@angular/material';
import {SongService} from '../../song.service';
import {ISong} from '../../song';

@Component({
  selector: 'app-music-dialog',
  templateUrl: './music-dialog.component.html',
  styleUrls: ['./music-dialog.component.scss']
})
export class MusicDialogComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  songID: string;
  idString: string;
  id: number;
  song: ISong = null;

  constructor(
    public dialogRef: MatDialogRef<MusicDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private songService: SongService
  ) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.songID = localStorage.getItem('song').toString();
    this.idString = localStorage.getItem('id').toString();
    this.id = parseInt(this.idString, 10);
    this.songService.getSongById(this.id).subscribe(next => this.song = next);
  }


}
