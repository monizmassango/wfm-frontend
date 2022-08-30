import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServicosService {

  constructor(private http: HttpClient) { }

  findAll() {
    return this.http.get(`${environment.api}/servicos/findAll`)
  }
}
