---
title: Transfers, sync and scripting questions
description: Short answers about large files, line endings, synchronization and linscp-cli scripts.
sidebar:
  order: 3
related:
  - manual/faq/general
  - manual/faq/connecting
---

## Transfers

### Can I transfer files larger than 4 GB?

Yes, as long as the server and both file systems support files that big.
Old FTP servers and FAT32 drives are the usual limit. See
[uploading and downloading](../../transfers/upload-and-download/).

### Why are line breaks wrong in a transferred text file?

The file went in binary mode, which keeps Windows `CRLF` endings as they are.
Use text mode for such files. See [text and binary modes](../../transfers/text-and-binary/).

### Can I copy files directly between two servers?

No. Download to your computer and upload to the other server, or run a
command on one server that copies to the other.

### Can I get back a file I deleted on the server?

Not through linscp, unless the site moves deleted files to a recycle folder
(**Advanced... › Environment › Recycle bin**). Otherwise ask the server's
administrator about backups.

### Why do I get an error about permissions or timestamp after an upload?

The file arrived, but you may not change its mode or time, often because
another user owns it. Turn off those options or check **Ignore permission
errors**. See [error messages](../../troubleshooting/error-messages/).

### Why is my upload not visible on my website?

Most often the browser or the server is caching the old version. See
[publishing a website](../../guides/publish-website/).

### Why are file times off by an hour?

A time zone or daylight saving difference. See
[timestamps and time zones](../../transfers/timestamps/).

## Synchronization

### What do the directions Local, Remote and Both mean?

**Remote** changes the server to match your computer, **Local** changes your
computer to match the server, and **Both** copies newer files each way. See
[synchronizing directories](../../sync/synchronize/).

### How do I transfer only new and changed files?

Use synchronization, or in a script `synchronize`, or `put` and `get` with
`-neweronly`. See [synchronizing directories](../../sync/synchronize/).

## Scripting

### Can I script linscp?

Yes, with `linscp-cli`, which runs WinSCP-style scripts. See
[scripting with linscp-cli](../../scripting/introduction/).

### Why does my script fail when the GUI works?

Scripts use their own settings and must confirm the host key with
`-hostkey`. Take the `open` command from **Generate Session URL/Code...** in
the Site Manager. See [sessions and credentials](../../scripting/sessions-and-credentials/).

### How do I know whether a script succeeded?

Check `linscp-cli`'s exit code: `0` means success. Use `option batch abort`
so a failure stops the script. See
[exit codes and error handling](../../scripting/exit-codes-and-errors/).

### Why does my script work by hand but fail from cron?

cron runs with another environment: no agent, a different home or `PATH`.
Use absolute paths and pass keys explicitly. See
[scheduling](../../scripting/scheduling/).

### How do I set an option that has no script command?

Use `-rawsettings` with `open`, or `/rawconfig` on the command line. See
[raw configuration](../../scripting/raw-configuration/).

### How do I transfer a folder without its subfolders?

Exclude subfolders with the file mask `|*/`. See
[file and operation masks](../../reference/masks/).

### Can I use the WinSCP .NET assembly with linscp?

On Windows, yes: linscp's Windows packages can carry it in a `dotnet`
folder, with `linscp-cli` standing in for WinSCP's console program. See
[WinSCP .NET assembly and PowerShell](../../scripting/dotnet-assembly/).
