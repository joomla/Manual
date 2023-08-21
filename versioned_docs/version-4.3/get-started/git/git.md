---
sidebar_position: 2
---

# Git

From Wikipedia: [Git](https://en.wikipedia.org/wiki/Git) is free and open source software for distributed version control: tracking changes in any set of files, usually used for coordinating work among programmers collaboratively developing source code during software development. Its goals include speed, data integrity, and support for distributed, non-linear workflows (thousands of parallel branches running on different systems).

Git is available for all modern platforms. It is mostly associated with managing code such as PHP, Java or Python but it can be used to manage any line-based text such as this documentation written in Markdown format. Git can be used from the command line although most users rely on an Integrated Development Environment (IDE) to compose and run git commands.

To learn more, start with the Git Basics page and then move on to the cited Github based examples.

## References

The following articles are from docs.joomla.org:

- [Git Branching Quickstart](https://docs.joomla.org/Git_branching_quickstart)
- [Working with git and github](https://docs.joomla.org/Working_with_git_and_github)
- [Git for Testers and Trackers](https://docs.joomla.org/Git_for_Testers_and_Trackers)
- [Setting up Eclipse PDT 2020 and Git for Pulls](https://docs.joomla.org/Setting_up_Eclipse_PDT_2020_and_Git_for_Pulls)
- [My first pull request to Joomla! on Github](https://docs.joomla.org/My_first_pull_request_to_Joomla!_on_Github)

<<<<<<< HEAD
These references may be deleted when the new documentation is considered _mature_.
This document provides a quick step by step procedure using command line on how to get a git branch and quickly run a setup.

## Step 1: Create a fork repo

=======
These references may be deleted when the new documentation is considered *mature*.
This document provides a quick step by step procedure using command line on how to get a git branch and quickly run a setup.

## Step 1: Create a fork repo
>>>>>>> 837cb9577d349d3f222660d93a95a264e51c1f7a
1. Create a GitHub account (https://www.github.com - "Sign Up for free")
2. Create a fork of the Joomla repository you want to modify. This can be done by clicking on a fork button.
3. After Clicking on fork. Give name to your forked repo and click on create.
4. Make sure you are logged into your GitHub account:
   1. Go to https://github.com/joomla/joomla-cms/ (Joomla! CMS) or https://github.com/joomla-framework/ (Joomla! Framework)
   2. Click on the "Fork" button on the top right and wait while the process ends.
   3. You now have a fork of the Joomla repo on GitHub under ...github.com/yourusername/joomla-....
<<<<<<< HEAD

## Step 2: Create a working copy

You can create a single working copy for your projects or multiple working copies. In general Git branching allows you to work on multiple project copies in a single working place. If you want to work on concurrent projects you may wish to have multiple working copies. You can work out the flow that works best for you. Complete these instructions per working copy:

1. Go to your fork on GitHub (e.g. http://github.com/YourName/joomla-cms)
2. By default a "Read, Write Access" link should be selected. If you have set up SSH keys, then use this option. If you haven't, then HTTPS should be selected. Copy the link by highlighting or selecting the "copy to clipboard" option.
3. Now open your terminal on your local machine (Windows: GIT BASH link; Mac: Terminal; Linux: Your favourite terminal emulator)
4. And follow the below commands:

```bash

git <clone paste copied URL> <here path to target directory>

```

Here path to target directory is optional. The recommended way is to go to your target folder and open your terminal in that folder and then simply run the above command without providing the path to the target directory. It should look something like this if you are providing a path:

```bash

git clone https://github.com/pasamio/joomla-cms.git /Users/pasamio/joomla-cms

```

And if you are in your target directory then you your command should look like this:

```bash

git clone https://github.com/pasamio/joomla-cms.git

```

**Note:** Git will automatically create the path to the directory if it doesn't exist. 5. Now go to your cloned repo folder:

```bash
cd <path to target directory>
```

For instance:

```bash
cd /Users/pasamio/joomla-cms
```

6. Add a remote origin for the Joomla repository for this fork. Go to https://github.com/joomla/joomla-cms/ and copy the "Git Read-Only" link.
7. You can add remote to your repo by pasting the following commands:

```bash

git remote add joomla <copied URL>

```

It should look something like this:

```bash

git remote add joomla git://github.com/joomla/joomla-cms.git

```

Congratulations! At this point you've cloned your repository (it will be the remote known as 'origin') and add a remote for the Joomla Project repository you're working on (as 'joomla').

### Step 3: Creating a new branch

Each time you start working on a new feature, bug fix, or concept, We recommend you to start with a new branch. Branching and merging in Git is easier than in Subversion with many conflicts around the same changes being made in two places handled automatically. Each branch can contain a particular project that you are working on and you can easily switch between branches in the same working copy. Because Git is designed to be distributed, you can commit changes to work in a branch prior to switch branches without having to push this to the wider world.

1. Before creating a new branch, make sure you have latest changes. This can be done by making a pull request:

```bash

git pull origin <origin name>

```

2. From here any updates will have been downloaded from all repositories, most importantly Joomla.
3. Create and checkout a new branch with the following:

```bash

git checkout -b <yourbranchname> joomla/master

```

=======
## Step 2: Create a working copy
You can create a single working copy for your projects or multiple working copies. In general Git branching allows you to work on multiple project copies in a single working place. If you want to work on concurrent projects you may wish to have multiple working copies. You can work out the flow that works best for you. Complete these instructions per working copy:
1. Go to your fork on GitHub (e.g. http://github.com/<YourName>/joomla-cms)
2. By default a "Read, Write Access" link should be selected. If you have set up SSH keys, then use this option. If you haven't, then HTTPS should be selected. Copy the link by highlighting or selecting the "copy to clipboard" option.
3. Now open your terminal on your local machine (Windows: GIT BASH link; Mac: Terminal; Linux: Your favourite terminal emulator)
4. And follow the below commands:
```bash
git clone <paste copied URL here> <path to target directory>
```
here <path to target directory is optional>. The recommended way is to go to your target folder and open your terminal in that folder and then simply run the above command without providing the path to the target directory.
It should look something like this if you are providing a path:
```bash
git clone https://github.com/pasamio/joomla-cms.git /Users/pasamio/joomla-cms
```
And if you are in your target directory then you your command should look like this:
```bash
git clone https://github.com/pasamio/joomla-cms.git
```
**Note:** Git will automatically create the path to the directory if it doesn't exist.
5. Now go to your cloned repo folder:
```bash
cd <path to target directory>
```
For instance:
```bash
cd /Users/pasamio/joomla-cms
```
6. Add a remote origin for the Joomla repository for this fork. Go to https://github.com/joomla/joomla-cms/ and copy the "Git Read-Only" link.
7. You can add remote to your repo by pasting the following commands:
```bash
git remote add joomla <copied URL>
```
It should look something like this:
```bash
git remote add joomla git://github.com/joomla/joomla-cms.git
```
Congratulations! At this point you've cloned your repository (it will be the remote known as 'origin') and add a remote for the Joomla Project repository you're working on (as 'joomla').
### Step 3: Creating a new branch
Each time you start working on a new feature, bug fix, or concept, We recommend you to start with a new branch. Branching and merging in Git is easier than in Subversion with many conflicts around the same changes being made in two places handled automatically. Each branch can contain a particular project that you are working on and you can easily switch between branches in the same working copy. Because Git is designed to be distributed, you can commit changes to work in a branch prior to switch branches without having to push this to the wider world.
1. Before creating a new branch, make sure you have latest changes. This can be done by making a pull request:
```bash
git pull origin <origin name>
```
2. From here any updates will have been downloaded from all repositories, most importantly Joomla.
3. Create and checkout a new branch with the following:
```bash
git checkout -b <yourbranchname> joomla/master
```
>>>>>>> 837cb9577d349d3f222660d93a95a264e51c1f7a
4. Now you are in your new branch. Most probably the name of your new branch will be appear in square brackets in your ternminal.
5. Now you are ready to make changes to the code.
6. Once you have made required changes its time to stage your code. Staging is an essential process before pushing your code to the repo. Staging simply means that your code is ready to merge with the main source code.
7. You can make commit or stage your code by using the following commands:
<<<<<<< HEAD

```bash

git add .
```

```bash
git commit -m "your message/ a short description of changes you have made"

```

Here add . means add all files in which you have made changes. 8. Now you are ready to push your code:

```bash

git push -u origin

```

This may ask for your GitHub username and password if you are using the HTTP protocol. If you are using the SSH protocol it may ask you for the passphrase for your SSH key. The "-u" option is used to mark this as the "upstream" version and will track against this branch. This means in future you can "git push" and "git pull" to receive updates from this remote and branch automatically (if you're working on your own, you'll likely only be doing a 'git push').

Now you've created a new branch, made some chanegs and pushed it your new branch in your forked repo. Now its time to merge it with your master branch.

## Step 4: Merging with master

=======
```bash
git add .
git commit -m "your message/ a short description of changes you have made"
```
Here add . means add all files in which you have made changes.
8. Now you are ready to push your code:
```bash
git push -u origin
```
This may ask for your GitHub username and password if you are using the HTTP protocol. If you are using the SSH protocol it may ask you for the passphrase for your SSH key. The "-u" option is used to mark this as the "upstream" version and will track against this branch. This means in future you can "git push" and "git pull" to receive updates from this remote and branch automatically (if you're working on your own, you'll likely only be doing a 'git push').

Now you've created a new branch, made some chanegs and pushed it your new branch in your forked repo. Now its time to merge it with your master branch.
## Step 4: Merging with master[
>>>>>>> 837cb9577d349d3f222660d93a95a264e51c1f7a
After a while it will become necessary to merge down changes from the upstream repository. This may be because those changes conflict with other changes in the repository (making a pull request "unmergeable"), because you need/want updates from the repository to continue working or just to keep the delta of changes small between your commits.

You have two major options. The first is to use a simple merge. This will attempt to pick up the changes from the remote repository and merge them locally automatically. This may result in a conflict with your work which you will be required to merge manually (just like what would happen with Subversion if there is a conflict).

You can merge either by doing an explicit "git merge" or by doing a "git pull". Doing a "git pull" is like doing a "git fetch" followed by a "git merge" and will ensure you're merging the latest changes from the remote repository:
<<<<<<< HEAD

```bash

git merge joomla master

```

This will pull down the latest changes from the repository and merge them. You may get a notice that there is a conflict you need to resolve. Once you've resolved the conflict, you will need to do a commit to mark those changes.

OR you can go to your master branch and make a pull request there.

```bash
git pull origin <new branch name>

```

:::note TODO

This section is missing, please use the **Edit this Page** link at the bottom of this page to add this section.

:::
=======
```bash
git merge joomla master
```
This will pull down the latest changes from the repository and merge them. You may get a notice that there is a conflict you need to resolve. Once you've resolved the conflict, you will need to do a commit to mark those changes.

OR you can go to your master branch and make a pull request there.
```
git pull origin <new branch name>
```










  
>>>>>>> 837cb9577d349d3f222660d93a95a264e51c1f7a
