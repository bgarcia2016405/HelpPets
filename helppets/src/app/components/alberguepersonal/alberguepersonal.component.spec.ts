import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlberguepersonalComponent } from './alberguepersonal.component';

describe('AlberguepersonalComponent', () => {
  let component: AlberguepersonalComponent;
  let fixture: ComponentFixture<AlberguepersonalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlberguepersonalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlberguepersonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
