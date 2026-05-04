import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserExerciseSearch } from './user-exercise-search';

describe('UserExerciseSearch', () => {
  let component: UserExerciseSearch;
  let fixture: ComponentFixture<UserExerciseSearch>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserExerciseSearch],
    }).compileComponents();

    fixture = TestBed.createComponent(UserExerciseSearch);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
