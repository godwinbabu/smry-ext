export type OpenMode = "same-tab" | "new-tab";

export const OPEN_MODE_KEY = "openMode";
export const DEFAULT_OPEN_MODE: OpenMode = "same-tab";

export async function getOpenMode(): Promise<OpenMode> {
  const stored = (await chrome.storage.sync.get(OPEN_MODE_KEY)) as Record<string, OpenMode | undefined>;
  return stored[OPEN_MODE_KEY] ?? DEFAULT_OPEN_MODE;
}

export async function setOpenMode(mode: OpenMode): Promise<void> {
  await chrome.storage.sync.set({ [OPEN_MODE_KEY]: mode });
}
