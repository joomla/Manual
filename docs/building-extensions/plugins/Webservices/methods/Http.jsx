import React from 'react';
import CodeBlock from '@theme/CodeBlock';

export const Http = props => {
    const componentPath = props.id ? `${props.component}/${props.id}` : props.component;
    return (
        <CodeBlock language='bash' title={props.title}>
            {`GET /api/v1/${componentPath} \n`}
            {`Authorization: Bearer {api_key} \n`}
            {`Host: www.mysite.com \n`}
        </CodeBlock>
    );
};
