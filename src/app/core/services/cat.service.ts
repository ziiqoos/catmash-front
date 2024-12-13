import { Cat } from '../models/Cat.model';
import { catchError, Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Utils } from '../../shared/utils/Utils';

@Injectable({
  providedIn: 'root',
})
export class CatService {
  private BASE_URL = environment.apiUrl;
  private BASE_PATH = 'cats';

  constructor(private http: HttpClient) { }

  getCats(): Observable<Cat[]> {
    return this.http
      .get<Cat[]>(`${this.BASE_URL}/${this.BASE_PATH}?sort=desc`)
      .pipe(catchError(Utils.handleError<Cat[]>('getCats', [])));
  }

  upVoteCat(catId: string) {
    return this
      .http.patch<Cat>(`${this.BASE_URL}/${this.BASE_PATH}/${catId}/upvote`, {})
      .pipe(catchError(Utils.handleError<Cat>(`upVoteCat id=${catId}`)));
  }
}
