---
title: Navigating
description: Move between directories with the path box, history, bookmarks and location profiles.
sidebar:
  order: 1
related:
  - manual/files/select-filter-find
  - manual/files/managing-files
---

Each panel shows one directory at a time. This page covers the ways to get
from one directory to another: typing a path, walking up and down the tree,
going back through your history, and jumping to saved places.

![The Commander interface with a local and a remote panel](../../../../assets/screenshots/commander.png)

## Move around with the keyboard and mouse

- Double-click a directory, or select it and press <kbd>Enter</kbd>, to open it.
- Press <kbd>Backspace</kbd>, <kbd>Alt</kbd>+<kbd>Up</kbd> or
  <kbd>Ctrl</kbd>+<kbd>PgUp</kbd> to go to the parent directory.
- Press <kbd>Ctrl</kbd>+<kbd>\\</kbd> for the root directory and
  <kbd>Ctrl</kbd>+<kbd>H</kbd> for your home directory.
- Press <kbd>Ctrl</kbd>+<kbd>R</kbd> to reload the listing.
- Press <kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>H</kbd> to show or hide hidden
  files.

The same commands sit in the panel's menu (**Local** or **Remote**) under
**Go To**.

## Type a path

The box above each file list shows the current path. To go somewhere else:

1. Press <kbd>Ctrl</kbd>+<kbd>L</kbd> (or <kbd>Alt</kbd>+<kbd>D</kbd>).
   In the Commander interface this opens the **Open Directory/Bookmark**
   dialog; in the Explorer interface it puts the cursor in the address bar.
2. Type the path, for example `/var/www/html`, and press <kbd>Enter</kbd>.

**Remote › Change Directory** (<kbd>Alt</kbd>+<kbd>F2</kbd>) and
**Local › Change Drive** (<kbd>Alt</kbd>+<kbd>F1</kbd>) open a list of
recent and well-known locations for that panel.

## Go back and forward

<kbd>Alt</kbd>+<kbd>Left</kbd> and <kbd>Alt</kbd>+<kbd>Right</kbd> step
through the directories you visited in that panel. The **Back** and
**Forward** toolbar buttons have a drop-down arrow that lists up to ten
earlier directories; pick one to go straight there.

## Bookmarks

A bookmark is a saved directory path for one side, local or remote.

- **Add Path to Bookmarks** (<kbd>Ctrl</kbd>+<kbd>B</kbd>) saves the
  current directory.
- **Open Directory/Bookmark...** (<kbd>Ctrl</kbd>+<kbd>O</kbd>) shows your
  bookmarks. Double-click one to open it, or type a path in **Open
  directory**.

The dialog has two lists. **Site bookmarks** belong to the site you are
connected to. **Shared bookmarks** are available in every session. Use
**Add**, **Remove**, **Up** and **Down** to edit a list, and **Shortcut...**
to give a bookmark a key of its own. For a local path, **Browse...** opens a
folder picker.

## Location profiles

In the Commander interface you can save a *pair* of directories, one local
and one remote, as a location profile. Opening the profile moves both panels
at once, which is handy when a project lives in `/home/alice/site` locally
and `/var/www/site` on the server.

1. Open both directories in their panels.
2. In **Open Directory/Bookmark**, click **Location Profiles...**.
3. Click **Add...** and name the profile. The dialog keeps **Site Location
   profiles** for the current site apart from **Shared Location profiles**.

Profiles can be renamed, reordered, given a shortcut, or moved into a folder
with **Move To...**. To make <kbd>Ctrl</kbd>+<kbd>O</kbd> open profiles
directly, tick **Use Location Profiles instead of Directory Bookmarks** in
**Options › Preferences › Commander**.

## Other shortcuts

- **Explore Directory** (<kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>E</kbd>) opens
  the local directory in your desktop's file manager.
- **Copy Path to Clipboard** in the panel's menu copies the current path.
- In a local tab, **Path from Other Panel** (<kbd>Ctrl</kbd>+<kbd>.</kbd>)
  opens the other panel's directory in this one.
- **Commands › Synchronize Browsing** keeps the two panels in step; see
  [Comparing and synchronized browsing](../../sync/compare-and-browse/).
