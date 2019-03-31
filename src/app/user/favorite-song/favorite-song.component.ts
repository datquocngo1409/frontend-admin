import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-favorite-song',
  templateUrl: './favorite-song.component.html',
  styleUrls: ['./favorite-song.component.scss']
})
export class FavoriteSongComponent implements OnInit {

  @Input() toggle: Boolean;
  constructor() { }

  ngOnInit() {
  }

}
