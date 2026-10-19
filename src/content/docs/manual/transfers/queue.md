---
title: Queue and background transfers
description: Run transfers in the background, several at once, and control them from the queue list.
sidebar:
  order: 6
related:
  - manual/transfers/upload-and-download
  - manual/transfers/progress-and-overwrite
---

A normal transfer keeps the main window busy until it ends. A *background*
transfer goes into the queue instead: linscp opens extra connections to the
server and runs it there while you keep browsing, editing and starting more
transfers.

## Send a transfer to the queue

Any of these works:

- Tick **Transfer in background (add to transfer queue)** in the copy
  dialog.
- Use **Files › Upload in Background...** or **Download in Background...**.
- Click **Proceed in Background** in the progress window of a transfer that
  is already running.
- Make it the default: tick **Transfer in background by default** in
  **Options › Preferences › Transfer › Background**.

Each queued job is one line in the list, however many files it holds.

## How many run at once

The **Background** page sets the largest number of jobs that run in
parallel (two by default); the rest wait their turn. Each
running job uses its own connection, opened with the same site settings.
Connections are reused for the next job.

**Use multiple connections for single transfer** splits a job with many
files across several connections. With SFTP, **Use multiple connections for single
files above** also splits one large file into parts that travel in
parallel.

:::note
Servers often limit connections per user. If background transfers fail to
connect while the main session works, lower the number of parallel
transfers.
:::

## The queue list

The list sits at the bottom of the window. **Options › Queue** chooses
whether it is shown, hidden, or shown only while there is work (**Hide when
Empty**, the default). In the same menu, **Toolbar** adds buttons to the
list and **File List** shows every file of the selected job.

The columns are **Operation**, **Source**, **Destination**,
**Transferred**, **Speed** and **Progress**. A running job with several
files has an extra line for the file in progress. Finished jobs stay in the
list for the time set in **Display completed transfers in queue for**.

## Control the jobs

Right-click a job, or use the queue toolbar:

| Command | Effect |
|---|---|
| **Execute Now** | Start a waiting job now, even past the parallel limit. |
| **Suspend** / **Resume** | Pause a running job and continue it later. |
| **Cancel** | Remove a waiting job or stop a running one. |
| **Move Up** / **Move Down** | Change the order of waiting jobs. |
| **Suspend All**, **Resume All**, **Cancel All** (in the **All** submenu) | The same, for every job. |
| **Delete All Completed** (also under **All**) | Clear finished jobs from the list. |

<kbd>Ctrl</kbd>+<kbd>Q</kbd> (**Commands › Queue › Go To**) moves the
keyboard focus to the list.

## Questions from background jobs

A job may need an answer: an overwrite prompt, an error, a password. By
default the question pops up as soon as the main window is free. You can
turn that off on the **Background** page; the job then
shows that it is waiting, and you open the question with **Show Query**,
**Show Error** or **Show Prompt**.

To keep jobs from asking about overwrites at all, tick **No confirmations
for background transfers** on the **Background** page.

## Hold the queue

Untick **Enable queue processing by default** to collect jobs without
starting them. **Commands › Queue › Process Queue**
(<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>Q</kbd>) starts and stops processing
for the current session.

## When the queue is empty

**Options › Queue › Once Empty** picks what happens after the last job:
**Stay Idle**, **Disconnect Session**, **Sleep Computer** or **Shut Down
Computer**. The choice falls back to **Stay Idle** once the queue
empties. If the main window is busy with another operation at that moment,
the action is skipped.
