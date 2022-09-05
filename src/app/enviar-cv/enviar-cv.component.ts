import { take } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { VagaService } from '../_service/vaga.service';
import { ToastrService } from 'ngx-toastr';
import { HttpEventType, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-enviar-cv',
  templateUrl: './enviar-cv.component.html',
  styleUrls: ['./enviar-cv.component.scss'],
})
export class EnviarCvComponent implements OnInit {
  cvForm!: FormGroup;
  file!: File;
  submitted = false;
  progress = 0;

  constructor(
    private fb: FormBuilder,
    private vagaService: VagaService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.cvForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      contact: ['', Validators.required],
      cvName: [''],
    });
  }

  get f() {
    return this.cvForm.controls;
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.file = event.target.files[0];
    }
  }

  onSubmit() {
    if (!this.submitted) {
      this.submitted = true;
      if (this.cvForm.invalid) {
        this.toastr.info(
          'Por favor preencha todos os campos!',
          'Formulário invalido'
        );
        return;
      }

      if (!this.file) {
        this.toastr.info('Carregue o seu CV!', 'Formulário invalido');
        return;
      }
      this.cvForm.patchValue({
        cvName: this.file.name,
      });
      const vagaCv = this.cvForm.value;
      const formData = new FormData();
      formData.append('file', this.file);
      this.vagaService.cvImagem(formData).subscribe({
        next: (event: any) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progress = Math.round((100 * event.loaded) / event.total);
          } else if (event instanceof HttpResponse) {
            this.vagaService.cv(vagaCv).subscribe({
              next: () => {
                this.toastr.success(
                  'Candidatura enviada com sucesso!',
                  'Sucesso'
                );
                this.submitted = false;
                this.cvForm.reset();
              },
              error: () => {
                this.toastr.error('Candidatura não enviada!', 'Falha');
                this.submitted = false;
              },
            });
          }
        },
        error: () => {
          this.toastr.error('Candidatura não enviada!', 'Falha');
          this.submitted = false;
        },
      });
    }
  }
}

// this.vagaService.cv(vagaCv).subscribe({
//   next: () => {
//     this.toastr.success(
//       'Candidatura enviada com sucesso!',
//       'Sucesso'
//     );
//     this.submitted = false;
//     this.cvForm.reset();
//   },
//   error: () => {
//     this.toastr.error('Candidatura não enviada!', 'Falha');
//     this.submitted = false;
//   },
// });
