import {Component, EventEmitter, Inject, OnInit, ViewChild} from '@angular/core';
import {SongService} from '../../song.service';
import {MAT_DIALOG_DATA, MatDialogRef, MatPaginator, MatTableDataSource} from '@angular/material';
import {SongCategoryService} from '../../song-category.service';
import {ISong} from '../../song';
import {ActivatedRoute, Router} from '@angular/router';
import {ISongCategory} from '../../song-category';
import {IImage} from '../../image';
import {IMp3File} from '../../mp3-file';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ImageService} from '../../image.service';
import {Mp3FileService} from '../../mp3-file.service';
import {ToasterService} from 'truly-ui';

@Component({
  selector: 'app-song-edit',
  templateUrl: './song-edit.component.html',
  styleUrls: ['./song-edit.component.scss']
})
export class SongEditComponent implements OnInit {
  fileImg: File;
  fileMp3: File;
  categoryList: ISongCategory[] = [];
  song: ISong = null;
  imageList: IImage[] = [];
  mp3FileList: IMp3File[] = [];
  image: IImage;
  mp3File: IMp3File;
  name: string;
  formSong: FormGroup;
  public event: EventEmitter<any> = new EventEmitter();
  uploadedMp3 = false;
  uploadedImage = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public dialogRef: MatDialogRef<SongEditComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private songCategoryService: SongCategoryService,
              private songService: SongService,
              private imageService: ImageService,
              private mp3FileService: Mp3FileService,
              private fb: FormBuilder,
              private router: Router,
              private toasterService: ToasterService,
              private route: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    this.songCategoryService.getSongCaegories().subscribe(data => this.categoryList = data);
    const songId = localStorage.getItem('editSongId');
    this.songService.getSongById(Number(songId)).subscribe(data => {
      this.song = data;
      this.formSong.patchValue(this.song);
    });
    this.formSong = this.fb.group({
      name: [''],
      description: [''],
      singer_name: [''],
      mp3File: [''],
      image: [''],
      songCategory: ['']
    });
  }

  onSubmit() {
    this.imageService.getImages().subscribe(next => this.imageList = next);
    this.mp3FileService.getMp3Files().subscribe(next => this.mp3FileList = next);
    const {value} = this.formSong;
    const data = {
      ...this.song,
      ...value
    };
    this.songService.updateSong(data).subscribe(() => {
      this.router.navigate(['home/song-list']);
    });
  }

  clickUpMp3() {
    this.uploadedMp3 = true;
  }

  clickUpImage() {
    this.uploadedImage = true;
    this.imageService.getImages().subscribe(next => this.imageList = next);
  }

  loadMp3Select() {
    this.mp3FileService.getMp3Files().subscribe(next => this.mp3FileList = next);
  }

  loadImageSelect() {
    this.imageService.getImages().subscribe(next => this.imageList = next);
  }

  onSelectImage(event) {
    this.fileImg = event.target.files[0];
  }

  onSelectMp3(event) {
    this.fileMp3 = event.target.files[0];
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
