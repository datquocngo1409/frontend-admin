import {Component, OnInit} from '@angular/core';
import {IUser} from '../../user';
import {UserService} from '../../user.service';

@Component({
  selector: 'app-information-user',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.scss']
})
export class InformationUserComponent implements OnInit {

  public username = localStorage.getItem('user');
  userList: IUser[] = [];
  user: IUser;
  public src: string = null;
  arrayFavorite: string[];
  arrayString: string;

  constructor(
    private userService: UserService
  ) {
  }

  ngOnInit() {
    // Lay username tu localStore ( {token: 'jwt will come later', name: username} )
    this.username = this.username.split('{"token":"jwt will come later","name":"').toString();
    this.username = this.username.substring(1, this.username.length - 2);

    // Lay User co username lay ben tren
    this.userService.getUserByUsername(this.username).subscribe(next => this.user = next)
    ;
    // this.src = 'http://localhost:8080/avatars/' + this.user.avatar.name + '/raw';

    // Tach favoriteMusic ra (ERROR Undefined)
  }
}
