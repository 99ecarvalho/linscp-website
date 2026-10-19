---
title: Your first connection
description: Connect to a server, copy files both ways and disconnect, in about five minutes.
sidebar:
  order: 4
related:
  - manual/getting-started/interface-tour
  - manual/getting-started/introduction
---

This walk-through connects to an SFTP server, uploads a file, downloads one and
closes the session. You need the server's host name, your user name, and a
password or SSH key. The example uses `files.example.org` and the user `alice`.

## Open a session

When linscp starts, the **Login** window opens. It is the Site Manager: stored
sites on the left, connection details on the right. Later you can reopen it
with <kbd>Ctrl</kbd>+<kbd>N</kbd>, or **Tabs › Sites › Site Manager...**.

![The Login window with a few stored sites](../../../../assets/screenshots/site-manager.png)

1. Select **New Site** at the top of the tree.
2. Leave **File protocol** at **SFTP** unless your provider told you otherwise.
3. In **Host name**, type `files.example.org`. Keep **Port number** at `22`.
4. Fill in **User name** (`alice`) and, if you log in with a password,
   **Password**. For key login, leave the password empty and pick the key under
   **Advanced... › SSH › Authentication**; see
   [authentication](../../connecting/authentication/).
5. Click **Save** if you want to keep the site. Give it a name and, if you
   like, a folder. Leave the password unsaved unless the computer is yours
   alone.
6. Click **Login**.

## Check the host key

On the first connection to an SSH server, linscp shows the server's key
fingerprint and asks whether to trust it. Compare the fingerprint with the one
your administrator or hosting provider publishes. If it matches, click
**Accept**: linscp remembers the key and does not ask again. If the key ever
changes without warning, stop and find out why. [Verifying host
keys](../../connecting/host-keys/) has the details.

## Look around

After login, the main window shows a tab for the session. In the default
**Commander** layout, the left panel lists your local files and the right panel
lists the server's.

![The Commander window: local files on the left, remote files on the right](../../../../assets/screenshots/commander.png)

- Double-click a folder to enter it; double-click `..` to go up.
- Type a path into the box above a panel and press <kbd>Enter</kbd> to jump
  there.
- Press <kbd>Tab</kbd> to move the focus between the two panels.

## Upload a file

1. In the left panel, select the file, for example `report.pdf`. Hold
   <kbd>Ctrl</kbd> to select several.
2. In the right panel, open the folder that should receive it.
3. Press <kbd>F5</kbd> or click **Upload** above the left panel.
4. Check the target folder in the dialog and click **OK**.

You can also drag the file from one panel to the other, or from your file
manager into the right panel.

## Download a file

Select files in the right panel and press <kbd>F5</kbd>, or click **Download**.
The files go to the folder shown in the left panel. <kbd>F6</kbd> moves instead
of copying: the original is deleted after the transfer.

## Disconnect

Choose **Tabs › Disconnect Session**, or close the session's tab. When the last
session closes, the **Login** window returns so you can pick another site.

## Where to go next

- [Tour of the interface](../interface-tour/): panels, toolbars and the queue.
- [Site Manager](../../connecting/site-manager/): folders, defaults and
  importing sites.
- [Uploading and downloading](../../transfers/upload-and-download/): the copy
  dialog and its options.
