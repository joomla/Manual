Web Services Core Endpoints
============

:::tip[Developer Note]
TODO: add internal links to this document, see https://docs.joomla.org/J4.x:Joomla_Core_APIs
:::

## Banners
### Banners
#### Get List of Banners
```bash
curl -X GET /api/index.php/v1/banners
```
#### Get Single Banner
```bash
curl -X GET /api/index.php/v1/banners/{banner_id}
```
#### Delete Banner
```bash
curl -X DELETE /api/index.php/v1/banners/{banner_id}
```
#### Create Banner
```bash
curl -X POST -H "Content-Type: application/json" /api/index.php/v1/banners -d
```
```json
{
"catid": 3,
"clicks": 0,
"custombannercode": "",
"description": "Text",
"metakey": "",
"name": "Name",
"params": {
    "alt": "",
    "height": "",
    "imageurl": "",
    "width": ""
}
}
```
#### Update Banner
```bash
curl -X PATCH -H "Content-Type: application/json" /api/index.php/v1/banners/{banner_id} -d
```
```json
{
"alias": "name",
"catid": 3,
"description": "New Text",
"name": "New Name"
}
```

### Clients
#### Get List of Clients
```bash
curl -X GET /api/index.php/v1/banners/clients
```

#### Get Single Client
```bash
curl -X GET /api/index.php/v1/banners/clients/{client_id}
```

#### Delete Client
```bash
curl -X DELETE /api/index.php/v1/banners/clients/{client_id}
```

#### Create Client
```bash
curl -X POST -H "Content-Type: application/json" /api/index.php/v1/banners/clients -d
```
```json
{
"contact": "Name",
"email": "email@mail.com",
"extrainfo": "",
"metakey": "",
"name": "Clients",
"state": 1
}
```

#### Update Client
```bash
curl -X PATCH -H "Content-Type: application/json" /api/index.php/v1/banners/clients/{client_id} -d
```
```json
{
"contact": "new Name",
"email": "newemail@mail.com",
"name": "Clients"
}
```
### Categories <a name="BannersCategories"></a>
#### Get List of Categories
```bash
curl -X GET /api/index.php/v1/banners/categories
```
#### Get Single Category
```bash
curl -X GET /api/index.php/v1/banners/categories/{category_id}
```
#### Delete Category
```bash
curl -X DELETE /api/index.php/v1/banners/categories/{category_id}
```
#### Create Category
```bash
curl -X POST -H "Content-Type: application/json" /api/index.php/v1/banners/categories -d
```
```json
{
"access": 1,
"alias": "cat",
"extension": "com_banners",
"language": "*",
"note": "",
"parent_id": 1,
"published": 1,
"title": "Title"
}
```
#### Update Category
```bash
curl -X PATCH -H "Content-Type: application/json" /api/index.php/v1/banners/categories/{category_id} -d
```
```json
{
"alias": "cat",
"note": "Some Text",
"parent_id": 1,
"title": "New Title"
}
```
### Content History
#### Get List of Content Histories
```bash
curl -X GET /api/index.php/v1/banners/contenthistory/{banner_id}
```
#### Toggle Keep Content History
```bash
curl -X PATCH -H "Content-Type: application/json" /api/index.php/v1/banners/contenthistory/keep/{contenthistory_id}
```
#### Delete Content History
```bash
curl -X DELETE /api/index.php/v1/banners/contenthistory/{contenthistory_id}
```
## Config
### Application
#### Get List of Application Configs
```bash
curl -X GET /api/index.php/v1/config/application
```
#### Update Application Config
```bash
curl -X PATCH -H "Content-Type: application/json" /api/index.php/v1/config/application -d
```
```json
{
"debug": true,
"sitename": "123"
}
```
### Component
#### Get List of Component Configs
```bash
curl -X GET /api/index.php/v1/config/{component_name}
```
Example “component_name” is “com_content”.

#### Update Application Config
```bash
curl -X PATCH -H "Content-Type: application/json" /api/index.php/v1/config/application -d
```
```json
{
"link_titles": 1
}
```

