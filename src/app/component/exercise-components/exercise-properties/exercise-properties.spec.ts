import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExerciseProperties } from './exercise-properties';

describe('ExerciseProperties', () => {
  let component: ExerciseProperties;
  let fixture: ComponentFixture<ExerciseProperties>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExerciseProperties],
    }).compileComponents();

    fixture = TestBed.createComponent(ExerciseProperties);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
