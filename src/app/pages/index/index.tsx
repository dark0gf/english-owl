import * as React from 'react';
import { connect } from 'react-redux';
import * as service from './service';
import Button from '@material-ui/core/Button';
import { IPage } from './service';
import { Link } from 'react-router-dom';

const connected: React.ComponentType<any> = connect(service.getState)(
  (props: IPage) => {
    return <div>
      <Button variant="contained" color="primary" onClick={service.somefunc}>
        Hello World {props.data} !
      </Button>
      <Link to={'/watch/XqZsoesa55w'}>
        <Button variant="contained" color="primary">
          Go to watch
        </Button>
      </Link>
      <h1>{props.count}</h1>

    </div>
  }
);

export default connected;
