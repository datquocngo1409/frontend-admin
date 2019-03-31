import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-home-user',
  templateUrl: './home-user.component.html',
  styleUrls: ['./home-user.component.scss']
})
export class HomeUserComponent implements OnInit {
  isHovering: boolean;
  showHideBoolean: boolean;
  showPodCast: boolean;
  @Output() show: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() hide: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

  showFavoriteSong() {
    this.showHideBoolean = true;
    if (this.showHideBoolean) {
      this.show.emit(true);
    } else {
      this.show.emit(false);
    }
  }

  showPodCasts() {
    this.showPodCast = true;
    if (this.showPodCast) {
      this.show.emit(true);
    } else {
      this.show.emit(false);
    }
  }
}
