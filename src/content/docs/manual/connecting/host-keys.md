---
title: Verifying host keys
description: Check that you reached the right SSH server on the first connection, and what to do when its key changes.
sidebar:
  order: 10
related:
  - manual/connecting/authentication
  - manual/connecting/ssh-keys
  - manual/connecting/session-urls
  - manual/security/overview
---

Every SSH server has a host key that identifies it. linscp remembers the key
the first time you connect and compares it on every later connection. This is
what stops someone on the network from posing as your server and collecting
your password. The check matters most on the very first connection, because
that is when you decide to trust a key.

## The first connection

When linscp has no key stored for a host and port, it shows the server's key
type and its SHA-256 fingerprint, and asks what to do:

- **Accept** stores the key and connects. Future connections are checked
  against it silently.
- **Connect Once** connects without storing the key, so you are asked again
  next time.
- **Cancel** does not connect.
- **Copy Key** puts the fingerprints on the clipboard, to compare or send to
  the administrator.
- **Paste key** checks the key against a fingerprint or public key line you
  copied from a trusted source. If they match, linscp stores the key and
  connects; if not, it tells you.

Compare the fingerprint with one you got another way before you accept.
Good sources are the server's administrator, your hosting provider's
console, or the server itself. On the server, list the fingerprints with:

```sh
for key in /etc/ssh/ssh_host_*_key.pub; do ssh-keygen -lf "$key"; done
```

If you have already connected with OpenSSH, `ssh-keygen -lF files.example.org`
shows the fingerprint stored in your `~/.ssh/known_hosts`. You can also
import those keys with **Tools › Import Sites...** and the **known_hosts**
source in the [Site Manager](../site-manager/#import-sites).

## When the key changes

If the server presents a different key from the stored one, linscp warns you
in strong terms. Either the server was reinstalled or its key was replaced,
or someone is intercepting the connection. Do not continue until you know
which.

Once the administrator confirms the change, choose **Update** to replace the
stored key, or **Add** to keep both (for a cluster of servers behind one
name). **Connect Once** connects without storing anything.

## Pinning a key in advance

For scripts and shared setups, give the expected fingerprint up front so no
prompt appears:

- In a [session URL](../session-urls/): `;fingerprint=` followed by the
  fingerprint, before the `@`.
- On the command line: `/hostkey=`.
- In a `linscp-cli` script: the `-hostkey=` option of `open`.

**Generate Session URL/Code...** with **SSH host key** checked writes the
current key into the URL or script for you.

## Finding a server's fingerprint

- In a connected session, **Commands › Server/Protocol Information** shows the
  fingerprints of the host key.
- `linscp-cli /fingerprintscan sftp://files.example.org/` prints them without
  logging in. It does not check them, so it is no substitute for a trusted
  source.

## Where keys are kept

Accepted keys are stored in the `SshHostKeys` section of the configuration
file, `~/.config/linscp/WinSCP.ini` on Linux. To forget all of them, use
**Tools › Clean Up...** in the Site Manager and check **Caches**.

## Host certificates

If your organization signs host keys with an SSH certificate authority, add
the CA's public key under **Options › Preferences › Security**, in
**Trusted host certification authorities**. linscp then accepts any host key
that CA signed for the listed hosts, without a prompt.

## TLS certificates

FTPS, WebDAV over HTTPS and S3 use TLS certificates instead of host keys. A
certificate linscp cannot verify gets the same kind of prompt; see
[FTP and FTPS settings](../ftp-ftps-settings/#encryption-with-tls).
