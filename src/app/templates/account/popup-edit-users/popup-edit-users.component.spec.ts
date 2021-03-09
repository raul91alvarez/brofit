import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupEditUsersComponent } from './popup-edit-users.component';

describe('PopupEditUsersComponent', () => {
  let component: PopupEditUsersComponent;
  let fixture: ComponentFixture<PopupEditUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupEditUsersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupEditUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
