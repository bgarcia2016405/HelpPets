import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VeterinariaComponent } from './veterinaria.component';

describe('VeterinariaComponent', () => {
  let component: VeterinariaComponent;
  let fixture: ComponentFixture<VeterinariaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VeterinariaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VeterinariaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
