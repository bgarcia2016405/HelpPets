import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlberguesComponent } from './albergues.component';

describe('AlberguesComponent', () => {
  let component: AlberguesComponent;
  let fixture: ComponentFixture<AlberguesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlberguesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlberguesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
