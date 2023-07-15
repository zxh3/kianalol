#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use tauri::{CustomMenuItem, Manager, SystemTray, SystemTrayEvent, SystemTrayMenu};

mod kianalol;

fn main() {
    let system_tray: SystemTray = SystemTray::new().with_menu(
        SystemTrayMenu::new()
            .add_item(CustomMenuItem::new(
                "preferences".to_string(),
                "Preferences...",
            ))
            .add_item(CustomMenuItem::new("quit".to_string(), "Quit")),
    );

    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            kianalol::init_spotlight_window,
            kianalol::show_spotlight,
            kianalol::hide_spotlight
        ])
        .system_tray(system_tray)
        .on_system_tray_event(|app, event| match event {
            SystemTrayEvent::MenuItemClick { id, .. } => match id.as_str() {
                "quit" => {
                    std::process::exit(0);
                }
                "preferences" => {
                    let handle = app.app_handle();

                    let windows = handle.windows();

                    // Hack: Recreate the window to make the window focuses properly on macOS apple silicon
                    if windows.contains_key(kianalol::PREFERENCES_WINDOW_LABEL) {
                        windows
                            .get(kianalol::PREFERENCES_WINDOW_LABEL)
                            .unwrap()
                            .close()
                            .unwrap();
                        std::thread::spawn(move || {
                            kianalol::create_preference_window(
                                handle,
                                kianalol::PREFERENCES_BACKUP_WINDOW_LABEL,
                            );
                        });
                        return;
                    }
                    if windows.contains_key(kianalol::PREFERENCES_BACKUP_WINDOW_LABEL) {
                        windows
                            .get(kianalol::PREFERENCES_BACKUP_WINDOW_LABEL)
                            .unwrap()
                            .close()
                            .unwrap();
                        std::thread::spawn(move || {
                            kianalol::create_preference_window(
                                handle,
                                kianalol::PREFERENCES_WINDOW_LABEL,
                            );
                        });
                        return;
                    }

                    std::thread::spawn(move || {
                        kianalol::create_preference_window(
                            handle,
                            kianalol::PREFERENCES_WINDOW_LABEL,
                        );
                    });
                }
                _ => {}
            },
            _ => {}
        })
        .manage(kianalol::State::default())
        .setup(|app| {
            // Set the app's activation poicy to Accessory does the following behaviours:
            // - Makes the windows of this app appear above full-screen windows of other apps.
            // - Prevents the app's icon from showing on the dock.
            app.set_activation_policy(tauri::ActivationPolicy::Accessory);

            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running application");
}
