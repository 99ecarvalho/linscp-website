---
title: Managing files
description: Create, rename, delete, duplicate and move files and directories, and make links.
sidebar:
  order: 3
related:
  - manual/files/select-filter-find
  - manual/files/properties-and-permissions
  - manual/transfers/upload-and-download
---

Everything on this page works in both panels: on the remote server and on
your own disk. Select the files first (see
[Selecting, filtering and finding](../select-filter-find/)), then use the
**Files** menu, the context menu, or the keys below.

## Create files and directories

- **Files › New › Directory...** (<kbd>F7</kbd>) asks for a **New folder
  name**. On a remote panel you can also tick **Set permissions** and pick
  them; **Use same settings next time** keeps that choice.
- **Files › New › File...** asks for a name and opens the new, empty file in
  the editor. It is saved to the panel's directory when you save in the
  editor.

## Rename

Press <kbd>F2</kbd> to edit the name in place. Press <kbd>Enter</kbd> to
confirm or <kbd>Esc</kbd> to cancel. For files, only the part before the
extension is selected at first; tick **Select whole name when renaming
file** in **Options › Preferences › Panels** to select all of it.

## Delete

Press <kbd>Del</kbd> or <kbd>F8</kbd>, or choose **Files › Delete**. linscp
asks first unless you turned off **Deleting of files** under
**Confirmations** in **Options › Preferences › Environment**.

- **Local files** go to the desktop trash when **Delete files to recycle
  bin** is ticked in **Options › Preferences › Panels › Local**.
  <kbd>Shift</kbd>+<kbd>Del</kbd> does the opposite of that setting for one
  deletion.
- **Remote files** are deleted on the server for good, unless the site has a
  remote recycle bin. Set it under **Recycle bin** in the
  [advanced site settings](../../connecting/advanced-site-settings/).

:::caution
A remote delete cannot be undone from linscp. Check the selection before you
confirm, especially for directories, which are deleted with their contents.
:::

## Duplicate and move on the server

To copy or move files within the same server without downloading them:

1. Select the files in the remote panel.
2. Choose **Files › Duplicate...** (<kbd>Shift</kbd>+<kbd>F5</kbd>) or
   **Files › Move To...** (<kbd>Shift</kbd>+<kbd>F6</kbd>).
3. Enter the target directory. You can end it with a file name or a mask
   such as `*.bak` to rename on the way.
4. Click **OK**.

If you have more than one session open, **Target session** lets you copy to
another server. When the server cannot copy files itself, tick **Duplicate
via local temporary copy**: linscp downloads the files and uploads them
again.

Within one panel you can also drag files onto a directory to move them
there. linscp asks first.

## Links

On servers that support them (SFTP and SCP), and on your local disk, you can
create symbolic and hard links.

1. Choose **Files › New › Link...**.
2. Fill in **Link/shortcut file** (the name of the new link) and **Point
   link/shortcut to** (the existing file or directory).
3. Tick **Hard link** for a hard link instead of a symbolic one.

**Files › Edit Link...** changes the target of an existing link.

## Clipboard

**Files › Copy to Clipboard** (<kbd>Ctrl</kbd>+<kbd>C</kbd>) and **Paste
from Clipboard** (<kbd>Ctrl</kbd>+<kbd>V</kbd>) copy files between panels,
and to and from other programs. Pasting remote files into the same remote
directory opens the duplicate dialog. **Files › File Names** copies just the
names, with or without their paths.

## Directory sizes and locks

- **Files › Calculate Directory Sizes**
  (<kbd>Shift</kbd>+<kbd>Alt</kbd>+<kbd>Enter</kbd>) fills in the size
  column for the selected directories.
- **Files › Locking** locks or unlocks files on WebDAV servers that support
  it.
