Web Services using Joomla framework
============

More often than not, when using the Joomla framework, under the hood it still uses cURL or php streams. Most of the cURL is available with your web hosting provider. Otherwise check phpinfo();
You should be able to follow along because the examples using the Joomla framework will mimic those with cURL.

## Define some variables
First we define some variables that we use in all our cURL requests:
- the URL of your Joomla 4.x website and
- the Joomla's API Token of a Super User account or an account which has at least core.login.api permission and core.login.site to be able to see change current logged-in user's token.


```php
// Before passing the HTTP METHOD to CURL
use Joomla\Http\HttpFactory;
use Joomla\Uri\Uri;

$http = (new HttpFactory())->getAvailableDriver();
$url   = 'https://example.org/api/index.php/v1';
$uri  = new Uri($url);

// Put your Joomla! Api token in a safe place, for example a password manager or a vault storing secrets
// We should not use environment variables to store secrets.
// Here is why: https://www.trendmicro.com/en_us/research/22/h/analyzing-hidden-danger-of-environment-variables-for-keeping-secrets.html

$token = '';
```


## POST - Create an Article in the Category "Uncategorized" (Category ID = 2)

```php
$categoryId = 2; // Joomla's default "Uncategorized" Category

$data = [
'title'       => 'How to add an article to Joomla via the API?',
'alias'       => 'how-to-add-article-via-joomla-api',
'articletext' => 'I have no idea...',
'catid'       => $categoryId,
'language'    => '*',
'metadesc'    => '',
'metakey'     => '',
];

$dataString = json_encode($data);

// HTTP request headers
$headers = [
'Accept: application/vnd.api+json',
'Content-Type: application/json',
'Content-Length: ' . mb_strlen($dataString),
sprintf('X-Joomla-Token: %s', trim($token)),
];

// Timeout in seconds
$timeout = 30;

// Set path for creating an article it will set the current uri path part
$uri->setPath('content/articles');

// Will be a PSR-7 compatible Response
$response = $http->request('POST', $uri, $dataString, $headers, $timeout);

// The response body is now a stream, so you need to do
echo $response->body;

```

## GET - Retrieve all articles from the "Uncategorized" Category

```php
$categoryId = 2; // Joomla's default "Uncategorized" Category

// Don't send payload to server
$dataString = null;

// HTTP request headers
$headers = [
'Accept: application/vnd.api+json',
'Content-Type: application/json',
sprintf('X-Joomla-Token: %s', trim($token)),
];

// Timeout in seconds
$timeout = 30;

// Set path for getting all articles it will set the current uri path part
$uri->setPath('content/articles');

// Will be a PSR-7 compatible Response
$response = $http->request('GET', $uri, $dataString, $headers, $timeout);

// The response body is now a stream, so you need to do
echo $response->body;

```

## GET - Retrieve one specific Article

```php
$articleId = 1; // The Article ID of a specific Article

// Don't send payload to server
$dataString = null;

// HTTP request headers
$headers = [
'Accept: application/vnd.api+json',
'Content-Type: application/json',
sprintf('X-Joomla-Token: %s', trim($token)),
];

// Timeout in seconds
$timeout = 30;

// Set path for getting a specific article it will set the current uri path part
$uri->setPath(sprintf('content/articles/%d', $articleId));

// Will be a PSR-7 compatible Response
$response = $http->request('GET', $uri, $dataString, $headers, $timeout);

// The response body is now a stream, so you need to do
echo $response->body;

```

## PATCH - Modify a specific Article

```php
$articleId = 1; // The Article ID of a specific Article

$data = [
'id'          => $articleId,
'title'       => 'How to add an article via the Joomla 4 API?',
'introtext'   => 'When using PATCH, articletext MUST be split into two parts or use at least just introtext in order to work properly',
'fulltext'    => 'MORE CONTENT if you wish',
];

$dataString = json_encode($data);

// HTTP request headers
$headers = [
'Accept: application/vnd.api+json',
'Content-Type: application/json',
'Content-Length: ' . mb_strlen($dataString),
sprintf('X-Joomla-Token: %s', trim($token)),
];

// Timeout in seconds
$timeout = 30;

// Set path for partial update of a specific article it will set the current uri path part
$uri->setPath(sprintf('content/articles/%d', $articleId));

// Will be a PSR-7 compatible Response
$response = $http->request('PATCH', $uri, $dataString, $headers, $timeout);

// show response status code
echo $response->code;

```

## DELETE - Remove a specific Article

```php
$articleId = 1; // The Article ID of a specific Article

// Don't send payload to server
$dataString = null;

// HTTP request headers
$headers = [
'Accept: application/vnd.api+json',
'Content-Type: application/json',
sprintf('X-Joomla-Token: %s', trim($token)),
];

// Timeout in seconds
$timeout = 30;

// Set path for deleting of a specific article it will set the current uri path part
$uri->setPath(sprintf('content/articles/%d', $articleId));

// Will be a PSR-7 compatible Response
$response = $http->request('DELETE', $uri, $dataString, $headers, $timeout);

// show response status code
echo $response->code;
```
