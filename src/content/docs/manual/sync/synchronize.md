---
title: Synchronizing directories
description: Make a local and a remote directory match, in one direction or both, and review the changes first.
sidebar:
  order: 1
---

Synchronization compares a local directory with a remote one and transfers
only what differs. Use it to publish a site, to back up a server directory, or
to bring two copies back in line after working on both.

## Start a synchronization

1. Open the local directory in the local panel and the remote directory in the
   remote panel.
2. Choose **Commands › Synchronize...** or press <kbd>Ctrl</kbd>+<kbd>S</kbd>.
3. Check the two paths under **Directories**. You can type other paths or pick
   a local one with **Browse...**.
4. Pick the direction, the mode and the options (described below).
5. Click **OK**.

linscp first scans both trees. A small window shows the local and remote
directory being compared and lets you cancel or minimize. When nothing differs,
linscp tells you and stops.

## Direction

The **Direction/Target directory** group says which side gets changed:

- **Remote** uploads, so the server ends up like your computer.
- **Local** downloads, so your computer ends up like the server.
- **Both** copies newer files each way. Only the modification time decides,
  so file size, mirror mode and deleting are not available.

Unless you saved your options, linscp proposes the side opposite to the
active panel: with the local panel focused, the target is **Remote**.

## Mode

- **Synchronize files** copies files that are new or newer on the source side.
- **Mirror files** copies every file that differs, even when the target copy
  is newer. Use it when the source is the reference and must win.
- **Synchronize timestamps** transfers nothing. It sets the target files'
  modification times to the source's, for files that exist on both sides.
  It is offered only when the protocol can set times on the server.

## Options and criteria

Under **Synchronize options**:

- **Delete files** removes files on the target that the source does not have.
- **Selected files only** limits the run to the files and folders you selected
  in the panels before opening the dialog.
- **Existing files only** updates files already on the target and never adds
  new ones.
- **Preview changes** shows the checklist (below) before anything is copied.

Under **Comparison criteria**, choose what makes two files differ:
**Modification time**, **File size**, **Checksum** (only for protocols that
can compute one on the server) and **Case sensitive** name matching.

The transfer settings box at the bottom works as in the copy dialog; see
[transfer settings](../../transfers/transfer-settings/). Check **Use same
options next time** to keep your choices.

:::caution
**Delete files** together with the wrong direction removes data. Turn on
**Preview changes** until you trust a setup.
:::

## Review the checklist

With **Preview changes** on, the **Synchronization checklist** lists every
planned action: upload new, download new, upload update, download update,
delete remote, delete local. For each file you see name, sizes and dates on
both sides.

- Clear a row's check box to skip that action. **Check All** and
  **Uncheck All** act on the whole list.
- **Reverse** turns the selected actions around, for example an upload into a
  download.
- The right-click menu can also check or uncheck everything in one directory,
  open the local directory, and copy either directory's path.
- **Tools** has **Calculate** and **Calculate All** for folder sizes, plus
  **Move** and **Find Move Candidate** to turn a delete and an upload of the
  same file into a single remote move.
- **Start** runs the actions now. **Start in Background** hands them to the
  [queue](../../transfers/queue/) so you can keep working.

The status line under the list counts the checked actions of each kind.

## From a script

`linscp-cli` has the same feature as the `synchronize` script command, with
the same directions and criteria. See
[script commands](../../reference/commands/) for the switches.

For a quick look at what differs, without copying anything, use
[Compare Directories](../compare-and-browse/). To push changes as they
happen, use [Keep Remote Directory up to Date](../keep-up-to-date/).
