


# Kianalol

Introducing Kianalol - the tool that frees you from typing the in the address bar forever.

## Installation

Option 1: Download the latest release [here](https://github.com/zxh3/kianalol/releases)  
Option 2: Build it from scrach on your own by running `cargo tauri build`

## Setup

1. Open the Kianalol App
2. Go to `Preferences` in the system tray
3. Customize your shortcuts there. Note that the config file is saved at `$HOME/.kianalol/config.json`

Example URL with placeholders: `https://www.google.com/search?q={}`

## Usage

- Press `Cmd+Shift+K` to activate Kianalol
- Type the leader key for your shortcut
  - If the shortcut contains a URL, you can hit `Enter` directly to visit
  - If the shortcut contains a URL with placeholders, you can hit `Space` (only for the first placeholder) or `Tab` to focus on the next placeholder. Hit `Enter` when the URL is ready.

## Screenshots

| View                          | Screenshot                                                                                                                                          |
| ----------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| Search query empty            | <img width="1012" alt="1" src="https://github.com/zxh3/kianalol/assets/17435932/3fe5acbc-e01f-4274-ad65-7cf9dac4d2fe"> |
| Search query with leader key  | <img width="948" alt="2" src="https://github.com/zxh3/kianalol/assets/17435932/f70965e2-b243-4eda-a02b-87977d273822">  |
| Search query with placeholder | <img width="956" alt="3" src="https://github.com/zxh3/kianalol/assets/17435932/2b7dc871-2b63-48d4-aa2a-12332d4fcc4c">  |
| System Tray                   | <img width="627" alt="4" src="https://github.com/zxh3/kianalol/assets/17435932/a5f17000-a35c-4420-92ab-a76805b7255e">  |
| Preferences                   | <img width="991" alt="5" src="https://github.com/zxh3/kianalol/assets/17435932/b61da086-80bc-4283-9de7-f874a0e696b6">  |

## Demo video


[](https://github.com/zxh3/kiana/assets/17435932/508fe86d-51ed-40ed-aa6b-76bd18aa9739](https://github.com/zxh3/kianalol/assets/17435932/1775a894-4f70-4f47-b217-2a2e5b4d95a5
)

## Build

```
cargo tauri build --target aarch64-apple-darwin
cargo tauri build --target x86_64-apple-darwin
cargo tauri build --target universal-apple-darwin
```

## TODO

- [ ] Support tagging shortcuts
- [ ] Support loading or syncing shortcuts from gists
- [ ] Better shortcut table view - support shortcut filter, searching, ...
- [ ] Support variables

## Credits

- Reference for displaying the spotlight panel: https://github.com/ahkohd/tauri-macos-spotlight-example
