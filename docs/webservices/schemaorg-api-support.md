# Schema.org Plugin API Documentation

## Introduction
This document provides details about the Schema.org system plugin's API support in Joomla CMS. This guide outlines the API endpoints, payload structure, and testing instructions.

---

### POST /content
Creates a new content item with Schema.org metadata.

### Request Payload 
  ```json
  {
    "title" : "Test Article",
    "@type" : "Article",
    "articletext" : "Content",
    "author": {
       "type" : "Person",
       "name" : "John-doe",
       "email" : "john@example.com"
    }
  }

 **Response**
-Status Code: `201 Created`.
-Payload:
  ```json
  {
   "id" : 123,
   "status" : "success",
   "message" : "Schema.org created successfully."
  }


### PATCH /content/{id}
Updates an existing content item with  Schema.org metadata.
  ```json
  {
    "author": {
      "type" : "Person2",
      "email" : "person2@example.com" 
    } 
  }

**Response** 
-Status Code: `200 OK` or `204 No Content`.


```markdown
### GET /content
Retrieves content items with Schema.org metadata.

####Query parameters:
- `type` : Filter by type (e.g., Article, Person).
- `author` : Filter by author name.

#### Example:
```http:
GET /content?type=Article&author=john-doe

**Responses**
-Status Code :`200 OK`.
  ```json
  {
    "id" : 123,
    "title" : "Test Article",
    "@type" : "Article",
    "author" : {
      "type" : "Person",
      "name" :"John-doe",
      "email" : "john@example.com"
    }
  }


#### Testing Instructions
```markdown
1. Enable the Schema.org plugin in Joomla's backend.
2. Use Joomla REST API to 
   - **POST** : Creates new content.
   - **PATCH**: Update existing content.
   - **GET**  : Verify structured metadata is included in the response.
3. Ensure that schema metadata appears in both API and administrator use cases.

##Results

## Actual result Before PR
- Schema.org plugin does not execute when content is saved via API.

## Expected Result After PR
- Schema.org plugin supports execution via both admin and API clients, enabling full metadata injection.