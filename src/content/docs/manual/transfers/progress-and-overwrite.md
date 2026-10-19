---
title: Progress and overwrite prompts
description: Follow a running transfer, change its speed or send it to the background, and decide about existing files.
sidebar:
  order: 7
related:
  - manual/transfers/queue
  - manual/transfers/transfer-settings
---

While a transfer runs in the foreground, linscp shows a progress window.
When a file already exists at the target, it asks what to do with it. This
page explains both.

## The progress window

The window is titled **Uploading** or **Downloading** and shows:

- **File** – the file being transferred, with **File progress** below it.
- **Overall progress** – the share of the whole job done, and how many
  files it holds.
- **Bytes transferred** and **Speed**.
- **Time left**, **Time elapsed** and **Start time**.

**Time left** needs the total size. When you transfer whole directories,
linscp knows it only if **Calculate total size** is on in the
[transfer settings](../transfer-settings/).

### What you can do while it runs

- **Cancel** stops the transfer. Files already done stay at the target.
- **Skip this file** abandons the current file and continues with the next.
- **Speed limit (KB/s)** caps the bandwidth from now on, for example to keep
  a video call smooth. Choose **Unlimited** to lift it.
- **Proceed in Background** moves the rest of the job to the
  [queue](../queue/) and frees the main window.
- **Minimize** gets the window out of the way.
- **Once Finished** picks what happens at the end: **Stay Idle**,
  **Disconnect Session**, **Sleep Computer** or **Shut Down Computer**.

## The overwrite prompt

When the target already has a file of the same name, linscp shows both
versions with their size and modification time, and asks. Every choice is a
button of its own:

| Button | Effect |
|---|---|
| **Yes** | Replace the existing file. |
| **Yes to All** | Replace this and every other existing file in the job. |
| **Newer only** | For this and the rest of the job, replace a file only if the source is newer. |
| **No** | Keep the existing file and skip this one. |
| **No to All** | Skip every file that already exists. |
| **New name** | Ask for another name to save the new file under, keeping the old one. |
| **Append** | SFTP: add the source to the end of the existing file, or resume an interrupted transfer. |
| **Resume** | FTP: continue a transfer that stopped part way, when the target is smaller. |
| **Cancel** | Stop the whole job. |

**Append** and **Resume** appear only when they make sense for the protocol
and the files. Resume only from the *same* source file: if it changed in the
meantime, the result is a mix of two versions.

### Turn the prompt off

Tick **Never ask me again** in the prompt to replace files from now on
without asking. To bring the prompt back, tick **Overwriting of files**
under **Confirmations** in **Options › Preferences › Environment**.

:::caution
With the prompt off, every transfer silently replaces existing files. If
you only want newer files to win, tick **New and updated files only** in
the transfer settings instead.
:::

To keep a copy of remote files you overwrite, set a remote recycle bin in
the [advanced site settings](../../connecting/advanced-site-settings/)
(**Preserve overwritten remote files to recycle bin**, SFTP only).

## Background transfers

Jobs in the queue ask the same questions, but only when the main window is
free, or when you open them from the queue list. See
[Queue and background transfers](../queue/).
