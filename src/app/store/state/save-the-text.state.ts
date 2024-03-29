import { Action, Selector, State, StateContext } from '@ngxs/store';
import {
  DarkModeButtonClick,
  GetLastSavedText,
  PulseTriggered,
  RemoveText,
  RightPanelOpenerClick,
  SaveText,
  SetTextAreaValue,
} from '../action/save-the-text.actions';
import { Injectable } from '@angular/core';
import { LastSavedText } from '../../shared/interface/last-saved-text.interface';
import { StorageService } from '../../shared/service/storage.service';

export interface SavedText {
  savedText: string;
}

export interface SaveTheTextStateModel {
  highlightedText: string;
  sessionId: number;
  lastSavedText: SavedText;
  savedTexts: SavedText[];
  textAreaValue: string;
  rightPanel: boolean;
  darkMode: boolean;
  pulse: boolean;
}

const filterDuplicates = (arr: SavedText[]): SavedText[] => {
  arr = [...new Set(arr)];
  return arr;
};

@State<SaveTheTextStateModel>({
  name: 'SaveTheText',
  defaults: {
    highlightedText: '',
    sessionId: null,
    lastSavedText: {
      savedText: StorageService.getItem('lastSavedText'),
    },
    savedTexts: filterDuplicates(StorageService.getData('savedTexts')) || [],
    textAreaValue: StorageService.getItem('lastSavedText'),
    rightPanel: false,
    darkMode: StorageService.getItem('darkMode') === 'true' || false,
    pulse: false,
  },
})
@Injectable()
export class SaveTheTextState {
  @Selector()
  static getLastSavedText(state: SaveTheTextStateModel): SavedText {
    return state.lastSavedText;
  }

  @Selector()
  static getSavedTexts(state: SaveTheTextStateModel): SavedText[] {
    return state.savedTexts;
  }

  @Selector()
  static getTextAreaValue(state: SaveTheTextStateModel): string {
    return state.textAreaValue;
  }

  @Selector()
  static getRightPanelValue(state: SaveTheTextStateModel): boolean {
    return state.rightPanel;
  }

  @Selector()
  static getDarkModeValue(state: SaveTheTextStateModel): boolean {
    return state.darkMode;
  }

  @Selector()
  static getPulseState(state: SaveTheTextStateModel): boolean {
    return state.pulse;
  }

  @Action(SaveText)
  saveText({ getState, patchState }: StateContext<SaveTheTextStateModel>, { textToSave }: SaveText): void {
    if (!getState().sessionId) {
      patchState({ sessionId: Date.now() });
    }

    patchState({
      lastSavedText: {
        timestamp: new Date(),
        savedText: textToSave,
      },
    } as LastSavedText);

    const lastSavedText = getState().lastSavedText;
    const savedTexts = filterDuplicates(getState().savedTexts);

    if (savedTexts.length === 0 && lastSavedText.savedText) {
      savedTexts.push(lastSavedText);
      filterDuplicates(savedTexts);
      this.setStringifyData(savedTexts);
      patchState({ savedTexts });
    } else {
      for (const text of savedTexts) {
        if (savedTexts[0].savedText !== textToSave && text.savedText !== textToSave) {
          savedTexts.unshift(lastSavedText);
          filterDuplicates(savedTexts);
          this.setStringifyData(savedTexts);
          patchState({ savedTexts });
        }
      }
    }
  }

  @Action(SetTextAreaValue)
  setTextAreaValue({ patchState }: StateContext<SaveTheTextStateModel>, { textAreaValue }: SetTextAreaValue): void {
    patchState({
      textAreaValue,
    });
  }

  @Action(RemoveText)
  removeText({ getState, patchState }: StateContext<SaveTheTextStateModel>, { selectedText }: RemoveText): void {
    const filteredSavedTexts = getState().savedTexts.filter((text: SavedText) => text.savedText !== selectedText);

    patchState({
      savedTexts: filteredSavedTexts,
    });

    this.setStringifyData(filteredSavedTexts);
  }

  @Action(GetLastSavedText)
  getLastSavedText({ getState }: StateContext<SaveTheTextStateModel>): SavedText {
    return getState().lastSavedText;
  }

  @Action(RightPanelOpenerClick)
  rightPanelOpenerClick({ getState, patchState }: StateContext<SaveTheTextStateModel>): void {
    !getState().rightPanel ? patchState({ rightPanel: true }) : patchState({ rightPanel: false });
  }

  @Action(DarkModeButtonClick)
  darkModeButtonClick({ getState, patchState }: StateContext<SaveTheTextStateModel>): void {
    const darkMode = !getState().darkMode;
    patchState({ darkMode });
    StorageService.setItem('darkMode', darkMode.toString());
  }

  @Action(PulseTriggered)
  pulseTriggered({ getState, patchState }: StateContext<SaveTheTextStateModel>): void {
    patchState({ pulse: true });

    const pulsing = () => {
      patchState({ pulse: !getState().pulse });
    };

    setTimeout(pulsing, 2e2);
  }

  setStringifyData(savedTexts: SavedText[]): void {
    const stringifyData = JSON.stringify(savedTexts);

    StorageService.setItem('savedTexts', stringifyData);
  }
}
