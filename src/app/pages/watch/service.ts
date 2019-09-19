import PlayerFactory from 'youtube-player';
import * as pageLoaderService from 'app/shared/page-loader/service';
import { StoreSlicer } from 'app/slicer';
import { IData, IPage, YouTubePlayer, IVideoData } from './interfaces';

// const YTPlayerState = {
//   UNSTARTED: '-1',
//   ENDED: 0,
//   PLAYING: 1,
//   PAUSED: 2,
//   BUFFERING: 3,
//   CUED: 5
// };

let player: YouTubePlayer | null;
let videoData: IVideoData | null;

const videoDataMock = {
  'startFrom': 20,
  textData: [
    {'s': 27.7, 'e': 35, 't': 'Baby shark'},
    {'s': 36, 'e': 43.5, 't': 'Mommy shark'},
    {'s': 44, 'e': 52.5, 't': 'Daddy shark'},
    {'s': 53, 'e': 60.5, 't': 'Grandma shark'},
    {'s': 61, 'e': 68.5, 't': 'Grandpa shark'},
    {'s': 69, 'e': 77, 't': 'Let\'s go hunt'},
    {'s': 78, 'e': 85, 't': 'Run away'},
    {'s': 87, 'e': 95.5, 't': 'Safe at last'},
    {'s': 95.6, 'e': 105, 't': 'It\'s the end'},
  ]
};

const slicer = new StoreSlicer<IData>('pages.watch', {ready: false, englishText: ''});
slicer.resetState();

let intervalId: any;
export const init = () => {
  pageLoaderService.show();
  setTimeout(() => {
    pageLoaderService.hide();
    slicer.dispatch((state: any) => ({...state, ready: true}));
    videoData = videoDataMock;
    intervalId = setInterval(updateText , 25);
    const p = (PlayerFactory('yt-player') as any);
    player = (p as YouTubePlayer);

    player.loadVideoById('XqZsoesa55w', videoData.startFrom);
    player.playVideo();
  }, 700);

  return () => {
    clearInterval(intervalId);
    player = null;
    videoData = null;
    slicer.resetState();
  }
};

export const getState = (state: any): IPage => {
  return {
    data: slicer.getState(state),
    loading: pageLoaderService.getState(state).loading
  };
};


let prevText = '';
let prevTime = 0;

const updateText = async () => {
  if (!player || !videoData) {
    return;
  }
  const time = await player.getCurrentTime();
  if (time == prevTime) {
    return;
  }
  prevTime = time;
  let text = '';
  console.log(time);
  for (const tData of videoData.textData) {
    if (tData.s <= time && time <= tData.e) {
      text = tData.t;
      break;
    }
  }

  if (prevText == text) {
    return;
  }
  prevText = text;
  slicer.dispatch((state) => ({...state, englishText: text}));
};
