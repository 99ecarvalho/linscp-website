---
title: Script recipes
description: Short patterns for common jobs, such as newest file, safe uploads, retries, streaming and several servers.
sidebar:
  order: 9
related:
  - manual/scripting/syntax
  - manual/scripting/exit-codes-and-errors
  - manual/scripting/xml-log
---

Each recipe is a script fragment or a shell wrapper you can adapt. They
assume a stored site called `files` or a URL with `-hostkey`, as explained in
[sessions and credentials](../sessions-and-credentials/), and the error
handling from [exit codes](../exit-codes-and-errors/).

## Fetch only the newest file

`-latest` picks the most recently modified file among those that match:

```text
open files
get -latest /exports/sales-*.csv /home/alice/in/
exit
```

## Name the download after the date

```text
get /var/log/app.log /home/alice/logs/app-%TIMESTAMP#yyyy-mm-dd%.log
```

## Upload without exposing half-written files

Readers on the server should never pick up a file that is still arriving.
Upload under a temporary name, then rename it in one step:

```text
put /home/alice/out/report.csv /incoming/report.csv.part
mv /incoming/report.csv.part /incoming/report.csv
```

## Download only when the sender is done

Many senders drop a marker file after the data. `stat` fails when the marker
is missing, which stops the script with exit code `1` before anything is
fetched:

```text
open files
stat /exports/ready.flag
get /exports/*.csv /home/alice/in/
rm /exports/ready.flag
exit
```

In the wrapper, treat code `1` as "try again later", not as an alarm.

## Archive local files after a successful upload

Let linscp-cli delete the sources as it uploads them with `put -delete`, or
keep them and move them from the shell once the whole run has succeeded:

```sh
if linscp-cli /nointeractiveinput /script=upload.txt /log=upload.log; then
  mv /home/alice/out/*.csv /home/alice/sent/
fi
```

## Retry a flaky connection

```sh
#!/bin/sh
for attempt in 1 2 3 4 5; do
  linscp-cli /nointeractiveinput /script=job.txt /log=job.log && exit 0
  echo "attempt $attempt failed" >&2
  sleep $((attempt * 60))
done
exit 1
```

Inside one run, `option reconnecttime` already covers short drops.

## Upload a list of files

Build the script from a list, one path per line, then run it:

```sh
{
  echo 'open files'
  echo 'cd /incoming'
  while IFS= read -r f; do
    printf 'put "%s"\n' "$(printf '%s' "$f" | sed 's/"/""/g')"
  done < /home/alice/to-send.txt
  echo 'exit'
} > /tmp/send.txt
linscp-cli /nointeractiveinput /script=/tmp/send.txt
```

The `sed` doubles any double quote in a name, as script quoting requires.

## Same job, several servers

Pass the site as a parameter and loop in the shell:

```sh
for site in web1 web2 web3; do
  linscp-cli /nointeractiveinput /script=deploy.txt /parameter // "$site" \
    || echo "deploy to $site failed" >&2
done
```

```text
# deploy.txt
open %1%
synchronize remote -delete /home/alice/site/public /var/www/html
exit
```

## Stream to and from other programs

With `/stdout`, `get` writes the file to standard output when the target is
`-`. Status messages move to standard error. This backs up a remote database
dump without a temporary file:

```sh
linscp-cli /stdout /command 'open files' 'get /backups/db.sql -' 'exit' \
  | gzip > /home/alice/backups/db-$(date +%F).sql.gz
```

With `/stdin`, `put -` reads the data from standard input:

```sh
tar -czf - -C /home/alice site | linscp-cli /stdin /command 'open files' 'put - /backups/site.tar.gz' 'exit'
```

## Mail the result

```sh
if ! linscp-cli /nointeractiveinput /script=job.txt /log=job.log; then
  tail -n 50 job.log | mail -s "linscp job failed on $(hostname)" alice@example.com
fi
```

See the [command reference](../../reference/commands/) for every switch used
here.
