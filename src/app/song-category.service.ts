import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ISongCategory} from './song-category';

@Injectable({
  providedIn: 'root'
})
export class SongCategoryService {
  private readonly API_URL = 'localhost:8080/songs/categories';

  constructor(private http: HttpClient) {
  }

  getCategoryById(id: number): Observable<ISongCategory> {
    return this.http.get<ISongCategory>(`${this.API_URL}/${id}`);
  }
}
