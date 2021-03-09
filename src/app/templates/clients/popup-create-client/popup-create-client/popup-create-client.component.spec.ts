import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupCreateClientComponent } from './popup-create-client.component';

describe('PopupCreateClientComponent', () => {
  let component: PopupCreateClientComponent;
  let fixture: ComponentFixture<PopupCreateClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupCreateClientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupCreateClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
