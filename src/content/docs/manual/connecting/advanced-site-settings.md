---
title: Advanced site settings
description: The per-site options beyond host and login, from time zones and start directories to timeouts, notes and raw settings.
sidebar:
  order: 4
related:
  - manual/connecting/site-manager
  - manual/connecting/ssh-settings
  - manual/connecting/proxies-and-tunnels
  - manual/security/file-encryption
---

Each site carries more settings than the Site Manager form shows. Select a
site and click **Advanced...** to open **Advanced Site Settings**. The page
list on the left only contains pages that apply to the site's protocol. The
defaults suit most servers, so change a setting only when you have a reason.

| Page | Covers | Shown for |
|---|---|---|
| **Environment** | Line endings, file name encoding, time zone, PuTTY terminal settings | All |
| **Directories** | Start directories and directory caching | All |
| **Recycle bin** | Keeping deleted or overwritten remote files | All |
| **Encryption** | Encrypting files stored on the server | SFTP |
| **SFTP**, **Shell** or **SCP/Shell** | See [SSH, SFTP and SCP settings](../ssh-settings/) | SFTP, SCP |
| **FTP** | See [FTP and FTPS settings](../ftp-ftps-settings/) | FTP |
| **S3**, **WebDAV** | See [WebDAV and S3 settings](../webdav-s3-settings/) | S3, WebDAV |
| **Connection** | Timeouts, keepalives, IP version | All |
| **Proxy**, **Tunnel** | See [Proxies, jump hosts and tunnels](../proxies-and-tunnels/) | Proxy: all; Tunnel: SFTP, SCP |
| **TLS/SSL** | See [FTP and FTPS settings](../ftp-ftps-settings/#tlsssl-page) | FTPS, WebDAV and S3 with TLS |
| **SSH**, **Key exchange**, **Authentication**, **Bugs** | See [SSH, SFTP and SCP settings](../ssh-settings/) and [Authentication](../authentication/) | SFTP, SCP |
| **Note** | Free text about the site | All |

## Environment

- **End-of-line characters (if not indicated by server)**: the line ending
  used for text-mode transfers when the server does not say. Pick `LF` for
  Unix-like servers and `CR/LF` for Windows ones.
- **UTF-8 encoding for filenames**: leave on **Auto** unless names with
  accents come out garbled.
- **Time zone offset**: shifts remote timestamps by whole hours and quarter
  hours. **Detect automatically** works out the offset itself where the
  protocol allows.
- **Daylight saving time**: whether remote times follow local DST rules or are
  adjusted by the current DST difference. Change this only if timestamps are
  off by exactly one hour for part of the year.
- **PuTTY terminal settings**: the PuTTY saved session used when you open
  this site in PuTTY. **Edit in PuTTY...** appears on Windows only.

## Directories

- **Remote directory** and **Local directory** set where the panels start.
  The local one is not used by the Explorer interface.
- **Remember last used directory** updates these fields each time you
  disconnect, so the next session picks up where you stopped.
- **Synchronize browsing** starts the session with browsing of both panels
  linked.
- **Cache visited remote directories** speeds up going back to folders you
  have listed. **Cache directory changes**, with **Permanent cache**, also
  remembers how path changes resolved, across sessions.
- **Resolve symbolic links** and **Follow symbolic links to directories**
  control how links are shown and opened.

## Recycle bin

Turn on **Preserve deleted remote files to recycle bin** to move deleted files
into the folder named in **Remote recycle bin** instead of removing them. With
SFTP, **Preserve overwritten remote files to recycle bin** does the same for
files an upload replaces.

## Encryption

**Encrypt files** stores files on an SFTP server in encrypted form. See
[File encryption](../../security/file-encryption/).

## Connection

- **Server response timeout** sets how many seconds linscp waits for a reply
  before it gives up and offers to reconnect.
- **Keepalives** stop idle connections from being cut by firewalls. For SSH,
  **Sending of null SSH packets** costs least. For FTP, linscp can send dummy
  commands and optionally list the current directory as well. Set the
  interval in **Seconds between keepalives**.
- **Internet protocol version** forces **IPv4** or **IPv6** instead of
  **Auto**.
- **Passive mode** (FTP) is explained in
  [FTP and FTPS settings](../ftp-ftps-settings/).

## Note and color

The **Note** page holds free text, such as who owns the server or when the
password expires. The Site Manager shows it under the form. The **Color**
button at the bottom of the dialog tags the site; the color appears in the
Site Manager tree and on the session's tab.

## Raw settings

Every site setting also has a raw name, as stored in the configuration file.
Choose **Edit Raw Settings...** from the arrow beside the Site Manager's
**Advanced...** button to see and change settings by name, including ones no
page shows. The same names work in session URLs as `x-name=value` and on the
command line with `/rawsettings`.
