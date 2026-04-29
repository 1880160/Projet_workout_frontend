import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeeklyWorkoutDisplay } from './weekly-workout-display';

describe('WeeklyWorkoutDisplay', () => {
  let component: WeeklyWorkoutDisplay;
  let fixture: ComponentFixture<WeeklyWorkoutDisplay>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeeklyWorkoutDisplay],
    }).compileComponents();

    fixture = TestBed.createComponent(WeeklyWorkoutDisplay);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
