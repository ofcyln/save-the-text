import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RightPanelOpenerComponent } from './right-panel-opener.component';

describe('RightPanelOpenerComponent', () => {
  let component: RightPanelOpenerComponent;
  let fixture: ComponentFixture<RightPanelOpenerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RightPanelOpenerComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RightPanelOpenerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
