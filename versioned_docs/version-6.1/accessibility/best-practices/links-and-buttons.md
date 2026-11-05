Links and Buttons
===========
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Overview

Links and buttons are the main interactive elements on a page. A link takes the user to another page or location; a button performs an action on the current page, such as submitting a form or opening a menu. Using the right element, with a clear accessible name, makes them usable with a keyboard, a screen reader and speech recognition.

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
- Clickable `div` or `span` elements that cannot be reached or activated with the keyboard. (If a native element really cannot be used, add `role="button"`, `tabindex="0"` and keyboard support for Enter and Space.)
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

People with low vision or colour vision deficiencies need links that can be told apart from surrounding text by more than colour. This is a large group, and many people do not know they have a colour vision deficiency.

People with cognitive disabilities benefit from consistent, descriptive link text and from not being moved to new windows unexpectedly.

## Testing for accessibility
<Tabs>
<TabItem value="screenreader" label="With a screenreader">

How does someone test that links and buttons are accessible with a screenreader?
1. Open the screen reader's list of links (for example NVDA: Insert+F7, VoiceOver: rotor > Links) and then its list of buttons or form fields.
2. Make sure every link name tells you where it goes without reading the surrounding text.
3. Make sure no two links with the same name go to different places.
4. Tab through the page. Make sure navigation is announced as "link" and actions as "button", and that icon-only controls have a name.
5. Activate buttons with Space and Enter, and links with Enter. Make sure toggle buttons announce "expanded" or "collapsed".
6. If every link and button has a meaningful name, the correct role and works from the keyboard, then it passes. ✅
7. If a control is announced without a name, as "link" for an action, or cannot be activated from the keyboard, then it fails. ❌

</TabItem>
<TabItem value="inspector" label="With web inspector">

How does someone test that links and buttons are accessible with web inspector?
1. Open the browser developer tools and the accessibility pane (for example Chrome: Elements > Accessibility, Firefox: Accessibility tab).
2. Select each link and button. Make sure the computed role is "link" or "button" and the computed name is not empty and starts with the visible text.
3. Make sure clickable elements are `a href` or `button` elements, not `div` or `span` elements with click handlers.
4. Make sure buttons inside forms that do not submit the form have `type="button"`.
5. Force the `:focus-visible` state in the styles pane and make sure a clear focus indicator is shown.
6. If every control has the correct role, a meaningful name and a visible focus style, then it passes. ✅
7. If a control has no name, the wrong role or no visible focus style, then it fails. ❌

</TabItem>
</Tabs>

## Relevant WCAG Success Criteria
* [WCAG criteria 1.4.1 - Use of Color](https://www.w3.org/TR/WCAG22/#use-of-color)
* [WCAG criteria 2.1.1 - Keyboard](https://www.w3.org/TR/WCAG22/#keyboard)
* [WCAG criteria 2.4.4 - Link Purpose (In Context)](https://www.w3.org/TR/WCAG22/#link-purpose-in-context)
* [WCAG criteria 2.4.7 - Focus Visible](https://www.w3.org/TR/WCAG22/#focus-visible)
* [WCAG criteria 2.5.3 - Label in Name](https://www.w3.org/TR/WCAG22/#label-in-name)
* [WCAG criteria 2.5.8 - Target Size (Minimum)](https://www.w3.org/TR/WCAG22/#target-size-minimum)
* [WCAG criteria 3.2.4 - Consistent Identification](https://www.w3.org/TR/WCAG22/#consistent-identification)
* [WCAG criteria 4.1.2 - Name, Role, Value](https://www.w3.org/TR/WCAG22/#name-role-value)
