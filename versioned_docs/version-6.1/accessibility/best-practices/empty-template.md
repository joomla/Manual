Page Template
===========
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::tip
This is an empty template, intended to be used as a starting point for adding new best practices pages. Try to keep it consistent with other pages and fill out all relevant sections; sections marked "optional" can be removed if not relevant.
:::

## Overview

Definition / explanation of what this page is all about.

### Best Practices
- Use `a href` for navigation and `button` for actions. Do not make `div` or `span` elements clickable, and do not use `a href="#"` or `href="javascript:..."` for actions.
- Write link text that describes the destination. Avoid "click here", "read more" or "more" on their own. In Joomla's article lists, keep the article title in the "Read more" link text (visible or visually hidden), as the core `readmore` layout does.
- Give icon-only links and buttons an accessible name with visually hidden text, and hide the icon with `aria-hidden="true"`.
- Make sure the accessible name starts with the visible text, so speech recognition users can activate it by saying what they see.
- Use `type="button"` for buttons that are not meant to submit a form; the default type inside a form is `submit`.
- Tell users when a link opens in a new window or downloads a file, in the link text or in visually hidden text (for example "Annual report (a PDF file at 1.2 MB size)"). Open new windows only when there is a good reason.
- Keep the focus indicator visible. Never remove `outline` without providing an equally clear `:focus-visible` style with enough contrast.
- Make targets large enough to activate: at least 24 by 24 CSS pixels, or with enough spacing around them.
- For toggle buttons (menus, accordions, filters), expose the state with `aria-expanded` and connect the button to what it controls with `aria-controls`.
- Use the same name for links and buttons that do the same thing across the site.
- Links in body text must be distinguishable by more than colour (for example underlined), unless the colour contrast with surrounding text is at least 3:1 and another cue appears on hover and focus.

### Common Mistakes
- Several "Read more" or "Click here" links on one page with no way to tell them apart.
- Clickable `div` or `span` elements that cannot be reached or activated with the keyboard. (If its unavvoidable to exist, then add role='button')
- `a href="#"` used as a button, which adds `#` to the URL, scrolls the page and is announced as a link.
- Icon-only buttons with no accessible name, announced only as "button".
- An `aria-label` that does not contain the visible text ("Submit" on screen, `aria-label="Send form"`).
- `outline: none` with no replacement focus style.
- Buttons inside forms without `type="button"` that submit the form unexpectedly.
- Links that open new windows or download files without warning.
- Tiny targets placed close together, such as small icon links in table rows.

## Who is affected?
People using screen readers navigate by lists of links and buttons. They need names that make sense out of context and the correct role to know what will happen.

Keyboard users, including people with motor disabilities, can only use elements that are focusable and have a visible focus indicator.

Speech recognition users activate controls by saying their visible name; this fails when the accessible name differs from the label on screen.

People with motor impairments or tremors need large enough targets with space between them.

People with low vision or colour vision deficiencies need links that can be told apart from surrounding text by more than colour. (They are a lot and most of them dont know it).

People with cognitive disabilities benefit from consistent, descriptive link text and from not being moved to new windows unexpectedly.

People with cognitive disabilities need.

## Testing for accessibility
<Tabs>
<TabItem value="screenreader" label="With a screenreader">

How does someone test that this is accessible with a screenreader?
1. Use the screen reader to navigate to ...
2. Make sure ...
3. Make sure ...
4. If ... then it passes. ✅
5. If ... then it fails. ❌

</TabItem>
<TabItem value="inspector" label="With web inspector">

How does someone test that this is accessible with web inspector?
1. Open the screen reader's list of links (for example NVDA: Insert+F7, VoiceOver: rotor > Links) and then its list of buttons or form fields.
2. Make sure every link name tells you where it goes without reading the surrounding text.
3. Make sure no two links with the same name go to different places.
4. Tab through the page. Make sure navigation is announced as "link" and actions as "button", and that icon-only controls have a name.
5. Activate buttons with Space and Enter, and links with Enter. Make sure toggle buttons announce "expanded" or "collapsed".
6. If every link and button has a meaningful name, the correct role and works from the keyboard, then it passes. ✅
7. If a control is announced without a name, as "link" for an action, or cannot be activated from the keyboard, then it fails. ❌

</TabItem>
</Tabs>

## Relevant WCAG Success Criteria
* Link to the WCAG Success Criteria here. For example:
* [WCAG criteria 1.3.1 - Info and Relationships](https://www.w3.org/TR/WCAG22/#info-and-relationships)

## Relevant ATAG Guidelines (optional)
* Link to the ATAG Guideline(s) here. For example:
* [Guideline A.3.2: (For the authoring tool user interface) Provide authors with enough time.](https://www.w3.org/TR/ATAG20/#gl_a32)

