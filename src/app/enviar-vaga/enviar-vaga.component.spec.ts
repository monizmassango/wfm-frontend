import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnviarVagaComponent } from './enviar-vaga.component';

describe('EnviarVagaComponent', () => {
  let component: EnviarVagaComponent;
  let fixture: ComponentFixture<EnviarVagaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnviarVagaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnviarVagaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
