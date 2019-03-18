import {Component, EventEmitter, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {SongService} from '../../song.service';
import {ISongCategory} from '../../song-category';
import {SongCategoryService} from '../../song-category.service';
import {ImageService} from '../../image.service';
import {Mp3FileService} from '../../mp3-file.service';

@Component({
  selector: 'app-post-dialog',
  templateUrl: './post-dialog.component.html',
  styleUrls: ['./post-dialog.component.scss']
})
export class PostDialogComponent implements OnInit {
  fileImg: File;
  fileMp3: File;
  categoryList: ISongCategory[] = [];
  formCreate = {
    name: '',
    description: '',
    singer_name: '',
    mp3File: '',
    image: '',
    songCategory: ''
  };
  public event: EventEmitter<any> = new EventEmitter();

  constructor(
    public dialogRef: MatDialogRef<PostDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private songCategoryService: SongCategoryService,
    private songService: SongService,
    private imageService: ImageService,
    private mp3FileService: Mp3FileService,
  ) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.songCategoryService.getSongCaegories().subscribe(data => this.categoryList = data);
  }

  onSelectImage(event) {
    this.fileImg = event.target.files[0];
  }

  onSelectMp3(event) {
    this.fileMp3 = event.target.files[0];
  }

  onSubmit() {
    const fbImage = new FormData();
    const fbMp3 = new FormData();
    fbImage.append('fileImage', this.fileImg, Date.now() + this.fileImg.name);
    fbMp3.append('fileMp3', this.fileMp3, Date.now() + this.fileMp3.name);
    // if (this.formCreate.valid && this.fileImg.name != null && this.fileMp3.name != null) {
    //   this.formCreate.get('image').setValue(`${Date.now() + this.fileImg.name}`);
    //   this.formCreate.get('mp3File').setValue(`${Date.now() + this.fileMp3.name}`);
    //   const {value} = this.formCreate;
    //   this.imageService.create(fbImage).subscribe();
    //   this.mp3FileService.createMp3File(fbMp3).subscribe();
    //   this.songService.createSong(value).subscribe(() => {
    //     this.router.navigate(['home/song-list']).then(() => alert('created success'));
    //   });
    // }
  }
}
