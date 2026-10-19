---
title: Getting help and reporting bugs
description: Where to ask about linscp, what to put in a bug report, and how to clean a log before sharing it.
sidebar:
  order: 4
related:
  - manual/troubleshooting/first-steps
  - manual/security/reporting-vulnerabilities
---

linscp is supported on GitHub. Pick the right place for your request, include
what the maintainers need to reproduce it, and remove private data first.

## Where to go

| You have | Go to |
|---|---|
| A question, or you are not sure it is a bug | [GitHub Discussions](https://github.com/99ecarvalho/linscp/discussions) |
| Something that does not work as this manual says, or a crash | [GitHub issues](https://github.com/99ecarvalho/linscp/issues) |
| A security problem | Private report, see [reporting a vulnerability](../../security/reporting-vulnerabilities/) |

**Help › Support Forum** in linscp opens the issues page.

:::caution
Do not post linscp problems on WinSCP's forum or bug tracker. WinSCP is a
separate project that does not maintain linscp. If a problem also happens in
WinSCP on Windows, say so in your linscp report.
:::

## Before you report

1. Work through [first steps](../first-steps/).
2. Search existing issues and discussions, including closed ones.
3. Check that the problem still happens with the newest release.

## What to include

- **Version and package.** From **Help › About**, and how you installed it:
  `.deb`, AppImage, Flatpak, Windows installer or portable zip.
- **System.** Distribution and version (for example Debian 13), desktop and
  session type (Wayland or X11), or the Windows version.
- **Where it happens.** The GUI or `linscp-cli`; in the GUI, the Commander or
  Explorer interface.
- **Protocol and server.** SFTP, SCP, FTP, FTPS, WebDAV or S3, and the server
  software if you know it. **Commands › Server/Protocol Information** shows
  what linscp learned about it.
- **Exact error text.** Copy it from the dialog rather than retyping it.
- **Steps.** What you did, what you expected, what happened instead. A
  report that others can reproduce gets fixed much sooner.
- **A session log** of one attempt, at level **Normal** or as requested
  (see [recording a session log](../first-steps/#record-a-session-log)).
- **For scripts:** the script, the full command line, and the console
  output.
- **For crashes:** start linscp from a terminal and copy what it prints. On
  Linux, `coredumpctl info linscp` may show a backtrace if your system
  collects crash dumps.
- **For display problems:** a screenshot.

## Clean up logs and screenshots

A session log can reveal more than you want to share.

- **Passwords.** Logs contain no passwords unless **Log passwords and other
  sensitive information** was checked. If it was, turn it off and record a
  new log.
- **Names.** Replace host names, user names, IP addresses and private paths.
  Replace each one consistently, for example every
  `files.internal.corp` with `files.example.org`, so the log still makes
  sense.
- **Do not delete lines.** Shorten the log to the failing attempt, but keep
  every line of it. Missing lines often hide the cause.
- **Keys and tokens.** Never post a private key, an S3 secret, or a session
  token. Public host key fingerprints are fine.
- **Screenshots.** Blur host names and file names you do not want public.

If a log cannot be cleaned without losing the important part, say so in the
issue; a maintainer may suggest another way to share it.

## Feature requests

Open a discussion first. Say what you want to achieve, not only which
control is missing. If the feature exists in WinSCP, name it; linscp follows
WinSCP closely and may already plan it.
