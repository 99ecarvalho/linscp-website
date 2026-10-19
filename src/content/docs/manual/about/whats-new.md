---
title: What's new
description: Changes in linscp 0.6.1, the newest release, and the highlights of 0.6.0.
sidebar:
  order: 1
related:
  - manual/about/license-and-credits
  - manual/getting-started/install-linux
  - manual/getting-started/install-windows
---

This page covers the newest release. Every earlier version, with its full
notes and downloads, is on
[GitHub releases](https://github.com/99ecarvalho/linscp/releases). All releases
so far are pre-releases.

## linscp 0.6.1

Released on 18 October 2026. A maintenance release on WinSCP 6.7.1's core,
with no visible changes to the interface. It closes several ways a malicious
link or server could misuse linscp, so updating is recommended.

### Safer handling of links from outside

These changes apply when a session is opened from an `sftp://` (or similar)
link, from the browser or another program, or when a second linscp passes its
command line to one already running.

- A session URL can no longer set a custom GSSAPI library or PuTTY settings.
- The `/ini` and `/defaults` switches are ignored for such links, so a link
  cannot swap your configuration or start an upload without showing the copy
  dialog.
- A quoted argument forwarded to a running linscp can no longer split into
  extra switches.

### Other security fixes

- On Linux, local custom commands that include remote file names now quote
  those names for the shell. A file name chosen by the server cannot inject
  shell commands any more.
- SCP downloads refuse `.` and `..` as file names at every level, so a server
  cannot write outside the target folder.
- Prompts from the server during keyboard-interactive login are shown as plain
  text, so the server cannot dress them up to look like part of linscp.
- On Linux, temporary files go into a private per-user folder, readable only
  by you, instead of straight into the shared temporary directory.

## Highlights of 0.6.0

0.6.0, released a day earlier, filled in most of what linscp's interface still
lacked compared with WinSCP:

- **Site Manager:** the **Manage** menu and right-click menus, site search
  (<kbd>Ctrl</kbd>+<kbd>F</kbd>), renaming in place, dragging sites into
  folders, site colors and notes, **Save As** and **Set Defaults**, anonymous
  FTP login and S3 credentials from the AWS environment.
- **Transfers:** the progress window shows elapsed and remaining time and can
  skip a file, move the transfer to the background, act when finished and
  limit the speed.
- **Main window:** history lists on **Back** and **Forward**, **Customize
  Toolbar**, the column header menu, and directory trees beside the file lists.
- **Preferences:** a search box over the page list, and the **Explorer** page.
- **Command line:** many more of WinSCP's switches for both `linscp` and
  `linscp-cli`.
- **Linux fixes:** temporary folders are cleaned up, `~/.aws` is read for S3
  profiles, and sites can be imported from FileZilla.

## Known issues

- In some translations, two menu items share an access key. Press the key
  again to move to the next one.
- Serbian cannot be selected yet; choosing it gives Croatian.
- The binaries are not code-signed, so Windows may warn on first run. See
  [install on Windows](../../getting-started/install-windows/).

To stay informed, turn on automatic checks in **Options › Preferences ›
Updates**, or watch the GitHub repository.
