---
title: First steps
description: A short checklist to work through before digging into a problem, and how to record a session log.
sidebar:
  order: 1
related:
  - manual/troubleshooting/connection-problems
  - manual/troubleshooting/error-messages
  - manual/troubleshooting/reporting-bugs
---

Most problems fall into a few groups: the network, the server, your
settings, or linscp itself. These checks tell you which one you face.

## Checklist

1. **Read the whole message.** Below the main text, error dialogs often
   show a box with further lines, including the server's own reply. That
   reply is usually the most useful part. Look it up in [error messages](../error-messages/).
2. **Update linscp.** Use **Help › Check for Updates**, or compare
   **Help › About** with the newest release on GitHub. Your problem may
   already be fixed.
3. **Try another client with the same protocol.** For SFTP and SCP, run
   `ssh alice@example.com` or `sftp alice@example.com` in a terminal. For
   FTP, try `curl ftp://example.com/ --user alice`. If that fails too, the
   problem is the network or the server, not linscp.
4. **Check the protocol and port.** An SFTP site on an FTP-only server, or the
   other way round, fails in confusing ways. See
   [choosing a protocol](../../connecting/protocols/).
5. **Rule out your own settings.** Start linscp with empty, temporary
   settings and set up the site again by hand:

   ```sh
   linscp /ini=nul
   ```

   Nothing is read from or saved to your real configuration. If the problem
   goes away, an option in your configuration causes it.
6. **Check whether it is specific to linscp.** If you also have WinSCP on
   Windows, try the same site there. Mention the result when you ask for
   help.

:::tip
Press <kbd>F1</kbd> in linscp (**Help › Contents**) to open this manual.
:::

## Record a session log

A session log shows what linscp and the server said to each other. You need
one to solve most connection and transfer problems, and maintainers ask for
it in bug reports.

### In the GUI

1. Open **Options › Preferences › Logging**. In the Site Manager you can
   reach the same page from the **Advanced** button's menu, **Logging...**.
2. Check **Enable session logging on level:** and choose **Normal**. Choose
   **Debug 1** or **Debug 2** only if someone asks for it.
3. Set **Log path** to a file you can find, such as
   `/home/alice/linscp.log`.
4. Reproduce the problem, then open the file.

Leave **Log passwords and other sensitive information** unchecked.

### In linscp-cli

Add `/log` to the command line:

```sh
linscp-cli /log=/home/alice/linscp.log /loglevel=1 /script=/home/alice/upload.txt
```

`/loglevel` raises the detail; leave it out for a normal log. An
[XML log](../../scripting/xml-log/) (`/xmllog`) records results for scripts
but is less useful for diagnosing a problem.

## Where to go next

- Cannot connect or log in: [connection and login problems](../connection-problems/).
- A specific error text: [error messages and status codes](../error-messages/).
- Still stuck: [getting help and reporting bugs](../reporting-bugs/).
- More logging options: [logging](../../preferences/logging/).
