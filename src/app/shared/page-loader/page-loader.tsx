import * as React from 'react';
import { CircularProgress } from '@material-ui/core';
import { connect } from 'react-redux';
import * as service from './service';
import { ILoader } from './service';
import './style.css';

const connected: React.ComponentType<any> = connect(service.getState)(
  (props: ILoader) => <div className={(props.loading ? 'd-block' : 'd-none') + ' position-absolute page-loader-container'}>
    <CircularProgress size={'6rem'}/>
  </div>
);

export default connected;
