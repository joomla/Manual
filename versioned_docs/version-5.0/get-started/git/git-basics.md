---
sidebar_position: 1
title: "Git Basics"
---

## Selected Git Features

This brief introduction to Git uses the command line to illustrate some of its features. If you want to try it out, download and install Git on your laptop or workstation: [git-scm.com](https://git-scm.com/).

### Repositories

A repository is a place where all of the changes in a project are stored. In the simplest case this is a folder named .git in the same folder as the project source files. To get started, create an empty folder, make it the current directory with `cd` and then try this command:

```
git init .
```

which should result in confirmation that an empty Git repository has been created in a hidden folder named .git (folders starting with a period(.) are usually left out of listings so you don't see them, hence hidden). 

You may also use a remote repository on another computer, which is where GitHub comes in. That will be covered in separate articles.

Create some content with a text editor and save it in the source folder, the one containing the .git repo (the word repo is often used as a short form of repository). In this article this markdown document, aptly named git.md, is used as an example document. Confirm what you have with a list command:

```
ls -al
total 8
drwxr-xr-x   4 ceford  staff   128 26 Aug 07:02 .
drwxr-xr-x+ 99 ceford  staff  3168 26 Aug 06:31 ..
drwxr-xr-x   9 ceford  staff   288 26 Aug 07:02 .git
-rw-r--r--   1 ceford  staff  1689 26 Aug 07:10 git.md
```

You can look at the contents of the .git folder if you wish but as a rule you should not make any changes there yourself. Let the git commands do the work. You can delete the .git folder if you wish without affecting the source text but you will lose any history of changes.

### Staging

The next step is to issue a command to add a source file to the index of files that git keeps track of:

```
git add git.md
```

There is no response to that command - git just does it.

### Commit

The commit command tells git to record all changes made to the source files so far:

```
git commit -m "Text entered as far as Commit"
```

To which the response is:

```
[master (root-commit) 913815c] Text entered as far as Commit
 1 file changed, 45 insertions(+)
 create mode 100644 git.md
```

That strange number, 913815c, is the commit **id** that allows git to keep track of that particular point in history. The text in quotes is the commit message - it should be a short informative description of the changes made in that commit.

### Branch

Suppose you want to try a new feature but you are not sure whether you will use it. Or, you are working on a collaborative project and you want to change something contributed by others. This is where branching comes in. You make a branch of your repo, checkout the branch, make your changes and then decide what to do. Try this:

```
git branch --list
* master
```

The list command indicates that this repo has only one branch, named master. Try these commands:

```
git branch myfix
git checkout myfix
git branch --list 
  master
* myfix
```
The list shows that there are now two branches and the * indicates that the myfix branch is checked out as the current branch. I can now go ahead and make changes to the myfix branch without affecting the existing content of the master branch. If I decide to use the changes I need to commit them and then either merge the myfix branch into my master branch or ask my collaborator to merge my myfix branch into his master branch.

When the branch is finished with, by being merged or abandoned, it can be deleted.

## Full Documentation

Git has many more commands and options. Mostly you don't need to know them because your IDE handles them for you with Menu items. If you want to look up what a menu item does try this source:

[Git Documentation](https://git-scm.com/doc)

If you have been experimenting, remember you can delete the repo (.git) and you will be left with your source files as you see them in your editor.

## Using an IDE

One final point: your chosen IDE will not put any IDE specific content in your git repo. It follows that you can change your IDE and expect it to work equally well with your existing repo. 
