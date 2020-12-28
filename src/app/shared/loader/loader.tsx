import * as React from 'react';
import { CircularProgress } from '@material-ui/core';

const component = (props: {isLoading: boolean, children: any, className?: string}) =>
  <>{props.isLoading ?
    (<div className={props.className}><CircularProgress size={'6rem'} className={props.className}/></div>) :
    props.children
  }</>;


export default component;
