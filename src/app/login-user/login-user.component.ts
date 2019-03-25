import { Component, OnInit } from '@angular/core';
import {IUser} from '../user';
import {UserService} from '../user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.scss']
})
export class LoginUserComponent implements OnInit {

  userList: IUser[] = [];
  username = '';
  password = '';
  hide = true;

  constructor(
    private userService: UserService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.userService.getUsers().subscribe(next => (this.userList = next), error1 => (this.userList = []));
  }

  login(username: string, password: string) {
    let userFor;
    for (userFor of this.userList) {
      if (username === userFor.username && password === userFor.password) {
        this.username = username;
        this.password = password;
        localStorage.setItem('user', JSON.stringify({token: 'jwt will come later', name: username}));
        this.router.navigate(['']);
      }
    }
  }
}
