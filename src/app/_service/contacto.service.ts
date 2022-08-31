import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Contacto } from '../_model/contacto';

@Injectable({
  providedIn: 'root'
})
export class ContactoService {

  constructor(private http: HttpClient) { }

  contactenos(contacto: Contacto) {
    return this.http.post(`${environment.api}/contactenos/createOrUpdate`, contacto)
  }
}
