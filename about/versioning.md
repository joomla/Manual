---
sidebar_position: 4
---

Versões
========

The Joomla Manual contains documentation for multiple versions of the Joomla software.

The mapping between the versions of the manual in GitHub and the live manual is:

| Manual do GitHub (desenvolvimento) | Manual Live de Docusaurus                               |
|-----------------------------|------------------------------------------------------|
| /docs                       | "upcoming" release  (shown as /docs/next in the URL) |
| /versioned_docs/version-m.n | version m.n (under "Current releases")               |

If your documentation changes relate to multiple versions of Joomla then you should duplicate these changes into
multiple versions of Joomla manual. These versions which are updated are currently agreed to be:

- the version m.n of the latest full Joomla release ("latest" release)
- the version m.n+1 of the next Joomla release ("upcoming" release)
- the last version (m-1.last) of the Joomla previous major version

Other versions may be present within /versioned_docs but are not updated with the changes, even if the documentation is
true for those Joomla versions.

To minimise changes it's recommended that you initially just make changes within the /docs area, and then raise
the pull request. This allows team members to review the documentation, and for you to fix any issues without
having to replicate changes to multiple versions. Then when the review process is complete the changes can be
replicated to the other versions prior to merging.

Once the pull request is merged you can delete the branch on your own repository, and sync your `main` branch with the
updated Joomla manual `main`.



Versioning a documentação
============================

:::note[Versioning the documentation]
  The documentation is versioned for each minor release of Joomla! and the version dropdown is updated.

The documentation should reflect the current releases of Joomla!. For each minor version we will have a tagged version
in the documentation and update the version dropdown in this documentation.

## Comando para executar
When we release a new minor Joomla! version, the documentation will be frozen and the version will be tagged. Use

```bash title="npm"
npm run docusaurus docs:version 5.4.0
```

to tag a version. The current state of the documentation will be copied to the ```versioned_docs``` 
folder and the ```versions.js``` is updated.

## Atualizar as Versões dropdown
In the ```docusaurus.config.js``` the key ```onlyIncludeVersions``` has to be updated to the latest stable version.
Also, the ```lastVersion``` has to be updated properly and the ```versions``` labels should be set.
