import { VagaCv } from './../_model/vaga';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Vaga } from '../_model/vaga';

@Injectable({
  providedIn: 'root',
})
export class VagaService {
  constructor(private http: HttpClient) {}

  getById(ID: any): Observable<Vaga> {
    return this.http.get<Vaga>(`${environment.api}/vagas/getById/${ID}`);
  }

  getAll(): Observable<Vaga[]> {
    return this.http.get<Vaga[]>(`${environment.api}/vagas/findAll`);
  }

  vagaCv(vagaCv: VagaCv) {
    return this.http.post(`${environment.api}/vagacv/createOrUpdate`, vagaCv);
  }

  imagem(formData: FormData): Observable<any> {
    var HTTPOptions = {
      reportProgress: true,
      responseType: 'array' as 'json',
    };

    return this.http.post<any>(
      `${environment.api}/vagacv/image`,
      formData,
      HTTPOptions
    );
  }

  cvImagem(formData: FormData): Observable<any> {
    return this.http.post<any>(`${environment.api}/cv/image`, formData, {
      reportProgress: true,
      observe: 'events',
    });
  }

  cv(data: any) {
    return this.http.post(`${environment.api}/cv/createOrUpdate`, data);
  }

  publicarVaga(data: any) {
    return this.http.post(`${environment.api}/vagas/createForNormalUser`, data);
  }

  vagasImagem(formData: FormData): Observable<any> {
    return this.http.post<any>(`${environment.api}/vagas/image`, formData, {
      reportProgress: true,
      observe: 'events',
    });
  }
}
