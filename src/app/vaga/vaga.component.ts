import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Vaga, VagaCv } from '../_model/vaga';
import { VagaService } from '../_service/vaga.service';

@Component({
  selector: 'app-vaga',
  templateUrl: './vaga.component.html',
  styleUrls: ['./vaga.component.scss'],
})
export class VagaComponent implements OnInit {
  vaga: Vaga | undefined;
  vagaId: any;
  image: any;
  file: any;
  candidateForm!: FormGroup;

  constructor(
    private readonly vagaService: VagaService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    this.route.params.subscribe((param) => {
      this.vagaId = param['id'];
    });
  }

  ngOnInit(): void {
    this.vagaService.getById(this.vagaId).subscribe((data) => {
      this.vaga = data;
      this.image = `data:image/png;base64,${data.image}`;
    });

    this.candidateForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      contact: ['', Validators.required],
      vagaId: [`${this.vagaId}`, Validators.required],
    });
  }

  get f() {
    return this.candidateForm.controls;
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.file = event.target.files[0];
    }
  }

  onSubmit() {
    const vagaCv: VagaCv = this.candidateForm.value;
    const formData = new FormData();
    formData.append('file', this.file);
    this.vagaService.imagem(formData).subscribe((blob) => {
      this.vagaService.vagaCv(vagaCv).subscribe();
    });
  }
}
