import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { SavedText, SaveTheTextState } from '../../store/state/save-the-text.state';
import { Observable } from 'rxjs';
import { PulseTriggered, SaveText, SetTextAreaValue } from '../../store/action/save-the-text.actions';

@Component({
  selector: 'app-text-area',
  templateUrl: './text-area.component.html',
  styleUrls: ['./text-area.component.scss'],
})
export class TextAreaComponent implements OnInit {
  lastSavedText = '';

  @ViewChild('saveTheText', { static: false })
  set saveTheText(element: ElementRef<HTMLInputElement>) {
    if (element) {
      element.nativeElement.focus();
    }
  }

  @Select(SaveTheTextState.getLastSavedText) lastSavedText$: Observable<SavedText>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.lastSavedText$.subscribe((result) => {
      this.lastSavedText = result.savedText;
    });
  }

  getTextValue(event: { target: HTMLInputElement }): void {
    this.store.dispatch(new SetTextAreaValue(event.target.value));
  }

  getSaveKeyCombination(event: KeyboardEvent) {
    if (event.ctrlKey && event.key === 's') {
      this.store.dispatch(new SaveText(this.lastSavedText));
      this.store.dispatch(new PulseTriggered());
    }
  }
}
