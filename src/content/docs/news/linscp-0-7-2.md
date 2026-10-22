---
title: linscp 0.7.2 — signed releases and a permanent name
description: linscp gets its permanent name on the Linux desktop, signed releases, and packages for more systems.
date: 2026-10-22
badge: Release
template: splash
tableOfContents: false
---

linscp 0.7.2 is out. It gives linscp its permanent name on the Linux desktop,
signs every release, and prepares linscp for more systems' package managers.

## What's new

- **A permanent application ID, `org.linscp.linscp`.** The desktop entry, the
  icons and the Flatpak use it, and on Wayland the window now matches its
  launcher and icon. What an older version registered is renamed or cleaned
  up on first start.
- **Signed releases.** The source tarball and the checksums are signed with
  linscp's release key, so you can check that a download is genuine — the
  [security page](https://github.com/99ecarvalho/linscp/blob/main/SECURITY.md#verifying-a-download)
  shows how.
- **FTP downloads on Linux** name the file when asking whether to overwrite
  it, and create the target folders first.
- **Secure connections follow your system's crypto policy** on distributions
  that have one, such as Fedora.
- **A smaller AppImage**, with only what linscp needs.
- **The Flatpak** updates through Flathub, and hides the power options the
  sandbox cannot use.
- **Manual pages:** `man linscp` and `man linscp-cli`.

## Coming next

Packages for Arch (AUR), Fedora, openSUSE, Ubuntu, Nix and the Windows
package managers are ready and will appear as each channel opens.

## Get it

[Download linscp 0.7.2](../../download/), or read the
[full release notes](https://github.com/99ecarvalho/linscp/releases/tag/v0.7.2).
