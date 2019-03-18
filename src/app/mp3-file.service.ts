import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IAdmin} from './admin';
import {map} from 'rxjs/operators';
import {IMp3File} from './mp3-file';

@Injectable({
  providedIn: 'root'
})
export class Mp3FileService {

  private readonly API_URL = 'http://localhost:8080/mp3files';
  constructor(private http: HttpClient) { }

  getMp3Files(count = 1000): Observable<IMp3File[]> {
    return this.http.get<IMp3File[]>(this.API_URL).pipe(map(respone => respone.filter((post, i) => i < count)));
  }

  getMp3FileById(id: number): Observable<IMp3File> {
    return this.http.get<IMp3File>(`${this.API_URL}/${id}`);
  }
  createMp3File(account: Partial<any>): Observable<any> {
    return this.http.post<any>(this.API_URL, account);
  }
  deleteMp3File(id: number): Observable<any> {
    return this.http.delete(`${this.API_URL}/${id}`);
  }
  updateAdmin(account: IMp3File): Observable<IMp3File> {
    return this.http.patch<IAdmin>(`${this.API_URL}/${account.id}`, account);
  }
}
