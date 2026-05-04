import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkoutProperties } from './workout-properties';

describe('WorkoutProperties', () => {
  let component: WorkoutProperties;
  let fixture: ComponentFixture<WorkoutProperties>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkoutProperties],
    }).compileComponents();

    fixture = TestBed.createComponent(WorkoutProperties);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
