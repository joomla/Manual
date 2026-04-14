---
sidebar_position: 4
---

Client side JavaScript events
=============================

## Concept

When writing a complex site with many scripts it is important that scripts are able to talk to one another. For this Joomla! uses a Client Side event convention.

## The basics

The extensions should use [`CustomEvent`](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent) to talk to each other and to Joomla! core. The event should be dispatched on a modified Element or on window (global)

The event name should have two parts, separated by ":", eg `foo:bar`, `myshop:add-to-cart`. The first part is the event provider, and the second part is the event name. You should use your extension name as the event provider to avoid possible collisions with another script and native DOM events. All Joomla! events should start with `joomla:`.

Example notifying that a user added something to the shopping cart:
```javascript
// Shop extension:
window.dispatchEvent(new CustomEvent('myshop:add-to-cart', {
  detail: {sku:'productSku', amount:10, name: 'Foo Bar'}
  bubbles: true,
  cancelable: true,
});
```

Then another script can listen for it:
```javascript
window.addEventListener('myshop:add-to-cart', function(event) {
  console.log(event.detail)
});
```

## List of Joomla! core JavaScript events

### `joomla:updated`
Dispatched on a container after its content has changed, for example, after an AJAX response.
Joomla listen to this event to update or initialize its scripts accordingly to new content (example in a subform field).

Example of updating the content with AJAX:

```javascript
const someContainer = document.querySelector('.my-dynamic-container');
fetch('/foobar/page')
  .then(function(res) {
    return res.text();
  })
  .then(function(data) {
    someContainer.innerHTML = data;
    someContainer.dispatchEvent(new CustomEvent('joomla:updated', { bubbles: true });
  });
```
Extensions can listen for this event, for example, to be notified when a page is initialized or part of a page is modified:

```javascript
document.addEventListener('joomla:updated', function(event){
  const elements = event.target.querySelectorAll('.foo-bar');
  // ... do something with $elements
});
```

### `joomla:removed`

Dispatched on the container before its content is removed or replaced.
For complex scripts it is preferable to use `joomla:removed` together with `joomla:updated`, and to dispatch `joomla:removed` before replacing/removing the content.

Example of updating the content with AJAX:

```javascript
const someContainer = document.querySelector('.my-dynamic-container');
fetch('/foobar/page')
  .then(function(res) {
    return res.text();
  })
  .then(function(data) {
    someContainer.dispatchEvent(new CustomEvent('joomla:removed', { bubbles: true }));
    someContainer.innerHTML = data;
    someContainer.dispatchEvent(new CustomEvent('joomla:updated', { bubbles: true }));
  });
```

Example removing row of a dynamic table:
```javascript
const row = myTable.querySelector('.row-to-remove');
row.dispatchEvent(new CustomEvent('joomla:removed', { bubbles: true }));
row.parentNode.removeChild(row);
```
