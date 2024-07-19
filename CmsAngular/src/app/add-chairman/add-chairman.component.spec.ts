import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddChairmanComponent } from './add-chairman.component';

describe('AddChairmanComponent', () => {
  let component: AddChairmanComponent;
  let fixture: ComponentFixture<AddChairmanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddChairmanComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddChairmanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
