import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User, UserList } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient ) { }

  getUsers(): Observable<UserList>{
    return this.http.get<UserList>('https://reqres.in/api/users');
  }

  getUser(id: number): Observable<User>{
    return this.http.get<any>(`https://reqres.in/api/users/${id}`)
    .pipe(map((response) => response.data as User));
  }
}
