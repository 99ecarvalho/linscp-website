---
title: Install on Linux
description: Install linscp from the .deb package, the AppImage or the Flatpak, and choose where it keeps its settings.
sidebar:
  order: 2
related:
  - manual/getting-started/quick-start
  - manual/getting-started/install-windows
---

linscp for Linux comes in three packages. Each holds both `linscp` and
`linscp-cli`, for 64-bit x86 machines. Download them from the
[download page](../../../download/) or from
[GitHub releases](https://github.com/99ecarvalho/linscp/releases).

## Pick a package

| Package | Pick it when | Needs |
|---|---|---|
| `.deb` | You run Debian 13 (trixie) or a distribution with the same Qt 6.8 packages | `apt` |
| AppImage | You want one file that needs no installation | glibc 2.41 or newer |
| Flatpak | Your distribution is older, or you prefer a sandboxed app | Flatpak, with Flathub configured |

To see your glibc version, run `ldd --version`.

## Install the .deb

```sh
sudo apt install ./linscp_0.7.1_amd64.deb
```

The `./` matters: without it, `apt` searches its repositories instead of the
file. `apt` also pulls in the Qt libraries linscp needs. The programs land in
`/usr/lib/linscp/`, with `linscp` and `linscp-cli` on your `PATH`, and linscp
appears in your desktop's application menu.

To remove it: `sudo apt remove linscp`.

## Run the AppImage

```sh
chmod +x linscp-0.7.1-x86_64.AppImage
./linscp-0.7.1-x86_64.AppImage
```

The AppImage starts the graphical program. It does not add itself to the
application menu; use a tool such as your desktop's AppImage integration if
you want that.

If the system has no FUSE support, the AppImage refuses to start. Add
`--appimage-extract-and-run` to the command to run it without FUSE.

`linscp-cli` is inside the image. Run
`./linscp-0.7.1-x86_64.AppImage --appimage-extract` once, and find it at
`squashfs-root/usr/lib/linscp/linscp-cli`.

## Install the Flatpak

The Flatpak runs on the KDE 6.10 runtime from Flathub. If Flathub is not set up
yet, add it first:

```sh
flatpak remote-add --user --if-not-exists flathub https://dl.flathub.org/repo/flathub.flatpakrepo
flatpak install --user linscp-0.7.1.flatpak
flatpak run org.linscp.linscp
```

Flatpak fetches the runtime on the first install. For the console client, run
`flatpak run --command=linscp-cli org.linscp.linscp`.

The sandbox lets linscp reach the network and your home directory. Files
outside your home directory, such as `/srv` or a mounted disk under `/media`,
are not visible to it.

## Where your settings go

linscp keeps all settings, including stored sites, in one INI file named
`WinSCP.ini`. `linscp` and `linscp-cli` share it.

| Package | File |
|---|---|
| `.deb`, AppImage | `~/.config/linscp/WinSCP.ini` (or `$XDG_CONFIG_HOME/linscp/`) |
| Flatpak | `~/.var/app/org.linscp.linscp/config/linscp/WinSCP.ini` |

The Flatpak does not share settings with a `.deb` or AppImage install. See
[configuration storage](../../preferences/storage-and-config/#the-flatpaks-configuration)
to copy them over.

The file uses WinSCP's format, so a `WinSCP.ini` exported from WinSCP on
Windows works when you copy it into place. See
[configuration storage](../../preferences/storage-and-config/) for export and
cleanup.

### Portable AppImage

To carry linscp and its settings on a USB stick, put an empty file named
`WinSCP.ini` in the same folder as the `.AppImage` file:

```sh
touch /media/alice/stick/WinSCP.ini
```

linscp then stores everything in that file and leaves `~/.config` alone.

:::tip
If you copy an existing WinSCP configuration into linscp, keep the original
as well. linscp updates the file as you work.
:::

## Next step

Make [your first connection](../quick-start/).
