Web Services using PHP cURL Functions
============

The cURL functions needs to be available and enabled in your PHP configuration, check phpinfo();

## Define some variables

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

## GET - Retrieve all articles from the "Uncategorized" Category

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

## GET - Retrieve one specific Article

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

## DELETE - Remove a specific Article

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
