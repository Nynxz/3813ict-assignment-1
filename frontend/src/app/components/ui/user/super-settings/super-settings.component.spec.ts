import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperSettingsComponent } from './super-settings.component';

describe('SuperSettingsComponent', () => {
  let component: SuperSettingsComponent;
  let fixture: ComponentFixture<SuperSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuperSettingsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuperSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
