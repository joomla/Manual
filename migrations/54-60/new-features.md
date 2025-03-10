---
sidebar_position: 1
---

# New features

:::tip[Developer Note]
  Since this version of Joomla has not been released yet, this page can change anytime.
:::

All the new features that have been added to this version.
Any changes in best practice.

## Filesystem adapter changes

### Improving large files handling

Starting from 6.0 Media manager introduces new class `TmpFileUpload` that represent temporary file, 
which is a reference to temporary file (that was just uploaded), without keeping whole file in the memory. 
This allows to upload large files without violation PHP max_memory limits.

Note: API calls still handle base64 encoded images, which still uses PHP memory directly.

It is recommended to update existing Filesystem Adapter:
```php
// Before:
public function updateFile(string $name, string $path, $data){
    ...
    File::write($dstPath, $data);
    ...
}

// After:
public function updateFile(string $name, string $path, $data){
    ...
    if ($data instanceof TmpFileUpload) {
        File::upload($data->getUri(), $localPath);
    } else {
        File::write($dstPath, $data);
    }    
    ...
}
```

PR: https://github.com/joomla/joomla-cms/pull/44848
