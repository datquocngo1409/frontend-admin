import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ISong} from '../../song';
import {SongService} from '../../song.service';
import {ImageService} from '../../image.service';
import {Router} from '@angular/router';
import {Mp3FileService} from '../../mp3-file.service';
import {SongCategoryService} from '../../song-category.service';
import {ISongCategory} from '../../song-category';

@Component({
  selector: 'app-create-song',
  templateUrl: './create-song.component.html',
  styleUrls: ['./create-song.component.scss']
})
export class CreateSongComponent implements OnInit {

  formCreate: FormGroup;
  fileImg: File;
  fileMp3: File;
  song: ISong;
  songList: ISong[] = [];
  categoryList: ISongCategory[] = [];

  constructor(
    private songCategoryService: SongCategoryService,
    private songService: SongService,
    private imageService: ImageService,
    private mp3FileService: Mp3FileService,
    private fb: FormBuilder,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.songCategoryService.getSongCaegories().subscribe(next => (this.categoryList = next), error1 => (this.categoryList = []));
    this.formCreate = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(3)]],
      singer_name: ['', [Validators.required, Validators.minLength(3)]],
      mp3File: [''],
      image: [''],
      songCategory: ['']
    });
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
    if (this.formCreate.valid && this.fileImg.name != null && this.fileMp3.name != null) {
      this.formCreate.get('image').setValue(`${Date.now() + this.fileImg.name}`);
      this.formCreate.get('mp3File').setValue(`${Date.now() + this.fileMp3.name}`);
      const {value} = this.formCreate;
      this.imageService.create(fbImage).subscribe();
      this.mp3FileService.createMp3File(fbMp3).subscribe();
      this.songService.createSong(value).subscribe(() => {
        this.router.navigate(['home/song-list']).then(() => alert('created success'));
      });
    }
  }
}
