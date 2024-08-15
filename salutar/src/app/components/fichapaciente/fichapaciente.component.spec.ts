import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FichapacienteComponent } from './fichapaciente.component';

describe('FichapacienteComponent', () => {
  let component: FichapacienteComponent;
  let fixture: ComponentFixture<FichapacienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FichapacienteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FichapacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
