import { TestBed } from '@angular/core/testing';

import { CalendarEventServiceService } from './calendar-event-service.service';

describe('CalendarEventServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CalendarEventServiceService = TestBed.get(CalendarEventServiceService);
    expect(service).toBeTruthy();
  });
});
