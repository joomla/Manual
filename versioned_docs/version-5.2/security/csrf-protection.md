---
sidebar_position: 5
---

CSRF Protection
======================
Cross-Site request forgery is an attack type where an HTML form on an external, attacker-controlled site is used to perform an attack against a target site.

Imagine the following scenario: 
* you are running a Joomla site as an administrator and are currently logged in
* in the same browser you want to buy a super cheap new TV from an online shop that a stranger has just sent you via email
* you click on the "add to cart"-button of that online shop - however, instead of adding the item to a cart, you end up in the Joomla administration of your site, seeing a "the user has been added"-confirmation message

So, what has just happened? Well, you have been hacked!
The "add to cart"-form in the shop has been manipulated by the attacker:

```html
<form action="https://myjoomlasite.com/administrator/index.php" method="post">
    <input type="hidden" name="task" value="user.add" />
    <input type="hidden" name="option" value="com_users" />
    <input type="hidden" name="jform[username]" value="attackeruser" />
    <input type="hidden" name="jform[password]" value="attackerpwd123" />
    <input type="submit" value="Add to cart" />
</form>
```

The form's ```action``` attribute points to the victim's site - and therefore the request data of that form is forged across the two sites: a CSRF is happening. In this scenario, the CSRF is used to create a new user for the attacker - and as that request is executed with the permissions of the currently logged in user, the request succeeds.

Luckily, this scenario is theoretical as Joomla prevents CSRF attacks with a simple security measure.

## Prevention
In order to prevent CSRF attacks, a randomly generated string is appended to each and every request that is supposed to perform changes to the site:

```php
<form action="index.php" method="post">
    [...]
    <?php echo HTMLHelper::_('form.token'); ?>
</form>
```

The ```form.token``` method generates a hidden input element with a random name and "1" as value. The random name is stored in the user session and thereby Joomla can check if it's included in the request after the form has been submitted.
In order to trigger the check, use the ```$this->checkToken();``` method in controller classes or the ```Session::checkToken()``` method outside of controllers.

As the random name is stored in the user session and therefore session-specific, it's impossible for an external attacker to include it in the manipulated form. The CSRF attack will fail.

__Important:__ CSRF tokens are unrelated from permission checks! A passed CSRF check does __not__ prove that a user is logged in, or has specific permissions to execute a given task.