import { ContactoService } from './../_service/contacto.service';
import { Noticia } from './../_model/noticia';
import { Component, OnInit } from '@angular/core';
import { NoticiaService } from './../_service/noticia.service';

import { ServicosService } from '../_service/servicos.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Contacto } from '../_model/contacto';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  noticias: Noticia[] = [];
  contactForm!: FormGroup;
  contacto!: Contacto;
  submitted = false;

  constructor(
    private servicosService: ServicosService,
    private noticiaService: NoticiaService,
    private contactoService: ContactoService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.servicosService.findAll().subscribe((data) => console.log(data));
    this.noticiaService
      .findAll()
      .subscribe({ next: (data) => (this.noticias = data) });

    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      contact: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      assunto: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  get f() {
    return this.contactForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.contactForm.invalid) {
      this.toastr.info(
        'Por favor preencha todos os campos!',
        'Formulário invalido'
      );
      return;
    }
    this.contacto = this.contactForm.value;
    this.contactoService.contactenos(this.contacto).subscribe({
      next: () => {
        this.toastr.success('Mensagem enviada com sucesso!', 'Sucesso');
        this.submitted = false;
        this.contactForm.reset();
      },
      error: () => {
        this.toastr.success('Mensagem não enviada!', 'Falha');
        this.submitted = false;
      },
    });
  }
}
