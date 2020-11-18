import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DarkModeConfiguratorComponent } from './dark-mode-configurator.component';

describe('DarkModeConfiguratorComponent', () => {
  let component: DarkModeConfiguratorComponent;
  let fixture: ComponentFixture<DarkModeConfiguratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DarkModeConfiguratorComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DarkModeConfiguratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
