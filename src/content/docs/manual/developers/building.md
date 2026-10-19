---
title: Building from source
description: Build linscp and linscp-cli on Linux, and cross-compile the Windows version from Linux.
sidebar:
  order: 1
related:
  - manual/developers/testing
  - manual/developers/packaging
  - manual/developers/architecture
---

linscp builds on Linux with clang and CMake. The Windows version is
cross-compiled on the same Linux machine; you do not need Windows or
C++Builder to build either.

## Requirements

- **clang** and **lld**. GCC does not work: linscp relies on clang's
  `__declspec(property)` support, which GCC lacks.
- CMake 3.25 or newer, Ninja, Python 3, Perl and make (OpenSSL's build
  scripts need the last two).
- Qt 6 with the SVG module and the translation tools.

On Debian 13 (trixie), this installs everything for a Linux build:

```sh
sudo apt install clang lld llvm cmake ninja-build make perl python3 git \
  libssl-dev zlib1g-dev qt6-base-dev qt6-svg-dev qt6-l10n-tools \
  qt6-translations-l10n
```

Other distributions work if their Qt 6 and clang are recent enough; Debian
13 is what the project's CI uses.

## Get the source

```sh
git clone https://github.com/99ecarvalho/linscp
cd linscp
git submodule update --init --depth 1
```

Use `git submodule update` as shown rather than `--recurse-submodules`.
OpenSSL's own submodules are test suites that the build does not need.

The submodules hold pinned copies of WinSCP, OpenSSL and PuTTY. Do not edit
them; see [architecture](../architecture/) for why.

## Build for Linux

```sh
cmake -S . -B build/linux -G Ninja \
  -DCMAKE_C_COMPILER=clang -DCMAKE_CXX_COMPILER=clang++
cmake --build build/linux --target linscp linscp-cli
```

The first build rewrites WinSCP's sources into `build/linux/gen/` before it
compiles them, so expect it to take a while. Later builds only redo what
changed.

Run the programs straight from the build tree:

```sh
build/linux/port/qt/linscp
build/linux/port/frontend/linscp-cli
```

A development build shows "Dev Build" in its version. Add
`-DLINSCP_RELEASE=ON` to drop that marking.

To keep your normal settings out of the way while testing, pass an INI file
of your own: `build/linux/port/qt/linscp /ini=/tmp/alice-test.ini`, or
`/ini=nul` to save nothing at all.

## Build for Windows

The Windows build uses [llvm-mingw](https://github.com/mstorsjo/llvm-mingw)
and MSYS2's prebuilt Qt. Both are downloaded at pinned versions and checked by
SHA-256. The host also needs Debian's Qt of the same version for `moc`, `uic`
and `rcc`, plus `binutils-mingw-w64-x86-64`.

```sh
python3 port/tools/fetch_llvm_mingw.py --dest build/tools
python3 port/tools/fetch_msys2_qt.py --dest build/tools/msys2-qt
cmake -S . -B build/win -G Ninja \
  -DCMAKE_TOOLCHAIN_FILE=cmake/toolchain-llvm-mingw.cmake
cmake --build build/win --target deploy
```

`build/win/deploy` is a folder you can copy to a Windows machine and run as
is. With Wine installed, you can also run it on Linux.

The target Qt and the host Qt must be the same version: 6.8.2 for now. If the
configure step cannot find a host Qt, it skips the GUI. The full story is in
`doc/qt/windows-toolchain.md` in the repository.

## Common problems

| Symptom | Cause |
|---|---|
| Errors about `__declspec(property)` | The compiler is GCC. Set `CMAKE_C_COMPILER` and `CMAKE_CXX_COMPILER` to clang. |
| `moc.exe: Syntax error` during a Windows build | No host Qt was found, so the build tried to run Windows tools. Install `qt6-base-dev`. |
| Missing files under `3rd-party/` | The submodules were not fetched. Run the `git submodule` command above. |

## Next steps

- Run the [test suite](../testing/).
- Build [packages](../packaging/).
