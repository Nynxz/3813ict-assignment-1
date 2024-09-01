import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperNewGroupPanelComponent } from './super-new-group-panel.component';

describe('SuperNewGroupPanelComponent', () => {
  let component: SuperNewGroupPanelComponent;
  let fixture: ComponentFixture<SuperNewGroupPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuperNewGroupPanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuperNewGroupPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
