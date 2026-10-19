---
title: SSH keys
description: Create a key pair, convert it to the format linscp reads, and put the public key on the server.
sidebar:
  order: 9
related:
  - manual/connecting/authentication
  - manual/connecting/host-keys
  - manual/connecting/advanced-site-settings
---

A key pair replaces your password with something much harder to guess. The
private key stays on your computer; the public key goes on the server. When
you log in, linscp proves it holds the private key without sending it.

This page uses OpenSSH's tools for creating keys, because every Linux
distribution ships them, and linscp's own tools for converting and
installing.

## Create a key pair

```sh
ssh-keygen -t ed25519 -C "alice@laptop"
```

Accept the default location (`~/.ssh/id_ed25519`) or give another, and set a
passphrase. This creates the private key `id_ed25519` and the public key
`id_ed25519.pub`. Ed25519 keys are short, fast and accepted by any current
OpenSSH server. Use `-t rsa -b 4096` only for servers too old to know
Ed25519.

:::note[Windows only]
On Windows, the **Tools** button on the **Authentication** page offers
**Generate New Key Pair with PuTTYgen...** when PuTTYgen is installed. On
Linux that entry is disabled; PuTTY's Linux `puttygen` is a command-line tool.
:::

## Use the key in linscp

linscp reads private keys in PuTTY's `.ppk` format. You can still pick an
OpenSSH key:

1. Open the site's **Advanced Site Settings**, page **SSH › Authentication**.
2. In **Private key file**, browse to `~/.ssh/id_ed25519`.
3. linscp sees an OpenSSH key and offers to convert it. Confirm, and choose
   where to save the `.ppk` file. The original key is left as it is.

You can also convert on the command line with `linscp-cli /keygen`:

```sh
linscp-cli /keygen ~/.ssh/id_ed25519 /output=$HOME/.ssh/id_ed25519.ppk
```

The same command changes an existing `.ppk` key in place: `/comment=` sets a
new comment, `/changepassphrase` asks for a new passphrase, and
`/certificate=` attaches an OpenSSH certificate. If PuTTY's `puttygen` is
installed, `puttygen ~/.ssh/id_ed25519 -o id_ed25519.ppk` does the same
conversion.

If the key is loaded into your SSH agent, you do not need a key file at all.
See [Authentication](../authentication/#using-an-ssh-agent).

## Put the public key on the server

The server must list your public key in `~/.ssh/authorized_keys`. Choose one
of these ways.

**From linscp.** On the **Authentication** page, open **Tools** and choose
**Install Public Key into Server...**. In a connected session, use
**Tabs › Install Public Key into Server...** instead. Both need SFTP. linscp
adds the key to `~/.ssh/authorized_keys` and creates `~/.ssh` with
permissions `700` if it is missing.

**From linscp-cli.** Pass the key with `/copyid`, and the site or URL to
connect to:

```sh
linscp-cli /copyid /identity=$HOME/.ssh/id_ed25519.pub sftp://alice@files.example.org/
```

**With OpenSSH.** `ssh-copy-id -i ~/.ssh/id_ed25519.pub alice@files.example.org`.

**By hand.** **Display Public Key** on the **Authentication** page shows the
line to paste into `authorized_keys`, with a button to copy it.

For the first install you still log in with your password. Afterwards, test
a login with the key, then consider turning password logins off on the
server.

:::caution
Keep the private key private. Do not copy it to servers, and protect it with
a passphrase. If it leaks, remove its public key from every
`authorized_keys` file.
:::
