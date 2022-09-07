import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { VagaService } from '../_service/vaga.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-enviar-vaga',
  templateUrl: './enviar-vaga.component.html',
  styleUrls: ['./enviar-vaga.component.scss'],
})
export class EnviarVagaComponent implements OnInit {
  vagasForm!: FormGroup;
  submitted = false;
  file!: File;
  progress = 0;

  constructor(
    private fb: FormBuilder,
    private vagaService: VagaService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.vagasForm = this.fb.group({
      nomeEmpresa: ['', Validators.required],
      title: ['', Validators.required],
      description: ['', Validators.required],
      requisitos: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      endDate: ['', Validators.required],
    });
  }

  get f() {
    return this.vagasForm.controls;
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.file = event.target.files[0];
    }
  }

  onSubmit() {
    console.log(this.submitted);
    if (!this.submitted) {
      this.submitted = true;
      if (this.vagasForm.invalid) {
        this.toastr.info(
          'Por favor preencha todos os campos!',
          'Formulário invalido'
        );
        this.submitted = false;
        return;
      }

      if (!this.file) {
        this.toastr.info(
          'Carregue a imagem de capa para vaga!',
          'Formulário invalido'
        );
        this.submitted = false;
        return;
      }
      const vagaCv = this.vagasForm.value;
      const formData = new FormData();
      formData.append('file', this.file);
      this.vagaService.vagasImagem(formData).subscribe({
        next: (event: any) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progress = Math.round((100 * event.loaded) / event.total);
          } else if (event instanceof HttpResponse) {
            this.vagaService.publicarVaga(vagaCv).subscribe({
              next: () => {
                this.toastr.success(
                  'Candidatura enviada com sucesso!',
                  'Sucesso'
                );
                this.submitted = false;
                this.vagasForm.reset();
              },
              error: () => {
                this.toastr.error('Vaga não enviada!', 'Falha');
                this.submitted = false;
              },
            });
          }
        },
        error: () => {
          this.toastr.error('vaga não enviada!', 'Falha');
          this.submitted = false;
        },
      });
    }
  }
}
