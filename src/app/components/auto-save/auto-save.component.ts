import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { SaveText } from '../../store/action/save-the-text.actions';
import { SaveTheTextState } from '../../store/state/save-the-text.state';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-auto-save',
  templateUrl: './auto-save.component.html',
  styleUrls: ['./auto-save.component.scss'],
})
export class AutoSaveComponent implements OnInit {
  @Select(SaveTheTextState.getTextAreaValue) textAreaValue$: Observable<string>;
  textAreaValue: string;

  constructor(private store: Store) {
    this.textAreaValue$.subscribe((textAreaValue) => {
      this.textAreaValue = textAreaValue;
    });
  }

  ngOnInit(): void {}

  save(): void {
    this.store.dispatch(new SaveText(this.textAreaValue));
  }
}
