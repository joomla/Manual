Page Template
============
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Tooltip

Tooltips are useful elements. They allow presenting information with an icon or a short text and adding additional informationn when the users hovers the icon or text. 
If serveral tooltips are on a page, every toolpip must have an own ID. Other wise a screenreader cannot identify which tooltip gives Information to which element.

## Code Snippet 

```PHPx title="Example Tooltip from com_menus, view menus "
<span class=".." aria-describedby="tip-unpublish<?php echo $i; ?>">
    <?php echo $item->count_published; ?>
</span>
<div role="tooltip" id="tip-unpublish<?php echo $i; ?>">
   <?php echo Text::_('COM_MENUS_COUNT_UNPUBLISHED_ITEMS'); ?>
</div>
```

```PHPx title="Example Tooltip frontend -  edit icon for an article"
<a href=".." aria-describedby="editarticle-<?php echo $id; ?>">
    <span class="icon-edit" aria-hidden="true"></span>Edit
    <div role="tooltip" id="editarticle-<?php echo $id; ?>">Published Article</div>
</a>       
```

### Common Mistakes
- Missing ID. 
- ID not uniquee.

### Example in Joomla

A tooltip on a element in a table:
administrator/components/com_menus/tmpl/menu/default.php

A tooltip in the frontend which is visible for editable content (if you have permission for editing)
components/com_content/tmpl/article/form.php





## Who is affected?
People using screen readers need ....

People with cognitive disabilities need ... etc.

Who is impacted most by the accessibility of this element?

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
1. Right Click > Inspect ... on the page.
2. Make sure ...
3. Make sure ...
4. If ... then it passes. ✅
5. If ... then it fails. ❌
6. If ... then it passes. ✅
7. If ... then it fails. ❌

</TabItem>
</Tabs>

## Relevant WCAG Success Criteria
* Link to the WCAG Success Criteria here. For example:
* [WCAG criteria 1.3.1 - Info and Relationships](https://www.w3.org/TR/WCAG22/#info-and-relationships)

## Relevant ATAG Guidelines (optional)
* Link to the ATAG Guideline(s) here. For example:
* [Guideline A.3.2: (For the authoring tool user interface) Provide authors with enough time.](https://www.w3.org/TR/ATAG20/#gl_a32)

