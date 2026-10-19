---
title: Contributing
description: Report problems, send code or translation changes, and edit this manual and website.
sidebar:
  order: 5
related:
  - manual/developers/building
  - manual/developers/testing
  - manual/developers/architecture
  - manual/about/translations
---

linscp welcomes bug reports, fixes, translations and documentation. Everything
happens on GitHub: the program lives in
[99ecarvalho/linscp](https://github.com/99ecarvalho/linscp) and this website
in [99ecarvalho/linscp-website](https://github.com/99ecarvalho/linscp-website).

## Report a problem

Open an [issue](https://github.com/99ecarvalho/linscp/issues). Say which
linscp version and package you use, your system, and the steps that show the
problem. A session log helps; [reporting bugs](../../troubleshooting/reporting-bugs/)
explains how to make one and what to remove from it first.

For a security problem, do not open a public issue. Follow
[reporting a vulnerability](../../security/reporting-vulnerabilities/).

If the bug is in WinSCP's own code and also happens in WinSCP, it may belong
upstream. Say so in the issue; the maintainers offer such fixes to WinSCP as
pull requests and carry them in linscp meanwhile.

## Change the code

1. [Build](../building/) linscp and run the [test suite](../testing/) once, so
   you know your setup works.
2. Make the change. Follow the rules below.
3. Add or update a test, and run the suite again.
4. Commit with a [Conventional Commits](https://www.conventionalcommits.org/)
   message, such as `fix(qt): keep the queue visible after reconnect`. Common
   scopes are `qt`, `core`, `shim`, `transform`, `cmake`, `ci` and `doc`.
5. Open a pull request. CI builds Linux and Windows and runs the tests on both.

### Rules that keep linscp close to WinSCP

- **Never edit `3rd-party/`.** The WinSCP, OpenSSL and PuTTY submodules stay
  pristine. A change to WinSCP's core is a small patch in `port/patches/`,
  and it must still compile with C++Builder. See
  [architecture](../architecture/).
- **Use clang.** Code that only GCC accepts, or that breaks the clang build,
  will not be merged.
- **Keep Qt and the core apart.** Qt code reaches the core only through
  `port/qt/CoreBridge.h`; core-side code goes into the bridge units.
- **Follow WinSCP's interface.** Use WinSCP's captions word for word, its
  configuration keys and its rules for when a control is enabled. That keeps
  existing settings working and lets WinSCP's translations cover your texts.
- **Update the tracker.** If your change finishes or starts a task, update
  `doc/qt/TRACKER.md` (or `doc/qt/gaps_tracker.md`) in the same commit.

### When you add or change interface text

```sh
cmake --build build/linux --target update_translations
port/tools/winscp_ts_suggest.py port/qt/translations/linscp_de.ts DE --write
```

The first command adds your text to every `.ts` file. The second fills in
WinSCP's translation of the same English text where one exists; repeat it per
language, or leave the rest for translators. `translations_current` fails until
the `.ts` files match the sources.

### Add a language

```sh
port/tools/ts_language.py new <locale> <LANG>
port/tools/ts_language.py export port/qt/translations/linscp_<locale>.ts todo.json
# translate the entries in todo.json
port/tools/ts_language.py import port/qt/translations/linscp_<locale>.ts todo.json
```

`<locale>` is Qt's name (`de`, `pt_BR`), `<LANG>` is WinSCP's code (`DE`,
`PT`). `doc/qt/translations.md` in the repository has the details. For
corrections to an existing language, see [translations](../../about/translations/).

## Edit this website and manual

The site is built with Astro Starlight. You need Node.js 22.22 or newer.

```sh
git clone https://github.com/99ecarvalho/linscp-website
cd linscp-website
npm install
npm run dev        # http://localhost:4321/linscp-website/
```

Manual pages are Markdown files in `src/content/docs/manual/`, one folder per
sidebar group. The **Edit page** link at the bottom of each page opens the file
on GitHub.

### Read WRITING.md first

`WRITING.md` in the website repository is the style guide: voice, how to name
menus and keys, page frontmatter, links, and the Starlight asides and tabs you
may use. Its central rule is that every sentence is written for this manual.
WinSCP's documentation and FileZilla's wiki are good for learning facts, but
their text must not be copied or lightly reworded. Only claim what linscp
actually does; check the code or try it.

### Run the overlap check

Before you send a page, run the overlap check, `overlap.py`. It compares your
pages with offline copies of WinSCP's and FileZilla's documentation and with
`linscp-cli`'s built-in help, and reports every run of eight words that also
appears there:

```sh
python3 -I overlap.py path/to/linscp-website/src/content/docs/manual/<group>
```

Rewrite each hit in your own words. Hits made only of a command line, path or
protocol name are fine. If you do not have the offline copies, say so in the
pull request, and a maintainer will run the check.

### The command reference is generated

Do not edit the pages under `manual/reference/commands/` or
`manual/reference/linscp-cli-switches.md`. `scripts/gen-cli-reference.mjs`
rebuilds them on every `npm run dev` and `npm run build` from two files:

| File | Holds |
|---|---|
| `src/data/cli-structure.json` | The names of every `linscp-cli` command, alias, switch and option, read from the program |
| `src/data/cli.yaml` | Our own summary, syntax, explanation and examples for each of them |

To change what a reference page says, edit `cli.yaml`. After a linscp release
that adds or removes commands or switches, refresh the names and check that
`cli.yaml` covers them:

```sh
LINSCP_CLI=/path/to/linscp-cli npm run refresh:cli
npm run check:cli
```

The check fails if the program has something `cli.yaml` does not describe, or
the other way round. The program's own help text is never published: it is
WinSCP's wording, so only the names are taken from it.

Every push to `main` deploys the site to GitHub Pages.

## Licence of contributions

Manual and site text is published under CC BY-SA 4.0, and the website's code
under GPL-3.0-or-later. By sending a change you agree to license it under those
terms. See [licence and credits](../../about/license-and-credits/).
