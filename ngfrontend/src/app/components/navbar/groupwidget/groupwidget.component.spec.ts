import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupwidgetComponent } from './groupwidget.component';

describe('GroupwidgetComponent', () => {
  let component: GroupwidgetComponent;
  let fixture: ComponentFixture<GroupwidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GroupwidgetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GroupwidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
