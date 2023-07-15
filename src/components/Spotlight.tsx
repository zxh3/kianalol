import useSpotlight from "@kianalol/hooks/useSpotlight";

import { Input } from "@kianalol/design-system";

function Spotlight() {
  const {
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
  } = useSpotlight();

  return (
    <div
      style={{
        height: "150px",
      }}
    >
      <div>
        {/* Leader key input */}
        {currentFocus === 0 && (
          <Input
            autoFocus
            placeholder="Leader key..."
            value={leaderKey}
            onChange={(e) => {
              setLeaderKey(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && toBeInvokedURL) {
                invokeShortcut();
              }
              if (e.key === "Tab" || e.key === " ") {
                e.preventDefault();
                if (
                  matchedShortcutNumPlaceholders &&
                  matchedShortcutNumPlaceholders > 0
                ) {
                  addPlaceholderValue("");
                }
              }
            }}
          />
        )}

        {/* Placeholder input */}
        {currentFocus > 0 && placeholderValues.length >= currentFocus && (
          <Input
            autoFocus
            placeholder={`${currentFocus} placeholder`}
            value={placeholderValues[currentFocus - 1]}
            onChange={(e) => {
              setPlaceholderValue(e.target.value, currentFocus);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && toBeInvokedURL) {
                invokeShortcut();
              }
              if (e.key === "Tab") {
                e.preventDefault();
                if (
                  matchedShortcutNumPlaceholders &&
                  matchedShortcutNumPlaceholders > currentFocus
                )
                  addPlaceholderValue("");
              }
              if (
                e.key === "Backspace" &&
                placeholderValues[currentFocus - 1] === ""
              ) {
                popPlaceholderValue();
              }
            }}
          />
        )}
      </div>

      {matchedShortcut && (
        <div
          className="bg-zinc-800 text-zinc-200 flex flex-col items-center justify-center text-sm"
          style={{ height: "100px" }}
        >
          <div>
            {matchedShortcut.name}
            {matchedShortcut.description
              ? ` - ${matchedShortcut.description}`
              : ""}
          </div>
          <div>
            URL:{" "}
            {toBeInvokedURL
              ? `${toBeInvokedURL} ✅`
              : "Please fill in placeholders by pressing tabs... ❌"}
          </div>
          {matchedShortcutNumPlaceholders &&
            matchedShortcutNumPlaceholders > 0 && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                {matchedShortcutNumPlaceholders - placeholderValues.length >
                  0 && (
                  <div>
                    Remaining placeholders:{" "}
                    {matchedShortcutNumPlaceholders - placeholderValues.length}
                  </div>
                )}
              </div>
            )}
        </div>
      )}
    </div>
  );
}

export default Spotlight;
