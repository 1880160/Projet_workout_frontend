import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkoutDisplay } from './workout-display';

describe('WorkoutDisplay', () => {
  let component: WorkoutDisplay;
  let fixture: ComponentFixture<WorkoutDisplay>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkoutDisplay],
    }).compileComponents();

    fixture = TestBed.createComponent(WorkoutDisplay);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
