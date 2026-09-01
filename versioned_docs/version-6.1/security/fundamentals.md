---
sidebar_position: 2
---

Fundamentals
============
There are a bunch of very basic guidelines that you should follow in order to develop secure code.

## No 1: All user input is evil

Consider each and every input from a user as evil input. It can't be trusted and always has to be filtered and/or validated on input and needs escaping on output.

Please have in mind that this does not only apply to "obvious" sources of user input, like the POST or GET input, but also other sources that are controlled by the user like:
* cookies
* the REQUEST superglobal
* major parts of the SERVER superglobal as it contains user-controlled input like the URL, the domain or the HTTP method
* HTTP request headers

## No 2: client-side security is no security

Everything that's happening in a client-side context (=in the browser) is user-controlled. That also means that any security measure that's implemented on the client-side is no security measure at all, as the user can always deactivate or manipulate these checks.

This fundamental most importantly applies to:
* (form) validation: browser-based input validation is a UX feature (as it provides instant feedback to the user without a page reload) but not a replacement for server-side validation
* access checks: if you, i.e. output a secret string to the browser but hide it via `display:none`, it's still accessible by the user as removing the display-directive is trivial
* rate-limiting: if you limit the number of requests that a client is allowed to perform with client-side measures (i.e. by disabling a button via JS) that's again no protection at all

## No 3: Don't do your own crypto

Properly implemented cryptography does a fantastic job to keep secret stuff secret. The hard part however is implementing it properly, as often details decide about whether an implementation is indeed secure or not. 
Therefore you should not do your own implementations of cryptographic methods or algorithms. Instead, use "off-the-shelf" implementations like the [libsodium](https://www.php.net/manual/de/book.sodium.php) methods available in PHP. These methods have been developed by people that are way smarter than you and are extensively tested and reviewed.

## No 4: Don't do security by obscurity

This rule does not only apply to the actual implementations in your codebase, but also to how you should handle a security issue in your code: once it's patched and the patch has been released, be open about it, notify users about the issue and the patch and outline its criticalness. 

## No 5: Reduce your attack surface

Every single line of code that you write can contain a security issue and increases your attack surface. Carefully weight the advantages of a new feature against the maintenance effort and the increased attack surface.

For extension developers that also means that Joomla core classes and features should be used whenever possible instead of writing own implementations, as Joomla's core code is well maintained, tested and has active security coverage by the security team.