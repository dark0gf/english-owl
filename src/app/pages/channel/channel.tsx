import * as React from 'react';
import { Link } from 'react-router-dom';
import { IChannelResponse, IVideoResponse } from 'app/shared/common.interfaces';
import { getVideosByCategory } from 'app/shared/services/video.service';
import Loader from 'app/shared/loader/loader';

interface IProps {
  channelId: string
}

interface IState {
  videos: IVideoResponse[] | null,
  channel: IChannelResponse | null,
  // loaded: boolean,
}

export class ChannelPage extends React.Component<IProps, IState> {
  state: Readonly<IState> = {
    videos: null,
    channel: null,
    // loaded: false
  };

  componentDidMount(): void {
    this.loadVideos();
  }

  componentDidUpdate(prevProps: IProps) {
    if (prevProps.channelId !== this.props.channelId) {
      this.loadVideos();
    }
  }

  private async loadVideos(): Promise<void> {
    this.setState(() => ({videos: null, channel: null}));
    const videos = await getVideosByCategory(this.props.channelId);
    this.setState((state) => ({...state, videos}));
  }

  render = () =>
    <Loader isLoading={this.state.videos === null}>
      <div className="flex flex-wrap">
      {this.state.videos?.map((video) =>
        <div key={video.videoId} className="flex-grow-0 flex-shrink-0 w-1/3 lg:w-1/4 p-1 ">
          <Link to={`/watch/${video.videoId}`} className="hover:no-underline">
            <div className="position-relative mb-8">
              <div style={{width: '100%', paddingTop: '60%'}}></div>
              <img className="mx-auto position-absolute top-0" src={video.image}/>
              <div className="font-weight-bold text-center h-12 overflow-hidden fade-ellipsis">{video.title}</div>
            </div>
          </Link>
        </div>
      )}
      </div>
    </Loader>;
}
