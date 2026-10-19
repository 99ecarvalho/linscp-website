---
title: XML log for automation
description: Record what a script actually transferred in a structured log, and read it from shell or Python.
sidebar:
  order: 7
related:
  - manual/scripting/exit-codes-and-errors
  - manual/scripting/recipes
---

The exit code says whether a job worked. The XML log says what it did: which
files went where, how large they were, and which operation failed with which
message. Use it when a wrapper must act on the result, for example to move
uploaded files to an archive or to list what was fetched.

## Turning it on

```sh
linscp-cli /xmllog=/home/alice/jobs/run.xml /script=job.txt
```

- The file is created when the script first runs `open`, even if the
  connection then fails. A script that never connects writes no XML log.
- For one log per run, let the shell build the name:
  `/xmllog="/home/alice/jobs/run-$(date +%Y%m%d-%H%M%S).xml"`.
- Add `/xmlgroups` to wrap the entries of each script command in a `group`
  element named after that command. That makes it easy to tell which `get`
  produced which files.

## What is in it

The root element is `session`, in the namespace
`http://winscp.net/schema/session/1.0`. Inside it, each physical operation on
a remote file gets its own element: `upload`, `download`, `ls`, `mkdir`,
`rm`, `mv`, `chmod`, `touch`, `stat`, `checksum` and `call`. A single `put`
of a file can produce several of them, such as an `upload` followed by a
`touch` that sets the timestamp.

Every operation carries a `result` child with a `success` attribute. A
failed one holds `message` elements with the error text. When the whole
script stops on an error, a `failure` element with the same messages is added
under `session` (or under the `group`, with `/xmlgroups`).

A short example, trimmed:

```xml
<session xmlns="http://winscp.net/schema/session/1.0" name="deploy@files.example.org" start="2026-10-19T02:30:04.112Z">
  <download>
    <filename value="/exports/sales-2026-10-18.csv" />
    <destination value="/home/alice/in/sales-2026-10-18.csv" />
    <size value="48211" />
    <result success="true" />
  </download>
</session>
```

The error messages are human text. They change with the server, the protocol
and the interface language, so test for `success="false"`, not for a phrase.

## Reading it from the shell

With `xmlstarlet`, list the files that downloaded successfully:

```sh
xmlstarlet sel -N w=http://winscp.net/schema/session/1.0 -t \
  -m '//w:download[w:result/@success="true"]' -v 'w:filename/@value' -n \
  /home/alice/jobs/run.xml
```

## Reading it from Python

```python
import sys
import xml.etree.ElementTree as ET

NS = {"w": "http://winscp.net/schema/session/1.0"}
root = ET.parse(sys.argv[1]).getroot()

for op in root.iterfind(".//w:upload", NS):
    name = op.find("w:filename", NS).get("value")
    ok = op.find("w:result", NS).get("success") == "true"
    print(("OK   " if ok else "FAIL ") + name)

for failure in root.iterfind(".//w:failure/w:message", NS):
    print("script error:", failure.text, file=sys.stderr)
```

Run it after the job, for example `python3 report.py run.xml`, and branch on
its output in your wrapper.

## Directory listings

An `ls` command logs a `files` element with one `file` per entry, each with
`filename`, `type`, `size`, `modification` and `permissions` children. That
gives you a listing you can parse reliably, instead of scraping the console
output. For ready-made jobs that combine the log with shell logic, see
[script recipes](../recipes/).
