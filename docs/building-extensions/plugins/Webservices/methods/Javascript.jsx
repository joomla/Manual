import React from 'react';
import CodeBlock from '@theme/CodeBlock';

export const Javascript = props => {
    const componentPath = props.id ? `${props.component}/${props.id}` : props.component;
    return (
        <CodeBlock language='js' title={props.title}>
            {`let headersList = { \n`}
            {`  Authorization: 'Bearer {api_key}', \n`}
            {`}; \n\n`}

            {`let response = await fetch('http://www.mysite.com/api/v1/${componentPath}', { \n`}
            {`  method: 'GET', \n`}
            {`  headers: headersList, \n`}
            {`}); \n\n`}

            {`let data = await response.json(); \n`}
            {`console.log(data);`}
        </CodeBlock>
    );
};
