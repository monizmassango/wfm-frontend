import { Noticia } from './../_model/noticia';
import { Component, OnInit } from '@angular/core';
import { NoticiaService } from './../_service/noticia.service';

import { ServicosService } from '../_service/servicos.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  noticias: Noticia[] = [];

  constructor(
    private servicosService: ServicosService,
    private noticiaService: NoticiaService
  ) {}

  ngOnInit(): void {
    this.servicosService.findAll().subscribe((data) => console.log(data));
    this.noticiaService
      .findAll()
      .subscribe({ next: (data) => (this.noticias = data) });
  }
}
