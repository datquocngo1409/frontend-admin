import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {IAvatar} from './avatar';

@Injectable({
  providedIn: 'root'
})
export class AvatarService {

  private readonly API_URL = 'http://localhost:8080/avatars';

  constructor(private http: HttpClient) {
  }

  getAvatars(count = 1000): Observable<IAvatar[]> {
    return this.http.get<IAvatar[]>(this.API_URL).pipe(map(respone => respone.filter((post, i) => i < count)));
  }

  create(avatar: any): Observable<any> {
    return this.http.post<any>(this.API_URL, avatar);
  }

  getAvatarById(id: number): Observable<IAvatar> {
    return this.http.get<IAvatar>(`${this.API_URL}/${id}`);
  }

  getAvatarByName(name: string): Observable<IAvatar> {
    return this.http.get<IAvatar>(`http://localhost:8080/avatarsname/${name}`);
  }
}
