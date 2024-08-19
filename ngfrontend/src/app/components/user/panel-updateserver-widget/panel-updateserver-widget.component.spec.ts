import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelUpdateserverWidgetComponent } from './panel-updateserver-widget.component';

describe('PanelUpdateserverWidgetComponent', () => {
  let component: PanelUpdateserverWidgetComponent;
  let fixture: ComponentFixture<PanelUpdateserverWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PanelUpdateserverWidgetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PanelUpdateserverWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
