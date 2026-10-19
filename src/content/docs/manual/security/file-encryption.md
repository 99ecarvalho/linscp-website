---
title: Client-side file encryption
description: Encrypt file names and contents on an SFTP server so only holders of your key can read them.
sidebar:
  order: 3
related:
  - manual/security/overview
  - manual/security/master-password
---

linscp can encrypt files on your computer before it uploads them over SFTP,
and decrypt them when you download them. In linscp's panels you work with the
real names and contents. Anyone who looks at the server without your key,
including its administrator, sees only scrambled names and data.

This is useful when you rent storage you do not fully trust, for example as
an off-site backup target together with
[synchronization](../../sync/synchronize/).

:::note
Encryption is available for SFTP sites only.
:::

## Turn it on for a site

1. In the Site Manager, select the site and click **Advanced...**.
2. Open **Environment › Encryption**.
3. Check **Encrypt files**.
4. Enter an **Encryption key**, or click **Generate Key** to have linscp make
   a random one. The key is 256 bits, written as 64 hexadecimal characters.
5. Click **OK** and save the site.

When linscp generates a key, it offers to copy it to the clipboard. Store a
copy somewhere safe, such as a password manager.

:::caution
If you lose the key, the encrypted files cannot be recovered. Nobody,
including the linscp project, can help you.
:::

The key is saved with the site the same way a password is. Protect it with a
[master password](../master-password/).

## What gets encrypted

- **New files you upload** are encrypted. To upload a particular file
  unencrypted, uncheck **Encrypt new files** in the
  [transfer settings](../../transfers/transfer-settings/).
- **New folders** you create get encrypted names, following the same setting.
- **Files you overwrite keep their state.** Replacing an encrypted file
  writes an encrypted file; replacing a plain file writes a plain file.
- Existing plain files are not converted. To encrypt them, download them,
  delete them on the server, and upload them again.

A site can therefore hold a mix of encrypted and plain files. linscp shows
both with their real names.

## What the server can still see

Encryption hides names and contents, not everything:

- the folder structure (how many folders and files, and how they nest);
- each file's modification time, which is stored unchanged;
- each file's approximate size: an encrypted file is 32 bytes larger than
  the original, and an empty file stays empty.

## Server requirements

Encrypted names are longer than the originals and use both upper and lower
case letters. The server's file system must therefore:

- keep the case of names (Linux servers do; case-insensitive ones risk rare
  name clashes);
- allow long names. On the usual 255-character limit, original names of up
  to about 165 characters fit. Encrypted names end in `.aesctr.enc`.

## How it works

Contents and names are encrypted with AES-256 in CTR mode, with a fresh
random salt for each file and each name. linscp uses the same format as
WinSCP, so WinSCP on Windows reads the same files with the same key.
Because the format is open and standard, you can also decrypt the files with
other tools if you ever need to.
