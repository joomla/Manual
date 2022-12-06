Dark Mode for developers and content creators
=============================================

Joomla 4.3 introduced a feature in the Atum backend template called Dark Mode. This allows the template to switch from its usual light colour scheme (dark text on light background) to a dark colour scheme (light text on dark background) either permanently, or when the browser preferences indicate we should do that.

If you are a developer who is building front- or backend templates, editor plugins, or any other type of extension which has a backend user interface (component, module, or plugin) you should add support for Dark Mode to provide better user experience and avoid display artefacts when your extension is used together with a dark colour scheme.

Recommended reading on Dark Mode:
* [Dark Mode is the new… black?](https://www.dionysopoulos.me/dark-mode-is-the-new-black.html). A _very_ simple introduction to Dark Mode.
* [MDN article on prefers-color-scheme](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme) for a quick overview. Do peruse the links under “See also”.
* [CSS Tricks guide on Dark Mode](https://css-tricks.com/a-complete-guide-to-dark-mode-on-the-web/) for a deep dive into dark colour scheme handing.
* [The Complete Guide To The Dark Mode Toggle](https://ryanfeigenbaum.com/dark-mode/?ref=heydesigner) which also includes accessibility tips and tricks for implementing dark color schemes.
* [Hello Darkness, my old friend](https://web.dev/prefers-color-scheme/) on web.dev. This is the most complete, but very likely intimidating, guide to Dark Mode.

## Dark mode for content creators

If you are a content creator you can customise what is shown when the site is displayed with a light or dark colour scheme using simple CSS — you can have the CSS either inline or in your template's `user.css` file.

### Content, background images

In most likelihood, you may want to replace parts of your content and background images with slightly different versions in Dark Mode. You can easily do that with CSS media queries.

For example, you may have the following HTML structure:

```html
<article id="the-force-article">
    <header class="article-section">
        <div class="light-only bg-foobar">
            <h1>
                <span class="fa fa-brands fa-rebel" aria-hidden="true"></span>
                Welcome to the Light Side
            </h1>
        </div>
        <div class="dark-only bg-foobar">
            <h1>
                <span class="fa fa-brands fa-empire" aria-hidden="true"></span>
                Welcome to the Dark Side
            </h1>
        </div>
    </header>
    <p class="light-only">
        The Force is with us.
    </p>
    <p class="dark-only">
        We have Death Star.
    </p>
</article>
```

We can display a completely different message depending on the color scheme by adding some CSS:

```html
<style>
    /** Base style (light mode) **/
    :root {
        /** Showing that you can use CSS variables **/
        --example-light-only-display: inherit;
        --example-dark-only-display: none;
        --example-header-bg-image: linear-gradient(45deg, darkblue 0%, deepskyblue 50%, skyblue 100%);
    }

    header.article-section h1 {
        font-family: "Bellania", fantasy;
        font-size: 48pt;
        line-height: 1.4;
        background-image: var(--example-header-bg-image);
        background-size: 200% 100%;
        background-clip: text;
        color: transparent;
        margin: 0;
        padding: 0;
    }

    .light-only {
        display: var(--example-light-only-display, inherit);
    }
    .dark-only {
        display: var(--example-dark-only-display, inherit);
    }

    .bg-foobar {
        /** Showing that you can use regular CSS as well **/
        background: no-repeat linear-gradient(180deg, lightskyblue 0%, whitesmoke 80%, transparent 100%);
    }

    /** Support automatic dark mode (browser preference) **/
    @media screen and (prefers-color-scheme: dark) {
        body.joomla-dark-auto {
            /** Using CSS variables is more compact and cleaner **/
            --example-light-only-display: none;
            --example-dark-only-display: block;
            --example-header-bg-image: linear-gradient(
                    45deg,
                    red 0%, orange 10%, yellow 20%, limegreen 30%, skyblue 40%, deepskyblue 50%,
                    royalblue 60%, slateblue 70%, blueviolet 80%, mediumvioletred 90%, red 100%
            );
        }

        body.joomla-dark-auto .bg-foobar {
            /** Overriding an entire CSS rule is clunkier but easier for less experienced authors. **/
            background-image: linear-gradient(180deg, #333 0%, transparent 100%)
        }
    }

    /** 
      * Support forced dark mode (browser preference)
      *
      * Unfortunately, you do need to duplicate the overrides from the automatic dark mode. 
     **/
    body.joomla-dark-always {
        --example-light-only-display: none;
        --example-dark-only-display: block;
        --example-header-bg-image: linear-gradient(
                45deg,
                red 0%, orange 10%, yellow 20%, limegreen 30%, skyblue 40%, deepskyblue 50%,
                royalblue 60%, slateblue 70%, blueviolet 80%, mediumvioletred 90%, red 100%
        );
    }

    body.joomla-dark-always .bg-foobar {
        background-image: linear-gradient(180deg, #333 0%, transparent 100%)
    }
</style>
```

You should note that there are **two** different kinds of dark colour schemes you can support in your CSS:
1. Auto-changing between light and dark mode based on the browser preference.
2. Forced light and forced dark mode.

For the auto-changing dark mode you need to wrap your CSS rules inside a `@media screen and (prefers-color-scheme: dark)` media query **and** prefix all your rules with `body.joomla-dark-auto`. If you forget to do the latter and the user has selected the Always Light (forced light mode) option in the template style or their use preferences you will be showing them the dark mode content when their browser says that it prefers a dark color scheme _even though the user has communicated to us, through Joomla preferences, that they always want a light color theme_.

If you want to support the forced, always-on dark mode you must NOT use a media query. You need to prefix all your rules with `body.joomla-dark-always`.

### Images

In many cases you need to display a different image inside your content depending on whether you are displaying your content with a light or a dark colour scheme. This could be for reasons of art direction or more pedestrian, straightforward reasons e.g. showing a different screenshot that matches the colour scheme the site is displayed in.

The way to do this is by using a `<PICTURE>` element which contains two elements. One `<IMG>` element with the picture to show in the light colour scheme and a `<SOURCE>` element with the picture to show in the dark color scheme. For example:

```html
<picture>
    <source srcset="https://dm0qx8t0i9gc9.cloudfront.net/thumbnails/video/yRF5c-O/videoblocks-door-opens-in-a-dark-room-and-bright-light-fills-the-room-slowly-opening-door-fills-the-dark-room-with-divine-light-blue-1_bg5rqazkf_thumbnail-1080_10.png" media="screen and (prefers-color-scheme: dark)">
    <img src="https://dm0qx8t0i9gc9.cloudfront.net/thumbnails/video/yRF5c-O/videoblocks-door-opens-in-a-dark-room-and-bright-light-fills-the-room-slowly-opening-door-fills-the-dark-room-with-divine-light-orange-golden-2_rbh6gwwkz_thumbnail-1080_05.png" alt="Photograph of a door on a nondescript wall, opening into a bright light which evokes a sense of magic and wonder" style="width: 100%; height: auto">
</picture>
```

This method has only one drawback. If the user has selected an always dark mode in the Joomla options (template style options and/or the user settings) _but_ their browser tells us that the user prefers a light color scheme we will inadvertently display the light image. This is not ideal.

Joomla gives us a solution for that by applying the `joomla-dark-always` CSS class on the `<BODY>` tag of the document. This means that with a bit of CSS we can elegantly solve our problem:

```html
<style>
    body:not(.joomla-dark-always) .example-onlydark { display: none; }
    body.joomla-dark-always .example-autodark { display: none; }
</style>
<picture class="example-autodark">
    <source srcset="https://dm0qx8t0i9gc9.cloudfront.net/thumbnails/video/yRF5c-O/videoblocks-door-opens-in-a-dark-room-and-bright-light-fills-the-room-slowly-opening-door-fills-the-dark-room-with-divine-light-blue-1_bg5rqazkf_thumbnail-1080_10.png" media="screen and (prefers-color-scheme: dark)">
    <img src="https://dm0qx8t0i9gc9.cloudfront.net/thumbnails/video/yRF5c-O/videoblocks-door-opens-in-a-dark-room-and-bright-light-fills-the-room-slowly-opening-door-fills-the-dark-room-with-divine-light-orange-golden-2_rbh6gwwkz_thumbnail-1080_05.png" alt="Photograph of a door on a nondescript wall, opening into a bright light which evokes a sense of magic and wonder" style="width: 100%; height: auto">
</picture>
<img class="example-onlydark" src="https://dm0qx8t0i9gc9.cloudfront.net/thumbnails/video/yRF5c-O/videoblocks-door-opens-in-a-dark-room-and-bright-light-fills-the-room-slowly-opening-door-fills-the-dark-room-with-divine-light-blue-1_bg5rqazkf_thumbnail-1080_10.png" alt="Photograph of a door on a nondescript wall, opening into a bright light which evokes a sense of magic and wonder" style="width: 100%; height: auto">
```

The logic here is straightforward. If the `joomla-dark-always` CSS class is _not_ set we will use the `<PICTURE>` element and hide the solo `<IMG>` tag which only has the dark picture. Otherwise, (when we have a forced dark mode) we hide the `<PICTURE>` element and show the solo `<IMG>` tag which only has the dark picture.

This leaves us with a final problem to solve: if the Joomla settings tell us to use an always light mode but the user's browser says it prefers a dark colour scheme we show the dark image because of the way the `<SOURCE>` tag works. Okay, let's improve upon the previous solution:

```html
<style>
    body:not(.joomla-dark-auto) .example-autodark { display: none; }
    body:not(.joomla-dark-never) .example-onlylight { display: none; }
    body:not(.joomla-dark-always) .example-onlydark { display: none; }
</style>
<picture class="example-autodark">
    <source srcset="https://dm0qx8t0i9gc9.cloudfront.net/thumbnails/video/yRF5c-O/videoblocks-door-opens-in-a-dark-room-and-bright-light-fills-the-room-slowly-opening-door-fills-the-dark-room-with-divine-light-blue-1_bg5rqazkf_thumbnail-1080_10.png" media="screen and (prefers-color-scheme: dark)">
    <img src="https://dm0qx8t0i9gc9.cloudfront.net/thumbnails/video/yRF5c-O/videoblocks-door-opens-in-a-dark-room-and-bright-light-fills-the-room-slowly-opening-door-fills-the-dark-room-with-divine-light-orange-golden-2_rbh6gwwkz_thumbnail-1080_05.png" alt="Photograph of a door on a nondescript wall, opening into a bright light which evokes a sense of magic and wonder" style="width: 100%; height: auto">
</picture>
<img class="example-onlydark" src="https://dm0qx8t0i9gc9.cloudfront.net/thumbnails/video/yRF5c-O/videoblocks-door-opens-in-a-dark-room-and-bright-light-fills-the-room-slowly-opening-door-fills-the-dark-room-with-divine-light-blue-1_bg5rqazkf_thumbnail-1080_10.png" alt="Photograph of a door on a nondescript wall, opening into a bright light which evokes a sense of magic and wonder" style="width: 100%; height: auto">
<img class="example-onlylight" src="https://dm0qx8t0i9gc9.cloudfront.net/thumbnails/video/yRF5c-O/videoblocks-door-opens-in-a-dark-room-and-bright-light-fills-the-room-slowly-opening-door-fills-the-dark-room-with-divine-light-orange-golden-2_rbh6gwwkz_thumbnail-1080_05.png" alt="Photograph of a door on a nondescript wall, opening into a bright light which evokes a sense of magic and wonder" style="width: 100%; height: auto">
```

We now have three CSS classes which control what appears in automatic dark mode (Browser Preference), forced light mode (Always Light), and forced dark mode (Always Dark). The `<PICTURE>` element only displays in the automatic dark mode case. The first `<IMG>` which contains a dark photo only displays in forced dark mode. The second `<IMG>` which contains a light photo only displays in forced light mode.

Granted, this is a bit more complicated than just using a singular picture and cannot be directly supported by Joomla's WYSIWYG editor; you will have to switch to HTML source code mode and make those adjustments manually.

The CSS code for the CSS classes which control under which colour scheme we will display each element can be placed in your template's `user.css` file (in the frontend), or (if you are an extension developer), in your extension's main CSS file so you don't have to define them every time you want to display alternative pictures.

Performance-wise, this is a very good solution. The browser will only ever load the image file it needs to display. It will not load the images it does not need to use.

## Dark Mode for extension developers

When you are writing the CSS files for your extensions you should start with the light colour scheme first, using as many [CSS variables](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties) as possible for any custom colors. It is recommended that you prefix your CSS variables with two dashes, followed by your extension's name, followed by a dash. For example: `--com_example-main-background`.

When defining your CSS variables you can provide fallbacks to the default CSS variables defined by Atum and a final fallback to a hard-coded color. Fallbacks can be many levels deep. For example:
```css
:root {
    --com_example-main-background: var(--body-bg, #fff);
    --com_example-main-text: var(--body-color, var(--template-text-dark, var(--black, #000)));
}
```

The `--com_example-main-background` CSS variable is specific to your extension. It's value will be set to that of the `--body-bg` CSS variable. If the `--body-bg` CSS variable is not available you will be using the hardcoded color `#fff` (white).

The `--com_example-main-text` CSS variable is also specific to your extension, but has more fallbacks. It will be set to the value of the `--body-color` CSS variable. If that's not available, it will use the value of the `--template-text-dark` CSS variable. If that's not available either it will try to use the value of the `--black` CSS variable. If even that is not available it will fall back to the hardcoded color `#000` (black).

Having CSS variables makes it easy to support dark mode. To understand how, you should note that the `<body>` tag will have one of three CSS classes applied to it, depending on the Dark Mode preference of the template _and_ the user's settings:
* `joomla-dark-never`. Only light mode is enabled. The same holds true if none of the other CSS classes is explicitly applied to the `<body>` tag, e.g. in older versions of Joomla.
* `joomla-dark-auto`. You are instructed to follow the browser's preference, applying the dark color scheme using a media query.
* `joomla-dark-always`. You are instructed to always apply the dark color scheme.

Armed with this knowledge, we can write our CSS like so:
```css
/** The media query applies the rules below only when the browser asks for a dark color scheme **/
@media screen and (prefers-color-scheme: dark) {
    /**
     * We set the CSS variable overrides ONLY if the Joomla dark color scheme was to follow the
     * Browser Preference. 
     **/
    body.joomla-dark-auto {
        --com_example-main-background: var(--body-bg, #000);
        --com_example-main-text: var(--body-color, var(--template-text-light, var(--white, #fff)));
    }
}

/**
 * The following rules only apply when the Joomla preference is for a dark color scheme to be always
 * applied to the content, regardless of the browser's communicated preference.
 */
body.joomla-dark-always {
    --com_example-main-background: var(--body-bg, #000);
    --com_example-main-text: var(--body-color, var(--template-text-light, var(--white, #fff)));
}
```

Unfortunately, duplication of the dark mode overrides are necessary.

Please note that you can avoid _most_ overrides by using Bootstrap's color classes to style your elements. However, some elements will provide insufficient contrast e.g. `btn-outline-primary` over the default `card-body`. In these cases you will need to override the display of these elements using CSS as shown above.

## Dark Mode for editor plugin developers

Editor plugins have to work around an apparent impossibility: determining whether to use a dark colour scheme requires the template to be loaded and have parsed its options, but editors are instantiated and used _before_ Joomla loads the template's files. Solving this problem would require either going back in time (impossible!) or a workaround.

The workaround is that the template calls the editor plugin's `onTemplateDarkModeSupported` method to communicate when a dark colour scheme is requested. The signature of this method is:

```php
public function onTemplateDarkModeSupported(bool $forcedDark)
```

If this method is not called, the editor plugin should assume that the user prefers that a light colour scheme is to be used at all times.

If this method is called with `$foredDark = false` the editor plugin should assume that a light colour scheme is to be normally used **but** a dark colour scheme is to be applied when the CSS media query `screen and (prefers-color-scheme: dark)` is true. You can apply such a theme in two ways:
* With CSS using the media query `screen and (prefers-color-scheme: dark)` as noted in the previous section, but _without_ checking for the `body.joomla-dark-auto` CSS selector as most editors are rendered in an IFRAME or shadow DOM.
* Using JavaScript to get notified when the color scheme preference changes in the browser. You can check for dark color scheme preference with `window.matchMedia("(prefers-color-scheme:dark)").matches`. For a more complete explanation see [Reacting on dark mode changes](https://web.dev/prefers-color-scheme/#reacting-on-dark-mode-changes) on the web.dev article title “Hello Darkness, my old friend”.

If this method is called with `$forcedDark=true` the editor plugin should assume that a dark colour scheme is to be used at all times.

Note that older versions of Joomla which only supported a single colour scheme will also not call this method. There are, however, third party backend templates which only apply a dark mode, such as [Bettum](https://github.com/C-Lodder/joomla4-backend-template). Moreover, some folks prefer using a dark colour scheme on their editor even with a light colour scheme backend template, or a light colour scheme on their editor even with a light colour scheme backend template. For these reasons, editor plugins tend to allow the user to select a colour scheme (usually called ‘theme’ or ‘skin’).

We strongly recommend that editor plugin developers follow the [Principle of Least Astonishment](https://en.wikipedia.org/wiki/Principle_of_least_astonishment). Therefore, the default behaviour in an editor plugin should be that the editor will apply the colour scheme / theme / skin the user has selected _unless_ the user has opted into using a different colour scheme / theme / skin when the backend template explicitly communicates that it's using a dark colour scheme.

If you are developing a WYSIWYG, block, or otherwise visual editor — as opposed to a code editor — you **MUST** add one of the following two CSS classes to the `<BODY>` tag of your editor:
* `joomla-auto-dark` if `$foredDark = false`.
* `joomla-forced-dark` if `$foredDark = true`.
  These two classes allow the frontend templates' `editor.css` file to provide a dark colour scheme for content editing when your editor uses a dark colour scheme itself.

If your visual editor only applies a user-selected color scheme and that color scheme is dark, you **MUST** set the `joomla-forced-dark` CSS class to your editor's `<BODY>` element to ensure that the edited content is displayed using a dark colour scheme itself.

## Dark Mode for backend template developers

If you are developing a backend Joomla template we strongly recommend that you allow the user to select a dark colour scheme to be applied either conditionally (based on the browser settings), or permanently.

For the sake of consistency we strongly recommend that the option which controls the behavior has identical naming to the option in Atum (`Dark Mode support`) and uses the same option names (`Always Light`, `Browser Preference`, `Always Dark`) with the same semantics.

For the same reason of consistency, we strongly recommend that your template also provides and implements the `Dark Mode support in editors` option.

If your template _only_ supports a light colour scheme we recommend that you still provide the `Dark Mode support` option but make it read-only and locked to the `Always Light` setting. This will communicate to the user that your template only implements a single colour scheme which is light. Please read below for additional changes you might have to do.

If your template _only_ supports a dark colour scheme we recommend that you still provide the `Dark Mode support` option but make it read-only and locked to the `Always Dark` setting. This will communicate to the user that your template only implements a single colour scheme which is dark. Furthermore, we strongly recommend that you display and implement the `Dark Mode support in editors` option.

If you decide that your template will _only_ follow the browser preferences you still provide the `Dark Mode support` option but make it read-only and locked to the `Browser Preference` setting. This will communicate to the user that your template implements both light and dark mode but will only allow switching between the two based on the browser settings. Furthermore, we strongly recommend that you display and implement the `Dark Mode support in editors` option.

### Determining whether to use a dark colour scheme

There are always **three** steps to consider when deciding whether your template should load a dark colour scheme:
1. Does your template only support one colour scheme? If so, your colour scheme mode is either always light (0) or always dark (2), depending on your design choices and you must skip the next two steps.
2. What is the user preference? Get this with `(\Joomla\CMS\Factory::getApplication()->getIdentity() ?? new User())->getParam('admin_dark', -1);`. If it's -1, go to step 3, otherwise skip the third step.
3. Use the template's option.

This will leave you with an integer value for this option. 0 means always light mode, 1 means browser preference, 2 means always dark mode. We will be using that below to figure out what changes to do to the HTML output.

### Setting the `<BODY>` tag CSS class

You need to set a CSS class to the `<BODY>` element of your template's CSS output depending on the determined value of the dark mode option:
* 0 (always light): `joomla-dark-never`
* 1 (browser preference): `joomla-dark-auto`
* 2 (always dark): `joomla-dark-always`

This class is used by extensions' CSS files to determine whether to load a dark mode CSS file _and when to apply it_. Therefore, implementing this feature is _critical_ if your template supports a dark colour scheme or only provides a dark color scheme. It is a good thing, but not a requirement, implementing this feature if your template only supports a light theme.

### Setting the `color-scheme` metadata

Setting the color-scheme either through a `<meta>` tag or through CSS is strongly recommended. It tells the browser to use a different user agent stylesheet. While Joomla's backend uses Bootstrap which, in itself, uses the Reboot CSS to normalise the user agent stylesheet, please keep in mind that it will _not_ apply to all HTML displayed by your site. Some JavaScript-generated HTML may not be attached to the `<BODY>`, therefore adopt the user agent stylesheet.

> Deep dive: [learn what the color-scheme actually does](https://web.dev/color-scheme/).

The color scheme needs to be set depending on the determined value of the dark mode option:
* 0 (always light): `only light`
* 1 (browser preference): `light dark`
* 2 (always dark): `dark`

The easiest way to set it is with the following PHP code in your template's PHP files:
```php
$this->setMetaData('color-scheme', $colorScheme);
```
where `$colorScheme` is a string determined as explained above.

Using CSS to set up the `color-scheme` is not recommended. It requires having three separate CSS files for only light, browser preference, and only dark colour schemes. It can get very complicated, very fast and will thus be prone to mistakes.

### Implementing the `Dark Mode support in editors`

As a template developer you need to communicate to any Joomla editor instance which has been set up prior to your code being loaded that your template is using Dark Mode.

Unfortunately, the editor plugins are not _real_ plugins, they are plugin-looking arbitrary CSS classes managed through the static methods `\Joomla\CMS\Editor\Editor`. You can't use Joomla's event dispatcher to communicate with them. Instead, use the following code:

```php
foreach (\Joomla\CMS\Plugin\PluginHelper::getPlugin('editors') as $editor) {
    $className = 'PlgEditor' . ucfirst($editor->name);
    
    if (!class_exists($className)) {
        continue;
    }
    
    \Hoa\Console\Chrome\Editor::getInstance($editor->name)->notifyDarkMode($darkMode == 2);
}
```

where `$darkMode` is the determined value of the dark mode option.

It is very important that _all_ templates which either support a dark colour scheme or using _only_ a dark colour scheme implement this feature, otherwise users will be very likely stuck with a light color theme editor in their dark colour theme backend. It is equally important that you do provide a template option to _disable_ this feature. This might be necessary, for example, if the site implements _only_ a dark or light colour scheme, but not both, in which case the site owner will want their editor to match the colour scheme of the frontend template to avoid authoring content which displays wrong.

## Dark Mode for frontend template developers

As you know, your template can provide an `editor.css` file with styles to be applied when editing content in the configured visual editor in the front- and backend of the site.

If your template provides a light and dark colour scheme we strongly recommend that your `editor.css` file does too. The best way to do that is to implement the light colour scheme as the default and apply colours using CSS variables, as explained in the section about extension developers.

You can then provide support for the dark colour scheme, following the editor's preference, using the following CSS code

```css
:root {
    --tpl_example-main-background: var(--body-bg, #fff);
    --tpl_example-main-text: var(--body-color, var(--template-text-light, var(--white, #000)));
}

/**
 * ... your light mode color scheme goes here and is used by default ...
 */

/** This applies the dark colour scheme if the editor follows the browser's preference **/
@media screen and (prefers-color-scheme: dark) {
    body.joomla-auto-dark {
        --tpl_example-main-background: var(--body-bg, #000);
        --tpl_example-main-text: var(--body-color, var(--template-text-light, var(--white, #fff)));
    }
}

/**
 * This always applies the dark colour scheme if the editor is always shown with a dark colour scheme
 */
body.joomla-forced-dark {
    --tpl_example-main-background: var(--body-bg, #000);
    --tpl_example-main-text: var(--body-color, var(--template-text-light, var(--white, #fff)));
}
```

If your template only provides a dark colour scheme, please make sure that your `editor.css` file contains at least the following:

```css
:root {
    color-scheme: dark;
}

html, body {
    background-color: #000;
    color: #fff;
}

h1, h2, h3, h4, h5, h6, p {
    background-color: #000;
    color: #fff;
}

a, a:link {
    color: var(--template-link-color, cornflowerblue);
}

a:hover {
    color: var(--template-link-hover-color, royalblue);
}
```

You should, of course, use the background and text colours used by your template. The idea is to have at the very least the basic HTML elements display with a dark color scheme at all times, regardless of the editor's colour scheme preference.

## Testing Dark Mode

If you are developing against Joomla 4.3 and later you are recommended to test your code using both a light and a dark colour scheme _even if you did not plan on supporting a dark colour scheme_. You do not have to set your browser to always light or always dark mode; you can simply edit your user account and set the dark mode preference to Always Light or Always Dark under the Basic tab.

If you use the Browser Preference setting in both the template and the user options you can always use your browser's dev tools, or equivalent, to quickly switch between the light and dark colour schemes without reloading the page. For Chrome there's information in [web.dev's article on dark mode](https://web.dev/prefers-color-scheme/#debugging-and-testing-dark-mode); this also applies to most other Chromium-based browsers. For Safari, take a look at [the WebKit blog post on Dark Mode](https://webkit.org/blog/8840/dark-mode-support-in-webkit/). Firefox has a toggle for light and dark mode in the Inspector tab of Web Developer Tools. It's the icon that looks like a sun and the icon that looks like a crescent moon above the middle pane (styles).