---
sidebar_position: 2
---

W3C Standards
=============

Web accessibility is based on W3C standards, and Joomla aims to follow them. Here is a very brief explanation.

## WCAG
Joomla aims to achieve and maintain WCAG 2.2 AA conformance. WCAG (Web Content Accessibility Guidelines) is a set of guidelines designed to ensure web content is accessible to all users, including those with disabilities. These guidelines are based on four core principles: Perceivable, Operable, Understandable, and Robust (POUR). 

- **Perceivable**: Information and user interface components must be presented in ways that users can perceive (e.g., text alternatives for non-text content).
- **Operable**: User interface components and navigation must be operable, ensuring users can interact with all elements using various methods (e.g., keyboard or mouse).
- **Understandable**: Content and interfaces must be easy to understand, with clear instructions and consistent navigation.
- **Robust**: Content must be robust enough to work well with current and future technologies, including assistive technologies.

To learn more about WCAG 2.2 guidelines, visit the [official WCAG 2.2 documentation](https://www.w3.org/WAI/WCAG22/). 

## ARIA
In addition to WCAG, ARIA (Accessible Rich Internet Applications) is an important set of technical specifications that enhance web accessibility, particularly for dynamic content and complex user interface elements. ARIA allows developers to add roles, states, and properties to HTML elements to provide better context and interaction for users with disabilities, especially those using screen readers. 

ARIA is crucial for improving accessibility because it helps bridge gaps in accessibility for interactive elements like forms or modals.
To learn more about ARIA, visit the [W3C ARIA documentation](https://www.w3.org/TR/wai-aria/).

Joomla supports ARIA in its core, and extension developers are encouraged to use ARIA attributes to enhance accessibility and align with WCAG 2.2 standards

Extension developers need not master every detail of these guidelines. For commonly used elements and functions we'll provide code examples and snippets demonstrating how Joomla implements accessibility features to meet these standards.

## ATAG
ATAG provides guidelines aimed at making authoring tools, such as Joomla, more accessible. It focuses on ensuring that tools used to create web content are usable by people with disabilities, both for content creation and for maintaining accessibility standards in the final product.

For more information about **ATAG** (Authoring Tool Accessibility Guidelines), you can visit the official W3C documentation:
- [W3C ATAG (Authoring Tool Accessibility Guidelines)](https://www.w3.org/WAI/standards-guidelines/atag/)

Extension developers who follow WCAG recommendations and carefully review Joomla's code and our provided snippets contribute to keeping Joomla a fully accessible authoring tool, promoting inclusivity and compliance with accessibility standards.
Example
A component developer, such as one creating a form generator, should first ensure that the generator itself is accessible and conforms to WCAG 2.2 AA standards. Then, they must verify that the generated output on the website is fully accessible as well.
