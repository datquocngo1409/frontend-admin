import {Component, EventEmitter, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {SongService} from '../../song.service';
import {ISongCategory} from '../../song-category';
import {SongCategoryService} from '../../song-category.service';
import {ImageService} from '../../image.service';
import {Mp3FileService} from '../../mp3-file.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ISong} from '../../song';
import {IImage} from '../../image';
import {IMp3File} from '../../mp3-file';
import {Router} from '@angular/router';
import {ToasterService} from 'truly-ui';

@Component({
  selector: 'app-post-dialog',
  templateUrl: './post-dialog.component.html',
  styleUrls: ['./post-dialog.component.scss']
})
export class PostDialogComponent implements OnInit {
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

  constructor(
    public dialogRef: MatDialogRef<PostDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private songCategoryService: SongCategoryService,
    private songService: SongService,
    private imageService: ImageService,
    private mp3FileService: Mp3FileService,
    private fb: FormBuilder,
    private router: Router,
    private toasterService: ToasterService
  ) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.songCategoryService.getSongCaegories().subscribe(data => this.categoryList = data);
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
    this.songService.createSong(value).subscribe(() => {
      this.dialogRef.close();
    });
  }
  onClick( event ) {
    this.toasterService.success({
      title: 'Created successful!',
      message: 'Check list items...',
      position: 'bottom-right',
      width: '400px',
      height: '70px',
      progress: true,
      showIcon: true,
      time: 2000,
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
}
