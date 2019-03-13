import { Component, OnInit } from '@angular/core';
import {IAdmin} from '../admin';
import {AdminService} from '../admin.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  adminList: IAdmin[] = [];

  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.adminService.getAdmins().subscribe(next => (this.adminList = next), error1 => (this.adminList = []));
  }

}
