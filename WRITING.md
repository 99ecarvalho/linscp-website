# Writing the linscp manual

Rules for anyone (human or tool) adding pages under `src/content/docs/manual/`.

## The one hard rule

**Write every sentence yourself.** WinSCP's manual and FileZilla's wiki are
good sources of *facts* and *topics*. Read them, close them, then explain the
topic in your own words. Never copy or lightly rephrase a sentence, a table, or
an example. The same goes for the text that `linscp-cli` prints for `/help` and
`help <command>`: that text is WinSCP's, so only command and switch *names* may
be taken from it.

Before you commit, run the overlap check (it flags any 8-word run shared with
those sources). Fix every hit that is not a fixed technical phrase, such as a
command line or a protocol name.

## Licence

Everything you write here is published under CC BY-SA 4.0 (`LICENSE-docs`).
That is one more reason the text must be your own: you can only license what
you wrote.

## Voice

- Concise. One idea per sentence. Cut what the reader does not need to act.
- Second person, present tense, active voice: "Open the Site Manager", not
  "The Site Manager can be opened".
- Plain words. "Use", not "utilize". No marketing adjectives.
- Explain *why* only when it changes what the reader does.
- Linux first, Windows second. When steps differ, use tabs (see below).
- Name UI elements in **bold**, exactly as linscp shows them. Menu paths use
  `›`: **Options › Preferences › Logging**.
- Keys: <kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>S</kbd>.
- Commands, paths, file names, switches and config keys in `code`.
- Example paths are POSIX: `/home/alice/site`, `/var/www/html`. Windows
  examples use `C:\Users\alice\site` and appear only in Windows tabs.
- Example hosts: `example.com`, `files.example.org`. Users: `alice`, `deploy`.
  Never real-looking IPs; use `192.0.2.10` (documentation range).

## Only claim what linscp does

Check the claim against the linscp code (`/dados/PROGRAMS/linscp/port/`),
`doc/qt/gaps.md`, `doc/qt/TRACKER.md` or by running the program. When a
WinSCP feature is missing or Windows-only in linscp, say so in one line
(`:::note[Windows only]`). Known limits are listed in
`website/MANUAL-OUTLINE.md` → *Must-not-claim list*.

## Page format

```md
---
title: Verifying host keys          # sentence case, ≤ 6 words
description: One sentence, ≤ 20 words, shown under the title and in search.
sidebar:
  order: 3                           # position inside its group
related:                             # optional, 2–4 page ids, no leading slash
  - manual/connecting/ssh-keys
  - manual/security/overview
sources:                             # optional: external specs, man pages, RFCs
  - label: RFC 4251, SSH protocol architecture
    href: https://www.rfc-editor.org/rfc/rfc4251
---

Opening paragraph: what this page lets you do, in two or three sentences.

## Task-shaped heading

Numbered steps for procedures, bullets for options, a table when comparing.
```

- Headings: `##` and `###` only, sentence case, no trailing punctuation.
- Length: most pages 250–700 words. Split a page that passes 1,200.
- Every page links to at least one other manual page.
- Links between manual pages are relative and end with `/`:
  `[host keys](../host-keys/)`, `[scripting](../../scripting/introduction/)`.
- Do not link to winscp.net for things this manual explains. Link to it only
  for the WinSCP .NET API reference.

## Starlight features you may use

Asides:

```md
:::tip
Short, optional advice.
:::

:::caution
Something that can lose data or weaken security.
:::

:::note[Windows only]
The feature does not exist on Linux.
:::
```

Tabs (the file must be `.mdx`):

```mdx
import { Tabs, TabItem } from '@astrojs/starlight/components';

<Tabs syncKey="os">
  <TabItem label="Linux">…</TabItem>
  <TabItem label="Windows">…</TabItem>
</Tabs>
```

Screenshots go in `src/assets/screenshots/` and are referenced with a
relative path: `![The Site Manager](../../../../assets/screenshots/site-manager.png)`.

## Generated pages

`manual/reference/commands/*` and `manual/reference/linscp-cli-switches.md` are
produced by `scripts/gen-cli-reference.mjs`. Do not edit them; edit
`src/data/cli.yaml`. The script fails if linscp-cli gains a command, switch or
option that `cli.yaml` does not describe.
