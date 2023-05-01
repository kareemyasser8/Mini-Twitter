import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestInstructionsComponent } from './guest-instructions.component';

describe('GuestInstructionsComponent', () => {
  let component: GuestInstructionsComponent;
  let fixture: ComponentFixture<GuestInstructionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuestInstructionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuestInstructionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
