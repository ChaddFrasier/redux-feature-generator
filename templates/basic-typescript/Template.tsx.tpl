import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';

import { 
    fetchLinkAsync,
    selectStatus
} from './${featureNameLowercase}Slice';
import styles from './${featureNameLowercase}.module.css';

export interface ${featureNameUppercase}Props {
    name: string
}


export function ${featureNameUppercase}(props: ${featureNameUppercase}Props) {
    const status = useAppSelector(selectStatus);
    const dispatch = useAppDispatch();
    return (
        <div>
          <h1>HELLO {props.name}!</h1>
        </div>
    )
    
}