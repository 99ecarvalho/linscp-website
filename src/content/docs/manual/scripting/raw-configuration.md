---
title: Raw configuration
description: Choose the configuration file and set advanced options that have no switch, with /ini, /rawconfig, -rawsettings and -rawtransfersettings.
sidebar:
  order: 8
related:
  - manual/scripting/sessions-and-credentials
  - manual/scripting/scheduling
---

Most settings a script needs have their own switch or `option`. For the rest,
linscp-cli accepts settings by their internal name, written as `Key=value`
pairs, the same way they appear in the configuration file. There are three
levels, plus a switch that picks the file itself.

## Which configuration file is used

| Situation | File |
|---|---|
| Default on Linux | `~/.config/linscp/WinSCP.ini`, shared with the GUI |
| Portable copy | A `WinSCP.ini` next to the program (for the AppImage, next to the `.AppImage` file) |
| `/ini=/path/to/file.ini` | That file |
| `/ini=nul` | Nothing: start from defaults, save nothing |

linscp-cli writes its configuration back to the file when it exits. Host keys
accepted at a prompt and values given with `/rawconfig` are kept there.

`/ini=nul` is the safest choice for CI jobs and containers: every run starts
the same, and nothing from a previous run leaks into the next. The script
must then open the server by URL and pin the host key with `-hostkey`.

The file uses WinSCP's INI format, so a `WinSCP.ini` exported from WinSCP on
Windows can be used as it is.

## Global settings: /rawconfig

`/rawconfig` takes one or more `Section\Key=value` pairs that apply to the
whole program:

```sh
linscp-cli /ini=nul /rawconfig 'Interface\SessionReopenAuto=5000' 'Interface\ExternalIpAddress=192.0.2.10' \
  /script=job.txt
```

Quote each pair in single quotes so the shell keeps the backslash. Place
`/rawconfig` and its pairs before other switches, or close the list with the
next switch as shown.

Without `/ini=nul`, the values end up in the configuration file and stay in
effect for later runs of both programs.

## Per-connection settings: -rawsettings

The `open` command accepts site settings the same way:

```text
open sftp://deploy@files.example.org/ -hostkey="..." -rawsettings Compression=1 PingType=2 PingIntervalSecs=30
```

The names are those of a site's section in the INI file. The easy way to
find one is to set the option in the GUI (**Site Manager › Advanced**) and
then use **Generate Session URL/Code**: settings without a URL form appear
as `-rawsettings` in the generated `open` line. You can also edit a stored
site's raw values directly with **Advanced › Edit Raw Settings...** in the
**Site Manager**.

The same pairs work on the command line with the `/rawsettings` switch,
after a site name or URL.

## Per-transfer settings: -rawtransfersettings

`get`, `put` and `synchronize` accept transfer settings that have no switch
of their own:

```text
put -rawtransfersettings ExcludeHiddenFiles=1 PreserveTimeDirs=1 /home/alice/site/ /var/www/html/
```

As with sites, set the option in the GUI's transfer settings and press
**Generate Code...** in the transfer dialog to see the name and value.

:::caution
Raw settings are not checked against a list of known names. A misspelled key
is ignored without a warning, so verify the effect in the session log.
:::

## Values

- Booleans are `1` and `0`; many also accept `on` and `off`.
- Numbers are plain integers; durations are usually in milliseconds.
- In the INI file, special characters are stored percent-encoded (`%5C`
  for `\`). On the command line, write them as they are.
