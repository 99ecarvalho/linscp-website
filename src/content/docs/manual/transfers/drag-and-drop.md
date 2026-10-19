---
title: Drag and drop
description: Transfer files by dragging them between panels and to or from other programs.
sidebar:
  order: 2
related:
  - manual/transfers/upload-and-download
  - manual/transfers/transfer-settings
---

Dragging is the quickest way to move a few files. linscp accepts drops from
its own panels and from your desktop's file manager, and it can drop remote
files into other programs.

## Between the panels

1. Select files in one panel.
2. Drag them to the other panel. Drop on an empty part of the list to use
   the panel's current directory, or on a directory to put them inside it.
3. Check the copy dialog and click **OK**.

Hold <kbd>Shift</kbd> while you drop to move the files instead of copying
them.

Dropping files onto a directory *in the same panel* moves them into that
directory, after a confirmation.

## From another program

Drag files from your file manager (Files, Dolphin, Thunar, and so on) onto
the remote panel to upload them. Drop on a remote directory to upload into
it.

## To another program

Drag remote files out of linscp and drop them in your file manager or on
your desktop. What happens:

1. When you drop, linscp downloads the files to a temporary directory of its
   own.
2. The program you dropped on copies them from there to where you dropped.

The temporary directory lives under the temporary folder set in
**Options › Preferences › Storage** and is removed when you close the
window. **Warn when there is not enough free space** on **Options ›
Preferences › Transfer › Drag & Drop** checks the space before the
download starts.

This works on both X11 and Wayland desktops.

:::tip
For large downloads, use <kbd>F5</kbd> into a local panel instead. You see
the real target from the start, and the files are not copied twice.
:::

## Confirming drops

By default a drag opens the copy dialog, so you can check the target and
the transfer settings. To skip it, tick **Do not show this dialog box
again** in the dialog, or change **Drag & drop operations and paste to other
applications** in the confirmations on **Options › Preferences ›
Environment**. With the dialog off, the transfer uses the preset selected
on the **Transfer Settings** toolbar (see
[Transfer settings and presets](../transfer-settings/)).

## Windows: dropping to the exact target

:::note[Windows only]
On Windows, linscp can use WinSCP's drag and drop shell extension. With it,
linscp learns which folder in File Explorer you dropped on and downloads
straight there, without the temporary copy. Choose **Determine drop target
by dragging a fake file** on the **Drag & Drop** page to use it. The
installer registers the extension unless WinSCP's own copy is already
registered. Linux has no equivalent; drops always go through the temporary
directory.
:::
