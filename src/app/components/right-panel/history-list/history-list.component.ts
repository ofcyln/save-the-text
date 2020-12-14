import { Component, OnDestroy, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { SavedText, SaveTheTextState } from '../../../store/state/save-the-text.state';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-history-list',
  templateUrl: './history-list.component.html',
  styleUrls: ['./history-list.component.scss'],
})
export class HistoryListComponent implements OnInit, OnDestroy {
  @Select(SaveTheTextState.getSavedTexts) savedTexts$: Observable<SavedText[]>;
  savedTextSubscription: Subscription;
  savedTexts: SavedText[];

  constructor() {}

  ngOnInit() {
    this.savedTextSubscription = this.savedTexts$.subscribe((savedTexts) => {
      this.savedTexts = savedTexts;
    });
  }

  ngOnDestroy() {
    this.savedTextSubscription.unsubscribe();
  }
}
