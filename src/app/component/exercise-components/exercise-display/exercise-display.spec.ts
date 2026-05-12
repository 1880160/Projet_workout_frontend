import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExerciseDisplay } from './exercise-display';

describe('ExerciseDisplay', () => {
  let component: ExerciseDisplay;
  let fixture: ComponentFixture<ExerciseDisplay>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExerciseDisplay],
    }).compileComponents();

    fixture = TestBed.createComponent(ExerciseDisplay);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
