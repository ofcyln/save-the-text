import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { SaveTheTextState } from 'src/app/store/state/save-the-text.state';

import { DarkModeButtonClick } from '../../../store/action/save-the-text.actions';

@Component({
  selector: 'app-dark-mode-configurator',
  templateUrl: './dark-mode-configurator.component.html',
  styleUrls: ['./dark-mode-configurator.component.scss'],
})
export class DarkModeConfiguratorComponent implements OnInit {
  darkMode: boolean;

  constructor(private readonly store: Store) {}

  ngOnInit(): void {
    this.darkMode = this.store.selectSnapshot(SaveTheTextState.getDarkModeValue);
  }

  switchToDarkMode(): void {
    this.store.dispatch(new DarkModeButtonClick());
  }
}
