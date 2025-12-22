---
sidebar_position: 1
---

New Features
============

:::tip[Developer Note]
  Since this version of Joomla has not been released yet, this page can change anytime.
:::

All the new features that have been added to this version.
Any changes in best practice.

## Add new `nocache` string for joomla.asset.json version field
- **PR**: [#46379](https://github.com/joomla/joomla-cms/pull/46379) by **hleithner**
- **What changed**: Developers can now use `nocache` in joomla.asset.json version field to prevent caching during development.
- **Usage**:
  ```json
    {
      "version": "nocache"
    }
  ```  
- **Impact**: Assets can no be loaded with a cache-busting string during development to ensure the latest version is always loaded.

---
