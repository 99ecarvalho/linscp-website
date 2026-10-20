---
title: General questions
description: Short answers about what linscp is, its licence, platforms, settings and privacy.
sidebar:
  order: 1
related:
  - manual/faq/connecting
  - manual/faq/transfers-and-scripting
---

### Is linscp the same as WinSCP?

No. linscp is a separate project that runs WinSCP's protocol core under a new
Qt interface on Linux and Windows. It is not affiliated with or endorsed by
the WinSCP project. See [linscp and WinSCP](../../getting-started/linscp-and-winscp/).

### Is it free, also for companies?

Yes. linscp is licensed under the GPL version 3, so anyone can use it, at
home or at work, without buying licences. See
[licence and credits](../../about/license-and-credits/).

### Which systems does it run on?

Linux (as a `.deb` package, an AppImage or a Flatpak) and Windows (installer
or portable zip). See [install on Linux](../../getting-started/install-linux/)
and [install on Windows](../../getting-started/install-windows/).

### Which protocols does it support?

SFTP, SCP, FTP with or without TLS (FTPS), WebDAV and Amazon S3 and
compatible services. See [choosing a protocol](../../connecting/protocols/).

### Is linscp finished?

Not quite: it is an early release (version 0.7.0). Most of WinSCP's features
work; the remaining differences are listed in
[linscp and WinSCP](../../getting-started/linscp-and-winscp/).

### Why does Windows warn me about the installer?

linscp's Windows files are not code-signed yet, so SmartScreen does not
recognise them. Download them only from the project's GitHub Releases page.
See [install on Windows](../../getting-started/install-windows/).

### Where are my settings stored?

On Linux in `~/.config/linscp/WinSCP.ini`, in the same INI format WinSCP
uses. See [configuration storage](../../preferences/storage-and-config/).

### Can I bring my sites over from WinSCP or another client?

Yes. In the Site Manager, use **Tools › Import Sites...**, or copy a WinSCP
INI file. See [Site Manager](../../connecting/site-manager/).

### How do I move my settings to another computer?

Use **Tools › Export/Backup Configuration...** in the Site Manager, then
**Import/Restore Configuration...** on the other computer. See
[configuration storage](../../preferences/storage-and-config/).

### Can I recover a password I saved in a site?

Anyone who can read your configuration file can recover saved passwords,
unless you set a master password. That is why you should set one. See
[stored passwords and master password](../../security/master-password/).

### Does linscp send any data about me?

No usage statistics are collected. The update check is off by default and,
when on, only asks GitHub for the newest release. See
[privacy](../../about/privacy/).

### Can I mount a server as a folder or drive?

No. linscp transfers files but does not mount servers. On Linux, tools such
as `sshfs`, `rclone mount` or your file manager's network locations do that.

### Can I use linscp in my language?

Yes. linscp comes with WinSCP's translations; pick one under
**Options › Preferences › Languages**. See
[translations](../../about/translations/).

### Where do I ask for help?

Ask in GitHub Discussions and report bugs as GitHub issues, not on WinSCP's
forum. See [getting help and reporting bugs](../../troubleshooting/reporting-bugs/).
