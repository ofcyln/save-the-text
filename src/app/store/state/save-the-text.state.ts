import { Action, Selector, State, StateContext } from '@ngxs/store';
import { GetLastSavedText, RemoveText, SaveText, SetTextAreaValue } from '../action/save-the-text.actions';
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
}
