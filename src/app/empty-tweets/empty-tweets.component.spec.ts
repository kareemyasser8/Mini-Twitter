import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyTweetsComponent } from './empty-tweets.component';

describe('EmptyTweetsComponent', () => {
  let component: EmptyTweetsComponent;
  let fixture: ComponentFixture<EmptyTweetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmptyTweetsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmptyTweetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
