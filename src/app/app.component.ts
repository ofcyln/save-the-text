import { Component } from '@angular/core';
import { Select } from '@ngxs/store';
import { SaveTheTextState } from './store/state/save-the-text.state';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @Select(SaveTheTextState.getRightPanelValue) rightPanel$: Observable<boolean>;
  @Select(SaveTheTextState.getDarkModeValue) darkMode$: Observable<boolean>;

  constructor() {}
}
