export class SaveText {
  static readonly type = '[SaveTheText] Save text';

  constructor(public textToSave: string) {}
}

export class RemoveText {
  static readonly type = '[SaveTheText] Remove text';

  constructor(public uuid: number) {}
}

export class GetLastSavedText {
  static readonly type = '[SaveTheText] Get Last Saved Text';

  constructor() {}
}

export class SetTextAreaValue {
  static readonly type = '[SaveTheText] Set Text Area Value';

  constructor(public textAreaValue: string) {}
}

export class RightPanelOpenerClick {
  static readonly type = '[SaveTheText] Right Panel Opener Button Clicked';

  constructor() {}
}

export class DarkModeButtonClick {
  static readonly type = '[SaveTheText] Dark Mode Button Clicked';

  constructor() {}
}
