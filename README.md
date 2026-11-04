# WordPress Jobs redesign

A block theme rebuild of [jobs.wordpress.net](https://jobs.wordpress.net/), with a companion plugin for the job board's blocks and behaviour. It reproduces the live site, built from WordPress primitives (`theme.json`, templates, template parts, block styles and page content) rather than a hand-written stylesheet.

This replaces the earlier static HTML prototype, which is still in this repository's git history.

## What's here

| Path | What it is |
|---|---|
| `themes/jobswp-2025-theme/` | The block theme, "Jobs Theme 2026". Presentation only: `theme.json` holds the design tokens, plus templates, parts and one small stylesheet per block type. It ships no blocks. |
| `plugins/jobswp-blocks/` | The companion plugin: Block Bindings sources for job data, the `jobswp/open-to-work` block, Interactivity API filtering for the homepage job browser, the job form partials and site-level hooks. It is meant to move into the `jobswp` plugin upstream. |
| `content/pages/` | Block markup for the pages the theme expects: Home, FAQ, Feedback and Remove a Job. Page content lives in the database, so recreate these pages from these files on a new site. |

## Requirements

- WordPress 7.1 or later. The theme uses 7.1's per-viewport style states and the core accordion, tabs and terms-query blocks.
- PHP 7.4 or later.
- The [`jobswp`](https://meta.trac.wordpress.org/browser/sites/trunk/jobs.wordpress.net/public_html/wp-content/plugins/jobswp) plugin from Meta trunk (r15493 or later, which includes the `[jobswp-contact-form]` shortcode). It registers the `job` post type and the `job_category` taxonomy.
- Optional: Jetpack, connected to WordPress.com, for the job alerts form (Subscriptions) and the job view count (Stats). Without a connection both print nothing.

## Set up a local site

1. Copy `themes/jobswp-2025-theme` to `wp-content/themes/` and `plugins/jobswp-blocks` to `wp-content/plugins/`, beside `jobswp`.
2. Activate `jobswp`, then `jobswp-blocks`, then the "Jobs Theme 2026" theme.
3. Create these pages and paste in the markup from `content/pages/`:
   - **Home** (slug `home`): `home.html`, template "Landing". In Settings → Reading, set it as the homepage.
   - **FAQ** (slug `faq`): `faq.html`, default template.
   - **Feedback** (slug `feedback`): `feedback.html`, template "Wide page".
   - **Post a Job** (slug `post-a-job`, which the jobswp plugin requires): no content needed, template "Wide page". The plugin adds the form.
   - **Remove A Job** (slug `remove-a-job`): `remove-a-job.html`, template "Wide page". The companion plugin adds the form.
4. Add a few `job_category` terms and `job` posts so the listings have something to show.

## How it's built

- **Core blocks first.** Job details, homepage stats and archive headers are core paragraphs, buttons and query blocks whose values come from Block Bindings sources (`jobswp/job-field`, `jobswp/stats`, `jobswp/archive`). The homepage category filter is core `terms-query` and `query` blocks wired with the Interactivity API. Without JavaScript the pills still link to the category archives.
- **One custom block.** `jobswp/open-to-work` shows WordPress.org members who are open to work, from the profiles.wordpress.org API (cached for an hour), in three layouts: grid, compact and list.
- **Core controls before CSS.** Responsive changes are WordPress 7.1 per-viewport attributes. Form fields and buttons are styled through `theme.json` elements, and navigation, search and accordion styles live in `theme.json` block styles. The remaining CSS is one file per block type, each loaded only when its block is on the page. The few label rules are written to move to the `label` element that WordPress 7.2 adds to `theme.json`.
- **Content lives in the editor.** Templates and parts are plain block markup, editable in the Site Editor, and page content is ordinary page content.

## Known gaps

- Jetpack Subscriptions, Jetpack Stats and reCAPTCHA (production only) could not be checked locally.
- The 781px breakpoint of the live site is folded into the 900px tablet breakpoint, so between 782 and 900px the footer is two columns and headings step down sooner than on live.
- The FAQ uses the core accordion block, so its answers are collapsed where live shows them open.
