import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperSettingsUserSelectedSettingsComponent } from './super-settings-user-selected-settings.component';

describe('SuperSettingsUserSelectedSettingsComponent', () => {
  let component: SuperSettingsUserSelectedSettingsComponent;
  let fixture: ComponentFixture<SuperSettingsUserSelectedSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuperSettingsUserSelectedSettingsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuperSettingsUserSelectedSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
