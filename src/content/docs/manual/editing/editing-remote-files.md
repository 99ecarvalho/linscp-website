---
title: Editing remote files
description: Open a file on the server in an editor, and let linscp upload it again every time you save.
sidebar:
  order: 1
---

You can edit a file on the server without downloading and uploading it by
hand. linscp fetches a temporary copy, opens it in an editor, and sends the
copy back to the server whenever you save.

## Edit a file

1. Select the file in the remote panel.
2. Press <kbd>F4</kbd>, or choose **Edit** from the file's context menu or the
   **Files** menu.

linscp picks the editor from the list in **Options › Preferences › Editors**:
the first entry whose mask matches the file name wins. See
[internal and external editors](../editors/).

To choose an editor for this file only, use **Edit With** instead. Its submenu
lists the configured editors; **Edit With...** at the bottom lets you name
another program and, with **Remember this editor**, add it to the list.

If you are already editing that file in an external editor, linscp opens its
existing copy again rather than downloading a second one.

To start a new file on the server, use **Files › New › File...**, type a
name, and edit it the same way.

## What happens on save

- **Internal editor**: **File › Save** writes the copy and uploads it.
  **Save All** does this for every open editor window.
- **External editor**: linscp checks the temporary copy about once a second.
  When its modification time changes, linscp uploads it. Each save in the
  editor therefore produces one upload.
- **Associated application**: handled like an external editor, opened with
  your desktop's default program for that file type.

Uploads use the current [transfer settings](../../transfers/transfer-settings/).
An external editor entry can force text mode, which converts line endings; see
[text and binary modes](../../transfers/text-and-binary/).

:::caution
linscp does not track the external editor's process. It keeps watching the
copy until the session closes, so close the editor before you disconnect.
Saves made after that stay on your computer only.
:::

### Protect against overwriting others' changes

With **Check that edited remote file has not changed before saving it**
(**Preferences › Editors**), linscp compares the server file's time with the
time it had when you opened it. If someone changed it meanwhile, you are asked
before your copy replaces theirs.

## Where the temporary copies go

Copies are kept in a fresh folder under the system temporary directory
(`$TMPDIR`, or `/tmp`), one per edited file. When the session closes and its
queue is empty, linscp deletes those folders.

You can change this in **Options › Preferences › Storage**, under
**Temporary directory**:

- **Use this directory** puts the copies somewhere else, for example on a
  faster or encrypted disk.
- **Append session name to temporary path** and **Append remote path to
  temporary path** make the copy's location show where it came from. Some
  editors display that path in their title bar.
- The **deterministic paths** option reuses one fixed path for each remote
  file, which helps editors that remember per-file state.
- **Cleanup obsolete temporary directories on startup** removes folders left
  behind by a crash, optionally after asking.

See [configuration storage](../../preferences/storage-and-config/) for the
other settings on that page.

:::note
The temporary copy is an ordinary local file. Anyone who can read your
temporary directory can read it while you edit.
:::
