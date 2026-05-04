import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateWorkout } from './update-workout';

describe('UpdateWorkout', () => {
  let component: UpdateWorkout;
  let fixture: ComponentFixture<UpdateWorkout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateWorkout],
    }).compileComponents();

    fixture = TestBed.createComponent(UpdateWorkout);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
