import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Select } from '@ngxs/store';
import { SavedText, SaveTheTextState } from '../../store/state/save-the-text.state';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-text-area',
  templateUrl: './text-area.component.html',
  styleUrls: ['./text-area.component.scss'],
})
export class TextAreaComponent implements OnInit, AfterViewInit {
  lastSavedText: string;
  @ViewChild('saveTheText') saveTheText: any;

  @Select(SaveTheTextState.getLastSavedText) lastSavedText$: Observable<SavedText>;

  constructor() {}

  ngOnInit(): void {
    this.lastSavedText$.subscribe((result) => {
      this.lastSavedText = result.savedText;
    });
  }

  ngAfterViewInit(): void {
    this.saveTheText.nativeElement.focus();
  }
}
