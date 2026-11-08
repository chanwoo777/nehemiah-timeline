# Security policy

## What this site is

A static website served by GitHub Pages over HTTPS. There is no server code, no login, no forms, no cookies, no analytics and no tracking. The only thing it stores is your language choice (한국어 or English), kept in your own browser's local storage.

## Protections in place

- **Content-Security-Policy** (set in `index.html`): scripts may only load from this site, with no inline scripts and no `eval`. Styles load only from this site and Google Fonts, fonts only from Google Fonts. No network requests, form submissions, plugins or `<base>` changes are allowed.
- **No third-party scripts.** All code is in `app.js` in this repository.
- **Safe text handling.** Text placed into the page is escaped, and the story data is fixed in the source rather than taken from the URL or user input.
- **External links** open in a new tab with `rel="noopener noreferrer"`, and the referrer policy is `strict-origin-when-cross-origin`.
- **HTTPS only** through GitHub Pages' enforced HTTPS.

GitHub Pages cannot send custom HTTP headers, so protections that only work as headers (such as `frame-ancestors`) are not available. The site has no accounts or actions to hijack, so the risk from being framed is low.

## Reporting a problem

Please report security issues privately through this repository's **Security** tab → **Report a vulnerability**, rather than opening a public issue.
