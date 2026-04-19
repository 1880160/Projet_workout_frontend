import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyWorkouts } from './my-workouts';

describe('MyWorkouts', () => {
  let component: MyWorkouts;
  let fixture: ComponentFixture<MyWorkouts>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyWorkouts],
    }).compileComponents();

    fixture = TestBed.createComponent(MyWorkouts);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
