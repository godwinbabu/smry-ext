import { DEFAULT_OPEN_MODE, getOpenMode, OpenMode, setOpenMode } from "../shared.js";

type OptionElements = {
  select: HTMLSelectElement;
  status: HTMLSpanElement;
};

const STATUS_TIMEOUT_MS = 2000;

function findElements(): OptionElements {
  const select = document.getElementById("open-mode") as HTMLSelectElement | null;
  const status = document.getElementById("status") as HTMLSpanElement | null;

  if (!select || !status) {
    throw new Error("13ft options: Required elements are missing");
  }

  return { select, status };
}

async function restorePreferences(select: HTMLSelectElement): Promise<void> {
  const mode = await getOpenMode();
  select.value = mode;
}

async function savePreference(mode: OpenMode, status: HTMLSpanElement): Promise<void> {
  await setOpenMode(mode);
  status.textContent = mode === "same-tab" ? "Opening in the current tab" : "Opening in a new tab";
  setTimeout(() => {
    status.textContent = "";
  }, STATUS_TIMEOUT_MS);
}

function handleChange(select: HTMLSelectElement, status: HTMLSpanElement): void {
  select.addEventListener("change", () => {
    const nextMode = (select.value as OpenMode) ?? DEFAULT_OPEN_MODE;
    void savePreference(nextMode, status);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  try {
    const { select, status } = findElements();
    void restorePreferences(select);
    handleChange(select, status);
  } catch (error) {
    console.error(error);
  }
});
