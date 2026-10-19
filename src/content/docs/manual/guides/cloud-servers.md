---
title: Cloud servers over SFTP
description: Reach a virtual machine at AWS, Google Cloud, Azure, DigitalOcean or similar hosts with SFTP and an SSH key.
sidebar:
  order: 2
related:
  - manual/guides/s3-compatible-storage
  - manual/guides/publish-website
---

A Linux virtual machine at a cloud provider almost always runs an SSH server,
so you can manage its files with SFTP. The steps are the same everywhere:
get an SSH key onto the machine, find its address and user name, and check
its host key on the first connection.

## 1. Prepare an SSH key

Most providers disable password logins and expect a key. Without a key
pair of your own, create one on your computer:

```sh
ssh-keygen -t ed25519 -f ~/.ssh/cloud_ed25519
```

This writes the private key `~/.ssh/cloud_ed25519` and the public key
`~/.ssh/cloud_ed25519.pub`. Give the provider the public key, usually while
you create the machine: look for a field named "SSH key" or "SSH public
key". Some providers instead generate a key pair for you and let you
download the private key once, as a `.pem` file. Keep it safe.

See [SSH keys](../../connecting/ssh-keys/) for other key types and for
adding a key to a machine that is already running.

## 2. Collect the connection details

Find these in the machine's page of the provider's console:

- **Address.** The public IP address or DNS name. Some providers change the
  public address when the machine restarts unless you reserve one.
- **User name.** It depends on the image, not on you. Typical names are
  `ubuntu` (Ubuntu), `debian` (Debian), `ec2-user` (Amazon Linux, some
  RHEL-based images) and `root` (some smaller providers). Google Cloud uses
  the user name attached to your key. The image's documentation has the
  right one.
- **Firewall.** Inbound TCP port 22 must be open from your address. Check
  the machine's security group, firewall rules or network settings.

## 3. Get the host key fingerprint

To be sure you reach your machine and not an impostor, get its host key
fingerprints over a channel you already trust. Most providers offer a
browser-based console or a "run command" feature. Run there:

```sh
for key in /etc/ssh/ssh_host_*_key.pub; do ssh-keygen -lf "$key"; done
```

Keep the output; you compare it in step 5.

## 4. Create the site

1. Open the Site Manager, select **New Site** and leave **File protocol** at
   **SFTP**.
2. Enter the address in **Host name** and the user in **User name**. Leave
   **Password** empty.
3. Click **Advanced...** and open **SSH › Authentication**.
4. In **Private key file**, choose your private key. If it is in OpenSSH or
   `.pem` format, linscp offers to convert it to PuTTY's `.ppk` format and
   saves the copy where you choose.
5. Click **OK**, then **Save**.

If your key is loaded in an SSH agent (`ssh-add ~/.ssh/cloud_ed25519`), you
can skip the key file: linscp asks the agent through `$SSH_AUTH_SOCK`. See
[authentication](../../connecting/authentication/).

## 5. Connect and verify

Click **Login**. On the first connection linscp shows the server's host key
fingerprint. Accept it only if it matches one of the lines from step 3. See
[verifying host keys](../../connecting/host-keys/).

## Files owned by root

You log in as an ordinary user, so you cannot write to places like
`/etc` or a web root owned by another user. If that user may run `sudo`
without a password, open **Advanced... › Environment › SFTP** and set
**SFTP server** to `sudo su -c /bin/sftp-server`, adjusting the path to the
SFTP server program on your machine (often `/usr/lib/openssh/sftp-server`).

:::caution
With that setting, everything you do in linscp runs as root on the server.
A mistaken delete cannot be undone.
:::

## When it does not connect

- A timeout usually means the firewall blocks port 22, or the address has
  changed.
- **Server refused our key** usually means the wrong user name, or the
  public key is not in that user's `~/.ssh/authorized_keys`.

[Connection and login problems](../../troubleshooting/connection-problems/)
covers these and more.
