---
title: Site Manager
description: Store connection details as sites, sort them into folders, find them fast and import them from other programs.
sidebar:
  order: 2
related:
  - manual/connecting/protocols
  - manual/connecting/advanced-site-settings
  - manual/connecting/session-urls
  - manual/security/master-password
---

The Site Manager is where every connection starts. It opens when linscp
starts and whenever you open a new remote tab (<kbd>Ctrl</kbd>+<kbd>N</kbd>,
or **Tabs › New Tab › Remote Tab...**). The tree on the left holds your saved
sites, folders and workspaces; the form on the right shows the selected
site's connection details.

![The Site Manager](../../../../assets/screenshots/site-manager.png)

## Connect to a server once

1. Select **New Site** at the top of the tree.
2. Choose the **File protocol** and, where offered, the **Encryption**. See
   [Choosing a protocol](../protocols/).
3. Type the **Host name**. The **Port number** follows the protocol unless you
   change it.
4. Fill in **User name** and **Password**, or leave the password empty to be
   asked for it.
5. Click **Login**.

You can paste a whole URL such as `sftp://alice@files.example.org/var/www/`
into **Host name**. When you leave the field, linscp splits it into protocol,
host, port, user and directory.

Protocol-specific shortcuts sit on the same form. With FTP, **Anonymous
login** fills in the conventional anonymous user name and password and locks
both fields. With
Amazon S3, the user and password labels change to the access key fields, and
**Credentials from AWS environment** takes them from your AWS setup instead
(see [WebDAV and S3 settings](../webdav-s3-settings/)).

## Save a site

Click **Save** to store the form as a site. In the dialog, give the site a
name and, if you like, a **Folder**. A slash in the name also creates
folders: `Clients/Example/staging` lands in two nested folders.

Saving the password is optional and off by default. A saved password is
only obfuscated, unless you set a
[master password](../../security/master-password/).

The arrow beside **Save** offers:

- **Save As...** to store the form under another name, leaving the original.
- **Set Defaults** to make the current form the starting point for every new
  site.

## Organize sites

Right-click an item in the tree, or use **Manage**, for the actions that fit
it: **Edit**, **Clone to New Site**, **Rename** (or <kbd>F2</kbd>),
**Delete**, **New Folder...**, **Generate Session URL/Code...** and
**Desktop Icon**. Drag a site onto a folder to move it there.

A site's color and note, set in [Advanced site settings](../advanced-site-settings/),
show in the tree and under the form.

## Find a site

Start typing while the tree has focus. linscp jumps to the first match;
<kbd>Tab</kbd> and <kbd>Shift</kbd>+<kbd>Tab</kbd> move between matches, and
<kbd>Esc</kbd> ends the search. <kbd>Ctrl</kbd>+<kbd>F</kbd> (**Find Site**)
opens the search box directly. **Options** in the search menu sets what is
matched:

- **Beginning of Site Name Only**: the name must start with what you type.
- **Any Part of Site Name**: the text may appear anywhere in the name.
- **All Major Site Fields**: host and user name are searched as well.

## Import sites

**Tools › Import Sites...** reads connections from other programs. Choose the
source in **Import from**, check the sites you want and confirm:

- **FileZilla**: its `sitemanager.xml` from `~/.config/filezilla`.
- **OpenSSH**: hosts from `~/.ssh/config`. Keys in OpenSSH format are offered
  for conversion to PuTTY format.
- **known_hosts**: host keys from `~/.ssh/known_hosts`, added to the hosts
  linscp trusts.
- **INI file**: sites from another WinSCP or linscp configuration file.
- **PuTTY** and **KiTTY**: their saved sessions.

:::note[Windows only]
PuTTY and KiTTY keep their sessions in the Windows registry, so on Linux
these two sources find nothing.
:::

## Other tools

The **Tools** menu also holds **Import/Restore Configuration...** and
**Export/Backup Configuration...** for the whole configuration file,
**Clean Up...** to remove data linscp has stored, and **Run Pageant** and
**Run PuTTYgen**. Those two are enabled only when the programs are found
beside linscp or on your `PATH`.
