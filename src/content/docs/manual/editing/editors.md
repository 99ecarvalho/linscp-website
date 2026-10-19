---
title: Internal and external editors
description: Configure the built-in text editor, add your own editors, and decide which one opens which files.
sidebar:
  order: 2
---

linscp can open files in its own small text editor, in any program you name,
or in whatever your desktop associates with the file type. This page shows
how to set up that choice. For the edit-and-upload cycle itself, see
[editing remote files](../editing-remote-files/).

## The editor list

Open **Options › Preferences › Editors**. The **Editor preference** list has
one row per editor, with the file mask it applies to and whether it forces
text mode.

When you press <kbd>F4</kbd>, linscp walks the list from the top and uses the
first editor whose mask matches. Order matters: put specific entries, such as
one for `*.php`, above general ones. Use **Up** and **Down** to reorder, and
**Add...**, **Edit...** and **Remove** to manage entries.

A fresh configuration has two entries: the internal editor, then on Linux the
associated application (on Windows, Notepad).

**Check that edited remote file has not changed before saving it**, below the
list, protects against overwriting someone else's edit on the server.

## Add or change an editor

**Add...** and **Edit...** open a dialog with three choices:

- **Internal editor**: linscp's own window.
- **External editor**: a command line. Use **Browse...** to pick the program,
  or **Use default system editor** to fill in your desktop's text editor. On
  Linux linscp finds it with `xdg-mime query default text/plain` and takes the
  program from that application's desktop entry.
- **Associated application**: the program your desktop opens for this file
  type, launched the way a file manager would.

Then fill in **Use this editor for following files** with a mask, for example
`*.html;*.css;*.js`. Masks are explained in
[file and operation masks](../../reference/masks/).

For external editors, two more options apply when the file comes from a
server:

- **Force text transfer mode for files edited in external editor** converts
  line endings on the way down and back up. Leave it off for editors that cope
  with any line ending.
- The **separate window (process)** option records whether the program
  starts a new process for every file.

An example external command for Linux:

```
gedit --new-window
```

linscp adds the file name at the end when the command does not mention it.

## The internal editor

The internal editor is a plain-text window. Its menus offer:

- **File**: **Save**, **Save All**, **Reload** and **Close**.
- **Edit**: undo, redo and the clipboard commands.
- **Search**: **Find...**, **Replace...**, **Find Next** and **Go to Line
  Number...**. Find can match the whole word, match case and search upwards.
- **Encoding**: switch between UTF-8 and the system's default encoding, then
  reload the file in it.

The status bar shows line and column, the code of the character under the
cursor, the encoding, and whether the file has unsaved changes.

Set its look in **Options › Preferences › Editors › Internal editor**:

- **Wrap long lines**, **Tabulator size** and **Default encoding**.
- **Select font...**, **Text color** and **Default background**.
- **Warn when editing files larger than** a size you choose, so a huge log
  does not open by accident.

## One-off choices

**Files › Edit With** opens the selected file in a chosen editor without
changing the list. **Edit With...** asks for any program; tick **Remember this
editor** to append it to the list.

Local files open the same way from the local panel. No upload happens for
them, because the file you edit is the file itself.
