import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelServerWidgetComponent } from './panel-server-widget.component';

describe('PanelServerWidgetComponent', () => {
  let component: PanelServerWidgetComponent;
  let fixture: ComponentFixture<PanelServerWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PanelServerWidgetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PanelServerWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
