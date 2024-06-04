Web Services Core Endpoints
============

## Banners

### Banners
#### Get List of Banners[edit]
```bash
curl -X GET /api/index.php/v1/banners
```
#### Get Single Banner[edit]
```bash
curl -X GET /api/index.php/v1/banners/{banner_id}
```
#### Delete Banner[edit]
```bash
curl -X DELETE /api/index.php/v1/banners/{banner_id}
```
#### Create Banner[edit]
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
#### Update Banner[edit]
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

### Clients[edit]
#### Get List of Clients[edit]
```bash
curl -X GET /api/index.php/v1/banners/clients
```

#### Get Single Client[edit]
```bash
curl -X GET /api/index.php/v1/banners/clients/{client_id}
```

#### Delete Client[edit]
```bash
curl -X DELETE /api/index.php/v1/banners/clients/{client_id}
```

#### Create Client[edit]
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

#### Update Client[edit]
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
### Categories[edit]
#### Get List of Categories[edit]
```bash
curl -X GET /api/index.php/v1/banners/categories
```
#### Get Single Category[edit]
```bash
curl -X GET /api/index.php/v1/banners/categories/{category_id}
```
#### Delete Category[edit]
```bash
curl -X DELETE /api/index.php/v1/banners/categories/{category_id}
```
#### Create Category[edit]
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
#### Update Category[edit]
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
### Content History[edit]
#### Get List of Content Histories[edit]
```bash
curl -X GET /api/index.php/v1/banners/contenthistory/{banner_id}
```
#### Toggle Keep Content History[edit]
```bash
curl -X PATCH -H "Content-Type: application/json" /api/index.php/v1/banners/contenthistory/keep/{contenthistory_id}
```
#### Delete Content History[edit]
```bash
curl -X DELETE /api/index.php/v1/banners/contenthistory/{contenthistory_id}
```
## Config[edit]
### Application[edit]
#### Get List of Application Configs[edit]
```bash
curl -X GET /api/index.php/v1/config/application
```
#### Update Application Config[edit]
```bash
curl -X PATCH -H "Content-Type: application/json" /api/index.php/v1/config/application -d
```
```json
{
"debug": true,
"sitename": "123"
}
```
### Component[edit]
#### Get List of Component Configs[edit]
```bash
curl -X GET /api/index.php/v1/config/{component_name}
```
Example “component_name” is “com_content”.

#### Update Application Config[edit]
```bash
curl -X PATCH -H "Content-Type: application/json" /api/index.php/v1/config/application -d
```
```json
{
"link_titles": 1
}
```

## Contact[edit]
### Contact[edit]
#### Get List of Contacts[edit]
```bash
curl -X GET /api/index.php/v1/contacts
```
#### Get Single Contact[edit]
```bash
curl -X GET /api/index.php/v1/contacts/{contact_id}
```
#### Delete Contact[edit]
```bash
curl -X DELETE /api/index.php/v1/contacts/{contact_id}
```
#### Create Contact[edit]
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
#### Update Contact[edit]
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
#### Submit Contact Form[edit]
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
### Categories[edit]
- Route Contact Categories is: "v1/contacts/categories"
- Working with it is similar to Banners Categories.
### Fields Contact[edit]
#### Get List of Fields Contact[edit]
```bash
curl -X GET /api/index.php/v1/fields/contacts/contact
```
#### Get Single Field Contact[edit]
```bash
curl -X GET /api/index.php/v1/fields/contacts/contact/{field_id}
```
#### Delete Field Contact[edit]
```bash
curl -X DELETE /api/index.php/v1/fields/contacts/contact/{field_id}
```
#### Create Field Contact[edit]
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
#### Update Field Contact[edit]
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
### Fields Contact Mail[edit]
- Route Fields Contact Mail is: "v1/fields/contacts/mail"
- Working with it is similar to Fields Contact.
### Fields Contact Categories[edit]
- Route Fields Contact Categories is: "v1/fields/contacts/categories"
- Working with it is similar to Fields Contact.
### Groups Fields Contact[edit]
#### Get List of Groups Fields Contact[edit]
```bash
curl -X GET /api/index.php/v1/fields/groups/contacts/contact
```
#### Get Single Group Fields Contact[edit]
```bash
curl -X GET /api/index.php/v1/fields/groups/contacts/contact/{group_id}
```
#### Delete Group Fields Contact[edit]
```bash
curl -X DELETE /api/index.php/v1/fields/groups/contacts/contact/{group_id}
```
#### Create Group Fields Contact[edit]
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
#### Update Group Fields Contact[edit]
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
### Group Fields Contact Mail[edit]
- Route Group Fields Contact Mail is: "v1/fields/groups/contacts/mail"
- Working with it is similar to Group Fields Contact.
### Group Fields Contact Categories[edit]
- Route Group Fields Contact Categories is: "v1/fields/groups/contacts/categories"
- Working with it is similar to Group Fields Contact.
### Content History[edit]
- Route Content History is: "v1/contacts/{groupid}/contenthistory"
- Working with it is similar to Banners Content History.

