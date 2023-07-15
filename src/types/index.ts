export interface Shortcut {
  name: string;
  description: string;
  url: string;
  urlWithPlaceholders: string;
}

export interface ConfigJSON {
  shortcuts: Shortcuts;
}

export type Shortcuts = {
  [leaderKey: string]: Shortcut;
};
