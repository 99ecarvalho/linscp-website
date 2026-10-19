---
title: Custom commands
description: Save commands you run often, with patterns that fill in file names, paths and session details.
sidebar:
  order: 6
related:
  - manual/files/console-and-remote-commands
  - manual/files/select-filter-find
---

A custom command is a command line you save once and run from a menu, a
toolbar button or a key. Patterns in it are replaced when it runs: with the
selected file names, the current path, the host name, and so on. A command
can run on the server or on your own computer.

## Run a custom command

- Commands that act on files are in **Files › File Custom Commands** and in
  the file context menu. Select the files first.
- Commands that do not need files are in **Commands › Static Custom
  Commands**.
- **Options › Toolbars › Custom Command Buttons** shows a toolbar with one
  button per command.

To run a one-off command without saving it, choose **Enter...** at the
bottom of either menu. After that, the menu also offers to run that command
again.

linscp ships with a few examples, among them commands to make a file
executable and run it, `touch` files, pack and unpack `tar` archives, and
`grep` for a word.

## Create a command

1. Open **Options › Preferences › Integration › Commands**.
2. Click **Add...** (or the arrow next to it, then **Add Custom
   Command...**).
3. Fill in **Description**, the name shown in menus.
4. Write the **Custom command**, for example `du -sh "!"`.
5. Choose **Remote command** to run it on the server, or **Local command**
   to run it on your computer.
6. Set the options you need (below) and, if you like, a **Keyboard
   shortcut**.
7. Click **OK**.

Use **Edit...**, **Remove**, **Up** and **Down** to maintain the list. The
order is the order of the menus.

### Options

- **Apply to directories** – also run for selected directories, not only
  files.
- **Execute recursively** – run for every file inside the selected
  directories.
- **Show results in terminal** – open a window with the output.
- **Copy results to clipboard** – put the output on the clipboard.
- **Use remote files** – for a local command started from the remote
  panel: pass the remote paths to the command instead of downloading the
  files first.

Without **Use remote files**, a local command on remote files works on
temporary copies. linscp downloads the files, runs the command, and uploads
any file the command changed.

## Patterns

| Pattern | Replaced with |
|---|---|
| `!` | One file path. The command runs once per selected file. Put it in quotes. |
| `!&` | All selected paths, quoted and separated by spaces. The command runs once. |
| `!/` | The current remote directory, ending in `/`. |
| `!\` | The current local directory. |
| `!^!` | A file in the local panel, to pair with a remote file (Commander interface). |
| `!@`, `!U`, `!P`, `!#` | Host name, user name, password (if known) and port of the session. |
| `!N` | The site name. |
| `!K` | The path of the session's private key. |
| `!S`, `!E` | A session URL; `!E` adds the advanced settings. Useful to start `linscp-cli` on the same server. |
| `!?Question?default!` | A value you type when the command runs. |
| `` !`cmd` `` | The output of a local command. |
| `!!` | A literal `!`. |

Click **patterns** in the dialog for the full list.

### Examples

```sh
# Remote: archive the selected directories into one file
tar -czf "!?Archive name:?backup.tgz!" !&

# Remote: show disk usage of each selected item
du -sh "!"

# Local: compare a local and a remote file with Meld
meld "!^!" "!"
```

:::caution
`!P` puts your password on a command line, where other users of the same
machine may see it in the process list. Prefer key-based login for commands
that start other programs.
:::

## Extensions

:::note[Windows only]
WinSCP-style extensions (`.WinSCPextension` files) are PowerShell scripts
that rely on Windows PowerShell and the WinSCP .NET assembly. linscp loads
and runs them on Windows, through **Add Extension...** in the same list.
On Linux, WinSCP's published extensions are not offered.
:::
