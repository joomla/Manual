---
sidebar_position: 1
---

New Features
============

All the new features that have been added to this version.
Any changes in best practice.

### Batched tag enhancement

It is now possible to batch remove a tag. PR: https://github.com/joomla/joomla-cms/pull/40613

## Modification fields header tag & module tag add custom options in XML
- **PR**: [#35184](https://github.com/joomla/joomla-cms/pull/35184) by **korenevskiy**  
- **What changed**: Developers can now extend `<field type="headertag">` and `<field type="moduletag">` with additional tag options.  
- **Usage**:
  ```xml
  <field name="header_tag" type="headertag">
    <option value="figcaption">&lt;figcaption></option>
  </field>
  ```  
- **Impact**: Template overrides and XML forms can now expose more markup options.

---

## New Date and Datetime fields
- **PR**: [#37456](https://github.com/joomla/joomla-cms/pull/37456) by **Fedik**  
- **What changed**: Introduced `date` and `datetime` field types.  
- **Usage**:
  ```xml
  <field type="date" name="date"/>
  <field type="time" name="time" filter="SERVER_UTC"/>
  <field type="datetime" name="datetime" filter="USER_UTC"/>
  ```  
- **Impact**: Developers can rely on HTML5 input controls instead of JS widgets.

---

## Fix language autoload in CMSPlugin constructor to work safely
- **PR**: [#40355](https://github.com/joomla/joomla-cms/pull/40355) by **Fedik**  
- **What changed**:  
  - Fixed autoloading of language files in the `CMSPlugin` constructor.  
  - Ensures that language loading happens in a safe, predictable way without conflicts.  
- **Usage**:  
  - No developer action required unless you overrode the plugin base class.  
  - Plugins now automatically load their language files more consistently.  
- **Impact**:  
  - Reduces errors in multilingual setups.  
  - Improves reliability of backend plugin initialization.  

---

## Tags: Remove a Tag via Batch Processing
- **PR**: [#40613](https://github.com/joomla/joomla-cms/pull/40613) by **beni71**  
- **What changed**:  
  - Added the ability to remove/unassign a single tag from multiple selected items in batch processing.  
  - Extended batch functionality to categories, contacts, and news feeds.  
- **Usage**:  
  1. In the backend, go to Articles (or Categories, Contacts, News Feeds).  
  2. Select multiple items.  
  3. Click **Batch**.  
  4. Choose **Remove Tag** option and select the tag to remove.  
- **Impact**:  
  - Editors/admins can clean up content tagging more efficiently.  
  - Reduces manual work when adjusting tags across large sets of items.  

---

## Use Dialog for Article links when “modal option” is selected
- **PR**: [#42461](https://github.com/joomla/joomla-cms/pull/42461) by **Fedik**  
- **What changed**: Article links with modal option now use Joomla’s Dialog system.  
- **Usage**:
  ```html
  <a href="#popup" data-joomla-dialog='{"textHeader":"Popup"}'>Open</a>
  ```  
- **Impact**: Consistent UI, templates relying on Bootstrap modals must adapt.

---

## Admin model returns stdClass instead of CMSObject
- **PR**: [#42961](https://github.com/joomla/joomla-cms/pull/42961) by **laoneo**  
- **Usage migration**:
  ```php
  // Before
  $item->get('catid');

  // Now
  $item->catid;
  ```  
- **Impact**: Code calling `get()` on AdminModel items must switch to property access.

---

## Remove deprecated db object from views
- **PR**: [#42962](https://github.com/joomla/joomla-cms/pull/42962) by **laoneo**  
- **Usage migration**:
  ```php
  $db = \Joomla\CMS\Factory::getContainer()->get(\Joomla\Database\DatabaseInterface::class);
  $db->setQuery($query);
  ```  
- **Impact**: `$this->db` removed, use DI container.

---

## Workflow: use generic AbstractApplication in type hint
- **PR**: [#43155](https://github.com/joomla/joomla-cms/pull/43155) by **Hackwar**  
- **Impact**: Workflow models can be used in CLI apps, not just web.

---

## CategoryNode/Changelog: Remove legacy error handling trait
- **PR**: [#43777](https://github.com/joomla/joomla-cms/pull/43777) by **Hackwar**  
- **What changed**:  
  - Removed old error handling trait from `CategoryNode` and changelog code.  
- **Usage**:  
  - No developer action required unless you extended `CategoryNode`.  
- **Impact**:  
  - Cleans up deprecated error handling.  
  - Encourages migration to proper exception handling.  

---

## Installer: Remove dependency on Adapter class
- **PR**: [#43792](https://github.com/joomla/joomla-cms/pull/43792) by **Hackwar**  
- **What changed**:  
  - Installer subsystem no longer depends on the legacy `Adapter` class.  
  - Refactored to use new dependency-injected services.  
- **Usage**:  
  - Extension developers should remove direct `Adapter` references in custom installers.  
- **Impact**:  
  - Simplifies installer logic.  
  - Helps move toward a cleaner, framework-based install process.  

---

## Updater: Remove Adapter classes from inheritance
- **PR**: [#43793](https://github.com/joomla/joomla-cms/pull/43793) by **Hackwar**  
- **Usage migration**:
  ```php
  $adapter = $updater->getAdapter('extension');
  $updater->setAdapter('mytype', MyAdapter::class);
  ```  
- **Impact**: Modern updater, adapters injected dynamically.

---

## Removing Adapter and AdapterInstance classes
- **PR**: [#43794](https://github.com/joomla/joomla-cms/pull/43794) by **Hackwar**  
- **What changed**:  
  - Deprecated `Adapter` and `AdapterInstance` classes fully removed.  
- **Usage**:  
  - Replace custom adapter usage with the new updater API.  
- **Impact**:  
  - Breaks extensions still tied to adapters.  
  - Part of Joomla’s modernization of update/install.  

---

## Smart Search: Removing dependency on CMSObject
- **PR**: [#43795](https://github.com/joomla/joomla-cms/pull/43795) by **Hackwar**  
- **What changed**:  
  - Refactored Smart Search to remove its dependency on `CMSObject`.  
- **Usage**:  
  - Developers extending Smart Search should check for removed `CMSObject` references.  
- **Impact**:  
  - Improves decoupling.  
  - Prepares Smart Search for Joomla’s CMSObject deprecation.  

---

## Languagefilter: Refactoring of routing
- **PR**: [#43858](https://github.com/joomla/joomla-cms/pull/43858) by **Hackwar**  
- **Impact**: Less redirecting, cleaner multilingual routing.

---

## GSOC2021: Merge Featured
- **PR**: [#43907](https://github.com/joomla/joomla-cms/pull/43907) by **chmst**  
- **Usage migration**: Replace `view=featured` with `view=articles&filter[featured]=1`.  
- **Impact**: `FeaturedController` deprecated, use `ArticlesController`.

---

## Numbers custom fields plugin
- **PR**: [#43974](https://github.com/joomla/joomla-cms/pull/43974) by **TLWebdesign**  
- **Usage**:
  ```xml
  <field name="age" type="numbers" min="0" max="120" step="1"/>
  ```  
- **Impact**: Numeric-only input made easy.

---

## Move CMS Filesystem package to compat plugin
- **PR**: [#44240](https://github.com/joomla/joomla-cms/pull/44240) by **Hackwar**  
- **Impact**: Legacy `Joomla\CMS\Filesystem` classes only available if compat plugin enabled.

---

## Fulfill InstallerScriptInterface with a trait
- **PR**: [#44381](https://github.com/joomla/joomla-cms/pull/44381) by **bembelimen**  
- **Usage**:
  ```php
  use Joomla\CMS\Installer\InstallerScriptTrait;
  class com_exampleInstallerScript implements InstallerScriptInterface { use InstallerScriptTrait; }
  ```  
- **Impact**: Less boilerplate in installer scripts.

---

## Searchtools use requestSubmit() and add joomla:update listener
- **PR**: [#44496](https://github.com/joomla/joomla-cms/pull/44496) by **LadySolveig**  
- **Usage**:
  ```js
  document.addEventListener('joomla:update', () => console.log('List reloaded'));
  ```  
- **Impact**: Easier AJAX extension of list views.

---

## Media: allow thumbnail for any file type
- **PR**: [#44847](https://github.com/joomla/joomla-cms/pull/44847) by **Fedik**  
- **Usage**: Implement `onFetchMediaItems` to supply custom thumbs.  
- **Impact**: Better UX in Media Manager.

---

## Use WebAsset for installation
- **PR**: [#45000](https://github.com/joomla/joomla-cms/pull/45000) by **heelc29**  
- **Usage**:
  ```php
  $wa = $app->getDocument()->getWebAssetManager();
  $wa->useScript('form.validate');
  ```  
- **Impact**: Installer unified under WebAsset system.

---

## Field simple color as web component
- **PR**: [#45004](https://github.com/joomla/joomla-cms/pull/45004) by **dgrammatiko**  
- **Usage**:
  ```xml
  <field name="color" type="color" control="simple"/>
  ```  
- **Impact**: Uses web components, old overrides may break.

---

## Made the alias field always visible in article edit form
- **PR**: [#45044](https://github.com/joomla/joomla-cms/pull/45044) by **raj20889**  
- **Impact**: Alias always shown, improves clarity.

---

## Replace dialog GIF loader with SVG loader
- **PR**: [#45097](https://github.com/joomla/joomla-cms/pull/45097) by **Fedik**  
- **Impact**: Modern SVG loader, no action needed.

---

## Fix missing modified start/end date filter in Articles API endpoint
- **PR**: [#45142](https://github.com/joomla/joomla-cms/pull/45142) by **laoneo**  
- **Usage**:
  ```bash
  GET /api/v1/content/articles?filter[modified_start]=2025-02-01&filter[modified_end]=2025-02-28
  ```  
- **Impact**: Enables delta sync in APIs.

---

## Enable multiple image extensions in Random Image module
- **PR**: [#45200](https://github.com/joomla/joomla-cms/pull/45200) by **AdarshSantoria**  
- **Usage**: Enter `jpg,png,webp` in module settings.  
- **Impact**: Flexible Random Image module.

---

## Note Custom Field Plugin
- **PR**: [#45233](https://github.com/joomla/joomla-cms/pull/45233) by **TLWebdesign**  
- **Usage**: Create new Field → type `Note`. Configure heading, text, CSS class.  
- **Impact**: UX guidance inside forms.

---

## Restore onBeforeExecute event for CMSApplication
- **PR**: [#45426](https://github.com/joomla/joomla-cms/pull/45426) by **Fedik**  
- **Usage**: Subscribe to `onBeforeExecute` to hook before app runs.  
- **Impact**: Enables pre-routing plugins.
- **Note**: The language is available only onAfterInitialise event. If you're trying to use language in the plugin constructor, consider to move this logic into the event callback.

---

## Extend versioning, save related information in history table
- **PR**: [#45515](https://github.com/joomla/joomla-cms/pull/45515) by **rdeutz**  
- **Usage**:
  ```php
  class MyModel extends AdminModel implements VersionableModelInterface { use VersionableModelTrait; }
  ```  
- **Impact**: Versioning now restores custom fields & tags.

---

## Improve ListView toolbar & components
- **PR**: [#45521](https://github.com/joomla/joomla-cms/pull/45521) by **bembelimen**  
- **Usage**: Extend `ListView` base for custom components.  
- **Impact**: Modernized toolbars, safer error handling.

---

## Update layouts to use Form control fields
- **PR**: [#45694](https://github.com/joomla/joomla-cms/pull/45694) by **Fedik**  
- **Usage**:
  ```php
  echo $this->filterForm->renderControlFields();
  ```  
- **Impact**: Standardises layout hidden fields via Form API.

---
