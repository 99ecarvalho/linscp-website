---
title: Logging
description: Record what linscp and the server say to each other, in a readable session log or a structured XML log.
sidebar:
  order: 5
---

Logs show exactly what happened during a session. You need one when a
connection fails for no clear reason, when a transfer behaves oddly, or when
you report a bug. linscp writes two kinds of log, set on
**Options › Preferences › Logging**:

- The **session log** is plain text for people. It records the connection,
  the protocol exchange and every operation.
- The **XML log** records operations and their results in a fixed structure,
  for programs to read.

You can also open this page from the Site Manager: **Advanced › Logging...**.

## Session log

1. Check **Enable session logging on level** and pick a level:
   - **Reduced**: less detail than normal.
   - **Normal**: enough for most problems.
   - **Debug 1** and **Debug 2**: much more detail, for bug reports. Debug 2
     slows transfers noticeably.
2. In **Log path**, give the file to write. The name can contain patterns
   that linscp replaces for each session, such as `!S` (session name),
   `!@` (host), `!Y`, `!M`, `!D` (date) and `!T` (time).
3. Choose **Append** to add to an existing file, or **Overwrite** to start it
   fresh each time.
4. Click **OK**. Logging starts with the next connection.

A path such as `/home/alice/logs/!S-!Y!M!D.log` gives each site its own daily
file. Write logs to a folder that only you can read.

### Keep log files small

- **Rotate log files after reaching** a size, such as `10M`, starts a new
  file when the current one grows past it. The old one is kept with a number
  added to its name.
- **Delete old log files, keep** a number of files removes the oldest rotated
  copies.

### Sensitive data

**Log passwords and other sensitive information** writes passwords and similar
secrets into the log. Leave it off unless a developer asks for it, and delete
such a log as soon as you are done.

:::caution
Even without that option, a log shows host names, user names, paths and file
names. Read it and remove anything private before you share it. See
[reporting bugs](../../troubleshooting/reporting-bugs/).
:::

## XML log

Turn on **Enable XML logging to file**, then enter a path. The same patterns work
here. Each session's commands, transferred files and errors end up as XML
elements.

The XML log is mostly useful for automation. See
[XML log for automation](../../scripting/xml-log/) for its structure.

## Logging from the command line

Both `linscp` and `linscp-cli` take logging switches that apply to one run,
whatever this page says:

```sh
linscp-cli /log=/home/alice/logs/run.log /loglevel=1 /script=upload.txt
linscp /xmllog=/home/alice/logs/run.xml sftp://alice@example.com/
```

`/logsize` sets rotation the same way. The full list is in
[linscp-cli switches](../../reference/linscp-cli-switches/).
