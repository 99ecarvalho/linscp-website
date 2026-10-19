---
title: Error messages and status codes
description: What the most common linscp errors mean, what to do about them, and how to read SFTP and FTP codes.
sidebar:
  order: 3
related:
  - manual/troubleshooting/connection-problems
  - manual/troubleshooting/first-steps
---

linscp shows the same error texts as WinSCP, since both share the same core.
This page groups the frequent ones by cause. Quoted texts are shortened;
look for the words shown.

## Network errors

| Message contains | Meaning | What to do |
|---|---|---|
| `does not exist`, `unknown error` on host lookup | The host name cannot be resolved. | Check the name and your DNS or VPN. |
| `Connection refused` | Nothing listens on that port. | Check port and protocol; is the server running? |
| `timed out` | No answer; traffic is probably dropped. | Check firewalls and security groups. |
| `No route to host` | Your network cannot reach that address. | Check the address, VPN and routing. |
| `Connection reset by peer`, `Software caused connection abort` | The connection was cut, by the server or something in between. | Look at the server's logs; try again; check for a proxy or firewall that closes idle connections. |
| `Host is not communicating` | The server stopped answering mid-session. | Wait or abort; raise the timeout, or turn on keepalives under **Advanced... › Connection**. |
| `Server unexpectedly closed network connection` | The server ended the session, often during login. | Check the server's log; it may limit connections or refuse your address. |

For details on each, see [connection and login problems](../connection-problems/).

## Login errors

| Message contains | Meaning | What to do |
|---|---|---|
| `Access denied` | The server rejected the user name or password. | Retype both; check the account with the administrator. |
| `Server refused our key` | The key is not authorized for this user. | Add the public key to `~/.ssh/authorized_keys`; check the user name. |
| `Too many authentication failures` | The agent offered too many keys. | Pick the key file and stop using the agent for this site. |
| `Unable to use this private key file`, `wrong type` | The file is not a private key linscp can read. | Choose the private key, not the `.pub` file; let linscp convert it to `.ppk`. |
| `Potential security breach` | The server's host key changed. | Stop. Confirm the new key with the administrator first. See [host keys](../../connecting/host-keys/). |
| `does not match pattern` | The fingerprint given with `-hostkey` is wrong. | Copy the fingerprint again; see [sessions and credentials](../../scripting/sessions-and-credentials/). |

## SFTP and SCP start-up errors

| Message contains | Meaning | What to do |
|---|---|---|
| `Cannot initialize SFTP protocol` | The server has no SFTP subsystem, or it failed to start. | Enable SFTP on the server, or use SCP. |
| `Received too large` … `SFTP packet` | Text from a shell start-up file reached linscp instead of SFTP data. | Remove output (such as `echo`) from the account's non-interactive start-up files. |
| `rejected SFTP connection, but it listens for FTP` | The server speaks FTP, not SSH. | Change the site's protocol to FTP (preferably with TLS). |
| `exit status 1` (or 0, 127, 255) | The SSH command for SCP failed. | Check that `scp` exists on the server and that the shell does not print text. |
| `return code 127` | A command, often `scp`, is not installed on the server. | Install it, or switch to SFTP. |

## File operation errors

| Message contains | Meaning | What to do |
|---|---|---|
| `Permission denied` | The server user may not read or write there. | Check the file's owner and mode; work in a folder you own. |
| `error occurred while setting the permissions and/or timestamp` | The upload worked, but you may not change mode or time, for example on a file you do not own. | Turn off setting permissions or keeping the timestamp in the [transfer settings](../../transfers/transfer-settings/), or check **Ignore permission errors**. |
| `could not be renamed to target file name` | The temporary upload file could not replace the target. | Check permissions on the folder, or turn off resume and temporary names for this transfer. |
| `General failure` / `Error code: 4` | The server reported an error without details. | Look at the server's own log; often a full disk or quota. |
| `Error listing directory` | The folder cannot be read. | Check its permissions; for FTP, try toggling passive mode. |
| `Unexpected directory listing line` | An FTP server uses a listing format linscp does not understand. | Report the listing line in a [bug report](../reporting-bugs/). |

## FTP connection mode errors

`Transfer channel can't be opened` or a message about active mode means
FTP's second connection failed. Switch **Passive mode** on (or off) under
**Advanced... › Connection**. See
[FTP and FTPS settings](../../connecting/ftp-ftps-settings/).

## SFTP status codes

SFTP servers answer each request with a numeric status. linscp shows it in
error details and logs.

| Code | Name | Usual cause |
|---|---|---|
| 0 | OK | Success. |
| 1 | EOF | End of file or of a listing; normally not an error. |
| 2 | No such file | The path does not exist. |
| 3 | Permission denied | Owner or mode prevents the operation. |
| 4 | Failure | Anything else: disk full, quota, folder not empty, server policy. |
| 5 | Bad message | The server could not parse a request. |
| 6 | No connection | No connection to the server (client side). |
| 7 | Connection lost | The connection dropped. |
| 8 | Operation unsupported | The server does not implement that request. |

Servers using SFTP version 4 or later can send more specific codes, such as
"no space on file system" or "directory not empty".

## FTP reply codes

FTP replies start with three digits. The first digit tells you the outcome:

- **1xx, 2xx, 3xx**: progress or success.
- **4xx**: a temporary failure; trying again may work. `421` means the
  server is closing the connection (often too many users); `425` means the
  data connection could not open; `450` means the file is busy or
  unavailable.
- **5xx**: a permanent failure. `530` means not logged in (wrong
  credentials); `550` means the file is missing or access is denied; `553`
  means the file name is not allowed.

## Errors not listed here

Search the [issues](https://github.com/99ecarvalho/linscp/issues), then ask
as described in [getting help and reporting bugs](../reporting-bugs/).
