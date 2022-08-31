import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnviarCvComponent } from './enviar-cv.component';

describe('EnviarCvComponent', () => {
  let component: EnviarCvComponent;
  let fixture: ComponentFixture<EnviarCvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnviarCvComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnviarCvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
