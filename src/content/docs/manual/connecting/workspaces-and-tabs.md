---
title: Tabs and workspaces
description: Keep several sessions open in tabs, and save a set of tabs as a workspace to reopen in one step.
sidebar:
  order: 12
related:
  - manual/connecting/site-manager
  - manual/connecting/authentication
  - manual/security/master-password
---

linscp opens each connection in its own tab, so you can work on several
servers in one window. A workspace remembers a set of tabs, with their
directories, and reopens them together.

## Work with tabs

- **New remote tab**: <kbd>Ctrl</kbd>+<kbd>N</kbd>, or
  **Tabs › New Tab › Remote Tab...**, opens the Site Manager. The connection
  you make there gets a new tab.
- **New local tab**: **Tabs › New Tab › Local Tab** browses local folders in
  both panels. **Default to Remote Tab** in the same submenu decides whether the
  plain New Tab command opens a remote or a local tab.
- **Open a saved site directly**: pick it from **Tabs › Sites**.
- **Duplicate Tab** opens another tab on the same server and directory.
- **Switch tabs**: click them, or press <kbd>Ctrl</kbd>+<kbd>Tab</kbd> and
  <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>Tab</kbd>. **Tabs › Opened Tabs**
  lists them all.
- **Close Tab** (<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>D</kbd>) disconnects that
  session only.
- **Rename Tab** and **Color** help tell similar sessions apart. A color
  set on the site in [Advanced site settings](../advanced-site-settings/#note-and-color)
  is used automatically.
- **Reconnect Session** reopens a session that dropped.
- **Save Session as Site...** stores the current session's settings as a
  site, handy after opening a URL.

**Options › Tabs** hides or shows the tab bar.

## Save a workspace

1. Open the tabs you want and go to the directories you need.
2. Choose **Tabs › Save Workspace...**.
3. Type a name, or pick an existing workspace to overwrite it.
4. Optionally check **Save passwords (not recommended)**, so the workspace
   opens without prompts. Prefer a
   [master password](../../security/master-password/) if you do.
5. Check **Enable automatic saving of this workspace** to have linscp update
   it with your current tabs whenever you close the window.

## Open a workspace

Choose it from **Tabs › Workspaces**, or select it in the Site Manager tree
and click **Login**. Each saved tab comes back in the directories it had.

By default only the first tab connects at once; the others connect when you
select them. To connect all of them immediately, check **Connect all sessions
of opened workspace or site folder** under
**Options › Preferences › Window**.

Rename a workspace in the Site Manager with <kbd>F2</kbd>, and remove it with
**Delete** from its context menu.

## Save the workspace on exit

**Options › Preferences › Window** also has a **Workspaces** group:

- **Automatically save workspace on exit** stores your open tabs each time you
  quit, under the name in **Default workspace name**. Next time, open that
  workspace to carry on where you stopped.
- **Save passwords (not recommended)** includes the session passwords in
  that automatic save.
