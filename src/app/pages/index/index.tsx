import * as React from 'react';
import { Link } from 'react-router-dom';
import {getAllCategories} from './service';
import { IChannelResponse } from 'app/shared/common.interfaces';

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
      <div className="flex-grow-0 flex-shrink-0 flex-basis-25 p-2">
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
