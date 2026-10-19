---
title: File and operation masks
description: Patterns that select files by name, path, size or age, and patterns that rename them.
sidebar:
  order: 30
related:
  - manual/reference/commands/get
  - manual/reference/commands/put
  - manual/reference/commands/synchronize
---

A *file mask* picks out files. You type one in the **Select Files** and
**Filter** dialogs, in the transfer settings, and in script commands such as
[`get`](../commands/get/) or the `-filemask` switch. An *operation mask*
does a different job: it decides the name a file gets at its destination.

## Wildcards

| Pattern | Matches | Example |
|---|---|---|
| `*` | any run of characters, also none | `report*.pdf` |
| `?` | exactly one character | `img_????.png` |
| `[abc]` | one of the listed characters | `v[123].txt` |
| `[a-z]` | one character in the range | `log-[0-9].gz` |

Every other character stands for itself. To match a literal `*`, `?` or `[`,
put it inside brackets: `notes[*].txt`.

Masks ignore letter case, so `*.JPG` also selects `photo.jpg`. The exception
is the wildcard in a local source of `put` or `lls`: linscp hands that one to
the file system, which on Linux tells upper and lower case apart.

Two forms behave specially. `*.*` matches every name, even one without a
dot. `*.` matches only names that have no extension.

## Size and age

Add a constraint right after the name part, without a space:

- `>500K`, `<2G`: larger or smaller than a size. Units are `K`, `M` and `G`;
  directories count as size zero.
- `>2026-01-01`, `<2026-03-31 18:00`: modified after or before a date, with
  an optional time.
- `>7D`, `<12H`: modified within, or longer ago than, a period. Units are
  `Y` years, `D` days, `H` hours, `N` minutes and `S` seconds. Add a second
  `S` to round down to the start of the unit: `>0DS` means since midnight.
  You can write `today` and `yesterday` for `0DS` and `1DS`.

Use `>=` and `<=` to include the limit. Chain several constraints for a
range: `*.log>=2026-01-01<2026-02-01`. In a script, put a mask that holds a
space inside double quotes. Directory masks take no constraints.

## Several masks, include and exclude

Separate masks with `;` or `,`: `*.html; *.css` selects both kinds.

A `|` splits the mask into an include part and an exclude part. Anything
the exclude part matches is left out, even when the include part matches it
too:

```text
*.php; *.inc | test_*; *.bak
```

Either part may be empty. `| *.tmp` takes everything except temporary
files. To use `;`, `,` or `|` literally, write it twice.

Lists and `|` work in `-filemask` and in the dialogs. The file names you
pass to commands such as `get` or `rm` accept only one simple mask each.

## Directories and paths

End a mask with `/` to make it match directories: `cache/` matches every
directory called `cache`, at any depth, and `*/` matches all of them. When
a transfer excludes a directory, linscp skips its whole contents without
looking inside. So `-filemask="|*/"` copies the files of the top directory
and nothing below it.

Put a path before the name to match by location:

- `*/logs/*.txt` matches text files in any directory called `logs`;
- `./build/` matches `build` at the root of the transfer or
  synchronization, wherever that root is;
- `/var/www/html/tmp/` matches that one directory only.

A full path is compared with the complete path of each file, never with a
path relative to the transfer root. For synchronization, prefer partial or
`./` paths, because a full path only exists on one of the two sides.

Excluding every file of a directory still creates the directory, empty, at
the target. In a script, the `ExcludeEmptyDirectories` raw transfer setting
avoids that; `-filemask` does not have this problem.

## Operation masks

When the last argument of `get`, `put`, `cp` or `mv` is not a plain name, it
works as an operation mask. linscp applies it to each file separately, to
the part before the last dot and to the extension in turn:

| Mask | `index.html` becomes |
|---|---|
| `*.bak` | `index.bak` |
| `*.html.orig` | `index.html.orig` |
| `old_*` | `old_index.html` |
| `?????.htm` | `index.htm` |
| `*.*` or `*` | `index.html` (unchanged) |

In an operation mask, `*` copies the rest of the original part and `?` copies
one character of it. Put `\` before `*`, `?` or `\` to write that character
literally. A mask that holds a directory as well works as both:
`/srv/archive/*.old` moves the files there and renames them.

For how commands pick their targets, see [`put`](../commands/put/) and
[`mv`](../commands/mv/).
