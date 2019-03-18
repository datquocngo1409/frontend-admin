import { Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss']
})
export class SidenavListComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {
  }
  public showInformation () {
    this.router.navigate(['/home/information']);
  }

  showListSong() {
    this.router.navigate(['/home/song-list']);
  }
}
