import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleConsejoComponent } from './detalle-consejo.component';

describe('DetalleConsejoComponent', () => {
  let component: DetalleConsejoComponent;
  let fixture: ComponentFixture<DetalleConsejoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleConsejoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleConsejoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
