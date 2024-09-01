import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperServerWidgetComponent } from './super-server-widget.component';

describe('SuperServerWidgetComponent', () => {
  let component: SuperServerWidgetComponent;
  let fixture: ComponentFixture<SuperServerWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuperServerWidgetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuperServerWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
