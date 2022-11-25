Web Services
============
Description of the webservices concept
:::caution TODO

This page is unfinished, please use the **Edit this Page** link at the bottom of this page to help make it more useful.

:::

# Communicate with the Joomla 4 Web Services API
The communication with Joomla's Web Services API takes place via specified endpoints. 
- Joomla's core endpoints: https://docs.joomla.org/J4.x:Joomla_Core_APIs
- A collection of Joomla endpoints to use in Postman: https://github.com/alexandreelise/j4x-api-collection

## Using the Joomla framework
:::caution TODO

## Using the PHP cURL Functions
The cURL functions needs to be available and enabled in your PHP configuration, check phpinfo();

### Define some variables
First we define some variables that we use in all our cURL requests:
- the URL of your Joomla 4 website and 
- the Joomla's API Token of the Super User account.

```php
// Before passing the HTTP METHOD to CURL
$curl  = curl_init();
$url   = 'http://example.com/api/index.php/v1';
$token = 'abcdefghijklmnopqrstuvwxyz1234567890abcdefghijklmnopqrstuvwxyz1234567890abcdefghijklmnopqrstuvwxyz12';
```

### POST - Create an Article in the Category "Uncategorized" (Category ID = 2)
```php
$categoryId = 2; // Joomla's default "Uncategorized" Category
curl_setopt_array($curl, [
		CURLOPT_URL            => $url . '/content/articles',
		CURLOPT_RETURNTRANSFER => true,
		CURLOPT_ENCODING       => '',
		CURLOPT_MAXREDIRS      => 10,
		CURLOPT_TIMEOUT        => 0,
		CURLOPT_FOLLOWLOCATION => true,
		CURLOPT_HTTP_VERSION   => CURL_HTTP_VERSION_1_1,
		CURLOPT_CUSTOMREQUEST  => 'POST',
		CURLOPT_POSTFIELDS     => [
			'id'          => 0,
			'title'       => 'How to add an article to Joomla via the API?',
			'articletext' => 'I have no idea...',
			'catid'       => $categoryId,
			'language'    => '*',
			'metadesc'    => '',
			'metakey'     => '',
		],
		CURLOPT_HTTPHEADER     => [
			'Content-Type: application/json',
			'Authorization: Bearer ' . $token
		],
	]
);

$response = curl_exec($curl);
curl_close($curl);
echo $response;
```

### GET - Retrieve all articles from the "Uncategorized" Category
```php
$categoryId = 2; // Joomla's default "Uncategorized" Category
curl_setopt_array($curl, [
		CURLOPT_URL            => $url . '/content/articles?filter[category_id]=' . $categoryId,
		CURLOPT_RETURNTRANSFER => true,
		CURLOPT_ENCODING       => '',
		CURLOPT_MAXREDIRS      => 10,
		CURLOPT_TIMEOUT        => 0,
		CURLOPT_FOLLOWLOCATION => true,
		CURLOPT_HTTP_VERSION   => CURL_HTTP_VERSION_1_1,
		CURLOPT_CUSTOMREQUEST  => 'GET',
		CURLOPT_HTTPHEADER     => [
			'Content-Type: application/json',
			'Authorization: Bearer ' . $token
		],
	]
);

$response = curl_exec($curl);
curl_close($curl);
echo $response;
```

### GET - Retrieve one specific Article
```php
$articleId = 1; // The Article ID of a specific Article
curl_setopt_array($curl, [
		CURLOPT_URL            => $url . '/content/articles/' . $articleId,
		CURLOPT_RETURNTRANSFER => true,
		CURLOPT_ENCODING       => '',
		CURLOPT_MAXREDIRS      => 10,
		CURLOPT_TIMEOUT        => 0,
		CURLOPT_FOLLOWLOCATION => true,
		CURLOPT_HTTP_VERSION   => CURL_HTTP_VERSION_1_1,
		CURLOPT_CUSTOMREQUEST  => 'GET',
		CURLOPT_HTTPHEADER     => [
			'Content-Type: application/json',
			'Authorization: Bearer ' . $token
		],
	]
);

$response = curl_exec($curl);
curl_close($curl);
echo $response;
```

### PATCH - Modify a specific Article
```php
$articleId = 1; // The Article ID of a specific Article
curl_setopt_array($curl, [
		CURLOPT_URL            => $url . '/content/articles/' . $articleId,
		CURLOPT_RETURNTRANSFER => true,
		CURLOPT_ENCODING       => '',
		CURLOPT_MAXREDIRS      => 10,
		CURLOPT_TIMEOUT        => 0,
		CURLOPT_FOLLOWLOCATION => true,
		CURLOPT_HTTP_VERSION   => CURL_HTTP_VERSION_1_1,
		CURLOPT_CUSTOMREQUEST  => 'PATCH',
		CURLOPT_POSTFIELDS     => [
			'id'          => $articleId,
			'title'       => 'How to add an article via the Joomla 4 API?',
			'articletext' => 'Use the HTTP POST method at the /content/articles endpoint.'
		],
		CURLOPT_HTTPHEADER     => [
			'Content-Type: application/json',
			'Authorization: Bearer ' . $token
		]
	]
);

$response = curl_exec($curl);
curl_close($curl);
echo $response;
```

### DELETE - Remove a specific Article
```php
$articleId = 1; // The Article ID of a specific Article
curl_setopt_array($curl, [
		CURLOPT_URL            => $url . '/content/articles/' . $articleId,
		CURLOPT_RETURNTRANSFER => true,
		CURLOPT_ENCODING       => '',
		CURLOPT_MAXREDIRS      => 10,
		CURLOPT_TIMEOUT        => 0,
		CURLOPT_FOLLOWLOCATION => true,
		CURLOPT_HTTP_VERSION   => CURL_HTTP_VERSION_1_1,
		CURLOPT_CUSTOMREQUEST  => 'DELETE',
		CURLOPT_HTTPHEADER     => [
			'Content-Type: application/json',
			'Authorization: Bearer ' . $token
		]
	]
);

$response = curl_exec($curl);
curl_close($curl);
echo $response;
```
