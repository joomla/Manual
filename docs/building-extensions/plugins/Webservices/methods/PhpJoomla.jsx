import React from 'react';
import CodeBlock from '@theme/CodeBlock';

export const PhpJoomla = props => {
    return (
        <CodeBlock language='php' title={props.title}>
            {`use Joomla\\Http\\HttpFactory; \n`}
            {`use Joomla\\Uri\\Uri; \n\n`}

            {`$http = (new HttpFactory())->getAvailableDriver(); \n`}
            {`$url  = 'http://www.mysite.com/api/v1'; \n`}
            {`$uri  = new Uri($url); \n\n`}

            {`$token = {api_key}; \n\n`}

            {`$headers = [ \n`}
            {`  'Accept: application/vnd.api+json', \n`}
            {`  'Content-Type: application/json', \n`}
            {`  sprintf('X-Joomla-Token: %s', trim($token)), \n`}
            {`]; \n\n`}

            {`$timeout = 30; \n\n`}

            {(props.id
                ? `$uri->setPath(sprintf('${props.component}/%d', ${props.id});`
                : `$uri->setPath('${props.component}');`) + `\n\n`}

            {`$response = $http->request('GET', $uri, null, $headers, $timeout); \n\n`}

            {`echo $response->body;`}
        </CodeBlock>
    );
};
