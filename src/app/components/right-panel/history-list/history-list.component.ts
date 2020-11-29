import { Component } from '@angular/core';
import { Select } from '@ngxs/store';
import { SavedText, SaveTheTextState } from '../../../store/state/save-the-text.state';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-history-list',
  templateUrl: './history-list.component.html',
  styleUrls: ['./history-list.component.scss'],
})
export class HistoryListComponent {
  @Select(SaveTheTextState.getSavedTexts) savedTexts$: Observable<SavedText[]>;

  constructor() {}
}
