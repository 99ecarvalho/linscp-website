---
title: Keyboard shortcuts
description: The keys linscp responds to in the main window, the file panels, the editor and the dialogs.
sidebar:
  order: 31
related:
  - manual/reference/masks
---

This page lists the keys that linscp defines. Keys the desktop or Qt
provide everywhere, such as moving around a list with the arrow keys, are
left out.

The main window has two key sets. **Commander** keys, the default, follow
the classic two-panel file managers and lean on the function keys.
**Explorer** keys follow desktop file managers. Pick one under
**Options › Preferences › Commander › Keyboard shortcuts**. Where the two
differ, the tables give both.

## Files

| Action | Commander | Explorer keys |
|---|---|---|
| **Edit** | <kbd>F4</kbd> | <kbd>F4</kbd> |
| **Copy** (transfer to the other panel) | <kbd>F5</kbd> | <kbd>Ctrl</kbd>+<kbd>K</kbd> |
| **Move** (transfer and delete the source) | <kbd>F6</kbd> | <kbd>F6</kbd> |
| **Duplicate** | <kbd>Shift</kbd>+<kbd>F5</kbd> | <kbd>Shift</kbd>+<kbd>F5</kbd> |
| **Move To** | <kbd>Shift</kbd>+<kbd>F6</kbd> | <kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>M</kbd> |
| **Rename** | <kbd>F2</kbd> | <kbd>F2</kbd> |
| **Create directory** | <kbd>F7</kbd> | <kbd>F7</kbd> |
| **Delete** | <kbd>F8</kbd> or <kbd>Delete</kbd> | <kbd>F8</kbd> or <kbd>Delete</kbd> |
| **Properties** | <kbd>F9</kbd> | <kbd>Alt</kbd>+<kbd>Enter</kbd> |
| **Edit Link** | <kbd>Alt</kbd>+<kbd>F6</kbd> | <kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>L</kbd> |
| **Find Files** | <kbd>Alt</kbd>+<kbd>F7</kbd> | <kbd>F3</kbd> |
| **Calculate Directory Sizes** | <kbd>Shift</kbd>+<kbd>Alt</kbd>+<kbd>Enter</kbd> | same |
| **Copy to Clipboard** / **Paste from Clipboard** | <kbd>Ctrl</kbd>+<kbd>C</kbd> / <kbd>Ctrl</kbd>+<kbd>V</kbd> | same |
| Insert the selected names into the command line | <kbd>Ctrl</kbd>+<kbd>Enter</kbd> | same |

In the local panel, <kbd>Shift</kbd>+<kbd>Delete</kbd> or
<kbd>Shift</kbd>+<kbd>F8</kbd> does the opposite of your recycle bin
setting: it deletes for good when deleting normally uses the trash, and the
other way round.

## Navigation

| Action | Keys |
|---|---|
| Switch between the panels | <kbd>Tab</kbd> |
| Parent directory | <kbd>Backspace</kbd>, <kbd>Alt</kbd>+<kbd>Up</kbd> or <kbd>Ctrl</kbd>+<kbd>Page Up</kbd> |
| Back / forward in the panel's history | <kbd>Alt</kbd>+<kbd>Left</kbd> / <kbd>Alt</kbd>+<kbd>Right</kbd> |
| Root directory | <kbd>Ctrl</kbd>+<kbd>\\</kbd> |
| Home directory | <kbd>Ctrl</kbd>+<kbd>H</kbd> |
| Refresh | <kbd>Ctrl</kbd>+<kbd>R</kbd> (Explorer keys: <kbd>F5</kbd>) |
| **Open Directory/Bookmark** | <kbd>Ctrl</kbd>+<kbd>O</kbd> |
| **Add Path to Bookmarks** | <kbd>Ctrl</kbd>+<kbd>B</kbd> |
| **Path from Other Panel** | <kbd>Ctrl</kbd>+<kbd>.</kbd> |
| Open the local directory in your file manager (**Explore Directory**) | <kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>E</kbd> |
| Pick another path for the local / remote panel | <kbd>Alt</kbd>+<kbd>F1</kbd> / <kbd>Alt</kbd>+<kbd>F2</kbd> |
| Copy the local / remote path to the clipboard | <kbd>Ctrl</kbd>+<kbd>[</kbd> / <kbd>Ctrl</kbd>+<kbd>]</kbd> |
| Focus the address bar | <kbd>Ctrl</kbd>+<kbd>L</kbd> or <kbd>Alt</kbd>+<kbd>D</kbd> |
| Focus the directory tree | <kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>T</kbd> |
| Focus the command line | <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>M</kbd> |
| Search the file list as you type | <kbd>Ctrl</kbd>+<kbd>F</kbd> |

While searching, <kbd>Backspace</kbd> removes the last character and
<kbd>Esc</kbd> ends the search.

## Selecting and sorting

