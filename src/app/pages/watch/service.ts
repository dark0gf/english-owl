import PlayerFactory from 'youtube-player';
import * as pageLoaderService from 'app/shared/page-loader/service';
import { StoreSlicer } from 'app/slicer';
import { IData, IPage, YouTubePlayer, IVideoData } from './interfaces';

const YTPlayerState = {
  UNSTARTED: '-1',
  ENDED: 0,
  PLAYING: 1,
  PAUSED: 2,
  BUFFERING: 3,
  CUED: 5
};

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
    document.addEventListener("keydown", handleKeyDown);

    videoData = videoDataMock;
    videoData.textData.sort((a, b) => (a.s - b.s));
    intervalId = setInterval(updateText , 25);
    const p = (PlayerFactory('yt-player') as any);
    player = (p as YouTubePlayer);

    player.loadVideoById('XqZsoesa55w', videoData.startFrom);
    player.playVideo();
  }, 700);

  return () => {
    document.removeEventListener("keydown", handleKeyDown);
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


export const onLeft = async () => {
  console.log('--------------------------------------- onLeft');
  if (!player || !videoData) {
    return;
  }
  let index = searchForClosestPlayedIndexText(prevTime);
  if (index < 0) {
    return;
  }
  if (index > 0) {
    index--;
  }

  const tData = videoData.textData[index];
  player.seekTo(tData.s, true);

  return updateText(tData.s);
};

export const onRight = async () => {
  console.log('--------------------------------------- onRight');
  if (!player || !videoData) {
    return;
  }

  const textDataLength = videoData.textData.length;
  let index = searchForClosestPlayedIndexText(prevTime);
  index++;
  if (index >= textDataLength) {
    return;
  }

  const tData = videoData.textData[index];
  player.seekTo(tData.s, true);

  return updateText(tData.s);
};

const playPause = async () => {
  if (!player) {
    return;
  }
  const state = await player.getPlayerState();
  if (state == YTPlayerState.PLAYING) {
    player.pauseVideo();
  } else {
    player.playVideo();
  }
};

const handleKeyDown = (event: any) => {
  switch( event.keyCode ) {
    case 37: //left
    case 81: //q
      onLeft();
      break;
    case 39: //right
    case 87: //e
      onRight();
      break;
    case 32: //space
      playPause();
      if (event.target == document.body) {
        event.preventDefault();
      }
      break;
    default:
      break;
  }
};

let prevText = '';
let prevTime = 0;

const updateText = async (forceTime? : number) => {
  if (!player) {
    return;
  }
  const state = await player.getPlayerState();
  console.log('state', state);
  let time;
  if (forceTime) {
    time = forceTime;
  } else if (YTPlayerState.PLAYING == state) {
    time = await player.getCurrentTime();
  } else {
    time = prevTime;
  }
  console.log(time);

  if (time == prevTime) {
    return;
  }
  prevTime = time;

  let text = searchForText(time);
  if (prevText == text) {
    return;
  }
  prevText = text;
  slicer.dispatch((state) => ({...state, englishText: text}));
};

const searchForText = (time: number): string  => {
  if (!videoData) {
    return "";
  }

  for (const tData of videoData.textData) {
    if (tData.s <= time && time <= tData.e) {
      return tData.t;
    }
  }

  return "";
};

const searchForClosestPlayedIndexText = (time: number): number => {
  if (!videoData) {
    return -1;
  }

  let index = -1;
  videoData.textData.forEach((tData, i) => {
    if (tData.s <= time) {
      index = i;
    }
  });

  return index;
};

