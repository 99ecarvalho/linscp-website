---
title: Comparing and synchronized browsing
description: Highlight files that differ between the two panels, and make both panels follow each other through a directory tree.
sidebar:
  order: 2
---

Two Commander features help when a local and a remote tree should look alike.
**Compare Directories** marks what differs in the open folders. **Synchronize
Browsing** moves the other panel along whenever you change folder in one.
Neither one transfers files.

## Compare the open directories

1. Open the two directories you want to compare, one in each panel.
2. Choose **Commands › Compare Directories** or press
   <kbd>Shift</kbd>+<kbd>F2</kbd>.

linscp selects, in each panel, the files that are missing on the other side or
that are the newer copy of a pair. If both folders hold the same files, a
message says no differences were found and nothing is selected.

The comparison looks only at the files in the two open folders. Subfolders
are neither entered nor marked. The selection is ordinary, so you can press
<kbd>F5</kbd> next to copy the marked files across. For a recursive comparison
with a list of planned changes, use
[Synchronize](../synchronize/) with **Preview changes**.

### Choose the criteria

What counts as different is set in **Options › Preferences › Commander**,
under **Compare directory criteria**:

- **Compare by time**: of two files with the same name, the one with the
  later modification time is marked. Times are compared at the precision the
  less exact side offers.
- **Compare by size**: when the times match, or time is not compared, files
  of unequal size are marked on both sides.

With both off, only files present on one side are marked.

## Synchronized browsing

Turn on **Commands › Synchronize Browsing**, or press
<kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>B</kbd>. The status bar confirms the
change. Press the same keys again to turn it off.

While it is on, every move in one panel is repeated in the other, relative to
the folders that were open when you switched it on:

- Enter `css` on the local side, and the remote panel enters its own `css`.
- Go up a level, and the other panel goes up too.

This works as long as the two trees share their layout below the starting
point. When the matching folder does not exist on the other side, linscp asks
whether to create it. Answer **No** and synchronized browsing turns itself off.

:::tip
Start synchronized browsing from the roots of the two trees, for example
`/home/alice/site` and `/var/www/html`. The relative moves then line up from
the first click.
:::

## Related tasks

- Copy the differences: [Synchronizing directories](../synchronize/).
- Keep a server copy current while you edit locally:
  [Keeping a remote directory up to date](../keep-up-to-date/).
- Select files by mask instead:
  [Selecting, filtering and finding](../../files/select-filter-find/).
