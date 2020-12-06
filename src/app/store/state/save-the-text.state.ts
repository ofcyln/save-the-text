import { Action, Selector, State, StateContext } from '@ngxs/store';
import {
  DarkModeButtonClick,
  GetLastSavedText,
  RemoveText,
  RightPanelOpenerClick,
  SaveText,
  SetTextAreaValue,
} from '../action/save-the-text.actions';
import { Injectable } from '@angular/core';
import { LastSavedText } from '../../shared/interface/last-saved-text.interface';
import { StorageService } from '../../shared/service/storage.service';

const filterDuplicates = (arr: SavedText[]): SavedText[] => {
  arr = [...new Set(arr)];
  return arr;
};

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
}

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
    darkMode: false,
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

  @Action(SaveText)
  saveText({ getState, patchState }: StateContext<SaveTheTextStateModel>, { textToSave }: SaveText): void {
    if (!getState().sessionId) {
      patchState({ sessionId: Date.now() });
    }

    patchState({
      lastSavedText: {
        savedText: textToSave,
      },
    } as LastSavedText);

    this.addUniqueNewText(getState().lastSavedText, getState().savedTexts, textToSave);
  }

  @Action(SetTextAreaValue)
  setTextAreaValue({ patchState }: StateContext<SaveTheTextStateModel>, { textAreaValue }: SetTextAreaValue): void {
    patchState({
      textAreaValue,
    });
  }

  @Action(RemoveText)
  removeText({ getState, patchState }: StateContext<SaveTheTextStateModel>, { selectedText }: RemoveText): void {
    patchState({
      savedTexts: getState().savedTexts.filter((text: SavedText) => text.savedText !== selectedText),
    });
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
    !getState().darkMode ? patchState({ darkMode: true }) : patchState({ darkMode: false });
  }

  addUniqueNewText(lastSavedTextState: SavedText, savedTextsState: SavedText[], textToSave: string): void {
    const lastSavedText = lastSavedTextState;
    const savedTexts = filterDuplicates(savedTextsState);

    if (savedTexts.length === 0 && !!lastSavedText.savedText) {
      savedTexts.push(lastSavedText);
      filterDuplicates(savedTexts);
      this.setStringifyData(savedTexts);
    } else {
      for (const text of savedTexts) {
        if (savedTexts[savedTexts.length - 1].savedText !== textToSave && text.savedText !== textToSave) {
          savedTexts.push(lastSavedText);
          filterDuplicates(savedTexts);
          this.setStringifyData(savedTexts);
        }
      }
    }
  }

  setStringifyData(savedTexts: SavedText[]): void {
    const stringifyData = JSON.stringify(savedTexts);

    StorageService.setItem('savedTexts', stringifyData);
  }
}
