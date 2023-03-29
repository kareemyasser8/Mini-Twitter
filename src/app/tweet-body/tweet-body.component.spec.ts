import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TweetBodyComponent } from './tweet-body.component';

describe('TweetBodyComponent', () => {
  let component: TweetBodyComponent;
  let fixture: ComponentFixture<TweetBodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TweetBodyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TweetBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
