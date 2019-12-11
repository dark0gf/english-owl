import * as React from 'react';
import { CircularProgress } from '@material-ui/core';

const component = (props: {isLoading: boolean, children: any}) =>
  <div>
    {props.isLoading ?
      (<CircularProgress size={'6rem'}/>) :
      props.children
    }
  </div>;


export default component;
