---
title: Interface, window and panels
description: Choose the Commander or Explorer layout, the theme and icons, and how the file panels list and sort files.
sidebar:
  order: 2
---

These pages control what linscp looks like and how its file lists behave. All
of them are under **Options › Preferences**. For a tour of the window itself,
see [the interface tour](../../getting-started/interface-tour/).

## Interface

- **User Interface**: **Commander** shows a local and a remote panel side by
  side. **Explorer** shows only the remote panel, with its folder tree beside
  it. The switch takes effect at the next start.
- **Interface theme**: **Automatic** follows your desktop's light or dark
  scheme; **Light** and **Dark** fix it. This one applies at once.

## Window

- **Path in window title**: full path, the last folder only, or nothing.
- **Miscellaneous**:
  - Minimize to the system tray instead of the taskbar.
  - Open sessions started from outside (a link, a desktop entry) in the
    window that is already running.
  - Show the Login dialog at startup and when the last session closes, or
    keep the main window open with no session.
  - Stay quiet when an idle session drops, and shorten tab titles that do
    not fit.
- **Workspaces**: save the open tabs as a workspace when you quit, under a
  default name, optionally with passwords. Another option connects every
  session of a workspace or site folder when you open it. See
  [tabs and workspaces](../../connecting/workspaces-and-tabs/).
- **Icons**: choose the **Icon set** for toolbars and menus.

:::caution
**Save passwords** in a workspace stores them in your configuration. Protect
them with a [master password](../../security/master-password/).
:::

## Commander and Explorer

The **Commander** page applies only to the two-panel layout:

- **Explorer-style selection**: **Never**, **Mouse only** or **Mouse and
  Keyboard** decides whether clicks and arrow keys select files the way a
  file manager does.
- **Swap panels** puts the remote side on the left.
- **Show directory tree left of file list** places each panel's tree beside
  its list instead of above it.
- **Keyboard shortcuts**: Commander-style or Explorer-style key bindings.
- **Use Location Profiles instead of Directory Bookmarks**; see
  [navigating](../../files/navigating/).
- **Compare directory criteria**; see
  [comparing directories](../../sync/compare-and-browse/).

The **Explorer** page has one option: show the full path in the address bar.

## Panels

The **Panels** page covers both sides:

- Show hidden files (<kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>H</kbd> toggles it
  at any time).
- Start in your home folder, and remember each panel's state when switching
  tabs.
- When renaming, select the whole name instead of only the part before the
  extension.
- Full row select, natural number sorting (`file2` before `file10`), and
  folders always sorted by name.
- File sizes in bytes, kilobytes or a short form such as `1.5 MB`.
- **Incremental search**: what typing in a list matches: the start of a name,
  any part of it, or any column.
- **Double-click**: open, copy or edit the file, with an optional
  confirmation before copying.
- **Panel font**: a custom font for the file lists.

Sorting of names with accents or other non-ASCII letters can differ from
WinSCP's.

### Remote

- **Show inaccessible directories** lists folders you cannot enter.
- **Automatically refresh directory after operation** reloads the list after
  each change (<kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>R</kbd>).
- **Refresh remote panel every** reloads it on a timer, in seconds.

Directory caching is set per site, under **Directories** in the advanced site
settings: [advanced site settings](../../connecting/advanced-site-settings/).

### Local

- **Do not change state when switching sessions** keeps the local folder when
  you change tabs.
- **Delete files to recycle bin** moves deleted local files to the desktop
  trash instead of removing them.
- On Windows only, **Use system file context menu** shows Explorer's menu.

### File colors

Give file names a colour by mask, for example red for `*.log`. Add rules with
**Add...**, set the mask and pick a colour. The first matching rule wins, so
order them with **Up** and **Down**.
