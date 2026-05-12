import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExerciseFilter } from './exercise-filter';

describe('ExerciseFilter', () => {
  let component: ExerciseFilter;
  let fixture: ComponentFixture<ExerciseFilter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExerciseFilter],
    }).compileComponents();

    fixture = TestBed.createComponent(ExerciseFilter);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
