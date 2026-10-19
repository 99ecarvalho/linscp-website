---
title: Keeping a remote directory up to date
description: Watch a local directory and upload each change to the server as soon as it happens.
sidebar:
  order: 3
---

**Keep Remote Directory up to Date** turns linscp into a one-way live mirror.
It watches a local directory and, each time a file there is created, changed,
renamed or removed, makes the same change in the remote directory. This suits
a workflow where you edit a site or a program locally and test it on a server.

Changes travel only from your computer to the server. Edits made on the server
are not copied back.

## Start watching

1. Open the local directory in the local panel and its remote counterpart in
   the remote panel.
2. Choose **Commands › Keep Remote Directory up to Date...** or press
   <kbd>Ctrl</kbd>+<kbd>U</kbd>.
3. Check the two paths. The first box is the folder to watch; the second is
   where its changes go.
4. Set the options (below), then click **Start**.

The dialog title changes to show that watching is active, and the dialog lists
what it uploads. Leave it open while you work.

- **Stop** ends watching and keeps the dialog open.
- **Minimize** hides the window; its drop-down can instead send it to the
  system tray.
- **Close** stops and closes the dialog.

The arrow beside **Start** offers **Start in New Window**, which runs the
watch in a separate linscp window so the main one stays free for other work.

## Options

- **Delete files**: when you delete a local file, delete the remote one too.
- **Existing files only**: update only files that already exist on the server;
  new local files are ignored.
- **Update subdirectories**: watch the whole tree, not just the top folder.
- **Selected files only**: limit watching to what you selected in the panels.
  This option rules out **Start in New Window**.
- **Synchronize on start**: run a full upload synchronization before watching
  begins, so both sides start equal. In its third, grayed state linscp asks
  you each time.
- **Continue on error**: keep watching after a failed upload instead of
  stopping.

The transfer settings box below the options applies to every upload; see
[transfer settings](../../transfers/transfer-settings/). Check **Use same
options next time** to keep the options.

## How changes are detected

On Linux linscp uses the kernel's inotify interface, with one watch for each
folder. New folders are watched as they appear. On Windows one recursive watch
covers the tree. A burst of changes, such as a build writing many files, is
collected for a moment and then uploaded together.

:::tip
A very large tree can run out of inotify watches. If linscp reports that a
folder cannot be watched, raise the limit, for example with
`sudo sysctl fs.inotify.max_user_watches=524288`, or watch a smaller folder.
:::

## Without the dialog

- Start linscp with the `/keepuptodate` switch and a session URL to open the
  dialog for given directories; add `/defaults` to start at once.
- In scripts, `linscp-cli` has the `keepuptodate` command. See
  [script commands](../../reference/commands/).

For a one-off comparison instead of a live watch, use
[Synchronize](../synchronize/).
