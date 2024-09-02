import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServerWidgetComponent } from './server-widget.component';

describe('ServerWidgetComponent', () => {
  let component: ServerWidgetComponent;
  let fixture: ComponentFixture<ServerWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServerWidgetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServerWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
