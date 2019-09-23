import * as pageLoaderService from 'app/shared/page-loader/service';
import { StoreSlicer } from 'app/slicer';
import { IData, IPage, IPlayerFactoryResult } from './interfaces';
import { playerServiceFactory } from './player-service';

const videoDataMock = {
  videoId: 'XqZsoesa55w',
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
let playerService: IPlayerFactoryResult;
export const init = () => {
  pageLoaderService.show();
  setTimeout(() => {
    pageLoaderService.hide();
    slicer.dispatch((state: any) => ({...state, ready: true}));

    playerService = playerServiceFactory(videoDataMock);
    playerService.play();

    intervalId = setInterval(updateText , 25);
    document.addEventListener("keydown", handleKeyDown);
  }, 700);

  return () => {
    document.removeEventListener("keydown", handleKeyDown);
    clearInterval(intervalId);
    playerService.destroy();
    slicer.resetState();
  }
};

export const getState = (state: any): IPage => {
  return {
    data: slicer.getState(state),
    loading: pageLoaderService.getState(state).loading
  };
};

export const onLeft = () => {
  playerService.seekToLeftText();
};

export const onRight = () => {
  playerService.seekToRightText();
};

const playPause = () => playerService.playPause();

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

const updateText = async () => {
  const text = await playerService.getCurrentText();

  if (prevText == text) {
    return;
  }
  prevText = text;
  slicer.dispatch((state) => ({...state, englishText: text}));
};





