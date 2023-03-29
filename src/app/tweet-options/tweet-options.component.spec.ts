import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TweetOptionsComponent } from './tweet-options.component';

describe('TweetOptionsComponent', () => {
  let component: TweetOptionsComponent;
  let fixture: ComponentFixture<TweetOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TweetOptionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TweetOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
