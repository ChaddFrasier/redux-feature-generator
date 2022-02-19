import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';

import { 
    fetchLinkAsync,
    selectStatus
} from './templateSlice';
import styles from './template.module.css';

export interface TemplateProps {
    name: string
}


export function Template(props: TemplateProps) {
    const status = useAppSelector(selectStatus);
    const dispatch = useAppDispatch();
    return (
        <div>
          <h1>HELLO {props.name}!</h1>
        </div>
    )
    
}