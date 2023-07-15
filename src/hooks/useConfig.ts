import { useState, useEffect, useCallback } from "react";
import { produce, current } from "immer";

import {
  exists,
  readTextFile,
  writeTextFile,
  BaseDirectory,
  createDir,
} from "@tauri-apps/api/fs";
import { emit } from "@tauri-apps/api/event";
import { open } from "@tauri-apps/api/shell";
import { homeDir } from "@tauri-apps/api/path";

import { Shortcut, ConfigJSON } from "@kianalol/types";
import { Events } from "@kianalol/constants";
import { deepEqualObj } from "@kianalol/utils";

const useConfig = () => {
  const [configJSON, setConfigJSON] = useState<ConfigJSON | undefined>(
    undefined
  );

  useEffect(() => {
    loadShortcuts();
  }, []);

  const loadShortcuts = useCallback(async () => {
    if (await exists(".kianalol/config.json", { dir: BaseDirectory.Home })) {
      const newConfigJSON: ConfigJSON = JSON.parse(
        await readTextFile(".kianalol/config.json", { dir: BaseDirectory.Home })
      );
      if (!deepEqualObj(newConfigJSON, configJSON)) {
        setConfigJSON(newConfigJSON);
      }
    } else {
      setConfigJSON({
        shortcuts: {},
      });
    }
  }, [configJSON]);

  const saveConfig = useCallback(async (newConfig: ConfigJSON) => {
    if (!(await exists(".kianalol/config.json", { dir: BaseDirectory.Home }))) {
      console.log("Creating config directory");
      await createDir(".kianalol", {
        dir: BaseDirectory.Home,
        recursive: true,
      });
    } else {
      console.log("Config directory already exists");
    }

    // promise rejection
    await writeTextFile(
      ".kianalol/config.json",
      JSON.stringify(newConfig, null, 2),
      {
        dir: BaseDirectory.Home,
      }
    );

    await emit(Events.CONFIG_UPDATED);
  }, []);

  const addShortcut = useCallback(
    async (leaderKey: string, shortcut: Shortcut) => {
      setConfigJSON((prev) =>
        produce(prev, (draft) => {
          if (draft) {
            draft.shortcuts[leaderKey] = shortcut;
            saveConfig(current(draft));
          }
        })
      );
    },
    []
  );

  const removeShortcut = useCallback(async (leaderKey: string) => {
    setConfigJSON((prev) =>
      produce(prev, (draft) => {
        if (draft) {
          delete draft.shortcuts[leaderKey];
          saveConfig(current(draft));
        }
      })
    );
  }, []);

  const openConfigFolder = useCallback(async () => {
    await open(`${await homeDir()}/.kianalol`);
  }, []);

  return {
    loading: configJSON === undefined,
    shortcuts: configJSON?.shortcuts ?? {},
    loadShortcuts,
    addShortcut,
    removeShortcut,
    openConfigFolder,
  };
};

export default useConfig;
