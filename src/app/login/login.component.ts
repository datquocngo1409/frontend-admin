import { Component, OnInit } from '@angular/core';
import {IAdmin} from '../admin';
import {AdminService} from '../admin.service';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  adminList: IAdmin[] = [];
  username = '';
  password = '';

  constructor(
    private adminService: AdminService,
    public auth: AuthService
  ) {
  }

  ngOnInit() {
    this.adminService.getAdmins().subscribe(next => (this.adminList = next), error1 => (this.adminList = []));
  }

}
