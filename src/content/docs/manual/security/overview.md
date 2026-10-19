---
title: Security overview
description: What linscp encrypts, how it checks server identity, and where certificate checks on Linux are weaker.
sidebar:
  order: 1
related:
  - manual/security/master-password
  - manual/security/file-encryption
  - manual/security/reporting-vulnerabilities
---

linscp moves files over the network and keeps your site settings on disk.
This page explains which of those paths are protected, what linscp checks
before it trusts a server, and what you should set up yourself.

## Which connections are encrypted

| Protocol | Traffic | Notes |
|---|---|---|
| SFTP, SCP | Always encrypted (SSH) | The safest choice for most servers. |
| FTP | Plain text unless you pick TLS | Set **Encryption** to explicit or implicit TLS to get FTPS. |
| WebDAV | Encrypted only over TLS | Pick a TLS option in **Encryption** for HTTPS. |
| Amazon S3 | Encrypted over TLS | Keep the TLS setting unless the endpoint is on your own network. |

Plain FTP sends your password and your files in the clear. Use it only on a
network you control. [Choosing a protocol](../../connecting/protocols/)
compares the options.

## How linscp checks the server

- **SSH host keys.** On the first connection linscp shows the server's key
  fingerprint and asks you to confirm it. Compare it with a fingerprint you
  got from the administrator or the provider's console. If the key changes
  later, linscp warns you before it sends anything. See
  [Verifying host keys](../../connecting/host-keys/).
- **SSH certificate authorities.** Under **Options › Preferences › Security ›
  Trusted host certification authorities** you can list CA keys. Hosts signed
  by a listed CA are accepted without a fingerprint prompt.
- **TLS certificates** (FTPS, WebDAV, S3). linscp checks the certificate chain
  and the host name. When the check fails, it shows the certificate and lets
  you accept it for this server.

### Certificate checks on Linux

On Linux, linscp verifies certificates with OpenSSL against the system's
trusted certificate store (your distribution's CA bundle, or the files named
by `SSL_CERT_FILE` and `SSL_CERT_DIR`). Two checks that Windows makes are
missing:

- **No revocation checks.** A revoked certificate is still accepted if the
  chain is otherwise valid.
- **No fetching of missing intermediate certificates.** If the server sends
  only its own certificate, the chain cannot be completed and linscp refuses
  it, even where a Windows client would succeed. Ask the server's operator to
  send the full chain.

On Windows, linscp uses the system's own certificate verification, which
does both.

## Stored passwords

When you save a password with a site, it is stored in the configuration file
(`~/.config/linscp/WinSCP.ini` on Linux). Without a master password, anyone
who can read that file can recover the password. Set a
[master password](../master-password/), or do not save passwords at all and
use [SSH keys](../../connecting/ssh-keys/) with an agent instead.

## Files on the server

With SFTP you can have linscp encrypt file names and contents before they
reach the server, so the server's administrator cannot read them. See
[client-side file encryption](../file-encryption/).

## Links and command lines from elsewhere

A `sftp://` or `ftp://` link opened from a browser or another program is
treated as untrusted. linscp ignores the settings in it that could run
commands or replace your configuration. See
[session URLs](../../connecting/session-urls/).

## Logs

Session logs never contain passwords unless you turn on **Log passwords and
other sensitive information** under **Options › Preferences › Logging**.
Leave it off, and check a log before you share it, as described in
[reporting bugs](../../troubleshooting/reporting-bugs/).

## Updates and privacy

linscp collects no usage statistics. The update check is off until you turn
it on; it only asks GitHub for the latest release.

:::caution
linscp's packages are not code-signed yet. Download them only from the
project's GitHub Releases page.
:::
