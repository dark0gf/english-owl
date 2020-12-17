import * as React from 'react';
import { connect } from 'react-redux';
import * as service from './service';
import Button from '@material-ui/core/Button';
import { IPage } from './service';
import { Link } from 'react-router-dom';
import {getAllCategories} from './service';
import { IChannelResponse } from 'app/shared/common.interfaces';

const connected: React.ComponentType<any> = connect(service.getState)(
  (props: IPage) => {
    return <div className="">
      <Button variant="contained" color="primary" onClick={() => {}}>
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


interface IState {
  channels: IChannelResponse[]
}

export class IndexPage extends React.Component<{}, IState> {
  state: Readonly<IState> = {
    channels: []
  };

  async componentDidMount() {
    const channels = await getAllCategories();
    this.setState(() => ({...this.state, channels}));
  }

  render = () => <div className="flex flex-wrap">
    {this.state.channels.map((channel) =>
      <div className="flex-grow-0 flex-shrink-0 flex-basis-25 p-1">
        <Link to={`/channel/${channel.id}`}>
          <div className="">
            <img className="mx-auto" src={channel.image}/>
            <div className="font-weight-bold text-center">{channel.title}</div>
            <div className="position-relative h-12 overflow-hidden fade-ellipsis">{channel.description}</div>
          </div>
        </Link>
      </div>
    )}

  </div>;
}
