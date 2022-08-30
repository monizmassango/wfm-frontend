import { Component, OnInit } from '@angular/core';
import { Vaga } from '../_model/vaga';
import { VagaService } from '../_service/vaga.service';

@Component({
  selector: 'app-vagas',
  templateUrl: './vagas.component.html',
  styleUrls: ['./vagas.component.scss']
})
export class VagasComponent implements OnInit {

  vagas: Vaga[] =[]

  constructor(private vagaService: VagaService) { }

  ngOnInit(): void {
    this.vagaService.getAll().subscribe(data => this.vagas = data)
  }

}
