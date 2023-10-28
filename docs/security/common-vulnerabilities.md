---
sidebar_position: 3
---

Common Vulnerabilities
======================

## Cross-Site-Scripting / XSS
Cross-Site-Scripting issues are by far the most common issues in the Joomla extension ecosystem.

A brief example: imagine a Joomla comment extension that allows users to comment an article with a subject and a text.
Now imagine the following output template for a comment:

```php
<div class="comment">
    <h3><?php echo $comment->subject; ?></h3>
    
    <?php echo $comment->text; ?>
</div>
```

Looks straightforward, huh? But now image that a user does not use "I love your site" as a comment subject, but ```<script>executeEvilJs()</script>```.
With the output template given above, the JS provided by the user will be outputted as an executable HTML tag and the evil code will be executed in the browser of each and every user visiting the site where that comment is shown - that's a Cross-Site-Scripting vulnerability.

### Prevention
#### Filter/validate the user input
In the example above, the provided subject should be filtered and/or validated to only allow required characters - and it should disallow characters that are needed to create HTML tags, i.e. the `<` and `>` characters.
If the user input can contain HTML markup, the markup itself has to be filtered to make sure it only contains safe markup. See [the chapter about input handling](input-handling) for more information.

#### Escape the output
Unless user generated markup is specifically needed (i.e. because the user can use a WYSIWYG editor) it's highly recommended to escape each and every snippet of user provided content.
Escaping converts HTML markup into plaintext by replacing control-characters like `<` with their HTML entities, i.e. `&lt;`. 

To escape user content in Joomla, use the ```echo $this->escape($evlString)``` method when outputting content in component view or ```echo htmlspecialchars($evilString, ENT_QUOTES, 'UTF-8')``` outside of component views.

## SQL injections / SQLi
A SQL injection attack is a type of vulnerability where an attacker is able to manipulate a SQL query by injecting user controlled content.

Learn more about this attack scenario and the prevention in [the chapter about secure DB queries](secure-db-queries).

## Unrestricted file uploads
Uploading user provided files to a webservers is a potentially dangerous task as it exposes multiple attack vectors at once:
* by uploading a dangerous file type (i.e. a PHP file) an attacker might be able to execute code
* an attacker might be able to control the storage path and thereby store files in directories where that shouldn't be possible
* by uploading large files, the webspace might be filled by an attacker quickly, leading to a denial of service

Therefore file uploads must be very carefully implemented. Check the ```canUpload``` method of the ```Joomla\CMS\Helper\MediaHelper``` class as it will help you with that.

## Cross-Site-Request-Forgery / CSRF
CSRF is an attack type where an HTML form on an external, attacker-controlled site is used to perform an attack against a target site. 

### Prevention
Learn more about this in the [CSRF chapter](csrf-protection) of this manual.