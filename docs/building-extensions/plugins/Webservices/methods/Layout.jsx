import React from 'react';

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

import { Http } from './Http';
import { PhpJoomla } from './PhpJoomla.jsx';
import { Curl } from './Curl.jsx';
import { Javascript } from './Javascript.jsx';

export const MethodsLayout = props => {
    return (
        <Tabs>
            <TabItem value='http' label='HTTP'>
                <Http {...props} />
            </TabItem>
            <TabItem value='php' label='PHP (Joomla Framework)'>
                <PhpJoomla {...props} />
            </TabItem>
            <TabItem value='bash' label='Curl'>
                <Curl {...props} />
            </TabItem>
            <TabItem value='js' label='Javascript'>
                <Javascript {...props} />
            </TabItem>
        </Tabs>
    );
};
