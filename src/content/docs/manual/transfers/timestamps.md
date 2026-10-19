---
title: Timestamps and time zones
description: Keep modification times across transfers and fix times that are off by hours.
sidebar:
  order: 5
related:
  - manual/transfers/transfer-settings
  - manual/transfers/upload-and-download
---

Each file carries a modification time. Keeping it intact matters for your
own sense of what changed, and even more for
[synchronization](../../sync/synchronize/), which compares those times to
decide what to transfer.

## Keep the original time

Tick **Preserve timestamp** in the
[transfer settings](../transfer-settings/) (it is on by default). The copy
then gets the source's modification time instead of the time of the
transfer. Tick **Including directories** to do the same for directories.

Whether this works for uploads depends on the server:

- **SFTP** and **SCP** can always set the time.
- **FTP** can set it only if the server supports the `MFMT` command. Many
  do; some older ones do not.
- **WebDAV** servers mostly cannot, and **S3** keeps its own upload time.

Downloads always keep the time when the option is on, since linscp sets it
on your own disk.

## When times are off

| What you see | Likely cause | What to change |
|---|---|---|
| Every remote file is off by the same whole number of hours. | The server reports times in its own zone, not UTC. Affects FTP and SCP. | **Time zone offset** in the site's settings. |
| Only some files are off by one hour, depending on the date. | Daylight saving time is applied differently on the two sides. | The **Daylight saving time** choice in the site's settings. |
| Times show only to the minute, or with no time at all for old files. | The server's listing lacks precision. Common with FTP and SCP. | See *Precision* below. |
| Uploaded files have the upload time. | The server cannot set times, or **Preserve timestamp** is off. | Check the option; on FTP, ask for `MFMT` support. |

The site settings are on the **Environment** page of the
[advanced site settings](../../connecting/advanced-site-settings/):

- **Time zone offset** – hours and minutes to add to the server's times.
  For FTP, **Detect automatically** lets linscp work out the offset by
  itself.
- **Daylight saving time** (SFTP and SCP) – **Adjust remote timestamp to
  local conventions** converts as your operating system would for each
  date. **Adjust remote timestamp with DST** applies today's offset to every
  date. Try it when only files from the other half of the year are off.

## Precision

The remote panel shows times only as precisely as the server reports them.
If it shows minutes, two changes within the same minute look identical, and
a later synchronization may miss one of them.

To get better times:

- Prefer SFTP, which reports times to the second.
- For SCP, tick **Try to get full timestamp** on the site's **SCP/Shell**
  page, so linscp asks `ls` for full times.
- For FTP, use a server that supports `MLSD`; linscp uses it when offered.

During a session, linscp remembers the exact times of files it uploaded and
uses them in comparisons, which hides some of the imprecision.

## Fix times without transferring

If the files are already identical and only the times differ, run
**Commands › Synchronize...** in **Synchronize timestamps** mode. It updates
the times without copying any data.
