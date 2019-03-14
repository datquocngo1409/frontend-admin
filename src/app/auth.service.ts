import {Injectable, OnInit} from '@angular/core';
import {IAdmin} from './admin';
import {AdminService} from './admin.service';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit {

  admin: any;
  adminList: IAdmin[] = [];
  public logined: boolean;

  constructor(
    private adminService: AdminService,
    private route: Router
  ) {
  }

  isAuthenticated(): boolean {
    this.adminService.getAdmins().subscribe(next => (this.adminList = next), error1 => (this.adminList = []));
    let adminFor;
    this.logined = false;
    for (adminFor of this.adminList) {
      if (this.admin.username === adminFor.username && this.admin.password === adminFor.password) {
        this.logined = true;
      }
    }
    return this.logined;
  }

  ngOnInit(): void {
    this.adminService.getAdmins().subscribe(next => (this.adminList = next), error1 => (this.adminList = []));
  }

  login(username: string, password: string) {
    this.admin = {
      username: username,
      password: password
    };
    if (this.isAuthenticated()) {
      this.route.navigate(['home']);
    }
  }

  logout() {
    this.admin = null;
  }
}
