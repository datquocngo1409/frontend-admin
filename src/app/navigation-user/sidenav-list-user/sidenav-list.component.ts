import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sidenav-list-user',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss']
})
export class SidenavListUserComponent implements OnInit {

  constructor(public router: Router) {
  }

  public logined = false;

  ngOnInit() {
    if (localStorage.getItem('user')) {
      this.logined = true;
    }
  }

  public showInformation() {
    this.router.navigate(['/information']);
  }

  showListSong() {
    this.router.navigate(['/song-list']);
  }

  showListTop() {
    this.router.navigate(['/list-top']);
  }

  showFavoriteSong() {
    this.router.navigate(['/favorite-song']);
  }

  showListNew() {
    this.router.navigate(['/new-list']);
  }
}
