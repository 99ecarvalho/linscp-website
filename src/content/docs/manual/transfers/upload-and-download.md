---
title: Uploading and downloading
description: Copy and move files between your computer and the server with keys, menus and the clipboard.
sidebar:
  order: 1
related:
  - manual/transfers/drag-and-drop
  - manual/transfers/transfer-settings
  - manual/transfers/queue
---

An upload copies files from your computer to the server; a download copies
them the other way. This page covers the keyboard and menu routes. For the
mouse, see [Drag and drop](../drag-and-drop/).

## Upload or download with the keyboard

In the Commander interface the two panels make this a two-step job:

1. In one panel, open the directory the files should go to.
2. In the other panel, select the files and press <kbd>F5</kbd>.

<kbd>F5</kbd> uploads from the local panel and downloads from the remote
one. <kbd>F6</kbd> *moves* instead: the files are transferred, then deleted
from where they came from.

The same commands are in the **Files** menu, under **Upload** or
**Download** depending on the active panel:

- **Upload...** / **Download...**
- **Upload in Background...** / **Download in Background...** – add the
  transfer to the [queue](../queue/) and keep working.
- **Upload and Delete...** / **Download and Delete...** – move the files.

In the Explorer interface there is no local panel. Use **Download...** to
pick a local directory, and the clipboard or drag and drop to upload.

## The copy dialog

Before the transfer starts, linscp shows a short dialog:

- The prompt names what you transfer, for example *Upload 'index.html' to
  remote directory:*.
- The target path is filled in with the other panel's directory. Edit it to
  send the files somewhere else. End it with a file name to rename a single
  file, or with a mask like `*.bak` to rename several.
- **Transfer settings** shows a summary of the settings that will apply.
  Pick a preset from the list or click **Transfer settings...** to change
  them for this transfer only. See
  [Transfer settings and presets](../transfer-settings/).
- **Transfer in background (add to transfer queue)** sends the job to the
  queue.
- **Do not show this dialog box again** skips the dialog from now on. Turn
  it back on under **Transferring of files** in the confirmations on
  **Options › Preferences › Environment**.

The button next to **OK** generates a `linscp-cli` script or .NET code that
does the same transfer, a quick way to start an
[automation script](../../scripting/introduction/).

## Use the clipboard

- To upload, copy files in your desktop's file manager, switch to linscp,
  activate the remote panel and press <kbd>Ctrl</kbd>+<kbd>V</kbd>.
- To download, select remote files, press <kbd>Ctrl</kbd>+<kbd>C</kbd>,
  then paste into a local panel.

## Copy between local panels

In a local tab both panels show your own disk. <kbd>F5</kbd> and
<kbd>F6</kbd> become **Copy...** and **Move...** and work the same way, with
no server involved.

## What happens to existing files

If a file with the same name exists at the target, linscp asks what to do.
See [Progress and overwrite prompts](../progress-and-overwrite/). To
transfer only what changed, tick **New and updated files only** in the
transfer settings, or use [synchronization](../../sync/synchronize/).

## Automating transfers

In scripts, the `put` and `get` commands upload and download. See
[scripting](../../scripting/introduction/).