## Content[edit]
### Articles[edit]
#### Get List of Articles[edit]
```bash
curl -X GET /api/index.php/v1/content/articles
```
#### Get Single Article[edit]
```bash
curl -X GET /api/index.php/v1/content/articles/{article_id}
```
#### Delete Article[edit]
```bash
curl -X DELETE /api/index.php/v1/content/articles/{article_id}
```
#### Create Article[edit]
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

#### Update Article[edit]
```bash
curl -X PATCH -H "Content-Type: application/json" /api/index.php/v1/content/articles/{article_id} -d
```
```json
{
"catid": 64,
"title": "Updated article"
}
```
### Categories[edit]
- Route Content Categories is: "v1/content/categories"
- Working with it is similar to Banners Categories, note if workflows is enabled then specifying a workflow is required (similarly to the UI).
### Fields Articles[edit]
- Route Fields Articles is: "v1/fields/content/articles"
- Working with it is similar to Fields Contact.
### Groups Fields Articles[edit]
- Route Groups Fields Articles is: "v1/fields/groups/content/articles"
- Working with it is similar to Groups Fields Contact.
### Fields Categories[edit]
- Route Fields Categories is: "v1/fields/groups/content/categories"
- Working with it is similar to Fields Contact.
### Content History[edit]
- Route Content History is: "v1/content/articles/{article_id}/contenthistory"
- Working with it is similar to Banners Content History.

## Languages[edit]
### Languages[edit]
#### Get List of Languages[edit]
```bash
curl -X GET /api/index.php/v1/languages
```
#### Install Language[edit]
```bash
curl -X POST -H "Content-Type: application/json" /api/index.php/v1/languages -d
```
```json
{
"package": "pkg_fr-FR"
}
```
### Content Languages[edit]
#### Get List of Content Languages[edit]
```bash
curl -X GET /api/index.php/v1/languages/content
```
#### Get Single Content Language[edit]
```bash
curl -X GET /api/index.php/v1/v1/languages/content/{language_id}
```
#### Delete Content Language[edit]
```bash
curl -X DELETE /api/index.php/v1/languages/content/{language_id}
```
#### Create Content Language[edit]
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
#### Update Content Language[edit]
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
### Overrides Languages[edit]
#### Get List of Overrides Languages Constants[edit]
```bash
curl -X GET /api/index.php/v1/languages/overrides/{app}/{lang_code}
```
#### Get Single Override Language Constant[edit]
```bash
curl -X GET /api/index.php/v1/languages/overrides/{app}/{lang_code}/{constant_id}
```
#### Delete Content Language[edit]
```bash
curl -X DELETE /api/index.php/v1/languages/overrides/{app}/{lang_code}/{constant_id}
```
#### Create Content Language[edit]
```bash
curl -X POST -H "Content-Type: application/json" /api/index.php/v1/languages/overrides/{app}/{lang_code} -d
```
```json
{
"key":"new_key",
"override": "text"
}
```
#### Update Content Language[edit]
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

#### Search Override Constant[edit]
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
#### Refresh Override Search Cache[edit]
```bash
curl -X POST -H "Content-Type: application/json" /api/index.php/v1/languages/overrides/search/cache/refresh
```

## Menus[edit]
### Menus[edit]
#### Get List of Menus[edit]
```bash
curl -X GET /api/index.php/v1/menus/{app}
```
#### Get Single Menu[edit]
```bash
curl -X GET /api/index.php/v1/menus/{app}/{menu_id}
```
#### Delete Menu[edit]
```bash
curl -X DELETE /api/index.php/v1/menus/{app}/{menu_id}
```
#### Create Menu[edit]
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
#### Update Menu[edit]
```bash
curl -X PATCH -H "Content-Type: application/json" /api/index.php/v1/menus/{app}/{menu_id} -d
```
```json
{
"menutype": "menu",
"title": "New Menu"
}
```
### Menus Items[edit]
#### Get List of Menus Items Types[edit]
```bash
curl -X GET /api/index.php/v1/menus/{app}/items/types
```
#### Get List of Menus Items[edit]
```bash
curl -X GET /api/index.php/v1/menus/{app}/items
```
#### Get Single Menu Item[edit]
```bash
curl -X GET /api/index.php/v1/menus/{app}/items/{menu_item_id}
```
#### Delete Menu Item[edit]
```bash
curl -X DELETE /api/index.php/v1/menus/{app}/items/{menu_item_id}
```
#### Create Menu Item[edit]
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

#### Update Menu Item[edit]
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

## Messages[edit]
### Messages[edit]
#### Get List of Messages[edit]
```bash
curl -X GET /api/index.php/v1/messages
```
#### Get Single Message[edit]
```bash
curl -X GET /api/index.php/v1/messages/{message_id}
```
#### Delete Message[edit]
```bash
curl -X DELETE /api/index.php/v1/messages/{message_id}
```
#### Create Message[edit]
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
#### Update Message[edit]
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

