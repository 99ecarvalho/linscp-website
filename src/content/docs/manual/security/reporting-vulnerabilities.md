---
title: Reporting a vulnerability
description: Tell the linscp maintainers about a security problem privately, before it becomes public.
sidebar:
  order: 4
related:
  - manual/security/overview
  - manual/troubleshooting/reporting-bugs
---

If you find a security problem in linscp, report it privately so that a fix
can ship before details are public. Do not open a public issue or discussion
for it.

## How to report

Use GitHub's private vulnerability reporting:

1. Open the project's
   [security page](https://github.com/99ecarvalho/linscp/security/policy).
2. Click **Report a vulnerability**.
3. Fill in the form and submit it.

Only you and the maintainers can see the report, and you can discuss it
there. Say whether you want to be credited in the published advisory.

You need a GitHub account to use the form. If you cannot use GitHub, open a
public issue that says only that you have a security report and asks for a
private contact. Leave out every detail of the problem.

## What to include

- The linscp version (**Help › About**) and how you installed it: `.deb`,
  AppImage, Flatpak, Windows installer or portable zip.
- Your operating system and its version.
- Whether the problem is in the GUI (`linscp`), in `linscp-cli`, or both.
- What an attacker needs: a malicious server, a crafted link or file, a
  position on the network, or local access to your account.
- What they gain: reading files, running code, stealing credentials, and so
  on.
- Steps to reproduce, ideally with a minimal server setup or a sample file.
- Whether WinSCP on Windows behaves the same way, if you can check.

Remove real passwords, keys and host names from logs and samples before you
attach them.

## What counts

Report anything that lets someone break the protections linscp is meant to
give, for example:

- connecting to a server without the host key or certificate check that
  should happen;
- a link, session URL or file name from a server that makes linscp run a
  command or change its configuration;
- saved passwords or encryption keys leaking, for example into logs;
- memory-safety bugs reachable from a server's responses.

These are not vulnerabilities, but are welcome as normal
[bug reports](../../troubleshooting/reporting-bugs/):

- the known limits of certificate checking on Linux (no revocation checks,
  no fetching of missing intermediate certificates), described in the
  [security overview](../overview/);
- passwords readable from the configuration file when no
  [master password](../master-password/) is set;
- weak protocols or ciphers that you enabled yourself.

## Problems in WinSCP, PuTTY or OpenSSL

linscp is built on WinSCP's core and the PuTTY and OpenSSL versions WinSCP
ships. A flaw there usually affects linscp too. Report it to linscp as above.
If it also affects the upstream project, report it to that project through
its own security contact as well, and mention this in your linscp report so
the fixes can be coordinated.

## After you report

The maintainers confirm the problem, prepare a fix and publish a new release
with a security advisory. linscp is a small project, so there is no fixed
response time. If you hear nothing after a couple of weeks, add a comment to
your report.
