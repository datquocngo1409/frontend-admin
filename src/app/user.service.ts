import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {IUser} from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly API_URL = 'http://localhost:8080/users';

  constructor(private http: HttpClient) {
  }

  getUsers(count = 1000): Observable<IUser[]> {
    return this.http.get<IUser[]>(this.API_URL).pipe(map(respone => respone.filter((post, i) => i < count)));
  }

  getUserById(id: number): Observable<IUser> {
    return this.http.get<IUser>(`${this.API_URL}/${id}`);
  }

  createUser(account: Partial<IUser>): Observable<IUser> {
    return this.http.post<IUser>(this.API_URL, account);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.API_URL}/${id}`);
  }

  updateUser(account: IUser): Observable<IUser> {
    return this.http.patch<IUser>(`${this.API_URL}/${account.id}`, account);
  }

  getUserByUsername(username: string): Observable<IUser> {
    return this.http.get<IUser>(`http://localhost:8080/usersname/${username}`);
  }
}
