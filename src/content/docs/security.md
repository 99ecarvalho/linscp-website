---
title: Report a security problem
description: Found a vulnerability in linscp? Tell us privately, on GitHub or by email, so a fix ships before the details are public.
eyebrow: Security
---

If you think you have found a security problem in linscp, report it
**privately**. Do not open a public issue, discussion or pull request about it:
that would show attackers the problem before users can protect themselves.

There are two private channels. Use whichever suits you.

| Channel | Best for | You need |
|---|---|---|
| [GitHub private report](#report-on-github) | Most reports; lets you follow the fix | A GitHub account |
| [security@linscp.org](#report-by-email) | No GitHub account, or large attachments | Any email address |

## Report on GitHub

GitHub's private vulnerability reporting keeps the report visible only to you
and the maintainer until a fix is published.

1. Sign in to GitHub.
2. Open the [new report form](https://github.com/99ecarvalho/linscp/security/advisories/new).
   You can also get there from the repository: **Security** tab ›
   **Report a vulnerability**.
3. Give it a short title, for example *"Crafted directory listing crashes
   linscp-cli"*.
4. Fill in the description with the details listed under
   [what to include](#what-to-include). Set the severity if you can judge it;
   it is fine to leave it blank.
5. Click **Submit report**.

You get notifications when the maintainer replies, and you can add comments,
files and test results to the same private thread. When the fix is released,
the report becomes a published security advisory, with credit to you if you
want it.

## Report by email

Write to **[security@linscp.org](mailto:security@linscp.org)**.

- Use a subject that starts with `[security]`.
- Put the details from [what to include](#what-to-include) in the message.
- Attach samples or logs as files. Compress large ones.

Email is not encrypted end to end. If the details are very sensitive, send a
first message that only describes the kind of problem, and ask for a safer way
to share the rest.

## What to include

- The linscp version (**Help › About**) and how you installed it: `.deb`,
  AppImage, Flatpak, Windows installer or portable zip.
- Your operating system and its version.
- Where the problem is: the `linscp` window, `linscp-cli`, or both.
- What an attacker needs: a malicious server, a crafted link or file, a
  position on the network, or access to your computer account.
- What the attacker gains: reading files, running commands, stealing
  passwords or keys, and so on.
- Steps to reproduce, ideally with a minimal server setup or a sample file.
- Whether WinSCP behaves the same way, if you can check.

Remove real passwords, keys and host names from anything you send.

## What counts as a security problem

Report anything that defeats a protection linscp is supposed to give, for
example:

- connecting without the host key or certificate check that should happen;
- a link, session URL or server-supplied file name that makes linscp run a
  command, write outside the target folder or change its configuration;
- saved passwords or keys leaking, for example into logs or temporary files;
- crashes or memory errors that a server's responses can trigger.

These are known limits, not vulnerabilities. Please send them as normal
[bug reports](../manual/troubleshooting/reporting-bugs/) if they affect you:

- certificate checking on Linux does not check revocation or fetch missing
  intermediate certificates (see the [security overview](../manual/security/overview/));
- saved passwords can be read from the configuration file when no
  [master password](../manual/security/master-password/) is set;
- weak protocols or ciphers that you enabled yourself.

## What happens next

1. You get an acknowledgement, normally within a few days.
2. The maintainer confirms the problem and prepares a fix in private.
3. A new release ships the fix. Only then are the details published, in a
   GitHub security advisory that credits you unless you ask to stay anonymous.

Some problems sit in components linscp is built on. When that is the case, the
maintainer also informs those projects and coordinates the timing, so that
publishing linscp's fix does not expose their users. This can take longer.
Please keep the details private until the advisory is out.

Only the newest release receives security fixes. Check that the problem still
happens there before you report it.

## Thank you

Careful reports make linscp safer for everyone who uses it. The project's
policy is also in the repository as
[SECURITY.md](https://github.com/99ecarvalho/linscp/blob/main/SECURITY.md).
