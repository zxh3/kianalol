import { useMemo, useState, useEffect, useCallback } from "react";
import { produce } from "immer";

import { open } from "@tauri-apps/api/shell";
import { invoke } from "@tauri-apps/api/tauri";
import { listen } from "@tauri-apps/api/event";
import { appWindow, LogicalSize } from "@tauri-apps/api/window";

import { Shortcut } from "@kianalol/types";
import { Events } from "@kianalol/constants";
import useConfig from "@kianalol/hooks/useConfig";

const useSpotlight = () => {
  const [leaderKey, setLeaderKey] = useState("");
  const [placeholderValues, setPlaceholderValues] = useState<string[]>([]);

  // 0 is the leader key
  // 1 is the first placeholder value
  // 2 is the second placeholder value
  // ...
  const [currentFocus, setCurrentFocus] = useState(0);

  const { shortcuts, loadShortcuts } = useConfig();

  const matchedShortcut: Shortcut | undefined = shortcuts[leaderKey];
  const matchedShortcutNumPlaceholders =
    matchedShortcut?.urlWithPlaceholders?.match(/{}/g)?.length;
  const hasMatchedShortcut = !!matchedShortcut;

  const toBeInvokedURL = useMemo(() => {
    if (!matchedShortcut) return false;

    if (matchedShortcut.url && placeholderValues.length === 0) {
      return matchedShortcut.url;
    }

    if (
      matchedShortcutNumPlaceholders &&
      placeholderValues.length === matchedShortcutNumPlaceholders
    ) {
      let url = matchedShortcut.urlWithPlaceholders;
      placeholderValues.forEach((arg) => {
        url = url.replace("{}", arg);
      });
      return url;
    }

    return false;
  }, [matchedShortcut, placeholderValues]);

  const unsetExpandedSize = useCallback(async () => {
    await appWindow.setSize(new LogicalSize(800, 50));
  }, []);

  const setExpandedSize = useCallback(async () => {
    await appWindow.setSize(new LogicalSize(800, 150));
  }, []);

  useEffect(() => {
    if (hasMatchedShortcut) {
      setExpandedSize();
    } else {
      unsetExpandedSize();
    }
  }, [hasMatchedShortcut]);

  const handleEscape = useCallback((event: KeyboardEvent) => {
    if (event.key === "Escape") {
      event.preventDefault();
      setLeaderKey("");
      invoke("hide_spotlight");
    }
  }, []);

  useEffect(() => {
    invoke("init_spotlight_window");
    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  useEffect(() => {
    let unlisten: () => void;

    (async () => {
      unlisten = await listen<string>(Events.CONFIG_UPDATED, (_event) => {
        loadShortcuts();
      });
    })();

    return () => {
      if (unlisten) {
        unlisten();
      }
    };
  }, []);

  const invokeShortcut = useCallback(() => {
    if (toBeInvokedURL) {
      open(toBeInvokedURL);
      setCurrentFocus(0);
      setPlaceholderValues([]);
      setLeaderKey("");
      invoke("hide_spotlight");
    }
  }, [toBeInvokedURL]);

  const addPlaceholderValue = useCallback(
    (value: string) => {
      if (
        matchedShortcutNumPlaceholders &&
        placeholderValues.length < matchedShortcutNumPlaceholders
      ) {
        setPlaceholderValues((prev) => [...prev, value]);
        setCurrentFocus((prev) => prev + 1);
      }
    },
    [placeholderValues, matchedShortcutNumPlaceholders]
  );

  const setPlaceholderValue = useCallback(
    (value: string, currentFocus: number) => {
      setPlaceholderValues((prev) =>
        produce(prev, (draft) => {
          draft[currentFocus - 1] = value;
        })
      );
    },
    []
  );

  const popPlaceholderValue = useCallback(() => {
    if (placeholderValues.length > 0) {
      setPlaceholderValues((prev) => prev.slice(0, -1));
      setCurrentFocus((prev) => prev - 1);
    }
  }, [placeholderValues]);

  return {
    leaderKey,
    setLeaderKey,

    matchedShortcut,
    matchedShortcutNumPlaceholders,

    placeholderValues,
    addPlaceholderValue,
    popPlaceholderValue,
    currentFocus,
    setPlaceholderValue,

    toBeInvokedURL,
    invokeShortcut,
  };
};

export default useSpotlight;
