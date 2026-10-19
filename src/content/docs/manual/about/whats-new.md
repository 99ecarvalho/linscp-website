---
title: What's new
description: What the newest linscp release brings, with the highlights of the one before.
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

Released on 18 October 2026. A maintenance release on WinSCP 6.7.1's core with
internal fixes. The interface is unchanged. Updating is recommended.

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
- **Linux fixes:** `~/.aws` is read for S3
  profiles, and sites can be imported from FileZilla.

## Known issues

- In some translations, two menu items share an access key. Press the key
  again to move to the next one.
- Serbian cannot be selected yet; choosing it gives Croatian.
- The binaries are not code-signed, so Windows may warn on first run. See
  [install on Windows](../../getting-started/install-windows/).

To stay informed, turn on automatic checks in **Options › Preferences ›
Updates**, or watch the GitHub repository.
