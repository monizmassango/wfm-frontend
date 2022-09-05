import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Noticia } from '../_model/noticia';
import { NoticiaService } from '../_service/noticia.service';

@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.scss'],
})
export class NoticiaComponent implements OnInit {
  noticiaId: any;
  noticia: Noticia | undefined;
  image: any;

  constructor(
    private route: ActivatedRoute,
    private noticiaService: NoticiaService
  ) {
    this.route.params.subscribe((param) => {
      this.noticiaId = param['id'];
    });
  }

  ngOnInit(): void {
    this.noticiaService.getById(this.noticiaId).subscribe((data) => {
      this.noticia = data;
      this.image = `data:image/png;base64,${data.image}`;
    });
  }
}
