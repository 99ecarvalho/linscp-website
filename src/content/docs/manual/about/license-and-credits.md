---
title: Licence and credits
description: linscp's licence, the projects it is built from, and where to find their licence texts.
sidebar:
  order: 2
related:
  - manual/about/whats-new
  - manual/developers/architecture
sources:
  - label: GNU General Public License, version 3
    href: https://www.gnu.org/licenses/gpl-3.0.html
---

linscp is free software. You may use it for any purpose, study and change its
source, and share copies, modified or not. The rules for all of this are set
by version 3 of the GNU General Public License (GPL). It comes with no warranty.

## Your rights in practice

- Use linscp at home, at work or in a company, at no cost and without
  registering.
- Install it on as many machines as you like.
- If you give someone a copy of linscp, modified or not, you must also offer
  them the matching source code under the same licence.

The full text is in the `LICENSE` file of the
[source repository](https://github.com/99ecarvalho/linscp), and in linscp under
**Help › About... › License...**.

## What linscp is built from

linscp would not exist without WinSCP. Most of what it does, from the protocol
code to the dialogs it copies, is the work of WinSCP's author and contributors.

| Component | Role in linscp | Licence |
|---|---|---|
| [WinSCP](https://winscp.net/), by Martin Přikryl | The core: sessions, transfers, scripting, messages | GPL 3 |
| [PuTTY](https://www.chiark.greenend.org.uk/~sgtatham/putty/), by Simon Tatham and others | SSH, SFTP and SCP | MIT-style |
| FileZilla's FTP engine, by Tim Kosse | FTP and FTPS | GPL |
| [OpenSSL](https://www.openssl.org/) | TLS and cryptography | Apache 2.0 |
| [neon](https://notroj.github.io/neon/) | WebDAV | LGPL |
| [libs3](https://github.com/bji/libs3) | Amazon S3 | LGPL 3 |
| [Expat](https://libexpat.github.io/) | XML parsing | MIT |
| [Qt](https://www.qt.io/) | The interface | LGPL 3 |
| [Lucide](https://lucide.dev/), [Tabler Icons](https://tabler.io/icons), [Fluent UI System Icons](https://github.com/microsoft/fluentui-system-icons) | Toolbar and menu icons | ISC, MIT, MIT |

The **About** window lists the exact versions in your build. Its translation
credits name the people who translated WinSCP into your language.

linscp's application icon is its own design, built around a Lucide glyph.
linscp does not use WinSCP's icons or artwork, which WinSCP's licence does not
allow other programs to reuse.

## Where the licence texts are

Every package carries the licences of all the parts above:

| Package | Folder |
|---|---|
| `.deb` | `/usr/share/doc/linscp/` |
| AppImage | `usr/share/doc/linscp/` inside the image |
| Flatpak | `/app/share/doc/linscp/` inside the sandbox |
| Windows setup | `licenses` in the install folder |
| Windows portable zip | `licenses` beside `linscp.exe` |

## Names and affiliation

linscp is an independent project, not affiliated with or endorsed by the
WinSCP project. It uses the name WinSCP only to say where its code comes from.

Copyright © 2026 Eduardo Correia for linscp's own code. Copyright for the
parts listed above stays with their authors.

## Website and manual

The code of this website is under GPL-3.0-or-later, like linscp. The licence
for the manual text has not been chosen yet.
