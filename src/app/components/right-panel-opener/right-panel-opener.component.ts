import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { SaveTheTextState } from '../../store/state/save-the-text.state';
import { Observable } from 'rxjs';
import { RightPanelOpenerClick } from '../../store/action/save-the-text.actions';

@Component({
  selector: 'app-right-panel-opener',
  templateUrl: './right-panel-opener.component.html',
  styleUrls: ['./right-panel-opener.component.scss'],
})
export class RightPanelOpenerComponent implements OnInit {
  @Select(SaveTheTextState.getRightPanelValue) rightPanel$: Observable<boolean>;

  constructor(private readonly store: Store) {}

  ngOnInit(): void {}

  open(): void {
    this.store.dispatch(new RightPanelOpenerClick());
  }
}
