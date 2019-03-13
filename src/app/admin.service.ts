import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IAdmin} from './admin';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private readonly API_URL = 'http://localhost:8080/admins';
  constructor(private http: HttpClient) { }

  getAdmins(count = 1000): Observable<IAdmin[]> {
    return this.http.get<IAdmin[]>(this.API_URL).pipe(map(respone => respone.filter((post, i) => i < count)));
  }

  getAdminById(id: number): Observable<IAdmin> {
    return this.http.get<IAdmin>(`${this.API_URL}/${id}`);
  }
  createAdmin(account: Partial<IAdmin>): Observable<IAdmin> {
    return this.http.post<IAdmin>(this.API_URL, account);
  }
  deleteAdmin(id: number): Observable<any> {
    return this.http.delete(`${this.API_URL}/${id}`);
  }
  updateAdmin(account: IAdmin): Observable<IAdmin> {
    return this.http.patch<IAdmin>(`${this.API_URL}/${account.id}`, account);
  }
}
