---
title: Properties and permissions
description: Change permissions, owner and group, compute checksums and check file sizes.
sidebar:
  order: 4
related:
  - manual/files/managing-files
  - manual/transfers/transfer-settings
---

The **Properties** dialog shows details of the selected files and lets you
change their Unix permissions, owner and group. Open it with **Files ›
Properties** or <kbd>F9</kbd>. With several files selected, changes apply to
all of them.

## What the dialog shows

The **Common** tab lists the file name, **Location**, **Size**, and for
links the target (**Links to**). For a directory the size is not known
until you click **Calculate**, which walks the directory and adds up its
contents.

## Change permissions

Permissions appear as a grid of check boxes: read, write and execute for
**Owner**, **Group** and **Others**, plus **Set UID**, **Set GID** and
**Sticky bit**.

1. Tick or untick the boxes, or type a value in **Octal**, for example
   `644` for a web page or `755` for a script.
2. To apply the change to everything inside the selected directories, tick
   **Set owner, group and permissions recursively**.
3. Click **OK**.

When you edit several files whose permissions differ, a box can be in a
third, mixed state, which means "leave as it is". Right-click the grid for
shortcuts: **No Rights**, **Default Rights**, **All Rights**, **Leave as
Is**, and copying or pasting the value as text or octal.

**Add X to directories** gives directories the execute bit wherever they
have read permission. A directory without the execute bit cannot be
entered, even when it is readable.

:::note
Which properties you can change depends on the protocol. SFTP and SCP
support permissions, owner and group. Most FTP servers accept permission
changes only. WebDAV and S3 have no Unix permissions. For a single S3 object the
dialog has a **Tags** tab, where you can add, edit and remove its tags.
:::

## Change owner and group

Pick or type a new **Owner** and **Group**. The server decides who may do
this; on most systems only root can give a file away to another user.

## Calculate a checksum

The **Checksum** tab computes a hash of the selected files on the server,
so you can compare them with a local copy without downloading them.

1. Choose an **Algorithm**. The list shows what the server offers.
2. Click **Calculate checksum**.

This needs server support: an SFTP server with the `check-file` extension,
or an FTP server with a hash command. Otherwise the tab is not offered.

## Set permissions when uploading

To give uploaded files fixed permissions, use **Set permissions** in the
upload options of the [transfer settings](../../transfers/transfer-settings/)
instead of fixing them afterwards.

## Sizes in the panel

The size column shows files only. To see directory sizes in the panel
itself, select the directories and use **Files › Calculate Directory
Sizes**. To choose bytes, kilobytes or a short format, right-click a column
header and use **Show File Sizes In**.
