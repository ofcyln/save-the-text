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

export interface SavedText {
  savedText: string;
  uuid: number;
}

export interface SaveTheTextStateModel {
  highlightedText: string;
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
    lastSavedText: {
      savedText: '',
      uuid: null,
    },
    savedTexts: [],
    textAreaValue: '',
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
    patchState({
      lastSavedText: {
        savedText: textToSave,
        uuid: Date.now(),
      },
    });

    const lastSavedText = getState().lastSavedText;
    const savedTexts = getState().savedTexts;

    savedTexts.push(lastSavedText);
  }

  @Action(SetTextAreaValue)
  setTextAreaValue({ getState, patchState }: StateContext<SaveTheTextStateModel>, { textAreaValue }: SetTextAreaValue): void {
    patchState({
      textAreaValue,
    });
  }

  @Action(RemoveText)
  removeText({ getState, patchState }: StateContext<SaveTheTextStateModel>, { uuid }: RemoveText): void {
    patchState({
      savedTexts: getState().savedTexts.filter((text: SavedText) => text.uuid !== uuid),
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
}
