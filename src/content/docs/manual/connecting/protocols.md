---
title: Choosing a protocol
description: Which of SFTP, SCP, FTP, FTPS, WebDAV and Amazon S3 to pick, and what each one gives you.
sidebar:
  order: 1
related:
  - manual/connecting/site-manager
  - manual/connecting/ssh-settings
  - manual/connecting/ftp-ftps-settings
  - manual/connecting/webdav-s3-settings
---

linscp talks to five kinds of servers. You pick one in the **File protocol**
box of the [Site Manager](../site-manager/). Your server usually decides for
you: use what it offers, and prefer an encrypted option when there is a choice.

## Quick comparison

| Protocol | Encrypted | Default port | Pick it when |
|---|---|---|---|
| SFTP | Always (SSH) | 22 | The server runs OpenSSH or another SSH server. The best default. |
| SCP | Always (SSH) | 22 | The SSH server has no SFTP subsystem. |
| FTP | No | 21 | Only on a trusted network, or for public anonymous downloads. |
| FTP with TLS/SSL | Yes | 21 or 990 | The host offers FTP only, but supports FTPS. |
| WebDAV | Optional (HTTPS) | 80 or 443 | The files sit behind a web server, such as Nextcloud or Apache `mod_dav`. |
| Amazon S3 | Usually (HTTPS) | 443 | You store objects in AWS S3 or an S3-compatible service. |

## SFTP

SFTP runs inside an SSH connection. Logins, file data and listings are all
encrypted, and the server's identity is checked with its
[host key](../host-keys/). It supports permissions, ownership, symbolic links,
resumable transfers and server-side renames. If you are not sure what to pick,
pick SFTP.

## SCP

SCP also uses SSH, but linscp drives it through the remote shell: it runs
commands such as `ls` and `scp` and reads their output. That makes it
sensitive to the shell's startup scripts and to unusual `ls` output. Use it
only when SFTP is not available. With SFTP selected, linscp can switch to SCP
by itself when the SFTP subsystem is missing; see **Allow SCP fallback** in
[SSH, SFTP and SCP settings](../ssh-settings/).

## FTP and FTPS

Plain FTP sends your password and your files in clear text. With FTP chosen,
the **Encryption** box offers two TLS variants:

- **TLS/SSL Explicit encryption** connects on the normal FTP port and then
  asks the server to switch to TLS. This is what most servers expect.
- **TLS/SSL Implicit encryption** starts TLS at once, normally on port 990.
  It is an older style.

FTP opens a second connection for each listing and transfer, which is where
passive and active mode matter. See [FTP and FTPS settings](../ftp-ftps-settings/).

## WebDAV

WebDAV extends HTTP with file operations. Choose **TLS/SSL Implicit
encryption** in **Encryption** to use HTTPS; without it, everything travels
unencrypted. WebDAV servers can lock files, and linscp can show and set those
locks. See [WebDAV and S3 settings](../webdav-s3-settings/).

## Amazon S3

S3 stores objects in buckets rather than files in directories. linscp shows
buckets as top-level folders and object key prefixes as subfolders. Your
S3 credentials (an access key ID plus a secret access key) replace the user name and
password, or linscp can read them from your AWS environment. Many other
storage services speak the S3 API too; give their endpoint as the host name.

## Protocols in session URLs

Each protocol has a URL scheme, used on the command line, in the **Open URL**
box and by links in a browser: `sftp://`, `scp://`, `ftp://`, `ftps://`
(implicit TLS), `ftpes://` (explicit TLS), `dav://`, `davs://` and `s3://`.
An `ssh://` URL opens SFTP. See [Session URLs](../session-urls/) for the full
syntax.
