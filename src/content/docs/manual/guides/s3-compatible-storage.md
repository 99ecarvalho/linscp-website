---
title: S3-compatible storage
description: Connect to Amazon S3, Backblaze B2, Cloudflare R2, Google Cloud Storage or a self-hosted S3 server.
sidebar:
  order: 1
related:
  - manual/guides/cloud-servers
  - manual/guides/publish-website
---

Many storage services speak the Amazon S3 protocol. linscp connects to all
of them the same way: you need an **endpoint** (a host name), an **access
key ID** and a **secret access key**. This guide shows the common steps and
where each provider keeps those values.

## Connect

1. Open the Site Manager and select **New Site**.
2. Set **File protocol** to **Amazon S3**.
3. In **Host name**, enter the provider's endpoint (see the table below).
4. Fill in both key fields: **Access key ID** and **Secret access key**.
5. If your key may only see one bucket, click **Advanced...**, open
   **Environment › Directories** and set **Remote directory** to `/bucket`
   (your bucket's name after a slash).
6. Click **Save**, then **Login**.

After you log in, the root folder lists your buckets as folders. Creating a
folder in the root creates a new bucket, if your key is allowed to.

:::tip
Create a key that can reach only the buckets you need, rather than an
account-wide master key. If the key cannot list buckets, the root listing
fails; step 5 avoids that.
:::

## Where to find endpoint and keys

Console layouts change often. Look for these names in your provider's
dashboard.

| Provider | Endpoint (Host name) | Keys |
|---|---|---|
| Amazon S3 | `s3.amazonaws.com` | An access key of an IAM user with S3 permissions. |
| Backblaze B2 | `s3.<region>.backblazeb2.com`, shown on the bucket's details | An application key: its key ID and the key itself. |
| Cloudflare R2 | `<account-id>.r2.cloudflarestorage.com`, the S3 API address without `https://` and without the bucket | An R2 API token's access key ID and secret. |
| Google Cloud Storage | `storage.googleapis.com` | An HMAC key from the storage settings' interoperability section. |
| Self-hosted (MinIO, Garage, Ceph, versitygw) | Your server's host name; set **Port number** if it is not 443 | Keys created on that server. |

For Cloudflare R2 and most restricted keys, also set the remote directory
to the bucket (step 5 above).

## S3 settings

Open **Advanced... › Environment › S3** for the protocol's own options:

- **Default region**: the region linscp uses until the server says
  otherwise. Set it for providers or self-hosted servers that need a
  particular region name.
- **URL style**: **Virtual Host** puts the bucket in the host name
  (`bucket.s3.amazonaws.com`); **Path** puts it in the path. Self-hosted
  servers often need **Path**.
- **Requester pays**: allow access to buckets whose owner bills the reader.
- **Session token** and **Role ARN**: for temporary credentials and roles.

See [WebDAV and S3 settings](../../connecting/webdav-s3-settings/) for the
full list.

## Credentials from the AWS environment

If you already use the AWS command-line tools, check **Credentials from AWS
environment** and pick a profile. linscp then reads the keys from your AWS
configuration (`~/.aws/credentials` and the `AWS_*` environment variables)
instead of the site, and the key fields are disabled.

## Use the site in a script

`linscp-cli` opens S3 with a session URL. Put the key ID and secret in the
user and password parts:

```sh
linscp-cli /command \
  "open s3://AKIDEXAMPLE:SECRETEXAMPLE@s3.amazonaws.com/my-bucket/" \
  "put /home/alice/backup.tar.gz" \
  "exit"
```

Special characters in the secret must be URL-encoded. Do not keep a real
secret in a script that others can read; see
[sessions and credentials](../../scripting/sessions-and-credentials/).

## Things that differ from a file server

- Folders are only name prefixes. A folder that nobody created explicitly
  vanishes when its last file is deleted.
- Renaming or moving a file copies and deletes it on the server, which is
  slow for large files.
- Permissions are ACLs, not Unix modes. Not every provider supports them.
