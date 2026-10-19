---
title: Connecting questions
description: Short answers about logging in, host keys, SSH keys, agents and certificates.
sidebar:
  order: 2
related:
  - manual/faq/general
  - manual/faq/transfers-and-scripting
---

### Where do I get a host name, user name and password?

From whoever runs the server: your hosting provider, cloud console or
administrator. linscp cannot look them up or reset them for you. See
[your first connection](../../getting-started/quick-start/).

### Where do I type the server's IP address?

In **Host name**. It takes either a name such as `example.com` or an
address such as `192.0.2.10`. See [Site Manager](../../connecting/site-manager/).

### How do I avoid filling in the details every time?

Save the site with **Save** in the Site Manager. Then double-click it to
connect. See [Site Manager](../../connecting/site-manager/).

### How do I start in a particular folder?

Set **Remote directory** and **Local directory** under **Advanced... ›
Environment › Directories**. See
[advanced site settings](../../connecting/advanced-site-settings/).

### Where do I find the host key fingerprint to check?

Ask the administrator, or read it on the server through a channel you
already trust, such as a provider's browser console, with `ssh-keygen -lf`
on the files in `/etc/ssh/`. See [verifying host keys](../../connecting/host-keys/).

### Can I use my existing OpenSSH key?

Yes. Choose it under **Advanced... › SSH › Authentication › Private key
file**; linscp offers to convert it to PuTTY's `.ppk` format. See
[SSH keys](../../connecting/ssh-keys/).

### How do I log in without typing my key's passphrase each time?

Load the key into an SSH agent (`ssh-add`). linscp uses the agent at
`$SSH_AUTH_SOCK` on Linux; Pageant is not included there. See
[authentication](../../connecting/authentication/).

### Why does linscp keep asking for my password?

The password is not saved with the site, the saved one is wrong, or you
cancelled the master password prompt. See
[stored passwords and master password](../../security/master-password/).

### Why is my password rejected when it works elsewhere?

Check the user name, the keyboard layout and whether the server allows
password logins at all; many cloud servers accept only keys. See
[connection and login problems](../../troubleshooting/connection-problems/).

### Why can other programs connect when linscp cannot?

Usually a firewall rule or proxy setting applies to one program and not the
other. See [connection and login problems](../../troubleshooting/connection-problems/).

### Can I connect to an FTP server?

Yes. Prefer FTPS (FTP with TLS) so the password is encrypted. See
[FTP and FTPS settings](../../connecting/ftp-ftps-settings/).

### How do I know the connection is secure?

SFTP and SCP are always encrypted. FTP, WebDAV and S3 are encrypted only
with TLS. See the [security overview](../../security/overview/).

### Why is a certificate refused on Linux but accepted on Windows?

On Linux, linscp does not fetch intermediate certificates that the server
leaves out, so an incomplete chain fails. Ask the operator to send the full
chain. See the [security overview](../../security/overview/).

### Can I switch to another user, like root, after logging in?

Not within an SFTP session. If you may use `sudo` without a password, set
the site's **SFTP server** to run through `sudo`. See
[cloud servers](../../guides/cloud-servers/).

### How do I connect through a proxy or jump host?

Use the site's **Proxy** or **Tunnel** page. See
[proxies, jump hosts and tunnels](../../connecting/proxies-and-tunnels/).