## Modules[edit]
### Modules[edit]
#### Get List of Modules Types[edit]
```bash
curl -X GET /api/index.php/v1/modules/types/{app}
```
#### Get List of Modules[edit]
```bash
curl -X GET /api/index.php/v1/modules/{app}
```
#### Get Single Module[edit]
```bash
curl -X GET /api/index.php/v1/modules/{app}/{module_id}
```
#### Delete Module[edit]
```bash
curl -X DELETE /api/index.php/v1/modules/{app}/{module_id}
```
#### Create Module[edit]
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

#### Update Module[edit]
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

## Newsfeeds[edit]
### Feeds[edit]
#### Get List of Feeds[edit]
```bash
curl -X GET /api/index.php/v1/newsfeeds/feeds
```
#### Get Single Feed[edit]
```bash
curl -X GET /api/index.php/v1/newsfeeds/feeds/{feed_id}
```
#### Delete Feed[edit]
```bash
curl -X DELETE /api/index.php/v1/newsfeeds/feeds/{feed_id}
```
#### Create Feed[edit]
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
#### Update Feed[edit]
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
### Categories[edit]
- Route Newsfeeds Categories is: "v1/newsfeeds/categories"
- Working with it is similar to Banners Categories.

## Privacy[edit]
### Request[edit]
#### Get List of Requests[edit]
```bash
curl -X GET /api/index.php/v1/privacy/requests
```
#### Get Single Request[edit]
```bash
curl -X GET /api/index.php/v1/privacy/requests/{request_id}
```
#### Get Single Request Export Data[edit]
```bash
curl -X GET /api/index.php/v1/privacy/request/export/{request_id}
```
#### Create Request[edit]
```bash
curl -X POST -H "Content-Type: application/json" /api/index.php/v1/privacy/requests -d
```
```json
{
"email":"somenewemail@com.ua",
"request_type":"export"
}
```
### Consent[edit]
#### Get List of Consents[edit]
```bash
curl -X GET /api/index.php/v1/privacy/consents
```
#### Get Single Consent[edit]
```bash
curl -X GET /api/index.php/v1/privacy/consents/{consent_id}
```

## Redirect[edit]
### Redirect[edit]
#### Get List of Redirects[edit]
```bash
curl -X GET /api/index.php/v1/redirect
```
#### Get Single Redirect[edit]
```bash
curl -X GET /api/index.php/v1/redirect/{redirect_id}
```
#### Delete Redirect[edit]
```bash
curl -X DELETE /api/index.php/v1/redirect/{redirect_id}
```
#### Create Redirect[edit]
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
#### Update Redirect[edit]
```bash
curl -X PATCH -H "Content-Type: application/json" /api/index.php/v1/redirect/{redirect_id} -d
```
```json
{
"new_url": "/content/art/4",
"old_url": "/content/art/132"
}
```

## Tags[edit]
### Tags[edit]
#### Get List of Tags[edit]
```bash
curl -X GET /api/index.php/v1/tags
```
#### Get Single Tag[edit]
```bash
curl -X GET /api/index.php/v1/tags/{tag_id}
```
#### Delete Tag[edit]
```bash
curl -X DELETE /api/index.php/v1/tags/{tag_id}
```
#### Create Tag[edit]
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
#### Update Tag[edit]
```bash
curl -X PATCH -H "Content-Type: application/json" /api/index.php/v1/tags/{tag_id} -d
```
```json
{
"alias": "test",
"title": "new title"
}
```
## Templates[edit]
### Templates Styles[edit]
#### Get List of Templates Styles[edit]
```bash
curl -X GET /api/index.php/v1/templates/styles/{app}
```
#### Get Single Template Style[edit]
```bash
curl -X GET /api/index.php/v1/templates/styles/{app}/{template_style_id}
```
#### Delete Template Style[edit]
```bash
curl -X DELETE /api/index.php/v1/templates/styles/{app}/{template_style_id}
```
#### Create Template Style[edit]
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
#### Update Template Style[edit]
```bash
curl -X PATCH -H "Content-Type: application/json" /api/index.php/v1/templates/styles/{app}/{template_style_id} -d
```
```json
{
"template": "cassiopeia",
"title": "new cassiopeia - Default"
}
```

## Users[edit]
### Users[edit]
#### Get List of Users[edit]
```bash
curl -X GET /api/index.php/v1/users
```
#### Get Single User[edit]
```bash
curl -X GET /api/index.php/v1/users/{user_id}
```
#### Delete User[edit]
```bash
curl -X DELETE /api/index.php/v1/users/{user_id}
```
#### Create User[edit]
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
#### Update User[edit]
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
### Fields Users[edit]
- Route Fields Users is: v1/fields/users
- Working with it is similar to Fields Contact.
### Groups Fields Users[edit]
- Route Groups Fields Users is: v1/fields/groups/users
- Working with it is similar to Groups Fields Contact.