import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsImportantComponent } from './events-important.component';

describe('EventsImportantComponent', () => {
  let component: EventsImportantComponent;
  let fixture: ComponentFixture<EventsImportantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventsImportantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventsImportantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
