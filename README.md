# linscp-website

Source of the [linscp](https://github.com/99ecarvalho/linscp) website and manual,
built with [Astro Starlight](https://starlight.astro.build/) and published on GitHub Pages:
<https://linscp.org/>

## Work on it

Needs Node.js 22.22 or newer.

```sh
npm install
npm run dev        # http://localhost:4321/
npm run build      # static site in dist/
```

## Layout

| Path | What |
|---|---|
| `src/content/docs/` | Pages in Markdown. `manual/` is the manual; one folder per sidebar group. |
| `src/sidebar.mjs` | Manual sidebar groups. |
| `src/components/` | Theme: header, page title, footer, home, downloads, news list. |
| `src/styles/theme.css` | Design tokens and Starlight overrides (light and dark). |
| `src/lib/release.ts` | Reads the newest linscp release from the GitHub API at build time. |
| `src/data/cli.yaml` | Our descriptions of every `linscp-cli` command, switch and option. |
| `src/data/cli-structure.json` | Names of those commands, switches and options, taken from the program. |
| `scripts/gen-cli-reference.mjs` | Builds the command reference pages from the two files above. |
| `WRITING.md` | How to write manual pages. Read it before you add one. |

## The command reference

The pages under `manual/reference/commands/` are generated on every build. Only
the *names* come from `linscp-cli`; every description is in `src/data/cli.yaml`.
After a linscp release that adds or removes commands or switches:

```sh
LINSCP_CLI=/path/to/linscp-cli npm run refresh:cli
npm run check:cli   # lists anything cli.yaml does not describe yet
```

## Deploy

Every push to `main` deploys. The site also rebuilds daily, and on a
`linscp-release` repository dispatch, so the download page always lists the
newest release.

## Licence

- Text of the manual and site pages (`src/content/`, `src/data/cli.yaml`): [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/), see `LICENSE-docs`.
- Code (components, theme, scripts, config): GPL-3.0-or-later, see `LICENSE`.

By contributing you agree to license your text and code under these terms.
