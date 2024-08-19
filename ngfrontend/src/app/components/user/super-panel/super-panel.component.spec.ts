import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperPanelComponent } from './super-panel.component';

describe('SuperPanelComponent', () => {
  let component: SuperPanelComponent;
  let fixture: ComponentFixture<SuperPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuperPanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuperPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
