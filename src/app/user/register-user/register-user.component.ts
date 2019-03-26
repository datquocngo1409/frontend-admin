import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {IUser} from '../../user';
import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../../user.service';
import {Router} from '@angular/router';
import {IAvatar} from '../../avatar';
import {AvatarService} from '../../avatar.service';
import {MAT_DIALOG_DATA, MatDialogRef, MatPaginator} from '@angular/material';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss'],
})
export class RegisterUserComponent implements OnInit {
  formUser: FormGroup;
  userList: IUser[] = [];
  avatarList: IAvatar[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    public dialogRef: MatDialogRef<RegisterUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UserService,
    private avatarService: AvatarService,
    private fb: FormBuilder,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.userService.getUsers().subscribe(next => this.userList = next);
    this.avatarService.getAvatars().subscribe(next => this.avatarList = next);
    this.formUser = this.fb.group({
      username: ['', Validators.required, Validators.minLength(3)],
      password: ['', Validators.required, Validators.minLength(3)],
      name: ['', Validators.required, Validators.minLength(3)],
      favouriteMusic: [''],
      email: ['', Validators.required, Validators.email],
      address: ['', Validators.required, Validators.minLength(3)],
      avatar: [''],
      male: ['']
    });
  }

  onSubmit() {

  }
}

