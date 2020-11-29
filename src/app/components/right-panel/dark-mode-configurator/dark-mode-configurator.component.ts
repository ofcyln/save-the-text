import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { DarkModeButtonClick } from '../../../store/action/save-the-text.actions';

@Component({
  selector: 'app-dark-mode-configurator',
  templateUrl: './dark-mode-configurator.component.html',
  styleUrls: ['./dark-mode-configurator.component.scss'],
})
export class DarkModeConfiguratorComponent implements OnInit {
  constructor(private readonly store: Store) {}

  ngOnInit(): void {}

  switchToDarkMode(): void {
    this.store.dispatch(new DarkModeButtonClick());
  }
}
