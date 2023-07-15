# Kianalol

Introducing Kianalol - the app that frees you from typing the in the address bar forever.

## Usage

### Shortcut Invocation

- Type `Cmd+Shift+K`
- Type "leader key"

  - If the shortcut contains a URL, typing `Enter` will open the URL directly
  - If the shortcut contains a URL with placeholders, typing `Tab` or `Space` will allows you to fill in the first placeholder.

    - Type `Tab` again to fill in the second, third, ... placeholders until the URL is fulfilled.
    - Finally type `Enter` to open the URL

### Preferences

- Open the App
- Find the cat (Kiana) icon on the system tray (top right corner of your Mac's desktop)
- Click and go to preferences settings
- Customize your shortcuts there
  - You can copy `example.config.json` to get started

## Development

- Simply run `cargo tauri dev` in the root folder

## Credit

- Reference for displaying the spotlight panel: https://github.com/ahkohd/tauri-macos-spotlight-example
- Forked from https://github.com/zxh3/kiana
