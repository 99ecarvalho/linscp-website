---
title: What is linscp
description: linscp moves files between your computer and servers over SFTP, SCP, FTP, WebDAV and S3, on Linux and Windows.
sidebar:
  order: 1
related:
  - manual/getting-started/install-linux
  - manual/getting-started/quick-start
  - manual/getting-started/linscp-and-winscp
---

linscp is a graphical file transfer client for Linux and Windows. It takes the
protocol engine of WinSCP and puts a new Qt 6 interface on top of it, so the
same program and the same settings work on both systems.

## What you can do with it

- Browse a server's files next to your own, and copy them in either direction.
- Keep a list of servers in the **Site Manager**, with passwords, keys and
  per-site options.
- Edit a remote file in place: linscp downloads it, opens an editor and uploads
  each save.
- Compare two directories and bring them in line, or watch a local folder and
  mirror its changes to the server.
- Queue transfers and let them run in the background while you keep working.
- Automate all of this with `linscp-cli`, a console client that runs WinSCP
  scripts.

## Protocols

| Protocol | Runs over | Typical use |
|---|---|---|
| SFTP | SSH | Most Linux and BSD servers; the default |
| SCP | SSH | Old or minimal SSH servers without SFTP |
| FTP, FTPS | FTP, optionally with TLS | Web hosting, legacy systems |
| WebDAV | HTTP or HTTPS | Nextcloud and other web file shares |
| S3 | HTTPS | Amazon S3 and compatible object stores |

[Choosing a protocol](../../connecting/protocols/) explains the trade-offs.

## The two programs

- `linscp` is the window you work in. It offers two layouts: **Commander**,
  with your files on the left and the server on the right, and **Explorer**,
  with the server only. See the [tour of the interface](../interface-tour/).
- `linscp-cli` is for terminals and scripts. It reads the same stored sites as
  the window, so a site you set up once works in both. See
  [scripting with linscp-cli](../../scripting/introduction/).

## Platforms and status

linscp runs on 64-bit Linux and on Windows 10 and 11 (x64). Every release so
far is a pre-release: the core is mature, but the interface around it is new.
Back up your settings before you try it on a setup you depend on.

linscp is free software under the GNU GPL, version 3. It is an independent
project: the WinSCP authors do not make, endorse or support it. To learn what
it shares with WinSCP and where it differs, read
[linscp and WinSCP](../linscp-and-winscp/).

## Next steps

1. Install it: [on Linux](../install-linux/) or [on Windows](../install-windows/).
2. Make [your first connection](../quick-start/).
