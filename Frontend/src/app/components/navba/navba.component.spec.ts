import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbaComponent } from './navba.component';

describe('NavbaComponent', () => {
  let component: NavbaComponent;
  let fixture: ComponentFixture<NavbaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
