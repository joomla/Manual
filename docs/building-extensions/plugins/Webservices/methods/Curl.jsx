import React from 'react';
import CodeBlock from '@theme/CodeBlock';

export const Curl = props => {
    const componentPath = props.id ? `${props.component}/${props.id}` : props.component;
    return (
        <CodeBlock language='bash' title={props.title}>
            {`curl -X GET \\ \n`}
            {`'http://www.mysite.com/api/v1/${componentPath}' \\ \n`}
            {`--header 'Authorization: Bearer {api_key}' \n`}
        </CodeBlock>
    );
};
