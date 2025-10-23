import { getOpenMode } from "../shared.js";

const CONTEXT_MENU_ID = "13ft-context";
const SMRY_BASE_URL = "https://smry.ai/";
const SUPPORTED_PROTOCOL = /^https?:\/\//i;

function buildSmryUrl(sourceUrl: string): string {
  return `${SMRY_BASE_URL}${sourceUrl}`;
}

async function openSmryForUrl(url: string, sourceTabId?: number): Promise<void> {
  const mode = await getOpenMode();
  const smryUrl = buildSmryUrl(url.trim());

  if (mode === "same-tab" && typeof sourceTabId === "number") {
    await chrome.tabs.update(sourceTabId, { url: smryUrl });
    return;
  }

  await chrome.tabs.create({ url: smryUrl, active: true });
}

async function summarizeTab(tab?: chrome.tabs.Tab): Promise<void> {
  const targetUrl = tab?.url;

  if (!targetUrl || !SUPPORTED_PROTOCOL.test(targetUrl)) {
    console.warn("13ft: No HTTP(S) URL available to summarize.");
    return;
  }

  await openSmryForUrl(targetUrl, tab?.id);
}

async function summarizeActiveTab(): Promise<void> {
  const [activeTab] = await chrome.tabs.query({ active: true, currentWindow: true });
  await summarizeTab(activeTab);
}

chrome.action.onClicked.addListener((tab) => {
  void summarizeTab(tab);
});

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.removeAll(() => {
    chrome.contextMenus.create(
      {
        id: CONTEXT_MENU_ID,
        title: "13ft • Summarize",
        contexts: ["page"],
      },
      () => {
        const error = chrome.runtime.lastError;
        if (error) {
          console.error("13ft context menu error", error);
        }
      }
    );
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId !== CONTEXT_MENU_ID) {
    return;
  }

  const url = info.pageUrl ?? tab?.url;
  if (!url) {
    console.warn("13ft: No URL found from context menu target.");
    return;
  }

  void openSmryForUrl(url, tab?.id);
});

chrome.commands.onCommand.addListener((command) => {
  if (command === "summarize-page") {
    void summarizeActiveTab();
  }
});
