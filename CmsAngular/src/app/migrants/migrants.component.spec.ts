import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MigrantsComponent } from './migrants.component';

describe('MigrantsComponent', () => {
  let component: MigrantsComponent;
  let fixture: ComponentFixture<MigrantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MigrantsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MigrantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
