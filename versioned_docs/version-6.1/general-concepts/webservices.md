Web Services
============

Description of the webservices concept

- Web Services are used to make systems COMMUNICATE each other by using the HTTP protocol and nowadays over TLS (Transport Layer Security).
- Another definition could be Web Services acts like a CONTRACT between a PRODUCER and a CONSUMER via ENDPOINTS.
- Simply put, Web Services are like doors and windows in a house, they are INPUTS and OUTPUTS to the OUTSIDE world.
- In the context on Joomla! as a system, Joomla Webservices API allows Joomla! to INTERACT WITH, EXTERNAL DATASOURCES. Like webapps, mobile,etc...

## Communicate with the Joomla 4.x Web Services API
The communication with Joomla's Web Services API takes place via specified endpoints.

- Joomla's core endpoints: https://docs.joomla.org/J4.x:Joomla_Core_APIs
- A collection of Joomla endpoints to use in Postman: https://github.com/alexandreelise/j4x-api-collection

### Using the Joomla framework

More often than not, when using the Joomla framework, under the hood it still uses cURL or php streams. Most of the cURL is available with your web hosting provider. Otherwise check phpinfo();
You should be able to follow along because the examples using the Joomla framework will mimic those with cURL.

#### Define some variables
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


#### POST - Create an Article in the Category "Uncategorized" (Category ID = 2)

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

#### GET - Retrieve all articles from the "Uncategorized" Category

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

#### GET - Retrieve one specific Article

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

#### PATCH - Modify a specific Article

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

#### DELETE - Remove a specific Article

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


### Using the PHP cURL Functions

The cURL functions needs to be available and enabled in your PHP configuration, check phpinfo();

#### Define some variables

First we define some variables that we use in all our cURL requests:

- the URL of your Joomla 4.x website and
- the Joomla's API Token of a Super User account or an account which has at least core.login.api permission and core.login.site to be able to see change current logged-in user's token.

```php
// Before passing the HTTP METHOD to CURL
$curl  = curl_init();

$url   = 'https://example.org/api/index.php/v1';

// Put your Joomla! Api token in a safe place, for example a password manager or a vault storing secrets
// We should not use environment variables to store secrets.
// Here is why: https://www.trendmicro.com/en_us/research/22/h/analyzing-hidden-danger-of-environment-variables-for-keeping-secrets.html
$token = '';
```

#### POST - Create an Article in the Category "Uncategorized" (Category ID = 2)

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

curl_setopt_array($curl, [
		CURLOPT_URL            => sprintf('%s/%s',$url,'content/articles'),
		CURLOPT_RETURNTRANSFER => true,
		CURLOPT_ENCODING       => 'utf-8',
		CURLOPT_MAXREDIRS      => 10,
		CURLOPT_TIMEOUT        => 30,
		CURLOPT_FOLLOWLOCATION => true,
		CURLOPT_HTTP_VERSION   => CURL_HTTP_VERSION_2TLS,
		CURLOPT_CUSTOMREQUEST  => 'POST',
		CURLOPT_POSTFIELDS     => $dataString,
		CURLOPT_HTTPHEADER     => $headers,
	]
);

$response = curl_exec($curl);
curl_close($curl);
echo $response;
```

#### GET - Retrieve all articles from the "Uncategorized" Category

```php
$categoryId = 2; // Joomla's default "Uncategorized" Category


// HTTP request headers
$headers = [
'Accept: application/vnd.api+json',
'Content-Type: application/json',
sprintf('X-Joomla-Token: %s', trim($token)),
];

curl_setopt_array($curl, [
		CURLOPT_URL            => sprintf('%s/content/articles?filter[category]=%d',$url,$categoryId),
		CURLOPT_RETURNTRANSFER => true,
		CURLOPT_ENCODING       => 'utf-8',
		CURLOPT_MAXREDIRS      => 10,
		CURLOPT_TIMEOUT        => 30,
		CURLOPT_FOLLOWLOCATION => true,
		CURLOPT_HTTP_VERSION   => CURL_HTTP_VERSION_2TLS,
		CURLOPT_CUSTOMREQUEST  => 'GET',
		CURLOPT_HTTPHEADER     => $headers,
	]
);

$response = curl_exec($curl);
curl_close($curl);
echo $response;
```

#### GET - Retrieve one specific Article

```php
$articleId = 1; // The Article ID of a specific Article


// HTTP request headers
$headers = [
'Accept: application/vnd.api+json',
'Content-Type: application/json',
sprintf('X-Joomla-Token: %s', trim($token)),
];
curl_setopt_array($curl, [
		CURLOPT_URL            => sprintf('%s/content/articles/%d',$url,$articleId),
		CURLOPT_RETURNTRANSFER => true,
		CURLOPT_ENCODING       => 'utf-8',
		CURLOPT_MAXREDIRS      => 10,
		CURLOPT_TIMEOUT        => 30,
		CURLOPT_FOLLOWLOCATION => true,
		CURLOPT_HTTP_VERSION   => CURL_HTTP_VERSION_2TLS,
		CURLOPT_CUSTOMREQUEST  => 'GET',
		CURLOPT_HTTPHEADER     => $headers,
	]
);

$response = curl_exec($curl);
curl_close($curl);
echo $response;
```

#### PATCH - Modify a specific Article

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

curl_setopt_array($curl, [
		CURLOPT_URL            => sprintf('%s/content/articles/%d',$url,$articleId),
		CURLOPT_RETURNTRANSFER => true,
		CURLOPT_ENCODING       => 'utf-8',
		CURLOPT_MAXREDIRS      => 10,
		CURLOPT_TIMEOUT        => 30,
		CURLOPT_FOLLOWLOCATION => true,
		CURLOPT_HTTP_VERSION   => CURL_HTTP_VERSION_2TLS,
		CURLOPT_CUSTOMREQUEST  => 'PATCH',
		CURLOPT_POSTFIELDS     => $dataString,
		CURLOPT_HTTPHEADER     => $headers,
	]
);

$response = curl_exec($curl);
curl_close($curl);
echo $response;
```

#### DELETE - Remove a specific Article

```php
$articleId = 1; // The Article ID of a specific Article


// HTTP request headers
$headers = [
'Accept: application/vnd.api+json',
'Content-Type: application/json',
sprintf('X-Joomla-Token: %s', trim($token)),
];

curl_setopt_array($curl, [
		CURLOPT_URL            => sprintf('%s/content/articles/%d',$url,$articleId),
		CURLOPT_RETURNTRANSFER => true,
		CURLOPT_ENCODING       => 'utf-8',
		CURLOPT_MAXREDIRS      => 10,
		CURLOPT_TIMEOUT        => 30,
		CURLOPT_FOLLOWLOCATION => true,
		CURLOPT_HTTP_VERSION   => CURL_HTTP_VERSION_2TLS,
		CURLOPT_CUSTOMREQUEST  => 'DELETE',
		CURLOPT_HTTPHEADER     => $headers,
	]
);

$response = curl_exec($curl);
curl_close($curl);
echo $response;
```
