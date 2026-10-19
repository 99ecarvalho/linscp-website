---
title: PuTTY and terminals
description: Open the current session in PuTTY or in your desktop's terminal running ssh, and choose which program linscp starts.
sidebar:
  order: 3
---

Sometimes a shell on the server is quicker than a file manager. linscp can
hand the session you are connected to over to a terminal program, already
pointed at the same host, port and user.

## Open a terminal for the session

- In the main window: **Commands › Open in PuTTY**, or
  <kbd>Ctrl</kbd>+<kbd>P</kbd>.
- In the Site Manager, before connecting: select a site, open the drop-down
  arrow beside **Login** and choose **Open in PuTTY**. The same
  <kbd>Ctrl</kbd>+<kbd>P</kbd> works there.

If the session runs through an SSH tunnel, linscp connects the terminal to
the tunnel's local end.

:::tip
For a few commands on the server without leaving linscp, use
**Commands › Open Terminal** (<kbd>Shift</kbd>+<kbd>Ctrl</kbd>+<kbd>T</kbd>)
instead. See [console and remote commands](../../files/console-and-remote-commands/).
:::

## Which program starts

Set the program in **Options › Preferences › Integration › Applications**,
in **PuTTY/Terminal client path**.

On Linux, linscp fills this in for you the first time:

1. If `putty` is on your `PATH`, it uses PuTTY.
2. Otherwise it uses the first terminal it finds out of
   `x-terminal-emulator`, `gnome-terminal`, `konsole`, `xfce4-terminal` and
   `xterm`, running OpenSSH's `ssh` inside it. The shell opens in the folder
   shown in the remote panel.

On Windows the default is PuTTY in its usual install folder.

### Write your own command

The command can contain patterns that linscp fills in from the session.
Click **patterns** under the box for the full list. The common ones are `!U`
(user name), `!@` (host), `!#` (port) and `!/` (current remote folder).

For example, to use Kitty with OpenSSH in the current folder:

```
kitty ssh -t -p !# !U@!@ "cd '!/'; exec $SHELL -l"
```

When the command contains such patterns, linscp passes only what the patterns
say. When it names plain PuTTY, linscp adds PuTTY's own options for the
session.

## Options

- **Remember session password...** for PuTTY: linscp hands the password you
  logged in with to PuTTY over SSH. OpenSSH's `ssh`
  takes no password on its command line, so with a terminal and `ssh` you
  sign in yourself or with a key or agent.
- **Open Telnet sessions in PuTTY for FTP sessions**: for an FTP site, PuTTY
  opens a Telnet connection to the same host.
- **Automatically open new sessions in PuTTY**: start the terminal each time
  you connect.

On Windows only, **PuTTY registry key** chooses between PuTTY's and KiTTY's
stored sessions.

## PuTTY tools on Linux

linscp does not ship Pageant or PuTTYgen on Linux. The Site Manager's
**Tools › Run Pageant** and **Run PuTTYgen** work only when those programs are
installed and on your `PATH`; otherwise they are greyed out. linscp's SSH
agent support uses `$SSH_AUTH_SOCK`. See
[authentication](../../connecting/authentication/) and
[SSH keys](../../connecting/ssh-keys/).

:::note[Windows only]
**Edit in PuTTY** in the advanced site settings edits PuTTY's own saved
session, which lives in the Windows registry.
:::
