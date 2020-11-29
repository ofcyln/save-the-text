import { Component, Input } from '@angular/core';
import { Store } from '@ngxs/store';
import { SaveText } from '../../../../store/action/save-the-text.actions';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent {
  @Input('textContent') textContent: string; // tslint:disable-line: no-input-rename

  constructor(private store: Store) {}

  setSelectedText(selectedTextContent: string): void {
    this.store.dispatch(new SaveText(selectedTextContent));
  }
}
