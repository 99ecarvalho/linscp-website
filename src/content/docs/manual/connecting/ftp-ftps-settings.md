---
title: FTP and FTPS settings
description: Passive and active mode, FTP-specific options, and the TLS settings for FTPS connections.
sidebar:
  order: 6
related:
  - manual/connecting/protocols
  - manual/connecting/advanced-site-settings
  - manual/connecting/proxies-and-tunnels
  - manual/security/overview
---

FTP uses one connection for commands and opens another for every directory
listing and file transfer. Most FTP trouble comes from that second
connection meeting a firewall or NAT router. This page explains how to steer
it, then covers the **FTP** and **TLS/SSL** pages of
[Advanced Site Settings](../advanced-site-settings/).

## Passive and active mode

The **Passive mode** box is on the **Connection** page and is on by default.

- **Passive**: the server picks a port and linscp connects to it. This works
  through almost every client-side firewall and NAT, so keep it on.
- **Active**: linscp listens on a local port and the server connects back to
  you. Use it only when the server cannot do passive mode. Your firewall and
  router must then let the server reach you.

For active mode, linscp needs to tell the server an address it can reach.
Set this under **Options › Preferences › Network**:

- **Retrieve the external IP address from operating system** uses your
  machine's own address. Fine when there is no NAT in between.
- **Use the following external IP address** gives the public address of your
  router instead.
- **Limit listening ports to** restricts the ports linscp listens on, so you
  can forward just that range on the router.

If a passive connection hangs, the server may be announcing its private
address. The fix is the FTP page's **Force IP address for passive mode connections**:
with it **On**, linscp ignores the announced address and connects to the one
it already uses for commands.

## FTP page

- **Post login commands**: raw FTP commands sent right after login, one per
  line, for example `SITE UMASK 022`.
- **Account**: the extra account name a few servers ask for after the
  password.
- **Support for listing of hidden files**: whether linscp asks for hidden
  files with `LIST -a`. Set it to **Off** if listings fail or show a file
  called `-a`.
- **Use MLSD command for directory listing**: the machine-readable listing
  format. **Auto** uses it when the server advertises it.
- The **HOST** command option: for servers that host several sites on one
  address and need to know which one you want.
- **Display all file revisions on VMS servers**: shows each version of a file
  on OpenVMS.

FTP has its own **Keepalives** choices on the **Connection** page: sending a
harmless command, or sending it and also listing the current directory.

## Encryption with TLS

Choose the encryption in the Site Manager's **Encryption** box:
**TLS/SSL Explicit encryption** for servers that upgrade the standard
connection, or **TLS/SSL Implicit encryption** for servers that expect TLS
from the first byte (port 990). Both the commands and the data connections
are then encrypted.

On the first connection, linscp shows the server's certificate if it cannot
verify it. Check the fingerprint with the server's administrator before you
accept it, as you would with an [SSH host key](../host-keys/).

:::note[Linux]
linscp checks certificates against the system trust store, the bundle your
distribution installs (`SSL_CERT_FILE` and `SSL_CERT_DIR` override it). It
does not check revocation and does not download missing intermediate
certificates. A server that omits its intermediate certificate is refused
on Linux even where Windows accepts it.
:::

## TLS/SSL page

- **Minimum TLS version** and **Maximum TLS version** limit the versions
  linscp offers. Raise the minimum to refuse old servers; lower it only for
  legacy systems.
- **Reuse TLS session ID for data connections**: many servers, vsftpd and
  FileZilla Server among them, require the data connection to resume the
  control connection's TLS session. Keep it on.
- **Client certificate file**: a certificate (`.pfx`, `.p12` or `.pem`) for
  servers that authenticate clients by certificate.
