import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TweetWrapperComponent } from './tweet-wrapper.component';

describe('TweetWrapperComponent', () => {
  let component: TweetWrapperComponent;
  let fixture: ComponentFixture<TweetWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TweetWrapperComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TweetWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
