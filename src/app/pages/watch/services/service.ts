import * as pageLoaderService from 'app/shared/page-loader/service';
import { StoreSlicer } from 'app/slicer';
import { IData, IEnglishTextBlock, IPage, IPlayerFactoryResult, IVideoData } from './interfaces';
import { playerServiceFactory } from './player-service';
import axios from 'app/shared/services/axios';
import axiosLib, { CancelTokenSource } from 'axios';

const slicer = new StoreSlicer<IData>('pages.watch', {ready: false, englishTextBlocks: []});
slicer.resetState();

const regexpWordChar = /[a-z0-9'-]/i;

let intervalId: any;
let playerService: IPlayerFactoryResult;


export const init = (videoId: string) => {
  pageLoaderService.show();
  axios.get(`/video/${videoId}`).then((response: {data: IVideoData}) => {
    pageLoaderService.hide();
    slicer.dispatch((state) => ({...state, ready: true}));
    const data = response.data;

    data.textData = data.textData.map((data) => {
      const text = data.t;
      const englishTextBlocks: Array<IEnglishTextBlock> = [];

      let block = {text: '', isWord: false};
      Array.from(text).forEach((char) => {
        if (char.match(regexpWordChar)) {
          if (block.isWord) {
            block.text += char;
          } else {
            englishTextBlocks.push(block);
            block = {text: char, isWord: true}
          }
        } else {
          if (block.isWord) {
            englishTextBlocks.push(block);
            block = {text: char, isWord: false}
          } else {
            block.text += char;
          }
        }
      });

      englishTextBlocks.push(block);
      return {...data, englishTextBlocks};
    });

    playerService = playerServiceFactory(data);
    playerService.play();

    intervalId = setInterval(updateText , 25);
    document.addEventListener("keydown", handleKeyDown);
  });

  return () => {
    document.removeEventListener("keydown", handleKeyDown);
    clearInterval(intervalId);
    playerService.destroy();
    slicer.resetState();
  }
};

export const getState = (state: any, ownProps: any): IPage => {
  return {
    data: slicer.getState(state),
    loading: pageLoaderService.getState(state).loading,
    videoId: ownProps.videoId
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

let prevEnglishTextBlocks: Array<IEnglishTextBlock> = [];

const updateText = async () => {
  const englishTextBlocks = await playerService.getCurrentText();

  if (prevEnglishTextBlocks == englishTextBlocks) {
    return;
  }
  prevEnglishTextBlocks = englishTextBlocks;
  slicer.dispatch((state) => ({...state, englishTextBlocks}));
};

let axiosSource: CancelTokenSource | null;
export const translateWord = async (word: string) => {
  const wordTrimmed = word.trim().toLowerCase();
  slicer.dispatch((state) => ({...state, wordTranslate: null}));
  let translation: any;
  try {
    if (axiosSource) {
      axiosSource.cancel('Canceled.');
    }
    axiosSource = axiosLib.CancelToken.source();
    translation = (await axios.get(`/translate/word/${wordTrimmed}`, {cancelToken: axiosSource.token})).data;
    axiosSource = null;
  } catch (e) {
    return;
  }

  console.log(translation);
  slicer.dispatch((state) => ({...state, wordTranslate: translation}));

  const popupContainer = document.querySelector('.lt-watch-text-content .popup-content') as HTMLElement;
  if (popupContainer) {
    const h = popupContainer.offsetHeight;
    var topValue = parseFloat(popupContainer.style.top || '');
    popupContainer.style.top = topValue - h + 48 + 'px';
  }
};
