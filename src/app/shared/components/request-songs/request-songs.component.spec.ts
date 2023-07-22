import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestSongsComponent } from './request-songs.component';

describe('RequestSongsComponent', () => {
  let component: RequestSongsComponent;
  let fixture: ComponentFixture<RequestSongsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestSongsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestSongsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
