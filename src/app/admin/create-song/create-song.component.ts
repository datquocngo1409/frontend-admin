import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ISong} from '../../song';
import {SongService} from '../../song.service';
import {ImageService} from '../../image.service';
import {Router} from '@angular/router';

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

  constructor(
    private songService: SongService,
    private imageService: ImageService,
    private fb: FormBuilder,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.formCreate = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(3)]],
      singer_name: ['', [Validators.required, Validators.minLength(3)]],
      nameImg: [''],
    });
  }

}
