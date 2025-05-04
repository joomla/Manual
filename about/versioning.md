Versioning the documentation
============================

The documentation should reflect the current releases of Joomla!. For each minor version we will have a tagged version
in the documentation and update the version dropdown in this documentation.

## Command to run
When we release a new minor Joomla! version, the documentation will be frozen and the version will be tagged. Use

```bash title="npm"
npm run docusaurus docs:version 5.4.0
```

to tag a version. The current state of the documentation will be copied to the ```versioned_docs``` 
folder and the ```versions.js``` is updated.

## Update the Versions dropdown
In the ```docusaurus.config.js``` the key ```onlyIncludeVersions``` has to be updated to the latest stable version.
Also, the ```lastVersion``` has to be updated properly and the ```versions``` labels should be set.
