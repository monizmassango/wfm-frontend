import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, take } from 'rxjs';
import { Noticia } from '../_model/noticia';

import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class NoticiaService {
  constructor(private http: HttpClient) {}

  findAll(): Observable<Noticia[]> {
    return this.http.get<Noticia[]>(`${environment.api}/noticias/findAll`).pipe(
      take(1),
      map((noticias) => {
        noticias = noticias.filter((noticia) => noticia.status === 'ACTIVE');
        return noticias;
      })
    );
  }
}
