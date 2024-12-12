import { Cat } from '../models/Cat.model';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class CatService {
  private BASE_URL = environment.apiUrl;
  private BASE_PATH = 'cats';

  constructor(private http: HttpClient) { }

  getCats(): Observable<Cat[]> {
    return this.http.get<Cat[]>(`${this.BASE_URL}/${this.BASE_PATH}?sort=desc`);
  }

  upVoteCat(catId: string) {
    return this.http.patch<Cat>(`${this.BASE_URL}/${this.BASE_PATH}/${catId}/upvote`, {});
  }

}
