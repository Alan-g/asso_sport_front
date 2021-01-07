import { TestBed } from '@angular/core/testing';

import { TypeCoursServiceService } from './type-cours-service.service';

describe('TypeCoursServiceService', () => {
  let service: TypeCoursServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypeCoursServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
