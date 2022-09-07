import { Component, OnInit } from '@angular/core';
import { Noticia } from '../_model/noticia';
import { NoticiaService } from '../_service/noticia.service';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.scss'],
})
export class NoticiasComponent implements OnInit {
  noticias: Noticia[] = [];

  constructor(private noticiaService: NoticiaService) {}

  ngOnInit(): void {
    this.noticiaService
      .findAll()
      .subscribe({ next: (data) => (this.noticias = data) });
  }
}
