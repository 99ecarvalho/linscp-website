---
title: WebDAV and S3 settings
description: Connect to WebDAV servers and S3 storage, use AWS credentials from your environment, and lock WebDAV files.
sidebar:
  order: 7
related:
  - manual/connecting/protocols
  - manual/connecting/advanced-site-settings
  - manual/connecting/ftp-ftps-settings
---

WebDAV and Amazon S3 both run over HTTP. In the Site Manager, set
**Encryption** to **TLS/SSL Implicit encryption** to use HTTPS. For S3 that is
already the default. Their certificates are checked like those of FTPS
servers; see [FTP and FTPS settings](../ftp-ftps-settings/#encryption-with-tls),
which also covers the **TLS/SSL** page these protocols share.

## WebDAV

Give the server's host name in **Host name** and the WebDAV path, such as
`/remote.php/dav/files/alice/`, in **Remote directory** on the
[Directories](../advanced-site-settings/#directories) page. You can also
paste the whole `https://` address into **Host name**.

The **WebDAV** page has two options:

- **Tolerate non-encoded special characters in filenames**: accepts listings
  in which the server forgot to percent-encode characters such as spaces.
- **Allow redirects to other hosts**: follows a redirect to a different
  server. It is off by default because a redirect can send your credentials
  elsewhere.

linscp signs in with the user name and password (HTTP Basic or Digest
authentication), or with a client certificate set on the **TLS/SSL** page.

:::note[Windows only]
Integrated Windows sign-in (SSPI, NTLM or Kerberos without a password) does
not exist on Linux, and linscp has no GSSAPI for WebDAV there.
:::

### Locking files

WebDAV servers can lock a file so other clients cannot change it while you
work. Select files and use **Files › Locking › Lock**; **Unlock** releases the
lock. The menu is available only for WebDAV sessions.

## Amazon S3

For AWS, the host name is `s3.amazonaws.com`. For another S3-compatible
service, enter its endpoint, for example `objects.example.com`. Then give the
credentials:

- **Access key ID** and **Secret access key** take the place of the user
  name and password. linscp asks for the secret on connect if you do not save
  it.
- Or check **Credentials from AWS environment** and pick a profile from the
  list beside it. linscp then takes the keys the way AWS tools do (see below),
  and the key fields are disabled.

### Credentials from the AWS environment

The list beside the box starts with **General**, followed by the profiles
found in your AWS files.

- **General** first reads the environment variables `AWS_ACCESS_KEY_ID`,
  `AWS_SECRET_ACCESS_KEY` and, for temporary keys, `AWS_SESSION_TOKEN`. What
  they do not provide comes from the profile named in `AWS_PROFILE`, or from
  `default`.
- A named profile is read from `~/.aws/credentials`, then from
  `~/.aws/config`. The environment variables are not used.

`AWS_SHARED_CREDENTIALS_FILE` and `AWS_CONFIG_FILE` point to other files.
Profiles that assume a role through `role_arn` are listed as well.

### S3 page

- **Default region**: the region used until a bucket says otherwise. Pick
  the region of your buckets to avoid an extra redirect.
- **URL style**: **Virtual Host** puts the bucket in the host name
  (`my-bucket.s3.amazonaws.com`). **Path** puts it in the path. Many
  S3-compatible servers, such as MinIO or a local gateway, need **Path**.
- **Requester pays**: needed to read buckets whose owner charges the reader.
- **Session token** and **Role ARN**: for temporary credentials, or to
  assume a role after signing in.

### Buckets and folders

Without a **Remote directory**, linscp lists your buckets at the top level.
To start inside one, set the remote directory to `/my-bucket/` or
`/my-bucket/photos/`. Folders are key prefixes, shown as directories.

In **Properties**, S3 objects show their access control list instead of Unix
permissions, and single files show their tags.
