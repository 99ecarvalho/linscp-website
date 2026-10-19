---
title: Testing
description: Run linscp's test suite on Linux and under Wine, including the real-server and golden-output tests.
sidebar:
  order: 4
related:
  - manual/developers/building
  - manual/developers/contributing
---

linscp's tests run through CTest, the same way on a laptop and in CI. They
start their own servers on `127.0.0.1`, so you need no outside accounts and
nothing listens beyond loopback.

## Run the suite

After a [Linux build](../building/):

```sh
ctest --test-dir build/linux
```

Add `-j8` to run tests in parallel, `-R qt_gui` to run only the tests whose
names match, and `--output-on-failure` to see why a test failed. A test that
cannot run here, for example because a server program is missing, is reported
as skipped rather than failed.

For the Windows build, the same command runs every test under Wine:

```sh
ctest --test-dir build/win
```

## What is covered

| Group | Examples | What it checks |
|---|---|---|
| Runtime and platform | `unicodestring`, `datetime`, `win32_on_posix` | The VCL replacement and the Win32 layer behave as the core expects |
| Core | `core_init`, `ini_sites`, `sftp_session` | The core starts, reads stored sites and runs real sessions |
| Console client | `cli_session`, `protocols`, `keepuptodate` | `linscp-cli` runs scripts over SFTP, SCP, FTP, FTPS, WebDAV and S3 |
| Golden output | `golden` | linscp's XML logs match those written by real WinSCP for the same scripts |
| Interface | `qt_gui_*`, `qt_dialogs` | The windows and dialogs, driven offscreen, with menus checked against WinSCP's forms |
| Translations | `translations_current`, `qt_language` | Every `.ts` file matches the sources; translations load |
| Accessibility | `qt_gui_accessibility` | Controls have names, and access keys do not clash |
| Upstream tracking | `transform_verify`, `patch_series` | The generated tree is a faithful rewrite of WinSCP's source |

The interface tests run with `-platform offscreen`, so they need no display.

## Servers the tests use

By default the suite uses lightweight servers: rclone for SFTP, OpenSSH's
`sshd` where a real shell is needed, and small FTP and S3 servers written for
the suite in Python. On Debian, install them with:

```sh
sudo apt install openssh-server rclone python3-pyftpdlib python3-boto3 \
  python3-moto python3-flask-cors python3-openssl
```

### Real servers

With docker or podman installed, tests labelled `real-servers` also run
against OpenSSH, vsftpd (FTP with explicit and implicit TLS), Apache's
mod_dav (WebDAV with locking) and Versity's S3 gateway. The image is built
from `port/tests/servers/` the first time:

```sh
ctest --test-dir build/linux -L real-servers
```

Without a container engine these tests are skipped.

## The golden corpus

`port/tests/golden/` holds scripts and the XML logs that real WinSCP wrote
for them on Windows. The `golden` test runs the same scripts through
`linscp-cli` and compares the logs. A known, accepted difference is listed in
`known-differences.txt` and does not fail the test.

The test needs the same rclone version the corpus was recorded with:

```sh
port/tools/fetch_rclone.py --corpus port/tests/golden/expected --dest build/linux/tools
```

When you add or change a case, capture the expected logs again with WinSCP
on Windows, as `port/tests/golden/README.md` describes.

## Screenshots

The screenshots in this manual and the README are made by a test, against a
local server, with the light theme:

```sh
port/tests/run_qt_session.py build/linux/port/tests/test_qt_gui screenshots \
  /ini=nul {port} {tmp}/local $PWD/doc/screenshots -platform offscreen
```

## Before you send a change

- Run the whole suite on Linux.
- If the change touches Windows code, run it under Wine too.
- For interface changes, add a test in `port/tests/test_qt_gui.cpp` and make
  sure `qt_gui_accessibility` and `translations_current` still pass.

See [contributing](../contributing/) for the rest of the checklist.
