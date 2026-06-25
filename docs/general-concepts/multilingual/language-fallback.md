---
sidebar_position: 7
title: Language Fallback
---

Language Fallback
=================

A *language fallback* lets a regional language borrow the missing translations of
a closely related language, instead of falling back all the way to English
(`en-GB`).

For example, if a site runs **German (Switzerland) – `de-CH`** and an installed
extension only ships **German (Germany) – `de-DE`** language files, those strings
would normally be displayed in English. With a fallback from `de-CH` to `de-DE`,
the missing strings are shown in `de-DE`, while any string that *does* exist in
`de-CH` keeps its `de-CH` wording.

The fallback is applied **per string**: only the keys missing from the requested
language are filled from the fallback. It works for both the site (frontend) and
the administrator, and supports chains such as `de-LI → de-AT → de-DE`.

## How a fallback is resolved

For a given language tag, the fallback language is determined in this order:

1. **Administrator override** – a per-language mapping configured in
   *Languages → Options* (the `com_languages` component options).
2. **Language pack default** – the optional `<fallback>` element in the pack's
   `langmetadata.xml`.
3. **None** – the language falls back only to `en-GB`, exactly as before.

The chain is followed recursively and stops at a language without a fallback, at
the site default language, or when a cycle is detected. The requested language
and the site default language are never part of the chain.

:::note
If no fallback is configured anywhere, behaviour is unchanged: untranslated
strings fall back to `en-GB`.
:::

## Declaring a fallback in a language pack

A language pack can declare its own default fallback so that it works as soon as
the pack is installed, without any per-site configuration. Add a `<fallback>`
element **inside the `<metadata>` block** of the pack's `langmetadata.xml` – only
that block is parsed, so the element must be placed there:

```xml title="language/de-CH/langmetadata.xml"
<metadata>
    <name>German (Switzerland)</name>
    <nativeName>Deutsch (Schweiz)</nativeName>
    <tag>de-CH</tag>
    <fallback>de-DE</fallback>
    <rtl>0</rtl>
    <locale>de_CH.utf8, de_CH.UTF-8, ...</locale>
    <firstDay>1</firstDay>
    <weekEnd>0,6</weekEnd>
    <calendar>gregorian</calendar>
</metadata>
```

The metadata file exists once per client. Add the element to each file the
fallback should apply to:

- `language/[tag]/langmetadata.xml` – site (frontend)
- `administrator/language/[tag]/langmetadata.xml` – administrator
- `api/language/[tag]/langmetadata.xml` – API (if present)

### For language pack maintainers

The `<fallback>` element is intended primarily for translation teams that
maintain a family of related regional packs. Because you know the linguistic
relationships between your languages, you are the right place to declare them:
ship `de-CH` and `de-AT` with `<fallback>de-DE</fallback>`, and `de-LI` with
`<fallback>de-AT</fallback>` to build the cascade `de-LI → de-AT → de-DE`.

Declaring the fallback in the pack means every site that installs it gets the
correct cascade automatically. Site administrators can still override your
default in *Languages → Options* when their needs differ.

## Overriding the fallback per site

A site administrator can set or override the fallback for any installed language:

1. Go to *Languages* and select **Options** in the toolbar.
2. Open the **Language Fallback** tab.
3. Select **Add** and complete a row:
   - **Language** – the installed language whose missing strings should be filled,
     for example `de-CH`.
   - **Fallback Language** – the language used to fill them in, for example
     `de-DE`.
4. Add further rows to cover more languages or build a chain.
5. Select **Save & Close**.

A fallback set here always wins over a default supplied by the language pack. It
is stored in the site configuration, so – unlike a value in `langmetadata.xml` –
it is **not** overwritten when the language pack is updated.

## Notes and limitations

- **Install the fallback language.** Make sure the fallback language and the
  extensions' files for it are installed, otherwise there is nothing to fall back
  to.
- **The frontend must run the regional language.** A fallback for `de-CH` only
  has an effect where `de-CH` is actually the active language (the site default,
  or a language selected through the multilingual language switcher).
- **Language Debug.** When *Debugging Language* is enabled in Global
  Configuration, fallbacks are not applied, so that untranslated strings stay
  visible for troubleshooting.
- **Overrides keep priority.** Per-site language overrides
  (`overrides/*.override.ini`) still take precedence over fallback-filled strings.
- **Opt-in.** No core-distributed language pack declares a `<fallback>`, so the
  default behaviour is unchanged until a pack maintainer or a site administrator
  opts in.
