---
title: Routing
---
# Introduction
In the context of a web application, routing involves analysing an incoming URL to determine which application constituent parts need to be involved to handle the request. Sometimes this is fairly straightforward, but in a Joomla site the support of Search Engine Friendly (SEF) URLs make this job particularly challenging. It is the responsibility of the Joomla Site Router to convert between SEF URLs and the internal URL format (which identifies those constituent parts).

When people access web pages on your site you want to have URLs which naturally reflect the content that is being shown, like `mysite.org/articles/latest-news`.

Internally Joomla uses a URI format which indicates what resources are involved, like `mysite.org?option=com_content&view=article&id=5`.

It's the job of the Joomla router to convert between these 2 formats.

The router `parse` functionality converts external URLs (SEF) to internal URIs

The router `build` functionality converts internal URIs to external SEF URLs.

This documentation section focuses on the Joomla Site Router, explaining how it works and how you can use it in your own applications.

You need to have a good understanding of how the Site Router works if you are developing a Joomla component for which you want to use SEF URLs, or if you want to modify the router rules for Joomla core components. 

You may find it helpful to view 2 videos, covering [parsing a URL](https://youtu.be/zqyjRuVaT8M) and [building a URL](https://youtu.be/d1WoRbXcvkw).