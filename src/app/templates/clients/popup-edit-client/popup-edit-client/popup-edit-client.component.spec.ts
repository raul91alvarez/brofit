import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupEditClientComponent } from './popup-edit-client.component';

describe('PopupEditClientComponent', () => {
  let component: PopupEditClientComponent;
  let fixture: ComponentFixture<PopupEditClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupEditClientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupEditClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
