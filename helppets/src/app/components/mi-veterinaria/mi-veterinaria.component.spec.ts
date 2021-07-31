import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiVeterinariaComponent } from './mi-veterinaria.component';

describe('MiVeterinariaComponent', () => {
  let component: MiVeterinariaComponent;
  let fixture: ComponentFixture<MiVeterinariaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MiVeterinariaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MiVeterinariaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
