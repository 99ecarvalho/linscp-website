---
title: Stored passwords and master password
description: Protect the passwords you save with sites by locking them with a master password.
sidebar:
  order: 2
related:
  - manual/security/overview
  - manual/security/file-encryption
---

You can save a password with a site so that you do not type it on each
login. This page explains how linscp stores it and how a master password
keeps it safe.

## How saved passwords are stored

Saved passwords live in the configuration file, next to the rest of the site
settings (`~/.config/linscp/WinSCP.ini` on Linux; see
[configuration storage](../../preferences/storage-and-config/)). Without a
master password they are only scrambled, not encrypted. Any program or person
that can read the file can turn them back into plain text.

The same applies to everything linscp treats as a password: proxy and tunnel
passwords, and the key used for [file encryption](../file-encryption/).

With a master password set, linscp encrypts these values with AES. The key
comes from the master password, which linscp never writes to disk.

## Set a master password

1. Open **Options › Preferences › Security**.
2. Check **Use master password**.
3. Type the new password twice and confirm.

linscp warns you if the password looks easy to guess. The change takes
effect at once: existing saved passwords are re-encrypted, not when you close
**Preferences**.

To change it later, click **Change master password...** and enter the
current password first. To remove it, uncheck **Use master password**; your
saved passwords then go back to the unprotected form.

## When linscp asks for it

After each start, linscp prompts for the master password as soon as a
protected value is needed: when you open a site with a saved password, or
when you save a new one. It then remembers the master password until you
quit. If you cancel the prompt, the saved password stays locked and you
type the server password yourself.

:::note
`linscp-cli` asks for the master password on the terminal when a script opens
a site whose password it protects. Unattended scripts cannot answer that
prompt, so pass their credentials as described in
[sessions and credentials](../../scripting/sessions-and-credentials/).
:::

## If you forget it

There is no way to recover a lost master password, and no way to read the
passwords it protects. You can still get linscp back to a working state and
enter your passwords again:

1. Quit linscp.
2. Back up the configuration file.
3. In the file, delete the `[Configuration\Security]` section.
4. In every `[Sessions\...]` section, delete the `Password`,
   `ProxyPasswordEnc`, `TunnelPassword` and `EncryptKey` lines.
5. Start linscp and set a new master password if you want one.

## Alternatives to saving passwords

- **Do not save the password.** Leave the field empty and type it at login.
  **Options › Preferences › Security › Remember password for duration of
  session** saves retyping it for reconnects while linscp runs.
- **Use SSH keys with an agent.** The key's passphrase stays with your
  agent (`ssh-agent`, GNOME Keyring, KeePassXC) and linscp stores nothing.
  See [SSH keys](../../connecting/ssh-keys/) and
  [authentication](../../connecting/authentication/).
- **Workspaces.** When you save a workspace, leave **Save passwords (not
  recommended)** unchecked.

:::caution
A master password protects the file at rest. It does not protect you from
malware running as your user while linscp is unlocked.
:::