| Action | Keys |
|---|---|
| Select or unselect the current file | <kbd>Insert</kbd> |
| **Select Files** / **Unselect Files** by [mask](../masks/) | <kbd>+</kbd> / <kbd>-</kbd> on the numeric keypad |
| **Invert Selection** | <kbd>*</kbd> on the numeric keypad |
| **Clear Selection** | <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>L</kbd> |
| **Restore Selection** | <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>S</kbd> |
| Sort by name, modification time, size | <kbd>Ctrl</kbd>+<kbd>F3</kbd>, <kbd>Ctrl</kbd>+<kbd>F5</kbd>, <kbd>Ctrl</kbd>+<kbd>F6</kbd> |
| Sort by permissions, owner, group | <kbd>Ctrl</kbd>+<kbd>F7</kbd>, <kbd>Ctrl</kbd>+<kbd>F8</kbd>, <kbd>Ctrl</kbd>+<kbd>F9</kbd> |

Pressing a sort key again reverses the order.

## Commands, view and tabs

| Action | Keys |
|---|---|
| **Synchronize** | <kbd>Ctrl</kbd>+<kbd>S</kbd> |
| **Keep Remote Directory up to Date** dialog | <kbd>Ctrl</kbd>+<kbd>U</kbd> |
| **Compare Directories** | <kbd>Shift</kbd>+<kbd>F2</kbd> |
| **Synchronize Browsing** on or off | <kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>B</kbd> |
| **Open Terminal** | <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>T</kbd> |
| **Open in PuTTY** | <kbd>Ctrl</kbd>+<kbd>P</kbd> |
| **Process Queue** on or off | <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>Q</kbd> |
| **Show Hidden Files** on or off | <kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>H</kbd> |
| Refresh the remote panel after each operation, on or off | <kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>R</kbd> |
| **Filter** | <kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>F</kbd> |
| **Preferences** | <kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>P</kbd> |
| New remote tab (opens the Site Manager) | <kbd>Ctrl</kbd>+<kbd>N</kbd> |
| **Close Tab** | <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>D</kbd> |
| Next / previous tab | <kbd>Ctrl</kbd>+<kbd>Tab</kbd> / <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>Tab</kbd> |
| **Help › Contents** | <kbd>F1</kbd> |
| **Quit** | <kbd>F10</kbd> |

## Explorer interface

The single-panel Explorer interface replaces some of the keys above:

| Action | Keys |
|---|---|
| New directory | <kbd>Ctrl</kbd>+<kbd>D</kbd> |
| New file | <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>E</kbd> |
| Edit | <kbd>Ctrl</kbd>+<kbd>E</kbd> |
| Copy / move (download) | <kbd>Ctrl</kbd>+<kbd>T</kbd> / <kbd>Ctrl</kbd>+<kbd>M</kbd> |
| Move To | <kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>M</kbd> |
| Edit Link | <kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>L</kbd> |
| Delete | <kbd>Delete</kbd> |
| Properties | <kbd>Alt</kbd>+<kbd>Enter</kbd> |
| Refresh | <kbd>F5</kbd> |
| Find Files | <kbd>F3</kbd> |
| Quit | <kbd>Alt</kbd>+<kbd>F4</kbd> |

## Internal editor

| Action | Keys |
|---|---|
| Save / save all | <kbd>Ctrl</kbd>+<kbd>S</kbd> / <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>S</kbd> |
| Reload from disk | <kbd>Ctrl</kbd>+<kbd>R</kbd> |
| Close | <kbd>Esc</kbd> or <kbd>F10</kbd> |
| Undo / redo | <kbd>Ctrl</kbd>+<kbd>Z</kbd> / <kbd>Ctrl</kbd>+<kbd>Y</kbd> |
| Find / find next / replace | <kbd>Ctrl</kbd>+<kbd>F</kbd> / <kbd>F3</kbd> / <kbd>Ctrl</kbd>+<kbd>H</kbd> |
| Go to line | <kbd>Ctrl</kbd>+<kbd>G</kbd> |

Cut, copy, paste and select all use the usual <kbd>Ctrl</kbd>+<kbd>X</kbd>,
<kbd>C</kbd>, <kbd>V</kbd> and <kbd>A</kbd>.

## Dialogs

**Site Manager**

| Action | Keys |
|---|---|
| Search the site list | <kbd>Ctrl</kbd>+<kbd>F</kbd> |
| Fill the form from a session URL on the clipboard | <kbd>Ctrl</kbd>+<kbd>V</kbd> |
| Open the selected site in PuTTY | <kbd>Ctrl</kbd>+<kbd>P</kbd> |
| Save the site under a new name | <kbd>Alt</kbd>+<kbd>A</kbd> |

**Find Files**: <kbd>F4</kbd> edits the found file, <kbd>F5</kbd> downloads
it and <kbd>Delete</kbd> deletes it.

**Synchronization checklist**: <kbd>Alt</kbd>+<kbd>Enter</kbd> calculates the
size of the selected directories and
<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>Alt</kbd>+<kbd>Enter</kbd> of all of
them. <kbd>F6</kbd> turns a selected upload and delete into a move, and
<kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>F6</kbd> looks for a match to move.
<kbd>Ctrl</kbd>+<kbd>A</kbd> selects every item.

**Preferences**: <kbd>Ctrl</kbd>+<kbd>F</kbd> moves to the search box.

Lists you can edit in place, such as custom commands in **Preferences** and
tags in **Properties**, take <kbd>Insert</kbd> to add an item and
<kbd>Delete</kbd> to remove one.
