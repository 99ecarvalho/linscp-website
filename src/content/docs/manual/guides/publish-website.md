---
title: Publishing a website
description: Upload a site to your web host, keep it in sync as you edit, and automate the upload.
sidebar:
  order: 3
related:
  - manual/guides/cloud-servers
  - manual/guides/s3-compatible-storage
---

This guide takes a website you build on your computer, for example in
`/home/alice/site`, and puts it on your web host. It then shows how to send
only what changed on later updates.

## Connect to the host

Your hosting provider gives you a host name, a user name and a password or
key. Prefer SFTP. If the host offers only FTP, use FTPS (FTP with TLS) so
your password is not sent in the clear. See
[your first connection](../../getting-started/quick-start/).

## Find the web root

Only one folder on the server is published. After you log in, look for a
folder such as `public_html`, `htdocs`, `httpdocs`, `www` or, on your own
server, `/var/www/html`. Everything inside it is visible on the web: a file
`about.html` in it becomes `https://example.com/about.html`.

The page shown for a bare address is usually `index.html`. Ask your host if
you are unsure which folder is the web root.

To land in it each time, set it as **Remote directory** under **Advanced... ›
Environment › Directories**, and the local project as **Local directory**.

## First upload

1. Open the project folder in the local panel and the web root in the
   remote panel.
2. Select the files and folders to publish.
3. Press <kbd>F5</kbd> (**Upload**) or drag them to the remote panel.

See [uploading and downloading](../../transfers/upload-and-download/).

## Name files for the web

- Web addresses are case-sensitive on most servers. A link to `Logo.png`
  does not find `logo.png`. Keep names in lower case.
- Avoid spaces and accented letters. Use `-` or `_` instead:
  `contact-us.html`.

## Update only what changed

Use **Commands › Synchronize...**:

1. Set the direction to **Remote**, so the server is made to match your
   computer.
2. Check **Delete files** if files you removed locally should also go from
   the server.
3. Check **Preview changes** to review the list before anything is sent.
4. Click **OK**.

Files that do not belong online, such as `.git/` or `node_modules/`, can be
left out with an exclusion **File mask** in your
[transfer settings](../../transfers/transfer-settings/), for example
`| .git/; node_modules/; *.psd`.

See [synchronizing directories](../../sync/synchronize/).

While you edit, **Commands › Keep Remote Directory up to Date...** uploads
each file as soon as you save it. See
[keeping a remote directory up to date](../../sync/keep-up-to-date/).

## Permissions

Web servers need to read your files. Common modes are `644` for files and
`755` for folders. If a page returns "403 Forbidden" after an upload, check
the permissions in [Properties](../../files/properties-and-permissions/).

## Changes not showing

If the browser still shows the old page, it is probably cached. Reload
without the cache (<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>R</kbd> in most
browsers). Some hosts and CDNs cache as well; their control panel usually has
a "purge cache" action. If the server decides by timestamp, make sure
uploaded files keep a correct one; see
[timestamps](../../transfers/timestamps/).

## Automate the upload

Once it works in the GUI, you can publish with one command. This
`linscp-cli` call mirrors the local folder to the web root and deletes
files that you removed locally:

```sh
linscp-cli /command \
  "open sftp://deploy@example.com/ -hostkey=\"ssh-ed25519 255 SHA256:...\"" \
  "synchronize remote -delete -filemask=\"| .git/; node_modules/\" /home/alice/site /var/www/html" \
  "exit"
```

Replace the `-hostkey` value with your server's fingerprint and use a key
for login rather than a password in the URL. To get a correct `open` line
for a saved site, select it in the Site Manager and use **Generate Session
URL/Code...** from its context menu. See
[your first automated transfer](../../scripting/first-script/).
