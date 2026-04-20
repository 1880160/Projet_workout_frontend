import { TestBed } from '@angular/core/testing';

import { ExerciseRequestService } from './exercise-request-service';

describe('ExerciseRequestService', () => {
  let service: ExerciseRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExerciseRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
