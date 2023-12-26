import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WithoutInternetComponent } from './without-internet.component';

describe('WithoutInternetComponent', () => {
  let component: WithoutInternetComponent;
  let fixture: ComponentFixture<WithoutInternetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WithoutInternetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WithoutInternetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
