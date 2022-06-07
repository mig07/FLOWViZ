import * as React from 'react';
import Library from './library';
import Api from './api';

export default function ToolFunctions(props) {

    const library = props.tool.library
    const api = props.tool.api

    return (
        <>
            <Api api={api}/>
            <Library library={library}/>
        </>  
    )
}