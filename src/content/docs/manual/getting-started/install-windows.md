---
title: Install on Windows
description: Install linscp on Windows with the setup program or run it from the portable zip.
sidebar:
  order: 3
related:
  - manual/getting-started/quick-start
  - manual/getting-started/install-linux
  - manual/getting-started/linscp-and-winscp
---

linscp runs on 64-bit Windows 10 and 11. You can install it with the setup
program or unpack the portable zip and run it from any folder. Both come from
the [download page](../../../download/) or
[GitHub releases](https://github.com/99ecarvalho/linscp/releases).

## The first-run warning

linscp's Windows files are not code-signed yet. When you open the setup
program or `linscp.exe` for the first time, Microsoft Defender SmartScreen may
say it protected your PC. Click **More info**, check that the file name is the
one you downloaded, then click **Run anyway**.

:::tip
Download only from the project's GitHub releases. Each release page lists the
files it published, so you can compare the file name and size.
:::

## Use the setup program

1. Run `linscp-0.7.0-setup.exe`.
2. Choose whether to install for all users (needs administrator rights) or only
   for you.
3. Choose the setup type. **Full** includes the translations of the interface;
   **Compact** leaves them out and keeps English only.
4. Pick the extra tasks:
   - a desktop icon (off by default);
   - an upload shortcut in Explorer's **Send to** menu;
   - opening `sftp://`, `ftp://`, `s3://` and similar links in linscp;
   - adding the install folder to `PATH`, so `linscp-cli` works in any
     terminal (only for an all-users install).
5. Finish, and start linscp from the Start menu.

The setup program also registers the shell extension that lets you drag files
from linscp straight into Windows Explorer folders. If WinSCP's copy of that
extension is already registered, setup leaves it in place.

To remove linscp, use **Settings › Apps › Installed apps**. Uninstalling also
removes the link handler and the `PATH` entry.

## Use the portable zip

1. Unzip `linscp-0.7.0-portable.zip` into a folder you can write to, such as
   a USB stick.
2. Run `linscp.exe` from that folder.

The zip contains an empty `linscp.ini` beside the program. While that file is
there, linscp and `linscp-cli` keep every setting in it and write nothing to
the registry. Copy the whole folder to take your sites with you.

## Where your settings go

An installed linscp stores its settings in the registry, under the same key
WinSCP uses: `HKEY_CURRENT_USER\Software\Martin Prikryl\WinSCP 2`. Sites you
saved in WinSCP therefore show up in linscp right away, and changes made in
one program appear in the other.

:::caution
Because the two programs share one configuration, a change made in linscp also
changes WinSCP's setup. To keep them separate, use the portable zip. To be safe
before the first run, export WinSCP's configuration (in WinSCP:
**Tools › Export/Backup Configuration**).
:::

[linscp and WinSCP](../linscp-and-winscp/) lists what else the two have in
common, and [configuration storage](../../preferences/storage-and-config/)
covers export and cleanup.

## Next step

Make [your first connection](../quick-start/).
