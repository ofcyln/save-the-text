import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { SaveText } from '../../store/action/save-the-text.actions';
import { SaveTheTextState } from '../../store/state/save-the-text.state';
import { Observable, timer } from 'rxjs';
import { StorageService } from '../../shared/service/storage.service';

@Component({
  selector: 'app-auto-save',
  templateUrl: './auto-save.component.html',
  styleUrls: ['./auto-save.component.scss'],
})
export class AutoSaveComponent implements OnInit {
  @Select(SaveTheTextState.getTextAreaValue) textAreaValue$: Observable<string>;
  textAreaValue: string;
  private readonly TEN_SECONDS = 1e4;

  constructor(private store: Store) {
    this.textAreaValue$.subscribe((textAreaValue) => {
      this.textAreaValue = textAreaValue;
    });
  }

  ngOnInit(): void {
    this.savePeriodically();
  }

  save(): void {
    this.store.dispatch(new SaveText(this.textAreaValue));
    StorageService.setItem('lastSavedText', this.textAreaValue);
  }

  savePeriodically(): void {
    const numbers = timer(this.TEN_SECONDS, this.TEN_SECONDS);

    numbers.subscribe(() => {
      this.save();
    });
  }
}
