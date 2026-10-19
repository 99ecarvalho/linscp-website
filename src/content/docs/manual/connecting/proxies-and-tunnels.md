---
title: Proxies, jump hosts and tunnels
description: Reach servers behind a proxy, through a jump host, or over an SSH tunnel.
sidebar:
  order: 11
related:
  - manual/connecting/advanced-site-settings
  - manual/connecting/ssh-settings
  - manual/connecting/authentication
---

When the server is not directly reachable, linscp can go through something in
between: a proxy server, a command that opens the connection for it, or an
SSH tunnel through another host. All three are set per site, on the **Proxy**
and **Tunnel** pages under **Connection** in
[Advanced Site Settings](../advanced-site-settings/).

## Proxy servers

On the **Proxy** page, pick the **Proxy type** and fill in **Proxy hostname**,
**Port number** and, if the proxy needs a login, **Username** and
**Password**. The types offered depend on the protocol:

| Type | Protocols | Notes |
|---|---|---|
| **SOCKS4**, **SOCKS5** | All | SOCKS5 can carry a login and resolve names. |
| **HTTP** | All | Uses the `CONNECT` method of a web proxy. |
| **Telnet** | SFTP, SCP | Logs in to a proxy that accepts typed commands. |
| **Local** | SFTP, SCP | Runs a command on your computer that provides the connection. |
| `SITE %host`, `USER %user@%host` and others | FTP | Logon styles of classic FTP proxies. |

**Autodetect** fills in your system's HTTP proxy, as Qt reports it. On Linux
that usually comes from the `http_proxy` environment variable.

For SSH sites, **Proxy settings** adds two options:

- **Do DNS name lookup at proxy end** lets the proxy resolve the server name.
  Use it when your own machine cannot resolve internal names.
- **Consider proxying local host connections** sends even connections to
  `localhost` through the proxy. It is off by default.

With a SOCKS or HTTP proxy, FTP sites use passive mode.

## Jump hosts with a local proxy command

The **Local** type hands the connection to a program. Its standard input
and output become the connection to the server. With OpenSSH installed, this
is the simplest way to go through a jump host:

```sh
ssh -W %host:%port alice@jump.example.org
```

linscp replaces `%host` and `%port` with the target server's name and port
(hover over **patterns** for the full list) and runs the command with
`/bin/sh -c`. The jump login must not need typing: use a key loaded in your
agent, or a key without passphrase listed in `~/.ssh/config`. Since `ssh` reads
`~/.ssh/config`, a command such as `ssh -W %host:%port bastion` can rely on
the settings you already have there, including chains of `ProxyJump` hosts.

## SSH tunnel

An SSH tunnel uses a second SSH login to forward the connection, without
needing OpenSSH on your computer. It is available for SFTP and SCP sites.

1. On the **Tunnel** page, check **Connect through SSH tunnel**.
2. Under **Host to setup tunnel on**, enter the jump host's **Hostname**,
   **Port number**, **Username** and, if needed, **Password**.
3. Under **Tunnel authentication parameters**, choose a **Private key file**
   if the jump host uses key login.
4. Leave **Local tunnel port** on **Autoselect** unless a firewall on your
   computer allows only a fixed port.

The jump host's host key is checked like any other; see
[Verifying host keys](../host-keys/). The tunnel takes one hop. For more, use
a local proxy command.

:::tip
Importing hosts from `~/.ssh/config` with **Tools › Import Sites...** turns a
single `ProxyJump` entry into the tunnel settings for you.
:::

## The update check's proxy

The proxy choices on **Options › Preferences › Updates** apply only to the
update check. Your sites use their own **Proxy** page.