## Contact
### Contact
#### Get List of Contacts
```bash
curl -X GET /api/index.php/v1/contacts
```
#### Get Single Contact
```bash
curl -X GET /api/index.php/v1/contacts/{contact_id}
```
#### Delete Contact
```bash
curl -X DELETE /api/index.php/v1/contacts/{contact_id}
```
#### Create Contact
```bash
curl -X POST -H "Content-Type: application/json" /api/index.php/v1/contacts -d
```
```json
{
"alias": "contact",
"catid": 4,
"language": "*",
"name": "Contact"
}
```
#### Update Contact
```bash
curl -X PATCH -H "Content-Type: application/json" /api/index.php/v1/contacts/{contact_id} -d
```
```json
{
"alias": "contact",
"catid": 4,
"name": "New Contact"
}
```
#### Submit Contact Form
```bash
curl -X POST -H "Content-Type: application/json" /api/index.php/v1/contacts/form/{contact_id} -d
```
```json
{
"contact_email": "email@mail.com",
"contact_message": "some text",
"contact_name": "name",
"contact_subject": "subject"
}
```
### Categories
- Route Contact Categories is: "v1/contacts/categories"
- Working with it is similar to [Banners Categories](#BannersCategories).
### Fields Contact
#### Get List of Fields Contact
```bash
curl -X GET /api/index.php/v1/fields/contacts/contact
```
#### Get Single Field Contact
```bash
curl -X GET /api/index.php/v1/fields/contacts/contact/{field_id}
```
#### Delete Field Contact
```bash
curl -X DELETE /api/index.php/v1/fields/contacts/contact/{field_id}
```
#### Create Field Contact
```bash
curl -X POST -H "Content-Type: application/json" /api/index.php/v1/fields/contacts/contact -d
```
```json
{
"access": 1,
"context": "com_contact.contact",
"default_value": "",
"description": "",
"group_id": 0,
"label": "contact field",
"language": "*",
"name": "contact-field",
"note": "",
"params": {
    "class": "",
    "display": "2",
    "display_readonly": "2",
    "hint": "",
    "label_class": "",
    "label_render_class": "",
    "layout": "",
    "prefix": "",
    "render_class": "",
    "show_on": "",
    "showlabel": "1",
    "suffix": ""
},
"required": 0,
"state": 1,
"title": "contact field",
"type": "text"
}
```
#### Update Field Contact
```bash
curl -X PATCH -H "Content-Type: application/json" /api/index.php/v1/fields/contacts/contact/{field_id} -d
```
```json
{
"title": "new contact field",
"name": "contact-field",
"label": "contact field",
"default_value": "",
"type": "text",
"note": "",
"description": "Some New Text"
}
```
### Fields Contact Mail
- Route Fields Contact Mail is: "v1/fields/contacts/mail"
- Working with it is similar to Fields Contact.
### Fields Contact Categories
- Route Fields Contact Categories is: "v1/fields/contacts/categories"
- Working with it is similar to Fields Contact.
### Groups Fields Contact
#### Get List of Groups Fields Contact
```bash
curl -X GET /api/index.php/v1/fields/groups/contacts/contact
```
#### Get Single Group Fields Contact
```bash
curl -X GET /api/index.php/v1/fields/groups/contacts/contact/{group_id}
```
#### Delete Group Fields Contact
```bash
curl -X DELETE /api/index.php/v1/fields/groups/contacts/contact/{group_id}
```
#### Create Group Fields Contact
```bash
curl -X POST -H "Content-Type: application/json" /api/index.php/v1/fields/groups/contacts/contact -d
```
```json
{
"access": 1,
"context": "com_contact.contact",
"default_value": "",
"description": "",
"group_id": 0,
"label": "contact field",
"language": "*",
"name": "contact-field3",
"note": "",
"params": {
    "class": "",
    "display": "2",
    "display_readonly": "2",
    "hint": "",
    "label_class": "",
    "label_render_class": "",
    "layout": "",
    "prefix": "",
    "render_class": "",
    "show_on": "",
    "showlabel": "1",
    "suffix": ""
},
"required": 0,
"state": 1,
"title": "contact field",
"type": "text"
}
```
#### Update Group Fields Contact
```bash
curl -X PATCH -H "Content-Type: application/json" /api/index.php/v1/fields/groups/contacts/contact/{group_id} -d
```
```json
{
"title": "new contact group",
"note": "",
"description": "new description"
}
```
### Group Fields Contact Mail
- Route Group Fields Contact Mail is: "v1/fields/groups/contacts/mail"
- Working with it is similar to Group Fields Contact.
### Group Fields Contact Categories
- Route Group Fields Contact Categories is: "v1/fields/groups/contacts/categories"
- Working with it is similar to Group Fields Contact.
### Content History
- Route Content History is: "v1/contacts/{groupid}/contenthistory"
- Working with it is similar to Banners Content History.

## Content
### Articles
#### Get List of Articles
```bash
curl -X GET /api/index.php/v1/content/articles
```
#### Get Single Article
```bash
curl -X GET /api/index.php/v1/content/articles/{article_id}
```
#### Delete Article
```bash
curl -X DELETE /api/index.php/v1/content/articles/{article_id}
```
#### Create Article
```bash
curl -X POST -H "Content-Type: application/json" /api/index.php/v1/content/articles -d
```
```json
{
"alias": "my-article",
"articletext": "My text",
"catid": 64,
"language": "*",
"metadesc": "",
"metakey": "",
"title": "Here's an article"
}
```
Currently the options mentioned here are required properties. However the intention is currently to make at least metakey and metadesc optional in the API.

#### Update Article
```bash
curl -X PATCH -H "Content-Type: application/json" /api/index.php/v1/content/articles/{article_id} -d
```
```json
{
"catid": 64,
"title": "Updated article"
}
```
### Categories
- Route Content Categories is: "v1/content/categories"
- Working with it is similar to Banners Categories, note if workflows is enabled then specifying a workflow is required (similarly to the UI).
### Fields Articles
- Route Fields Articles is: "v1/fields/content/articles"
- Working with it is similar to Fields Contact.
### Groups Fields Articles
- Route Groups Fields Articles is: "v1/fields/groups/content/articles"
- Working with it is similar to Groups Fields Contact.
### Fields Categories
- Route Fields Categories is: "v1/fields/groups/content/categories"
- Working with it is similar to Fields Contact.
### Content History
- Route Content History is: "v1/content/articles/{article_id}/contenthistory"
- Working with it is similar to Banners Content History.

## Languages
### Languages
#### Get List of Languages
```bash
curl -X GET /api/index.php/v1/languages
```
#### Install Language
```bash
curl -X POST -H "Content-Type: application/json" /api/index.php/v1/languages -d
```
```json
{
"package": "pkg_fr-FR"
}
```
### Content Languages
#### Get List of Content Languages
```bash
curl -X GET /api/index.php/v1/languages/content
```
#### Get Single Content Language
```bash
curl -X GET /api/index.php/v1/v1/languages/content/{language_id}
```
#### Delete Content Language
```bash
curl -X DELETE /api/index.php/v1/languages/content/{language_id}
```
#### Create Content Language
```bash
curl -X POST -H "Content-Type: application/json" /api/index.php/v1/languages/content -d
```
```json
{
"access": 1,
"description": "",
"image": "fr_FR",
"lang_code": "fr-FR",
"metadesc": "",
"metakey": "",
"ordering": 1,
"published": 0,
"sef": "fk",
"sitename": "",
"title": "French (FR)",
"title_native": "Français (France)"
}
```
#### Update Content Language
```bash
curl -X PATCH -H "Content-Type: application/json" /api/index.php/v1/languages/content/{language_id} -d
```
```json
{
"description": "",
"lang_code": "en-GB",
"metadesc": "",
"metakey": "",
"sitename": "",
"title": "English (en-GB)",
"title_native": "English (United Kingdom)"
}
```
### Overrides Languages
#### Get List of Overrides Languages Constants
```bash
curl -X GET /api/index.php/v1/languages/overrides/{app}/{lang_code}
```
#### Get Single Override Language Constant
```bash
curl -X GET /api/index.php/v1/languages/overrides/{app}/{lang_code}/{constant_id}
```
#### Delete Content Language
```bash
curl -X DELETE /api/index.php/v1/languages/overrides/{app}/{lang_code}/{constant_id}
```
#### Create Content Language
```bash
curl -X POST -H "Content-Type: application/json" /api/index.php/v1/languages/overrides/{app}/{lang_code} -d
```
```json
{
"key":"new_key",
"override": "text"
}
```
#### Update Content Language
```bash
curl -X PATCH -H "Content-Type: application/json" /api/index.php/v1/languages/overrides/{app}/{lang_code}/{constant_id} -d
```
```json
{
"key":"new_key",
"override": "new text"
}
```
- var app - enum {"site", "administrator"}
- var lang_code - string Example: “fr-FR“, “en-GB“ you can get lang_code from v1/languages/content

#### Search Override Constant
```bash
curl -X POST -H "Content-Type: application/json" /api/index.php/v1/languages/overrides/search -d
```
```json
{
"searchstring": "JLIB_APPLICATION_ERROR_SAVE_FAILED",
"searchtype": "constant"
}
```
- var searchtype - enum {“constant”, “value”}. “constant” search by constant name, “value” - search by constant value
#### Refresh Override Search Cache
```bash
curl -X POST -H "Content-Type: application/json" /api/index.php/v1/languages/overrides/search/cache/refresh
```

## Menus
### Menus
#### Get List of Menus
```bash
curl -X GET /api/index.php/v1/menus/{app}
```
#### Get Single Menu
```bash
curl -X GET /api/index.php/v1/menus/{app}/{menu_id}
```
#### Delete Menu
```bash
curl -X DELETE /api/index.php/v1/menus/{app}/{menu_id}
```
#### Create Menu
```bash
curl -X POST -H "Content-Type: application/json" /api/index.php/v1/menus/{app} -d
```
```json
{
"client_id": 0,
"description": "The menu for the site",
"menutype": "menu",
"title": "Menu"
}
```
#### Update Menu
```bash
curl -X PATCH -H "Content-Type: application/json" /api/index.php/v1/menus/{app}/{menu_id} -d
```
```json
{
"menutype": "menu",
"title": "New Menu"
}
```
### Menus Items
#### Get List of Menus Items Types
```bash
curl -X GET /api/index.php/v1/menus/{app}/items/types
```
#### Get List of Menus Items
```bash
curl -X GET /api/index.php/v1/menus/{app}/items
```
#### Get Single Menu Item
```bash
curl -X GET /api/index.php/v1/menus/{app}/items/{menu_item_id}
```
#### Delete Menu Item
```bash
curl -X DELETE /api/index.php/v1/menus/{app}/items/{menu_item_id}
```
#### Create Menu Item
```bash
curl -X POST -H "Content-Type: application/json" /api/index.php/v1/menus/{app}/items -d
```
```json
{
"access": "1",
"alias": "",
"associations": {
    "en-GB": "",
    "fr-FR": ""
},
"browserNav": "0",
"component_id": "20",
"home": "0",
"language": "*",
"link": "index.php?option=com_content&view=form&layout=edit",
"menutype": "mainmenu",
"note": "",
"params": {
    "cancel_redirect_menuitem": "",
    "catid": "",
    "custom_cancel_redirect": "0",
    "enable_category": "0",
    "menu-anchor_css": "",
    "menu-anchor_title": "",
    "menu-meta_description": "",
    "menu-meta_keywords": "",
    "menu_image": "",
    "menu_image_css": "",
    "menu_show": "1",
    "menu_text": "1",
    "page_heading": "",
    "page_title": "",
    "pageclass_sfx": "",
    "redirect_menuitem": "",
    "robots": "",
    "show_page_heading": ""
},
"parent_id": "1",
"publish_down": "",
"publish_up": "",
"published": "1",
"template_style_id": "0",
"title": "title",
"toggle_modules_assigned": "1",
"toggle_modules_published": "1",
"type": "component"
}
```
- Example for "Create Article Page"

#### Update Menu Item
```bash
curl -X PATCH -H "Content-Type: application/json" /api/index.php/v1/menus/{app}/items/{menu_item_id} -d
```
```json
{
"component_id": "20",
"language": "*",
"link": "index.php?option=com_content&view=form&layout=edit",
"menutype": "mainmenu",
"note": "",
"title": "new title",
"type": "component"
}
```
- Example for "Create Article Page"

## Messages
### Messages
#### Get List of Messages
```bash
curl -X GET /api/index.php/v1/messages
```
#### Get Single Message
```bash
curl -X GET /api/index.php/v1/messages/{message_id}
```
#### Delete Message
```bash
curl -X DELETE /api/index.php/v1/messages/{message_id}
```
#### Create Message
```bash
curl -X POST -H "Content-Type: application/json" /api/index.php/v1/messages -d
```
```json
{
"message": "<p>text</p>",
"state": 0,
"subject": "text",
"user_id_from": 773,
"user_id_to": 772
}
```
#### Update Message
```bash
curl -X PATCH -H "Content-Type: application/json" /api/index.php/v1/messages/{message_id} -d
```
```json
{
"message": "<p>new text</p>",
"subject": "new text",
"user_id_from": 773,
"user_id_to": 772
}
```

## Modules
### Modules
#### Get List of Modules Types
```bash
curl -X GET /api/index.php/v1/modules/types/{app}
```
#### Get List of Modules
```bash
curl -X GET /api/index.php/v1/modules/{app}
```
#### Get Single Module
```bash
curl -X GET /api/index.php/v1/modules/{app}/{module_id}
```
#### Delete Module
```bash
curl -X DELETE /api/index.php/v1/modules/{app}/{module_id}
```
#### Create Module
```bash
curl -X POST -H "Content-Type: application/json" /api/index.php/v1/modules/{app} -d
```
```json
{
"access": "1",
"assigned": [
    "101",
    "105"
],
"assignment": "0",
"client_id": "0",
"language": "*",
"module": "mod_articles_archive",
"note": "",
"ordering": "1",
"params": {
    "bootstrap_size": "0",
    "cache": "1",
    "cache_time": "900",
    "cachemode": "static",
    "count": "10",
    "header_class": "",
    "header_tag": "h3",
    "layout": "_:default",
    "module_tag": "div",
    "moduleclass_sfx": "",
    "style": "0"
},
"position": "",
"publish_down": "",
"publish_up": "",
"published": "1",
"showtitle": "1",
"title": "Title"
}
```
- Example for "Articles - Archived"

#### Update Module
```bash
curl -X PATCH -H "Content-Type: application/json" /api/index.php/v1/modules/{app}/{module_id} -d
```
```json
{
"access": "1",
"client_id": "0",
"language": "*",
"module": "mod_articles_archive",
"note": "",
"ordering": "1",
"title": "New Title"
}
```
- Example for "Articles - Archived"

## Newsfeeds
### Feeds
#### Get List of Feeds
```bash
curl -X GET /api/index.php/v1/newsfeeds/feeds
```
#### Get Single Feed
```bash
curl -X GET /api/index.php/v1/newsfeeds/feeds/{feed_id}
```
#### Delete Feed
```bash
curl -X DELETE /api/index.php/v1/newsfeeds/feeds/{feed_id}
```
#### Create Feed
```bash
curl -X POST -H "Content-Type: application/json" /api/index.php/v1/newsfeeds/feeds -d
```
```json
{
"access": 1,
"alias": "alias",
"catid": 5,
"description": "",
"images": {
    "float_first": "",
    "float_second": "",
    "image_first": "",
    "image_first_alt": "",
    "image_first_caption": "",
    "image_second": "",
    "image_second_alt": "",
    "image_second_caption": ""
},
"language": "*",
"link": "https://github.com/joomla-projects/gsoc19_webservices",
"metadata": {
    "hits": "",
    "rights": "",
    "robots": "",
    "tags": {
        "tags": "",
        "typeAlias": null
    }
},
"metadesc": "",
"metakey": "",
"name": "Name",
"ordering": 1,
"params": {
    "feed_character_count": "",
    "feed_display_order": "",
    "newsfeed_layout": "",
    "show_feed_description": "",
    "show_feed_image": "",
    "show_item_description": ""
},
"published": 1
}
```
#### Update Feed
```bash
curl -X PATCH -H "Content-Type: application/json" /api/index.php/v1/newsfeeds/feeds/{feed_id} -d
```
```json
{
"access": 1,
"alias": "test2",
"catid": 5,
"description": "",
"link": "https://github.com/joomla-projects/gsoc19_webservices",
"metadesc": "",
"metakey": "",
"name": "Test"
}
```
### Categories
- Route Newsfeeds Categories is: "v1/newsfeeds/categories"
- Working with it is similar to Banners Categories.

## Privacy
### Request
#### Get List of Requests
```bash
curl -X GET /api/index.php/v1/privacy/requests
```
#### Get Single Request
```bash
curl -X GET /api/index.php/v1/privacy/requests/{request_id}
```
#### Get Single Request Export Data
```bash
curl -X GET /api/index.php/v1/privacy/request/export/{request_id}
```
#### Create Request
```bash
curl -X POST -H "Content-Type: application/json" /api/index.php/v1/privacy/requests -d
```
```json
{
"email":"somenewemail@com.ua",
"request_type":"export"
}
```
### Consent
#### Get List of Consents
```bash
curl -X GET /api/index.php/v1/privacy/consents
```
#### Get Single Consent
```bash
curl -X GET /api/index.php/v1/privacy/consents/{consent_id}
```

## Redirect
### Redirect
#### Get List of Redirects
```bash
curl -X GET /api/index.php/v1/redirect
```
#### Get Single Redirect
```bash
curl -X GET /api/index.php/v1/redirect/{redirect_id}
```
#### Delete Redirect
```bash
curl -X DELETE /api/index.php/v1/redirect/{redirect_id}
```
#### Create Redirect
```bash
curl -X POST -H "Content-Type: application/json" /api/index.php/v1/redirect -d
```
```json
{
"comment": "",
"header": 301,
"hits": 0,
"new_url": "/content/art/99",
"old_url": "/content/art/12",
"published": 1,
"referer": ""
}
```
#### Update Redirect
```bash
curl -X PATCH -H "Content-Type: application/json" /api/index.php/v1/redirect/{redirect_id} -d
```
```json
{
"new_url": "/content/art/4",
"old_url": "/content/art/132"
}
```

## Tags
### Tags
#### Get List of Tags
```bash
curl -X GET /api/index.php/v1/tags
```
#### Get Single Tag
```bash
curl -X GET /api/index.php/v1/tags/{tag_id}
```
#### Delete Tag
```bash
curl -X DELETE /api/index.php/v1/tags/{tag_id}
```
#### Create Tag
```bash
curl -X POST -H "Content-Type: application/json" /api/index.php/v1/tags -d
```
```json
{
"access": 1,
"access_title": "Public",
"alias": "test",
"description": "",
"language": "*",
"note": "",
"parent_id": 1,
"path": "test",
"published": 1,
"title": "test"
}
```
#### Update Tag
```bash
curl -X PATCH -H "Content-Type: application/json" /api/index.php/v1/tags/{tag_id} -d
```
```json
{
"alias": "test",
"title": "new title"
}
```
## Templates
### Templates Styles
#### Get List of Templates Styles
```bash
curl -X GET /api/index.php/v1/templates/styles/{app}
```
#### Get Single Template Style
```bash
curl -X GET /api/index.php/v1/templates/styles/{app}/{template_style_id}
```
#### Delete Template Style
```bash
curl -X DELETE /api/index.php/v1/templates/styles/{app}/{template_style_id}
```
#### Create Template Style
```bash
curl -X POST -H "Content-Type: application/json" /api/index.php/v1/templates/styles/{app} -d
```
```json
{
"home": "0",
"params": {
    "fluidContainer": "0",
    "logoFile": "",
    "sidebarLeftWidth": "3",
    "sidebarRightWidth": "3"
},
"template": "cassiopeia",
"title": "cassiopeia - Some Text"
}
```
#### Update Template Style
```bash
curl -X PATCH -H "Content-Type: application/json" /api/index.php/v1/templates/styles/{app}/{template_style_id} -d
```
```json
{
"template": "cassiopeia",
"title": "new cassiopeia - Default"
}
```

## Users
### Users
#### Get List of Users
```bash
curl -X GET /api/index.php/v1/users
```
#### Get Single User
```bash
curl -X GET /api/index.php/v1/users/{user_id}
```
#### Delete User
```bash
curl -X DELETE /api/index.php/v1/users/{user_id}
```
#### Create User
```bash
curl -X POST -H "Content-Type: application/json" /api/index.php/v1/users -d
```
```json
{
"block": "0",
"email": "test@mail.com",
"groups": [
    "2"
],
"id": "0",
"lastResetTime": "",
"lastvisitDate": "",
"name": "nnn",
"params": {
    "admin_language": "",
    "admin_style": "",
    "editor": "",
    "helpsite": "",
    "language": "",
    "timezone": ""
},
"password": "qwertyqwerty123",
"password2": "qwertyqwerty123",
"registerDate": "",
"requireReset": "0",
"resetCount": "0",
"sendEmail": "0",
"username": "ad"
}
```
#### Update User
```bash
curl -X PATCH -H "Content-Type: application/json" /api/index.php/v1/users/{user_id} -d
```
```json
{
"email": "new@mail.com",
"groups": [
    "2"
],
"name": "name",
"username": "username"
}
```
### Fields Users
- Route Fields Users is: v1/fields/users
- Working with it is similar to Fields Contact.
### Groups Fields Users
- Route Groups Fields Users is: v1/fields/groups/users
- Working with it is similar to Groups Fields Contact.