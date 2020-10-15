import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsGallerycontainerComponent } from './events-container.component';

describe('EventsGallerycontainerComponent', () => {
  let component: EventsGallerycontainerComponent;
  let fixture: ComponentFixture<EventsGallerycontainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventsGallerycontainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventsGallerycontainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
