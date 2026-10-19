---
title: Windows shell integration
description: Desktop icons, Send To uploads, link handling, the jump list and drag and drop into Explorer on Windows.
sidebar:
  order: 2
---

On Windows, linscp ties into File Explorer and the taskbar much like WinSCP
does. Most of it can be set up by the installer and changed later in
**Options › Preferences › Integration**, under **Windows Shell**.

:::note[Windows only]
Everything on this page except link handling and desktop icons is missing on
Linux. For the Linux equivalents, see
[Linux desktop integration](../linux-desktop/).
:::

## Installer tasks

The installer offers these tasks. Each one runs linscp itself to do the work,
so you can repeat or undo it later from Preferences.

- **Create a desktop icon** (off by default).
- **Add upload shortcut to Explorer's Send to context menu**.
- **Register to handle** `sftp://`, `scp://`, `ftp://`, `ftps://`, `dav://`,
  `s3://` and other link types.
- **Add installation directory to search path**, so `linscp` and
  `linscp-cli` run from any prompt. This changes the system `PATH`, so it is
  offered only for an installation for all users.

Uninstalling removes the link registration and the `PATH` entry again.

## Preferences buttons

- **Create a desktop icon**: linscp asks whether the icon is for all users or
  only for you.
- **Add upload shortcut to Explorer's 'Send to' context menu**: see below.
- **Register to handle URL addresses**: a drop-down with **Register**,
  **Make linscp default handler...** and **Unregister**. Windows decides the
  default app for each link type itself, so the second item opens the
  Windows dialog where you confirm linscp as the default.
- **Add linscp to search path**: the same as the installer task.

## Upload with Send To

With the Send To shortcut in place, right-click files in File Explorer and
choose **Send to › linscp (for upload)**. linscp starts, lets you pick a site,
and opens the upload dialog for those files.

For a site you upload to often, select it in the Site Manager and choose
**Tools › Explorer's 'Send To' Shortcut**. Files sent there go straight to
that site.

## Jump list

Right-click linscp's taskbar button to see recent sites and workspaces. Pick
one to open it. Files dropped onto a site entry are uploaded to that site.
Entries you remove from the list stay removed.

## Explorer context menu in the local panel

On **Panels › Local**, **Use system file context menu** replaces linscp's
right-click menu in the local panel with File Explorer's own, including
**Open with** and Send To.

## Drag and drop to Explorer

To know where you dropped remote files in File Explorer, linscp uses WinSCP's
drag-and-drop shell extension, `DragExt64.dll`. The installer registers it,
unless WinSCP's copy of the same extension is already registered; that copy
then serves both programs.

The choice between this method and a download via a temporary folder is on
**Transfer › Drag & Drop**. See [drag and drop](../../transfers/drag-and-drop/).

## Shared settings with WinSCP

linscp uses WinSCP's registry key by default, so sites and preferences are
shared with an installed WinSCP. See
[configuration storage](../../preferences/storage-and-config/) to keep them
apart.
