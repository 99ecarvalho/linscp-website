---
title: Selecting, filtering and finding
description: Select files by mask, hide what you do not need, and search a remote directory tree.
sidebar:
  order: 2
related:
  - manual/files/navigating
  - manual/files/managing-files
---

Most commands act on the selected files. linscp lets you pick files one by
one, select whole groups by a mask, narrow a panel to the files you care
about, and search a remote tree for matching names.

## Select files

- Click a file, then <kbd>Ctrl</kbd>+click or <kbd>Shift</kbd>+click to add
  more.
- Press <kbd>Insert</kbd> to toggle the file under the cursor and move down.
- Press <kbd>Ctrl</kbd>+<kbd>A</kbd> to select everything.
- On the numeric keypad, <kbd>*</kbd> inverts the selection.

The **Mark** menu has the rest: **Select All**, **Invert Selection**,
**Clear Selection**, and **Select Files with Same Extension** (or
**Unselect Files with Same Extension**) for the file under the cursor.

If you clear a selection by mistake, **Mark › Restore Selection**
(<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>S</kbd>) brings it back.

## Select by mask

1. Press keypad <kbd>+</kbd>, or choose **Mark › Select Files...**.
2. Type a **File mask**, such as `*.php` or `*.log; *.tmp`.
3. Tick **Apply to directories** if folders that match should be selected
   too.
4. Click **OK**.

Keypad <kbd>-</kbd> (**Mark › Unselect Files...**) removes matching files
from the selection instead. **Edit...** opens a mask editor with separate
include and exclude boxes for files and directories, and **mask hints**
shows the syntax. The full rules are in [File masks](../../reference/masks/).

## Filter a panel

A filter hides every file that does not match a mask, until you clear it.

1. Choose **Filter...** in the panel's menu, or press
   <kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>F</kbd>.
2. Enter a mask, for example `*.jpg; *.png`.
3. Click **OK**.

To show everything again, open the filter, click **Clear**, then **OK**.
The filter applies only to the panel you set it on.

## Jump to a name

Start typing while a file list has focus and the cursor moves to the first
name that matches. <kbd>Ctrl</kbd>+<kbd>F</kbd> starts the same search
explicitly. **Options › Preferences › Panels** sets whether typed text
matches the start of a name or any part of it.

## Find files on the server

1. Choose **Commands › Find Files...** (<kbd>Alt</kbd>+<kbd>F7</kbd>; it is
   <kbd>F3</kbd> when **Keyboard shortcuts** on the **Commander** page of
   Preferences is set to **Explorer**).
2. Set **File mask** to what you look for, for example `*.conf`.
3. Set **Search in** to the directory to start from. Subdirectories are
   searched too.
4. Click **Start**. Results appear as they are found; click **Stop** to end
   early.

**Edit...** next to the mask opens the mask editor, where you can add
exclusions for files and directories.

With files selected in the result list you can:

- **Focus** – show the file in the remote panel.
- **Edit...** – open it in the editor.
- **Download...** or **Delete**.
- **Copy Results** – put the list of paths on the clipboard.

Searching walks the whole tree over the connection, so a search from `/` on
a large server can take a long time.
