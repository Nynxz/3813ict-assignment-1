import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChannelSettingsPopupComponent } from './channel-settings-popup.component';

describe('ChannelSettingsPopupComponent', () => {
  let component: ChannelSettingsPopupComponent;
  let fixture: ComponentFixture<ChannelSettingsPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChannelSettingsPopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChannelSettingsPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
