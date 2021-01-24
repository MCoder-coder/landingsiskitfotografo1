import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartAddModalComponent } from './cart-add-modal.component';

describe('CartAddModalComponent', () => {
  let component: CartAddModalComponent;
  let fixture: ComponentFixture<CartAddModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartAddModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartAddModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
