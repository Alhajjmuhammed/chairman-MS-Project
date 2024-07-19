import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProvinceComponent } from './add-province.component';

describe('AddProvinceComponent', () => {
  let component: AddProvinceComponent;
  let fixture: ComponentFixture<AddProvinceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddProvinceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddProvinceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
