import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IAdmin} from './admin';
import {map} from 'rxjs/operators';
import {ISong} from './song';

@Injectable({
  providedIn: 'root'
})
export class SongService {

  private readonly API_URL = 'http://localhost:8080/songs';
  constructor(private http: HttpClient) { }

  getSongs(count = 1000): Observable<ISong[]> {
    return this.http.get<ISong[]>(this.API_URL).pipe(map(respone => respone.filter((post, i) => i < count)));
  }

  getSongById(id: number): Observable<ISong> {
    return this.http.get<ISong>(`${this.API_URL}/${id}`);
  }
  createSong(account: Partial<ISong>): Observable<ISong> {
    return this.http.post<ISong>(this.API_URL, account);
  }
  deleteSong(id: number): Observable<any> {
    return this.http.delete(`${this.API_URL}/${id}`);
  }
  updateSong(account: ISong): Observable<ISong> {
    return this.http.patch<ISong>(`${this.API_URL}/${account.id}`, account);
  }
}
