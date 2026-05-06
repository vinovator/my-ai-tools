// URL state — single ?server= parameter, read on load and updated on connect.
// Uses history.replaceState so we don't pile entries into the back stack on
// every reconnect.

const PARAM = "server";

export function readServerFromUrl() {
  try {
    const params = new URLSearchParams(window.location.search);
    const v = params.get(PARAM);
    return v ? v.trim() : null;
  } catch {
    return null;
  }
}

export function writeServerToUrl(serverUrl) {
  try {
    const url = new URL(window.location.href);
    if (serverUrl) url.searchParams.set(PARAM, serverUrl);
    else url.searchParams.delete(PARAM);
    window.history.replaceState({}, "", url.toString());
  } catch {
    // Some sandboxed contexts (e.g. file:// in certain browsers) don't allow
    // history mutations. Failing silently is fine — the in-memory state is
    // still correct.
  }
}
