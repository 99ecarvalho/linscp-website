---
title: Network and reconnection
description: Settings for active-mode FTP, resuming interrupted transfers, and reconnecting sessions that drop.
sidebar:
  order: 3
---

Two Preferences pages decide how linscp copes with the network: **Network**
for incoming FTP connections, and **Endurance** (under **Transfer**) for
broken transfers and lost sessions. Both apply to every site. Proxies and
tunnels are set per site; see
[proxies, jump hosts and tunnels](../../connecting/proxies-and-tunnels/).

## Network

### Incoming FTP connections

These matter only for FTP in active mode, where the server connects back to
your computer for each file or listing. See
[FTP and FTPS settings](../../connecting/ftp-ftps-settings/) for the modes.

- **Retrieve the external IP address from operating system** uses your
  machine's own address. This is right when there is no NAT between you and
  the server.
- **Use the following external IP address** sends the address you enter
  instead, for example your router's public address, `192.0.2.10`.
- **Limit listening ports to** restricts the local ports linscp opens to a
  range, so you can forward just that range on a firewall or router.

:::tip
If directory listings hang in active mode, switch the site to passive mode
first. It avoids both settings above.
:::

### Connections

The option to **knock FTP port** after a rejected SFTP connection helps when
you are not sure what a server speaks. If the SFTP attempt is refused, linscp checks
whether an FTP server answers and offers to switch.

## Endurance

### Resume and temporary file names

The group at the top decides when a transfer is written to a temporary file
first and renamed once complete. If it breaks, the partial file can be
resumed later and never replaces a good copy.

- **All files**: every transfer works this way.
- **Files above**: only files larger than the size in KB you set. This is the
  usual choice, because small files are quick to send again.
- **Disable**: write straight to the final name.

Some servers refuse the rename, or a web server might serve the partial file
under its temporary name. In those cases, turn this off in a transfer
settings preset that you use for that server. See
[transfer settings](../../transfers/transfer-settings/).

### Automatic reconnect

When a connection drops, linscp can open it again by itself. Each case has its
own check box and, where shown, a delay in seconds before the next attempt:

- **if it breaks during transfer**: the transfer resumes after reconnecting.
- **if it breaks while idle**: the panel stays usable without a prompt.
- **if it breaks while inactive**: covers sessions in background tabs, which
  are reconnected without asking.
- **if it stalls**: treats a connection that stops moving data for the given
  time as broken.

**Keep reconnecting for** sets how long linscp goes on trying. The lowest
value means **Forever**.

Scripts run with `linscp-cli` use their own `option reconnecttime` setting
instead of this page; see [script commands](../../reference/commands/).
