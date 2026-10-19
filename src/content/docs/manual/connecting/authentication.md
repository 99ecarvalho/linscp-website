---
title: Authentication
description: How linscp proves who you are to the server, from passwords and prompts to keys, the SSH agent and Kerberos.
sidebar:
  order: 8
related:
  - manual/connecting/ssh-keys
  - manual/connecting/host-keys
  - manual/security/master-password
  - manual/security/overview
---

After the connection is set up and the server's identity is checked, you
have to prove yours. For FTP, WebDAV and S3 that means the user name and
password (or access keys) from the Site Manager, or a client certificate.
SSH servers offer more methods, set on the **SSH › Authentication** page of
[Advanced Site Settings](../advanced-site-settings/).

## Passwords and prompts

Leave the password empty in the Site Manager and linscp asks for it when it
connects. The prompt can offer two extras:

- **Change stored password to this one**, when a saved password was rejected
  and you typed a new one.
- **Remember password for this session**, so reconnecting and opening
  another tab for the same site do not ask again. To make that the default,
  check **Remember password for duration of session** under
  **Options › Preferences › Security**.

Some servers show a banner before login. Its context menu has **Copy** and
**Use Monospaced Font**, for banners drawn with text art.

To change your password on an SFTP or SCP server while connected, use
**Tabs › Change Password...**.

## SSH authentication methods

The server says which methods it accepts. linscp tries the enabled ones until
one succeeds.

- **Attempt authentication using agent**: offers the keys held by your SSH
  agent. See below.
- **Private key file**: a key stored on disk, in PuTTY's `.ppk` format. See
  [SSH keys](../ssh-keys/) for creating and converting keys.
- **Certificate to use with the private key**: an OpenSSH certificate
  (`*-cert.pub`) signed by a CA the server trusts.
- **Attempt 'keyboard-interactive' authentication**: server-driven prompts,
  used for one-time codes and two-factor logins as well as plain passwords.
  Its sub-option answers the first of those prompts with the saved password,
  which suits servers that ask for the password that way.
- **Attempt GSSAPI authentication**: Kerberos single sign-on. **Allow GSSAPI
  credential delegation** passes your ticket on to the server.
- **Bypass authentication entirely**: for the rare server that needs no
  login at all.

**Allow agent forwarding** lets commands you run on the server use your
local agent, for example to reach a further host. Enable it only for servers
you trust, since their administrators can use your agent while you are
connected.

## Using an SSH agent

:::note[Linux]
On Linux, linscp talks to the agent whose socket is in `$SSH_AUTH_SOCK`.
That is usually OpenSSH's `ssh-agent`, GNOME Keyring or KeePassXC. PuTTY's
Unix `pageant` works too when it sets that variable. Pageant is not bundled,
and the **Authentication agent** choice in **Options › Preferences ›
Security** has no effect on Linux.
:::

Load your key into the agent once, for example with `ssh-add`:

```sh
ssh-add ~/.ssh/id_ed25519
```

linscp then logs in without asking for the passphrase. If linscp is started
from a desktop menu, the agent variable must be set in your desktop session,
not only in a terminal.

On Windows, linscp uses Pageant or OpenSSH's agent, as chosen under
**Authentication agent**. **Run Pageant** in the Site Manager's **Tools** menu
starts Pageant when it is installed next to linscp or on the search path.

## Kerberos (GSSAPI)

On Linux, GSSAPI uses the system Kerberos library (MIT `libgssapi_krb5`, or
Heimdal). Get a ticket with `kinit` before connecting. Windows' built-in
SSPI is not available on Linux.

## Keeping credentials safe

Saved passwords are only obfuscated in the configuration file. Prefer keys
or an agent, or protect saved passwords with a
[master password](../../security/master-password/).
