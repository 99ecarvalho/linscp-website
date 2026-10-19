---
title: Architecture and upstream tracking
description: How linscp layers a Qt interface over WinSCP's unchanged core, and how it follows new WinSCP versions.
sidebar:
  order: 3
related:
  - manual/developers/building
  - manual/developers/testing
  - manual/developers/contributing
---

linscp reuses WinSCP's protocol core as it is and replaces only the user
interface. The repository holds no edited copy of WinSCP's source. Instead, a
script turns a pinned, untouched WinSCP checkout into buildable code at build
time. This page explains the layers and the reasons behind them.

## The layers

From top to bottom:

| Layer | Where | What it is |
|---|---|---|
| Qt interface (`linscp`) | `port/qt/` | Every window and dialog, written for Qt 6 after WinSCP's forms |
| Console client (`linscp-cli`) | `port/frontend/` | A script runner over the core's scripting engine |
| Bridge | `port/qt/CoreBridge.*` | The only code that sees both Qt and the core |
| WinSCP core | `3rd-party/winscp`, rewritten into `build/.../gen/` | Sessions, protocols, transfers, scripting |
| PuTTY, FileZilla's FTP engine, neon, libs3, expat, OpenSSL | from WinSCP's tree and `3rd-party/` | Protocol libraries, at the versions WinSCP uses |
| VCL replacement | `port/shim/` | The parts of Delphi's runtime library the core calls |
| Platform layer | `port/platform/` | On Linux, the subset of Win32 the core uses, built on POSIX |

The core never calls the user interface directly; it talks through an
abstract interface that WinSCP already had. linscp fills in that interface
twice: once for the Qt window and once for the console.

## Why a shim instead of a rewrite

WinSCP's core is written for Embarcadero C++Builder. It uses Delphi-style
properties, `__fastcall`, closures and VCL classes, and calls Win32 directly.
Rather than edit tens of thousands of lines, linscp supplies those pieces:

- Delphi properties become clang's `__declspec(property)`. This is the reason
  GCC cannot build linscp.
- `wchar_t` is two bytes on every platform, as on Windows, and the core's
  `long` keeps its 32 bits on 64-bit Linux.
- Win32 calls such as `CreateFile` or `WSAEventSelect` are implemented on top
  of POSIX in `port/platform/`.

## Keeping Qt and the core apart

Qt headers and the core's headers clash: macro names, `wchar_t` width, and
more. So no source file includes both. Qt code calls `CoreBridge.h`, a plain
C++ interface with UTF-8 strings and standard exceptions. `CoreBridge.cpp`
implements it on the core side. The build enforces the split with separate
CMake targets.

## Following WinSCP

The WinSCP submodule tracks WinSCP's `master` branch. To move to a newer
WinSCP:

1. Update the submodule pin.
2. Rebuild. `port/tools/transform.py` regenerates the tree, and the patch
   series in `port/patches/` is applied on top.
3. Fix whatever the transform or a patch now reports, then run the full test
   suite on Linux and under Wine.

Two rules keep this cheap:

- **The transform is mechanical and line-preserving.** A diff between
  upstream and the generated tree stays readable, and a test checks that it
  only contains the expected rewrites.
- **The output stays dual-target.** The transformed code still compiles with
  C++Builder and the original VCL, so every change linscp carries is one
  WinSCP could accept.

Changes that cannot be mechanical are small, reviewed patches. Bugs found in
WinSCP are offered upstream as pull requests; linscp carries the fix until an
equivalent lands upstream, then drops its patch.

The third-party libraries stay at the versions WinSCP bundles. OpenSSL is
built from the same release with its own build system, and a reviewed list
records which of WinSCP's OpenSSL changes linscp adopts.

## Configuration

linscp uses the core's own settings code. On Windows it keeps WinSCP's
registry key; on Linux and in portable mode it uses WinSCP's INI format. The
Qt interface's settings are WinSCP's GUI settings with the same keys, so a
configuration moves between the two programs unchanged.

## Decision records

Choices that are hard to undo are written up as architecture decision records
in `doc/qt/adr/` in the repository. They cover, among others, the
`wchar_t` width, the Win32 layer, the bridge, the Windows toolchain,
translations and configuration. `doc/qt/TRACKER.md` holds the live status of
every task, and `doc/qt/gaps.md` lists WinSCP features still being added.

A full fork, which would stop tracking WinSCP and commit the generated tree as
ordinary source, has been proposed but not scheduled. Until a decision is made,
linscp keeps following upstream.
