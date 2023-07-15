# Kianalol

Introducing Kianalol - the desktop app that free you from typing the in the address bar forever.

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
| Search query empty            | <img width="1012" alt="Screenshot 2023-06-24 at 16 16 10" src="https://github.com/zxh3/kiana/assets/17435932/05c0a03e-a7f0-41e5-8c94-c904885cdf58"> |
| Search query with leader key  | <img width="948" alt="Screenshot 2023-06-24 at 16 16 18" src="https://github.com/zxh3/kiana/assets/17435932/ce4b7e46-bb70-4d6a-ab50-637f672c538c">  |
| Search query with placeholder | <img width="956" alt="Screenshot 2023-06-24 at 16 16 39" src="https://github.com/zxh3/kiana/assets/17435932/97171abb-cbc8-463e-9213-df6142f59667">  |
| System Tray                   | <img width="627" alt="Screenshot 2023-06-24 at 05 10 41" src="https://github.com/zxh3/kiana/assets/17435932/b242854b-c8a7-45e8-b8f2-3c14f729e57b">  |
| Preferences                   | <img width="991" alt="Preferences" src="https://github.com/zxh3/kiana/assets/17435932/f4aa2b1a-0b86-442c-89ef-d7c42c4ad352">                        |

## Demo video

[](https://github.com/zxh3/kiana/assets/17435932/508fe86d-51ed-40ed-aa6b-76bd18aa9739)

## Build

```
cargo tauri build --target aarch64-apple-darwin
cargo tauri build --target x86_64-apple-darwin
cargo tauri build --target universal-apple-darwin
```

## Credits

- Reference for displaying the spotlight panel: https://github.com/ahkohd/tauri-macos-spotlight-example
