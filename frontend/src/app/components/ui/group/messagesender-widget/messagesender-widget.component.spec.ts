import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessagesenderWidgetComponent } from './messagesender-widget.component';

describe('MessagesenderWidgetComponent', () => {
  let component: MessagesenderWidgetComponent;
  let fixture: ComponentFixture<MessagesenderWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MessagesenderWidgetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MessagesenderWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
