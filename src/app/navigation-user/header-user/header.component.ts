import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header-user',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderUserComponent implements OnInit {
  @Output() public sidenavToggle = new EventEmitter();

  constructor(public router: Router) { }

  ngOnInit() {
  }

  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  }

}
