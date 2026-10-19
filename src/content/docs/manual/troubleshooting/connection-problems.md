---
title: Connection and login problems
description: Find out why linscp cannot reach a server or log in, from DNS and firewalls to keys and certificates.
sidebar:
  order: 2
related:
  - manual/troubleshooting/first-steps
  - manual/troubleshooting/error-messages
---

A connection goes through stages: find the host, open a network connection,
agree on encryption, then log in. The error tells you which stage failed.
Work through the section that matches it.

## The host name is not found

linscp could not turn the name into an address.

- Check the spelling in **Host name**. Enter only the name, such as
  `files.example.org`, without `sftp://` or a path.
- Test the name on your computer: `getent hosts files.example.org`. No
  output means your DNS cannot resolve it either.
- If the host is only reachable on a company network, connect the VPN first.

## The connection is refused

The machine answered, but nothing accepts connections on that port.

- Check **Port number**: 22 for SFTP and SCP, 21 for FTP and explicit FTPS,
  990 for implicit FTPS, 443 for HTTPS-based WebDAV and S3.
- The server program may be stopped. Ask the administrator.
- Some servers listen only for one protocol. An SFTP attempt on an FTP-only
  server is refused, or fails with a message that the server speaks FTP.

## The connection times out

Nothing answered at all. Usually a firewall drops the traffic.

- At a cloud provider, open the port in the machine's firewall or security
  group for your address.
- On your side, a corporate network may block outgoing SSH or FTP. If you
  must go through a proxy, set it under **Advanced... › Connection ›
  Proxy**. See [proxies and tunnels](../../connecting/proxies-and-tunnels/).
- For a slow link, raise **Server response timeout** under **Advanced... ›
  Connection**.

## Other programs connect, linscp does not

Compare carefully: same host, port, user and protocol. If they match, look
for something that treats programs differently:

- a desktop firewall or security tool with per-program rules;
- proxy settings that your browser or terminal uses but linscp does not
  (**Options › Preferences › Network**, and each site's **Proxy** page);
- on Linux with the Flatpak package, the sandbox. Check whether the `.deb`
  or AppImage behaves differently.

## Login fails

- **Wrong user name or password.** Both are case-sensitive. Type the
  password in a text editor first to check the keyboard layout.
- **Root login disabled.** Many SSH servers refuse `root`. Log in as an
  ordinary user.
- **Account locked or expired.** Only the server's administrator can tell
  and fix this. Nobody else can reset your password.
- **Key refused.** The server does not accept your key for this user. Check
  that the public key is in that user's `~/.ssh/authorized_keys`, and that
  `~/.ssh` is mode `700` and `authorized_keys` mode `600` on the server.
- **Too many authentication failures.** Your SSH agent offers many keys and
  the server gives up before the right one. Choose the key file under
  **Advanced... › SSH › Authentication** and uncheck **Attempt
  authentication using agent**.
- **Asked for the password again and again.** The saved password is wrong,
  or a [master password](../../security/master-password/) prompt was
  cancelled.

See [authentication](../../connecting/authentication/) for each method.

## SFTP starts, then fails

If login works but SFTP cannot start, the cause is usually on the server:

- The SFTP subsystem is not enabled. Check the `Subsystem sftp` line in the
  server's `sshd_config`.
- The account's shell start-up files print text (a greeting, `echo` lines).
  That output corrupts the SFTP stream. Print only in interactive shells.

If the server has no SFTP at all, switch the site to SCP.

## Host key warnings

A warning that the host key does not match the one stored means either the
server was reinstalled or someone is intercepting the connection. Do not
accept it until the administrator confirms a new key. See
[verifying host keys](../../connecting/host-keys/).

## TLS certificate errors on Linux

On Linux, linscp does not download intermediate certificates that a server
leaves out. A server that sends an incomplete chain is refused, even if
browsers or Windows accept it. Ask the operator to send the full chain. If
your organisation uses a private CA, add it to the system's trusted store or
point `SSL_CERT_FILE` at a bundle that includes it. See the
[security overview](../../security/overview/).

## FTP lists nothing or hangs on transfers

FTP opens a second connection for each listing and transfer. If logging in
works but listings time out, toggle **Passive mode** under **Advanced... ›
Connection**. See [FTP and FTPS settings](../../connecting/ftp-ftps-settings/).
