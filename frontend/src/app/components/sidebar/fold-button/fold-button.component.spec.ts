import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoldButtonComponent } from './fold-button.component';

describe('FoldButtonComponent', () => {
  let component: FoldButtonComponent;
  let fixture: ComponentFixture<FoldButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FoldButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FoldButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
