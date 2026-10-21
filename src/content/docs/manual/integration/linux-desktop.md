---
title: Linux desktop integration
description: Make sftp:// and other links open in linscp, add launchers for linscp or a site, and put the programs on your PATH.
sidebar:
  order: 1
---

linscp follows the freedesktop.org conventions that GNOME, KDE, Xfce and most
other Linux desktops use. Packages bring a menu entry with them. From
**Options › Preferences › Integration**, in the **Desktop** group, you can
add the rest: link handling, a desktop launcher and command-line access.

## What the packages install

The `.deb` package and the Flatpak install the desktop entry
`org.linscp.linscp.desktop`. It puts linscp in the **Network**
section of your application menu and tells the desktop that linscp can open
these link types:

- `sftp://`, `scp://`, `ssh://`
- `ftp://`, `ftps://`, `ftpes://`
- `dav://`, `davs://`, `s3://`
- the WinSCP-specific forms such as `winscp-sftp://` and `winscp-https://`

Being able to open a link type is not the same as being its default. If
another program already handles `sftp://`, links keep going there until you
register linscp as below.

The AppImage installs nothing by itself. Use the buttons below to integrate it.

## Open links in linscp

1. Open **Options › Preferences › Integration**.
2. Click **Register to handle URL addresses** and choose **Register**.
3. Confirm.

What linscp writes depends on how you installed it:

- **AppImage or a build of your own**: linscp writes
  `~/.local/share/applications/org.linscp.linscp.desktop` for the link types
  listed above, with its icon in `~/.local/share/icons/hicolor/`, and
  refreshes the desktop database when `update-desktop-database` is installed.
- **`.deb` or other package, Flatpak**: the package's desktop entry already
  declares the link types, so linscp writes no entry or icon of its own.

In every case it makes `org.linscp.linscp.desktop` the default for each link
type in `~/.config/mimeapps.list` and leaves your other defaults alone. The
Flatpak writes to that file in your home folder, not to its sandbox's copy.

To undo it, choose **Unregister** from the same button. linscp removes its
lines in `mimeapps.list`, and the entry it wrote, if any. A package's entry
stays: the link types remain available to choose, just not the default.

You can also set a single default by hand:

```sh
xdg-mime default org.linscp.linscp.desktop x-scheme-handler/sftp
```

### After an upgrade

Versions before the application ID was introduced named these files
`linscp.desktop` and `linscp.png`. When a newer linscp starts, it removes
those files from `~/.local/share`, writes the link handler again under the new
name if you had registered one, renames the entries in `mimeapps.list`, and
points the launchers it made on your desktop at the new icon. You do not get
a second linscp in the menu.

A link opened this way starts linscp with the `/Unsafe` switch. linscp then
treats the link as untrusted: it drops the risky settings a link could carry
and refuses switches such as `/ini`. See
[session URLs](../../connecting/session-urls/).

## Desktop launchers

- **Create a desktop icon** puts an `org.linscp.linscp.desktop` launcher on
  your desktop folder.
- In the Site Manager, select a site and choose **Tools › Desktop Icon** to
  get a launcher that opens that site directly, named
  `org.linscp.linscp-<site>.desktop`. The desktop shows the site's name.

Launchers are marked executable. Some desktops still ask you to trust a new
launcher before it runs; in GNOME, right-click it and choose
**Allow Launching**.

Launchers follow how you run linscp: an AppImage launcher points at the
`.AppImage` file, and a Flatpak one runs `flatpak run`. If you move the
AppImage, create the launchers and the link registration again.

## Run linscp from a terminal

**Add linscp to search path** creates links to `linscp` and `linscp-cli` in
`~/.local/bin`. Most distributions put that folder on your `PATH`; open a new
terminal afterwards. Then you can type:

```sh
linscp sftp://alice@example.com/
linscp-cli /script=/home/alice/upload.txt
```

The `.deb` package already installs both programs on the system path, so you
need this mainly for the portable builds.

## Not available on Linux

The Windows shell features have no Linux counterpart in linscp: the Explorer
**Send To** entry, the taskbar jump list, the shell's own file context menu
and the drag-and-drop shell extension. See
[Windows shell integration](../windows-shell/). To open a session in a
terminal, see [PuTTY and terminals](../putty-and-terminal/).
