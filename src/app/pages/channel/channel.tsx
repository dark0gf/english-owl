import * as React from 'react';
import { Link } from 'react-router-dom';
import { IChannelResponse, IVideoResponse } from 'app/shared/common.interfaces';
import { getVideosByCategory } from 'app/shared/services/video.service';

interface IProps {
  channelId: string
}

interface IState {
  videos: IVideoResponse[] | null,
  channel: IChannelResponse | null,

}

export class ChannelPage extends React.Component<IProps, IState> {
  state: Readonly<IState> = {
    videos: null,
    channel: null,
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
    const videos = await getVideosByCategory(this.props.channelId);
    this.setState((state) => ({...state, videos}));
  }

  render = () => <div className="flex flex-wrap">
    {this.state.videos?.map((video) =>
      <div key={video.videoId} className="flex-grow-0 flex-shrink-0 w-1/3 xl:w-1/4 p-1 ">
        <Link to={`/channel/${video.videoId}`} className="hover:no-underline">
          <div className="position-relative">
            <img className="mx-auto" src={video.image}/>
            <div className="font-weight-bold text-center h-12 overflow-hidden fade-ellipsis">{video.title}</div>
          </div>
        </Link>
      </div>
    )}

  </div>;
}
