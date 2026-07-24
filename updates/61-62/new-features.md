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

## New modular build script system

The Joomla asset build pipeline has been completely overhauled. The old monolithic build scripts (`compilecss.mjs`, `compilejs.mjs`, `compress.mjs`) have been replaced with a modular, per-extension builder architecture under `build/build-modules-js/`.

Source files previously located in `build/media_source/` have been moved to `media_source/` at the repository root for consistent relative includes.
Vendor library build configuration is now centralized in `build/build-modules-js/settings.json`.

- **PR**: [#46879](https://github.com/joomla/joomla-cms/pull/46879)
- **PR**: [#47815](https://github.com/joomla/joomla-cms/pull/47815)
- **What changed**: Developers can compile or watch a single extension without triggering a full rebuild.
With the `--all` flag it is possible to watch all builders at once.
A new `builders-list` command shows all registered builders.
- **Usage**:
  ```bash
  # List all available builders
  npm run builders-list

  # Build a single extension
  npm run build -- -n com_content

  # Build only CSS for a specific template
  npm run build -- -n templates/administrator/atum -t css

  # Watch multiple extensions
  npm run watch -- -n com_content,com_categories

  # Watch all extensions at once
  npm run watch -- --all

  # Build/watch with development settings (no minification)
  npm run build:dev -- -n com_content
  npm run watch:dev -- -n com_content
  ```
- **Impact**: Developers contributing frontend assets no longer need to run a full rebuild. Targeting individual extensions significantly speeds up the development workflow.
With the new `builders-list` command, it is easy to discover all registered extension names for use with `-n`.

---

### Registering a new extension for building

To include a new extension in the build pipeline, the name must be added to `build/build-modules-js/builders-registry.mjs`:

```js
export const builders = [
  // ... existing entries
  'new_extension', // resolves to media_source/new_extension/
];
```

The name must match the subfolder under `media_source/`. If no `builder.mjs` file is found there, `DefaultModuleBuilder` is used automatically, which handles standard CSS/JS compilation.

---

### Adding a custom builder

For extensions that need non-standard build steps, the developer can create a `media_source/my_extension/builder.mjs` extending `DefaultModuleBuilder`:

```js
import DefaultModuleBuilder from '../../build/build-modules-js/builder/default-module-builder.mjs';

export default class MyExtensionBuilder extends DefaultModuleBuilder {
  async copy() {
    await super.copy();
    // add custom copy logic here
  }

  async js() {
    // custom JavaScript bundling/processing
  }
}
```

The extension name must be added to `builders-registry.mjs` as shown above. The builder factory automatically detects and loads `builder.mjs` when present.

---

### Adding a third-party vendor package via settings.json

For npm packages that should be copied to `media/vendor/`, add an entry to `build/build-modules-js/settings.json` under `settings.vendors`:

```json
{
  "name": "my-library",
  "js": {
    "node_modules/my-library/dist/my-library.min.js": "media/vendor/my-library/js/my-library.min.js"
  },
  "css": {
    "node_modules/my-library/dist/my-library.min.css": "media/vendor/my-library/css/my-library.min.css"
  },
  "provideAssets": [
    {
      "name": "my-library",
      "type": "script",
      "uri": "vendor/my-library/js/my-library.min.js",
      "dependencies": []
    }
  ],
  "licenseFilename": "LICENSE"
}
```

To apply the changes, the `vendor` builder must be run once to copy the new files:

```bash
npm run build -- -n vendor
```

---

## Media manager and link selection in TinyMCE

The image, media and link dialogs of TinyMCE are now connected to Joomla: the image and media dialogs open
the Joomla Media Manager, and the link dialog offers a "Browse links" picker where articles, contacts, menu
items and media files can be selected as link target.

- **PR**: [#48043](https://github.com/joomla/joomla-cms/pull/48043) (media manager in the image/media dialogs)
- **PR**: [#48138](https://github.com/joomla/joomla-cms/pull/48138) (link picker in the link dialog)
- **What changed**: The Joomla TinyMCE integration wires TinyMCE's file picker to pickers registered on the
new JavaScript registry `Joomla.editorFilePickers`. Core registers the Media Manager (image/media) and a
link picker (link dialog) through it. Two extension points are available for third parties:
  - register an own picker on `Joomla.editorFilePickers` (globally or per editor), for example to open an
  own media manager from the editor dialogs;
  - register the extension's content as a source of the core link picker via the `editor-link-providers`
  script options — a single `addScriptOptions()` call in an editors-xtd plugin.
- **Documentation**: [Editor File and Link Pickers](/docs/building-extensions/plugins/plugin-examples/editors-xtd-plugin/file-and-link-pickers)
- **Impact**: No changes are required for existing extensions. Extensions that already ship an own
TinyMCE `file_picker_callback` keep working — a developer-supplied callback always wins over the registry.
