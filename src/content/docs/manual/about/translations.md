---
title: Translations
description: Choose linscp's language, see which languages are complete, and help improve a translation.
sidebar:
  order: 4
related:
  - manual/about/license-and-credits
  - manual/developers/contributing
---

linscp is available in 53 languages. Its texts come from two places:
WinSCP's translations, for the messages and most captions, and linscp's own
translation files, for what linscp adds or words differently.

## Choose a language

linscp starts in your system's language when it has a translation for it. On
Linux it reads `LC_ALL`, `LC_MESSAGES` or `LANG`; on Windows it uses the
display language.

To pick another one:

1. Open **Options › Preferences**.
2. Go to **Environment › Languages** and select the language.
3. Click **OK** and restart linscp.

To try a language once, without saving the choice, start linscp with
`--lang`:

```sh
linscp --lang=de
linscp --lang=pt_BR
```

On Windows, the translations are part of the **Full** setup type. A
**Compact** install contains English only.

## How complete each language is

| Part | Source | Coverage |
|---|---|---|
| Error messages, prompts, progress | WinSCP's translators | As complete as WinSCP's translation |
| Menus, dialogs, captions | WinSCP's translations where the text matches, the rest written for linscp | Every language fully translated |

About 270 of linscp's own texts were translated using WinSCP's terms for each
language, but no native speaker has reviewed them yet. Expect some awkward
wording.

Some languages have little or no WinSCP translation behind them: Hindi,
Albanian and Armenian have none, and Afrikaans, Galician, Bengali and Latvian
have little. In those, linscp's menus are translated but most messages stay
in English.

### Known limits

- Two menu items sometimes share the same underlined access key. Press the
  key again to move to the next item.
- Serbian cannot be chosen yet: selecting it gives Croatian.
- Esperanto and Kabyle, which WinSCP has, are not offered yet.
- On a GTK desktop such as GNOME, standard buttons like **OK** and **Cancel**
  use the desktop's language, even if you choose another one in linscp.

## Help improve a translation

Corrections are welcome, and you do not need to be a programmer.

1. Find your language's file in the source repository:
   `port/qt/translations/linscp_<language>.ts`, for example
   `linscp_de.ts` or `linscp_pt_BR.ts`.
2. Open it in [Qt Linguist](https://doc.qt.io/qt-6/linguist-translators.html),
   or edit the `<translation>` elements in any text editor.
3. Keep placeholders such as `%1` and `%n`, and use at most one `&` in each
   text: it marks the access key.
4. Send the change as a pull request, or attach the file to an
   [issue](https://github.com/99ecarvalho/linscp/issues).

The **Get more...** button on the **Languages** page opens the project's
translation notes.

Errors in messages that come from WinSCP's core belong to WinSCP's
translation. Fix those through WinSCP's translation project; linscp picks them
up when it moves to a newer WinSCP version.

For adding a new language and the scripts that fill in WinSCP's texts, see
[contributing](../../developers/contributing/).
