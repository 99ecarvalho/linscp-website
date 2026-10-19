---
title: Privacy
description: What linscp sends over the network, what it stores on your computer, and how to control both.
sidebar:
  order: 3
related:
  - manual/about/license-and-credits
  - manual/getting-started/linscp-and-winscp
---

linscp collects no usage statistics, has no telemetry and shows no ads. It
connects to the servers you open, and to GitHub only when you ask it to look
for updates.

## Network connections linscp makes

| Connection | When | What the other side learns |
|---|---|---|
| The servers you connect to | When you log in, transfer files, or a queued or scheduled job runs | What any server learns from a client: your IP address, user name, and the files you work with |
| `api.github.com` | When you choose **Help › Check for Updates**, or on the schedule you set | Your IP address and that linscp asked for the newest release |
| `winscp.net` or another web address | When you add a custom command extension from a URL in the preferences | Your IP address and the extension you fetched |
| Your web browser | When you choose a **Help** menu link or **Donate** | Whatever the website records |

Nothing else is sent. linscp does not report crashes, does not fetch tips or
news, and does not phone home on start-up.

## Update checks

Automatic update checks are off in a fresh linscp. To change that, open
**Options › Preferences › Updates** and set **Automatic check period**. On
the same page you can route the check through a proxy.

The check is a plain request to GitHub's public API. It carries no
identifier, and no information about your sites or files.

:::note[Windows]
On Windows, linscp shares its settings with WinSCP. If you set an update
period in WinSCP, linscp uses that period too, but it still asks only GitHub.
:::

## What linscp stores on your computer

- **Settings and sites** in the configuration file (Linux) or registry key
  (Windows). See [install on Linux](../../getting-started/install-linux/) and
  [install on Windows](../../getting-started/install-windows/) for the exact
  places.
- **Passwords**, only for sites where you chose to save them. They are
  obfuscated, not strongly encrypted, unless you set a master password. See
  [stored passwords and master password](../../security/master-password/).
- **Host keys** of the servers you accepted, so linscp can warn you if one
  changes.
- **History**: recent paths, commands and search terms, to fill drop-down
  lists.
- **Temporary copies** of files you open for editing, in a private folder.
  linscp removes them when you finish editing; the **Storage** page of the
  preferences controls the cleanup of leftovers.
- **Logs**, only if you turn on logging under **Options › Preferences ›
  Logging**. A log can show host names, user names, paths and file names; at
  the highest levels it can show more. Read it before you share it.

To remove stored data, use **Clean Up...** in the **Login** window's **Tools**
menu. It lists each kind of data and lets you delete it.

## Flatpak permissions

The Flatpak build asks for network access, your home directory (to transfer
your files and read your SSH keys), the display, and a few desktop services:
the tray icon, opening a folder in the file manager, and logind for the "sleep"
and "shut down" actions after the queue finishes.

## Privacy of the website

This manual is a static site hosted on GitHub Pages. GitHub may log visits as
described in its own privacy statement. The site sets no cookies of its own.
