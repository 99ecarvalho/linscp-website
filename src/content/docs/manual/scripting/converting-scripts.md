---
title: Converting from other tools
description: Move jobs written for OpenSSH sftp, lftp, FileZilla or WinSCP on Windows over to linscp-cli.
sidebar:
  order: 10
related:
  - manual/scripting/syntax
  - manual/scripting/sessions-and-credentials
  - manual/scripting/raw-configuration
---

linscp-cli covers what most transfer scripts do, but each tool has its own
habits. This page lists what changes when you move a job over.

## From WinSCP scripts

The command language is the same, so a WinSCP script needs only local
changes:

- Call `linscp-cli` instead of `winscp.com`. The switches keep their names.
- Rewrite local paths: `C:\data\out\` becomes `/home/alice/out/`. Remote
  paths stay as they were.
- Turn `.bat` wrappers into shell scripts. `%ERRORLEVEL%` becomes `$?`, and
  `%%TIMESTAMP...%%` in a batch file becomes `%TIMESTAMP...%` inside single
  quotes in the shell.
- `%WINSCP_PATH%` is not set for scripts run by linscp-cli. Use a path of
  your own.
- To reuse your stored sites and host keys, export the configuration from
  WinSCP to an INI file and use it as `~/.config/linscp/WinSCP.ini`, or pass
  it with `/ini=`. See [raw configuration](../raw-configuration/).

## From OpenSSH sftp batch files

| `sftp -b` | linscp-cli |
|---|---|
| `sftp -b job.txt deploy@files.example.org` | `linscp-cli /script=job.txt`, with `open sftp://deploy@files.example.org/` as the first line |
| `get -r dir` / `put -r dir` | `get dir` / `put dir`: folders are copied with their contents |
| `rename old new` | `mv old new` |
| `-rm file` (ignore failure) | `option batch continue`, then `rm file`, then `option batch abort` |
| `lmkdir dir` | Run `mkdir` in the shell before the job |
| `bye`, `quit` | `exit` |

Two habits do not carry over:

- **Host keys.** linscp-cli does not look keys up in `~/.ssh/known_hosts`
  when it connects. Pin the key with `-hostkey`, accept it once in the GUI,
  or import your `known_hosts` entries in the GUI with
  **Site Manager › Tools › Import Sites**. See
  [sessions and credentials](../sessions-and-credentials/).
- **Keys.** linscp-cli uses the agent at `$SSH_AUTH_SOCK` like sftp does,
  but a key file must be in PuTTY's format. Convert it once with
  `linscp-cli /keygen ~/.ssh/id_ed25519 /output=/home/alice/.ssh/id_ed25519.ppk`.

The same **Import Sites** dialog reads hosts from `~/.ssh/config`, which
saves typing the connection details again.

## From lftp

| lftp | linscp-cli |
|---|---|
| `open -u alice,secret ftp.example.com` | `open ftp://alice@ftp.example.com/ -password=%FTP_PASSWORD%` |
| `set ftp:ssl-force true` | Use an `ftpes://` URL |
| `set ftp:passive-mode off` | `-passive=off` on `open` |
| `mirror /remote /local` | `synchronize local /local /remote` |
| `mirror -R /local /remote` | `synchronize remote /local /remote` |
| `mirror --delete` | add `-delete` |
| `mirror --only-newer` | the default for `synchronize`; `-mirror` to also replace newer files |
| `mget *.csv` | `get *.csv ./` |

Note the order of the folders: `synchronize` takes the local folder first,
whichever direction it copies. See
[`synchronize`](../../reference/commands/synchronize/).

## From FileZilla

FileZilla has no scripting language, but linscp-cli can open its stored
sites. On Linux it reads `~/.config/filezilla/sitemanager.xml`:

```text
open -filezilla "Office server"
```

The site name is the one shown in FileZilla's Site Manager. To keep the sites permanently, import
them into linscp's **Site Manager** with **Tools › Import Sites** and open
them by name from then on.

## Checking the result

Run the converted job by hand with `/log=` and compare the transferred
files with what the old tool produced. Then schedule it, following
[scheduling](../scheduling/).
