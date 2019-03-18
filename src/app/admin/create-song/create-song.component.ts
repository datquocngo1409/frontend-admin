import {Component, OnInit} from '@angular/core';
import {ISong} from '../../song';
import {SongService} from '../../song.service';
import {MatDialog} from '@angular/material';
import {PostDialogComponent} from '../post-dialog/post-dialog.component';

@Component({
  selector: 'app-create-song',
  templateUrl: './create-song.component.html',
  styleUrls: ['./create-song.component.scss']
})
export class CreateSongComponent implements OnInit {

  fileMp3: File;
  song: ISong;

  constructor(
    private songService: SongService,
    public dialog: MatDialog
  ) {
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(PostDialogComponent, {
      width: '600px',
    });
    dialogRef.componentInstance.event.subscribe((result) => {
      this.songService.createSong(result.data);
    });
  }

  ngOnInit() {
  }
}
