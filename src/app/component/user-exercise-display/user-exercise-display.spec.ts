import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserExerciseDisplay } from './user-exercise-display';

describe('UserExerciseDisplay', () => {
  let component: UserExerciseDisplay;
  let fixture: ComponentFixture<UserExerciseDisplay>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserExerciseDisplay],
    }).compileComponents();

    fixture = TestBed.createComponent(UserExerciseDisplay);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
