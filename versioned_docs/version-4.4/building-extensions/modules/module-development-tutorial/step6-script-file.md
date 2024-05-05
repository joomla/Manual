---
sidebar_position: 6
title: Step 6 Adding a Script File
---

Step 6 Adding a Script File
===========================

## Introduction

In this step we include an installation script file. 
This script file is run whenever the extension is installed or uninstalled, and can be used to perform various operations associated with the installation, for example to:
- check the minimum PHP version and Joomla version required
- predefine default configuration for the extension
- set up initial database data

An installation script file is a class with 5 functions: 
- preflight - called at the start of the install process
- install, update, uninstall - called during the inital install / installation of an update / uninstall of the extension
- postflight - called at the end of the install process

## Install Process