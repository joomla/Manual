---
title: Step-by-step list to setup a development environment for an existing extension
---

Step-by-step list to setup a development environment for an existing extension
=================

1. Create a folder for your repository
2. Create a project on Github or your git manager of choice
3. Clone the git repository into your folder or initialise a new git repository with `git init`
4. Run `composer require --dev joomla-projects/jorobo` in the folder
5. Run `vendor/bin/jorobo init` in the folder and say `yes` to use all features. You now have `php-cs-fixer`, `phpcs` for codestyle, `phpstan` for static codeanalysis, `phpunit` for unittests, `JoRobo` for release packaging and some additional tasks, `.gitignore` and `.editorconfig` for your IDE configured, as well as a `/src` folder for your source code.
6. Run `vendor/bin/jorobo ci` in the folder and select if you want to insert a setup for a Github Actions or Gitlab CI setup.
7. Modify your `jorobo.dist.ini` for your project
8. Commit all of this for your initial commit to your project.
9. Copy your unzipped extension into your `/src` folder and commit those files. Now you can go back to this first commit in case you messed something up.
10. Create a `/joomla` folder and add a copy of the Joomla version you want to support in it. This is used by the IDE, phpstan and rector to understand what the Joomla core classes are doing. This folder is already part of your `.gitignore` file.
11. Run `vendor/bin/php-cs-fixer fix` in the root of the project to get all your files to adhere to the PSR-12/PHP PER coding style. Commit the changes, create a `.git-blame-ignore-revs` and add the hash of the commit as one line in the file. This helps when using `blame` in git later when trying to find out who did what changes when.
12. Run `vendor/bin/jorobo rector` to install Rector to refactor your code automatically. It will create a default `rector.php` in the root of your project, which you have to modify. Please read the [documentation here](https://github.com/joomla-projects/jrector/blob/main/docs/index.md) to understand what you are doing! Run rector with `vendor/bin/rector --dry-run` to check the changes first and then without the parameter to actually do the modifications. After each run, check the modifications and commit them.
    
    If you have a non-namespaced extension, the following steps will help you with updating it to namespaces:
       - The MVC rules creates a `rename.php`, which moves the files to their new places in the namespaced structure. Since rector decided against doing filesystem operations, this needs to be run separately by calling `php rename.php` in the root of your project. Remember to commit before and after moving the files, so that git keeps the connection between the old and new location and you retain the history across the move of the files.
       - Now add the namespace to your extensions manifest file by adding `<namespace path="src">Your\Base\Namespace\Component\Componentname</namespace>` to it.
       - You are now still missing the `services/provider.php` in your components administrator folder. This you have to create manually.
13. Commit the changes to your repository and push them to your Github or Gitlab. Run `vendor/bin/php-cs-fixer fix` once more for good measure to ensure the changes by rector did not introduce new codestyle issues.
14. If your folder structure of your old extension does not follow the structure when installed in a Joomla installation, you should now move the admin part to `src/administrator/components/<your component>`, your site part to `src/components/<your component>` etc. Remember to commit that change. 
15. Now would be the time that you really should open your project in PHPStorm if you haven't done so already.
16. Create a test installation of Joomla somewhere to test your extension.
17. Copy the content of your `/src` folder over the test installation to have all current project files in the right locations at this point. 
18. Now we want to automatically copy all changes in our repository to the test installation. Go to `Settings -> Build, Execution, Deployment -> Deployment` and create a new deployment target with your test installation as target. Also set the `Mappings` and mark the deployment target as default. Go to `Settings -> Build, Execution, Deployment -> Deployment -> Options` and set `Upload changed files automatically to the default server` to `Always`. Now all modifications in PHPStorm will automatically show up in your test installation.
19. Now run `vendor/bin/phpstan` to get a report of all issues phpstan is finding. Fix them, commit, repeat until you are happy with the number of errors.
20. Discover your extension and test it in your test installation, fix all bugs you notice, commit after each bug, repeat until you are happy with the current state.
21. Run `vendor/bin/robo headers` to update all your copyright headers to the right structure you can defined in your `jorobo.dist.ini`. Pay attention that you are only changing the headers of your own code and not from third parties! Commit!
22. Modify your manifest file and replace the relevant parts with the placeholders from JoRobo defined in the documentation here.
23. Set the version in your manifest and wherever else you need to set it, create a new tag and then run `vendor/bin/robo build`. You now have your installable extension package in your projects `/dist` folder.

Congratulations, you now updated your Joomla 3 or later extension to the latest Joomla version, applied the standard codestyle for PHP projects, updated your code to PHP 8.1, don't have any deprecated code and now have a professional development environment including a CI system for each commit. 

New contributors to your extension only have to check out the repository and run `composer i` in the root of the project to have a working setup. Additonally you could create unit tests or add a system test setup with cypress to ensure your extension still works as expected after each change you do in the future. 

While all of these checks aren't a guarantee that your code is bug-free, it should greatly help increasing the quality of your extension and give you the opportunity to concentrate on providing new value with improved features to your users.
