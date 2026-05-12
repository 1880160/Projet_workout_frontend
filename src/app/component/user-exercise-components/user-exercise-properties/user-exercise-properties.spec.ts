import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserExerciseProperties } from './user-exercise-properties';

describe('UserExerciseProperties', () => {
  let component: UserExerciseProperties;
  let fixture: ComponentFixture<UserExerciseProperties>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserExerciseProperties],
    }).compileComponents();

    fixture = TestBed.createComponent(UserExerciseProperties);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
