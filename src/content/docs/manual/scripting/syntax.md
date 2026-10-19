---
title: Script syntax
description: Quoting, comments, environment variables, timestamps, script parameters and paths in linscp-cli scripts.
sidebar:
  order: 3
related:
  - manual/scripting/introduction
  - manual/scripting/recipes
---

A linscp-cli script is a plain text file with one command per line. This page
covers the rules every line follows. For what each command does, see the
[command reference](../../reference/commands/).

## Shape of a command

A line starts with the command name, then any switches, then the
parameters:

```text
get -preservetime -filemask=*.csv /data/exports/ /home/alice/incoming/
```

Switches begin with `-`, and some take a value after `=`. Their order among
themselves does not matter. Keep them before the parameters so the line reads
clearly.

Save script files as UTF-8. There is no line continuation: a command must fit
on one line.

## Comments

A line whose first character is `#` is ignored:

```text
# Fetch yesterday's exports
open reports
```

A `#` later in a line is not a comment; it is part of the command.

## Spaces and quotes

Wrap a parameter in double quotes when it contains spaces. To put a literal
double quote inside a quoted parameter, write it twice:

```text
put "/home/alice/Quarterly report.pdf"
put "/home/alice/the ""final"" draft.txt" /srv/docs/
```

On the command line, each `/command` argument is one script line, so the shell
must pass it as one word. Use single quotes in the shell and double quotes
inside the command:

```sh
linscp-cli /command 'open mysite' 'put "/home/alice/My file.txt"' 'exit'
```

## Environment variables

Write `%NAME%` to insert the value of the environment variable `NAME`:

```sh
export SOURCE_DIR=/home/alice/site
linscp-cli /command 'open mysite' 'put "%SOURCE_DIR%/index.html"' 'exit'
```

A reference to a variable that is not set stays in the line unchanged, as
`%NAME%`. Variables are only substituted; there is no string slicing or
arithmetic. Do that in the shell and export the result.

## Timestamps

`%TIMESTAMP#format%` becomes the current local time in the format you give.
The letters `yyyy`, `mm`, `dd`, `hh`, `nn` (minutes) and `ss` stand for the
date and time fields:

```text
get /var/log/app.log /home/alice/logs/app-%TIMESTAMP#yyyy-mm-dd%.log
```

Put an offset before the `#` to shift the time: a sign, a number and one of
`Y`, `D`, `H`, `N` or `S`. `%TIMESTAMP-1D#yyyymmdd%` is yesterday's date.

## Script parameters

Values passed after `/parameter //` are available as `%1%`, `%2%` and so on:

```sh
linscp-cli /script=fetch.txt /parameter // reports /home/alice/incoming
```

```text
# fetch.txt
open %1%
get /exports/* %2%/
exit
```

Write the `//` so that a parameter starting with `/` is not taken for a
switch.

## Paths and file names

- Remote paths always use `/`. A path without a leading `/` is relative to
  the remote working directory set by `cd`.
- Local paths are relative to the local working directory, which starts as
  the directory you ran linscp-cli from and changes with `lcd`.
- A target that is a directory must end with `/`, or linscp-cli treats the
  last part as a new file name.
- Names are case-sensitive in scripts, even when the server is not.

## Masks

Wildcards select several files: `*` matches any run of characters and `?`
one character. `get *.csv /home/alice/in/` downloads every CSV file in the
remote directory. The `-filemask` switch accepts richer masks with
exclusions and size or time conditions; see
[file masks](../../reference/masks/).
