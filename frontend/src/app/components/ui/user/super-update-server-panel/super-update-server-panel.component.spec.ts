import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperUpdateServerPanelComponent } from './super-update-server-panel.component';

describe('SuperUpdateServerPanelComponent', () => {
  let component: SuperUpdateServerPanelComponent;
  let fixture: ComponentFixture<SuperUpdateServerPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuperUpdateServerPanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuperUpdateServerPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
