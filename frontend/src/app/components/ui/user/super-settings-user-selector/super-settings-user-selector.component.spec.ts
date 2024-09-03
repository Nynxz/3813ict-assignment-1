import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperSettingsUserSelectorComponent } from './super-settings-user-selector.component';

describe('SuperSettingsUserSelectorComponent', () => {
  let component: SuperSettingsUserSelectorComponent;
  let fixture: ComponentFixture<SuperSettingsUserSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuperSettingsUserSelectorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuperSettingsUserSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
