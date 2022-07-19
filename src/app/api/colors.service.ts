import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {Color,  ColorList } from '../model/color.model';

@Injectable({
  providedIn: 'root'
})
export class ColorsService {

  constructor(private http: HttpClient) { }

  getColors():Observable<ColorList>{
    return this.http.get<ColorList>('https://reqres.in/api/unknown');

  }

  getColor(id:number):Observable<Color>{
    return this.http.get<any>(`https://reqres.in/api/unknown/${id}`)
    .pipe(map((response) => response.data as Color));
  }
}
