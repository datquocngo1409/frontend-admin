import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IImage} from './image';
import {IAdmin} from './admin';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private readonly API_URL = 'http://localhost:8080/images';

  constructor(private http: HttpClient) {
  }

  getImages(count = 1000): Observable<IImage[]> {
    return this.http.get<IImage[]>(this.API_URL).pipe(map(respone => respone.filter((post, i) => i < count)));
  }

  create(image: any): Observable<any> {
    return this.http.post<any>(this.API_URL, image);
  }

  getImageById(id: number): Observable<IImage> {
    return this.http.get<IImage>(`${this.API_URL}/${id}`);
  }

  getImageByName(name: string): Observable<IImage> {
    return this.http.get<IImage>(`http://localhost:8080/imagesname/${name}`);
  }
}
