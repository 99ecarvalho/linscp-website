---
title: Text and binary modes
description: Choose whether files are copied byte for byte or have their line endings converted.
sidebar:
  order: 4
related:
  - manual/transfers/transfer-settings
  - manual/transfers/upload-and-download
---

Linux and macOS end each line of a text file with a single line feed (LF).
Windows uses a carriage return followed by a line feed (CR LF). A
*text mode* transfer converts the line endings to suit the target system. A
*binary mode* transfer copies the file exactly as it is.

## Which mode to use

| Mode | What it does | Use it for |
|---|---|---|
| **Binary** | Copies every byte unchanged. | Almost everything: images, archives, office documents, executables, and text files when both sides use the same line endings. |
| **Text** | Converts line endings between the local and the server format. | Plain text moving between Windows and a Unix server, when the program reading it cares. |
| **Automatic** | Text mode for files matching a mask, binary for the rest. | Mixed uploads where only some files need converting. |

Binary is the default. If you run linscp on Linux and your server is Linux
too, both sides already use LF, so binary is right for text files as well.

:::caution
Never send binary files in text mode. Converting the bytes that look like
line endings corrupts images, archives and documents beyond repair.
:::

## Change the mode

Open the [transfer settings](../transfer-settings/), in the copy dialog for
one transfer or in **Options › Preferences › Transfer** for the default,
and choose **Text (plain text, html, scripts, ...)**, **Binary (archives,
doc, ...)** or **Automatic**.

With **Automatic**, edit **Transfer following files in text mode**. The
default mask covers common web and source files, for example `*.*html`,
`*.php`, `*.js`, `*.css`, `*.sh`, `*.xml` and `.htaccess`. Add your own,
separated by semicolons.

A preset that sets only the mode is a quick way to switch: create one called
*Text* and one called *Binary*, then pick them from the **Transfer
Settings** toolbar.

## Which line endings the server uses

How the conversion happens depends on the protocol:

- **FTP** and **SFTP version 4 or later** have a text mode of their own. The
  server converts to its native format.
- **SCP** and **SFTP version 3** (what OpenSSH speaks) leave it to linscp.
  It needs to know the server's format, which it takes from **End-of-line
  characters (if not indicated by server)** on the **Environment** page of
  the [advanced site settings](../../connecting/advanced-site-settings/).
  The default, LF, suits Unix servers.
- **WebDAV** and **S3** always transfer in binary.

## Byte order marks

**Remove BOM and EOF marks** in the upload options strips a UTF-8 byte order
mark and an end-of-file character from text files as they are uploaded.
Some scripts and configuration parsers on the server fail when the file
starts with a BOM.

## Edited files

When you edit a remote file in the internal editor, linscp transfers it in
text mode. For external editors this depends on **Force text transfer mode
for files edited in external editor** in the editor's settings. See
[Editing remote files](../../editing/editing-remote-files/).

## When line breaks look wrong

- **Everything on one line** – a Unix file opened by a program that expects
  CR LF. Transfer in text mode, or use an editor that understands LF.
- **An empty line after every line, or `^M` at line ends** – a Windows file
  on a Unix server. Upload it in text mode, or convert it on the server with
  `dos2unix`.

To see what a file actually contains, run `od -c file.txt | head` on Linux:
`\r \n` means CR LF, a lone `\n` means LF.
