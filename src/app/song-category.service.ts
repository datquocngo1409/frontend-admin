import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ISongCategory} from './song-category';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SongCategoryService {
  private readonly API_URL = 'http://localhost:8080/categories';

  constructor(private http: HttpClient) {
  }

  getSongCaegories(count = 1000): Observable<ISongCategory[]> {
    return this.http.get<ISongCategory[]>(this.API_URL).pipe(map(respone => respone.filter((post, i) => i < count)));
  }

  getCategoryById(id: number): Observable<ISongCategory> {
    return this.http.get<ISongCategory>(`${this.API_URL}/${id}`);
  }
}
