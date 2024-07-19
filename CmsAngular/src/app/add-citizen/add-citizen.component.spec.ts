import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCitizenComponent } from './add-citizen.component';

describe('AddCitizenComponent', () => {
  let component: AddCitizenComponent;
  let fixture: ComponentFixture<AddCitizenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddCitizenComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddCitizenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
