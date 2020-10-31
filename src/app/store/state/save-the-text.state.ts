import { Action, Selector, State, StateContext } from '@ngxs/store';
import { GetLastSavedText, RemoveText, SaveText } from '../action/save-the-text.actions';

export interface SavedText {
  savedText: string;
  uuid: number;
}

export interface SaveTheTextStateModel {
  highlightedText: string;
  lastSavedText: SavedText;
  savedTexts: SavedText[];
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
  },
})
export class SaveTheTextState {
  @Selector()
  static getLastSavedText(state: SaveTheTextStateModel): SavedText {
    return state.lastSavedText;
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
