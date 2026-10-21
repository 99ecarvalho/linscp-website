---
title: Packaging
description: Build the .deb, AppImage, Flatpak, Windows installer and portable zip from a release configuration.
sidebar:
  order: 2
related:
  - manual/developers/building
  - manual/getting-started/install-linux
  - manual/getting-started/install-windows
---

linscp ships five packages, and every one is built from a Linux machine. CI
builds all of them on each run and keeps them as artifacts; a tagged release
publishes them on GitHub. This page shows how to build them yourself. Set up
the toolchain first, as in [building from source](../building/).

## Release configuration

Packages come from a release build without tests:

```sh
cmake -S . -B build/release -G Ninja \
  -DCMAKE_BUILD_TYPE=Release -DLINSCP_RELEASE=ON -DBUILD_TESTING=OFF \
  -DCMAKE_C_COMPILER=clang -DCMAKE_CXX_COMPILER=clang++
```

`LINSCP_RELEASE=ON` removes the development marking from the version. The
results land in `build/release/packages/`.

## What every Linux package installs

All three Linux packages share one install layout, made by `cmake --install`:

| Path | Contents |
|---|---|
| `lib/linscp/` | `linscp`, `linscp-cli` and `Translations/`, kept together because the core looks for its translations beside the program |
| `bin/` | Symbolic links to the two programs |
| `share/applications/` | The desktop file, which also registers the URL handler |
| `share/icons/hicolor/`, `share/metainfo/` | Icons and AppStream metadata |
| `share/doc/linscp/` | linscp's licence and those of every bundled component |

The application ID is `org.linscp.linscp`. The install rules are
in `port/packaging/CMakeLists.txt`.

## The .deb

```sh
cmake --build build/release --target package-deb
```

CPack builds `linscp_<version>_amd64.deb`, and `dpkg-shlibdeps` reads the
dependencies from the binaries. The package is therefore tied to the
distribution you build it on. You need `dpkg-dev`.

## The AppImage

```sh
cmake --build build/release --target package-appimage
```

The script fetches linuxdeploy, its Qt plugin and appimagetool at the
versions and checksums in `port/packaging/appimage/tools.lock`. It needs
`file`, `qt6-svg-plugins` and `qt6-wayland`. The image runs on systems whose
glibc is at least as new as the build machine's, so build it on the oldest
system you want to support.

## The Flatpak

```sh
python3 port/tools/build_flatpak.py
flatpak install --user build/flatpak/packages/linscp-<version>.flatpak
```

The manifest, `port/packaging/flatpak/org.linscp.linscp.yml`,
builds the current checkout on KDE's runtime with the freedesktop LLVM
extension for clang. The script installs the runtime, SDK and extension from
Flathub for your user if they are missing. The manifest also lists the
sandbox permissions; keep them minimal and comment each one.

## The Windows installer

The installer uses Inno Setup 6, fetched at a pinned version and run under
Wine. Install `wine` and `wine32` (the Inno compiler is 32-bit), then:

```sh
cmake -S . -B build/win-release -G Ninja \
  -DCMAKE_BUILD_TYPE=Release -DLINSCP_RELEASE=ON -DBUILD_TESTING=OFF \
  -DCMAKE_TOOLCHAIN_FILE=cmake/toolchain-llvm-mingw.cmake
cmake --build build/win-release --target installer
```

The script is `port/packaging/windows/linscp.iss`. It produces
`linscp-<version>-setup.exe`, which offers a per-user or all-users install,
optional translations, and the desktop icon, Send To, URL handler and `PATH`
tasks.

With the .NET SDK available (`python3 port/tools/fetch_dotnet.py --dest
build/win-release/tools/dotnet`, or `-DLINSCP_HOST_DOTNET=<path>`), the Windows
packages also include WinSCP's .NET assembly in a `dotnet` folder, with
`linscp-cli` standing in as the `WinSCP.exe` it starts.

## The portable zip

```sh
cmake --build build/win-release --target package-portable
```

This zips the deploy folder with an empty `linscp.ini` and a `licenses`
folder into `linscp-<version>-portable.zip`. The INI file is what makes it
portable: while it exists, linscp writes nothing to the registry.

## Signing

None of the packages is code-signed yet. If you redistribute linscp, say so,
and publish checksums next to your files.
