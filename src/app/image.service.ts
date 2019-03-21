import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IImage} from './image';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private readonly API_URL = 'http://localhost:8080/images';

  constructor(private http: HttpClient) {
  }

  create(image: any): Observable<any> {
    return this.http.post<any>(this.API_URL, image);
  }

  getImageById(id: number): Observable<IImage> {
    return this.http.get<IImage>(`${this.API_URL}/${id}`);
  }
}
