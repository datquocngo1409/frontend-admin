import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import {LoginUserComponent} from '../../login-user/login-user.component';
import {MatDialog} from '@angular/material';
import {RegisterUserComponent} from '../../user/register-user/register-user.component';
import {InformationUserComponent} from '../../user/information-user/information.component';

@Component({
  selector: 'app-header-user',
  templateUrl: './header-user.component.html',
  styleUrls: ['./header-user.component.scss']
})
export class HeaderUserComponent implements OnInit {
  @Output() public sidenavToggle = new EventEmitter();
  public logined = false;
  public username = localStorage.getItem('user');

  constructor(
    public router: Router,
    public dialog: MatDialog
  ) {
  }

  ngOnInit() {
    if (localStorage.getItem('user')) {
      this.logined = true;
      this.username = this.username.split('{"token":"jwt will come later","name":"').toString();
      this.username = this.username.substring(1, this.username.length - 2);
    }
  }

  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.clear();
    this.router.navigate(['/']);
    this.logined = false;
  }

  login() {
    this.router.navigate(['/login']);
  }

  register() {
    const dialogRef = this.dialog.open(RegisterUserComponent, {width: '600px', maxHeight: '1000px'});
  }

  userInfomation() {
    const dialogRef = this.dialog.open(InformationUserComponent, {minWidth: '400px'});
  }
}
