---
title: SSH, SFTP and SCP settings
description: Tune the SSH connection, the algorithms it may use, and how SFTP and SCP behave on the server.
sidebar:
  order: 5
related:
  - manual/connecting/advanced-site-settings
  - manual/connecting/authentication
  - manual/connecting/host-keys
  - manual/connecting/protocols
---

SFTP and SCP sites get extra pages in [Advanced Site Settings](../advanced-site-settings/):
**SFTP** or **SCP/Shell** under **Environment**, and **SSH** with its
subpages **Key exchange**, **Authentication** and **Bugs**. Authentication
has [its own page](../authentication/). The rest is described here.

## SSH page

- **Enable compression** compresses the SSH stream. It helps on slow links
  with compressible data, such as text. On a fast network it mostly costs CPU.
- **Encryption cipher selection policy** lists the ciphers in order of
  preference. linscp uses the first one the server also supports. Select a
  cipher and move it with **Up** and **Down**.
- Ciphers placed below the **-- warn below here --** line can still be used,
  but linscp asks you first. Move weak ciphers under that line rather than
  deleting them, so that old servers still work after a warning.
- **Enable legacy use of single-DES** allows DES for very old servers. Leave
  it off.

## Key exchange page

Key exchange agrees on the session keys. **Algorithm selection policy** works
like the cipher list, with its own warning line.

- **Attempt GSSAPI key exchange** uses Kerberos for key exchange where the
  server supports it. On Linux this needs the system Kerberos library
  (`libgssapi_krb5`) and a valid ticket.
- **Max minutes before rekey** and **Max data before rekey** control how often
  fresh keys are negotiated during a long session. `0` disables the limit.
  Data takes a suffix such as `1G` or `500M`.

## Bugs page

Some SSH servers mishandle parts of the protocol. Each entry on this page
works around one such problem. **Auto** lets linscp decide from the server's
version string; set an entry to **On** only when the log or the server's
documentation points to that bug.

## SFTP page

- **SFTP server** is normally **Default**. Enter a path, such as
  `/usr/lib/openssh/sftp-server`, to start a specific server binary. A
  command like `sudo su -c /usr/lib/openssh/sftp-server` gives you an SFTP
  session with other privileges, if the server's `sudo` rules allow it
  without a password prompt.
- **Preferred SFTP protocol version** caps the version linscp asks for.
  **Auto** picks the highest both sides support.
- **Canonicalize paths on the server** lets the server resolve `..` and
  links in paths.
- **Allow SCP fallback** switches to SCP when the server has no SFTP
  subsystem.
- **Use POSIX rename** makes a rename replace an existing target in one step,
  on servers that support the OpenSSH extension.
- **Detection of known bugs in SFTP servers** holds two workarounds, for
  servers that swap the arguments of the link command and for those that
  misread timestamps before 1970.

## SCP/Shell page

SCP works through the remote shell, so this page is about that shell. With
SFTP the page is called **Shell**; its settings matter when linscp falls back
to SCP or opens a separate shell session for console commands.

- **Shell** picks the shell to run. `sudo su -` starts a root shell if your
  account may do that without a password.
- **Return code variable** names the variable that holds the last command's
  exit status. **Autodetect** works for common shells.
- **Listing command** is the command used to list directories, `ls -la` by
  default. **Ignore LS warnings** keeps going when `ls` complains about
  single files. **Try to get full timestamp** asks `ls` for seconds as well.
- **Lookup user groups**, **Clear aliases** and **Clear national variables**
  make command output predictable. Keep them on unless the server's shell
  rejects them.
- **Use scp2 with scp1 compatibility** is for very old SSH servers.

:::tip
If SCP fails with odd errors, the usual cause is a login script that prints
text, such as a welcome message in `~/.bashrc`. Make that output appear only
in interactive shells.
:::
