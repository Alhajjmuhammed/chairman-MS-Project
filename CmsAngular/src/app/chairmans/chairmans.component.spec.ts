import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChairmansComponent } from './chairmans.component';

describe('ChairmansComponent', () => {
  let component: ChairmansComponent;
  let fixture: ComponentFixture<ChairmansComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChairmansComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChairmansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
