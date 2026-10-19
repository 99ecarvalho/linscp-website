---
title: Console and remote commands
description: Run shell commands on the server, read server and protocol details, and change your password.
sidebar:
  order: 5
related:
  - manual/files/custom-commands
  - manual/files/properties-and-permissions
---

linscp can send a single command to the server and show what it prints.
This is not a terminal: there is no cursor control and no way to type into a
running program. Use it for quick, non-interactive commands such as `df -h`
or `tar -czf site.tgz site`. For a real terminal, use **Commands › Open in
PuTTY** (see [PuTTY and terminals](../../integration/putty-and-terminal/)).

## Which protocols can run commands

| Protocol | What you can run |
|---|---|
| SCP | Shell commands, in the same session. |
| SFTP | Shell commands, through a second, shell-only session that linscp opens for you the first time. |
| FTP | Raw FTP commands only, such as `SITE CHMOD`. Some servers offer `SITE EXEC` for shell commands. |
| WebDAV, S3 | None. |

The first time an SFTP session needs the extra shell session, linscp asks.
Turn the question off under **Opening separate shell session** in the
confirmations on **Options › Preferences › Environment**.

## Use the console window

1. Choose **Commands › Open Terminal**
   (<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>T</kbd>).
2. Type a command in **Enter command**. **Current directory** shows where it
   will run.
3. Click **Execute** or press <kbd>Enter</kbd>. The result appears under
   **Output**.

`cd` changes the directory for the console and the remote panel alike.
Right-click the output to **Copy** it, **Select All**, or **Adjust Window**
so that the window fits the longest line.

:::caution
Do not start commands that wait for input, such as `top`, `vi` or `passwd`.
They never finish and the session hangs until it times out. If a command
needs fixed input, pipe it in: `echo yes | some-command`.
:::

## Use the command line

In the Commander interface, a command line can sit below the panels.

- Show or hide it with **Options › Command Line**.
- Press <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>M</kbd> to move the cursor
  there.
- Press <kbd>Ctrl</kbd>+<kbd>Enter</kbd> in a panel to insert the names of
  the selected files into the line.

When the remote panel is active, the command runs on the server and the
console window opens with the output. When a local panel is active, it runs
on your computer.

## Server and protocol information

**Tabs › Server/Protocol Information** describes the current session.

- **Protocol** – the server software, protocol version, ciphers in use, and
  the fingerprints of the host key (SSH) or certificate (TLS). **Full
  certificate** shows the whole TLS certificate.
- **Capabilities** – what the protocol supports on this server, followed by
  extra details the server reports, such as its SFTP or FTP extensions.
- **Space available** – free and total space for a **Path**, where the
  server can tell. Change the path and click **Check space** to ask about
  another one.

**Copy to Clipboard** copies everything in the dialog, which helps when you
report a problem.

## Change your password

**Tabs › Change Password...** sets a new login password on the server for
the current user. It is offered only where the protocol supports it, which
in practice means SSH-based sessions. If the site stores your password,
update it in the [Site Manager](../../connecting/site-manager/) afterwards.

## Automating commands

To run commands from a script, use the `call` command in
[scripting](../../scripting/introduction/).
