---
title: Scripting with linscp-cli
description: What linscp-cli is, how it reads commands, and when to pick a script over the GUI.
sidebar:
  order: 1
related:
  - manual/scripting/first-script
  - manual/scripting/syntax
  - manual/scripting/exit-codes-and-errors
---

`linscp-cli` is the console client that ships with linscp. It runs the same
transfer engine as the GUI, but you drive it with text commands instead of
windows and dialogs. Use it for jobs that must run unattended: nightly
backups, deployments from a CI pipeline, or fetching a report every hour.

The command language is WinSCP's. A script written for WinSCP's console
client usually runs on linscp-cli after you change the program name and the
local paths.

## Where to find it

- **Debian package**: `linscp-cli` is installed in `/usr/bin`, next to `linscp`.
- **Flatpak**: run it as
  `flatpak run --command=linscp-cli io.github._99ecarvalho.linscp`.
- **Windows**: `linscp-cli.exe` sits in the linscp installation folder,
  beside `linscp.exe`.

Check that it starts with `linscp-cli /help`, which lists every switch.

## Three ways to give it commands

| How | Example | Use it for |
|---|---|---|
| Type them | `linscp-cli` | Trying commands out |
| A script file | `linscp-cli /script=backup.txt` | Jobs you keep and schedule |
| On the command line | `linscp-cli /command "open mysite" "ls" "exit"` | Short one-off jobs, CI steps |

You can also pipe commands into it on standard input:

```sh
printf 'open mysite\nls\nexit\n' | linscp-cli
```

When commands come from `/script` or `/command`, linscp-cli runs in batch
mode: it does not stop to ask about overwrites, and it gives up on the first
error instead of waiting for an answer. Typed or piped commands keep the
interactive behaviour. The [exit codes](../exit-codes-and-errors/) page
explains how to change this with `option batch`.

## What a session looks like

Every script follows the same shape:

1. `open` a connection, by stored site name or by URL.
2. Run file commands: `cd`, `ls`, `get`, `put`, `synchronize` and the rest.
3. `exit`, which closes the connection and ends the program.

If a script file has no `exit` at the end, linscp-cli switches to its
interactive prompt when the file runs out. In a scheduled job that means it
waits for input that never comes, so always end with `exit`.

## Sites are shared with the GUI

linscp-cli reads the same configuration as the GUI. On Linux that is
`~/.config/linscp/WinSCP.ini`. A site you saved in the **Site Manager** can be
opened by name: `open mysite`. Host keys you accepted in either program are
remembered for both. To run with an empty, throwaway configuration instead,
add `/ini=nul`; see [raw configuration](../raw-configuration/).

## Where to go next

- [Your first automated transfer](../first-script/) walks through a complete job.
- [Script syntax](../syntax/) covers quoting, variables and comments.
- The [command reference](../../reference/commands/) has a page per command.
- The [linscp-cli switches](../../reference/linscp-cli-switches/) page lists
  everything you can pass on the command line.
