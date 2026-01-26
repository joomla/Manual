---
sidebar_position: 4
---

Client side JavaScript events
=============================

## Concept

When writing a complex site with many scripts, components, plugins it is become important that every script is able to talk each other. For this Joomla! introduces Client Side event convention.

## The basics

The extensions should use [`CustomEvent`](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent) to talk to each other and to Joomla! core. The event should be dispatched to modified Element or to window (global)

The event name should have at least two part, separated ":", eg `foo:bar`, `myshop:add-to-cart`. Where the first part is the event provider, and the second part is the event name which happened. Which is allows us to avoid possible collisions with another scripts and native DOM events. All Joomla! events should start from `joomla:`.

Example telling that User added something to the shopping cart:
```javascript
// Shop extension:
window.dispatchEvent(new CustomEvent('myshop:add-to-cart', {
  detail: {sku:'productSku', amount:10, name: 'Foo Bar'}
  bubbles: true,
  cancelable: true,
});
```

Then 3rd script can listen to it:
```javascript
window.addEventListener('myshop:add-to-cart', function(event) {
  console.log(event.detail)
});
```

## List of Joommla! core JavaScirpt events

### `joomla:updated`
Dispatched over the changed container after its content was changed, example after ajax call. 
Joomla listen to this event to update or initialize its scripts accordingly to new content (example in a subform field).

Example of updating the content with AJAX:

```javascript
const someContainer = document.querySelector('.my-dinamic-container');
fetch('/foobar/page')
  .then(function(res) {
    return res.text();
  })
  .then(function(data) {
    someContainer.innerHTML = data;
    someContainer.dispatchEvent(new CustomEvent('joomla:updated', { bubbles: true });
  });
```
The extensions can listen to this event also, example for initialization for modified part of the page:

```javascript
document.addEventListener('joomla:updated', function(event){
  const elements = event.target.querySelectorAll('.foo-bar');
  // ... do something with $elements
});
```

### `joomla:removed`

Dispatched over the changed container before its content will be removed or replaced.
For complex scripts it is preferable to `joomla:removed` together with `joomla:updated` and dispatch `joomla:removed` before replacing/removing the content.

Example of updating the content with AJAX:

```javascript
const someContainer = document.querySelector('.my-dinamic-container');
fetch('/foobar/page')
  .then(function(res) {
    return res.text();
  })
  .then(function(data) {
    someContainer.dispatchEvent(new CustomEvent('joomla:removed', { bubbles: true });
    someContainer.innerHTML = data;
    someContainer.dispatchEvent(new CustomEvent('joomla:updated', { bubbles: true });
  });
```

Example removing row of a dynamic table:
```javascript
const row = myTable.querySelector('.row-to-remove');
row.dispatchEvent(new CustomEvent('joomla:removed', { bubbles: true }));
```
