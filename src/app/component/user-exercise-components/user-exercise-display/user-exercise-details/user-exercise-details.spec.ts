import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserExerciseDetails } from './user-exercise-details';

describe('UserExerciseDetails', () => {
  let component: UserExerciseDetails;
  let fixture: ComponentFixture<UserExerciseDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserExerciseDetails],
    }).compileComponents();

    fixture = TestBed.createComponent(UserExerciseDetails);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
