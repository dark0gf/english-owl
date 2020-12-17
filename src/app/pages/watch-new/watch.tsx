import * as React from 'react';
import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import {isEqual} from 'lodash';
import useInterval from '@use-it/interval';

import axios from 'app/shared/services/axios';
import Loader from 'app/shared/loader/loader';


import Word from './word';
import { IEnglishTextBlock, IEnglishTextBlocks, IPlayerFactoryResult, IVideoData } from './interfaces';
import { playerServiceFactory } from './player-service';
import './styles.css';

interface IWatch {
  videoId: string,
  test?: number,
  foo?: {value: string, refresh: number},
  cb?: (data: string) => void,
}

const regexpWordChar = /[a-z0-9'-]/i;

const useEvent = (event: keyof WindowEventMap, handler: (this: Window, ev: WindowEventMap[keyof WindowEventMap]) => any, passive=false) => {
  useEffect(() => {
    // initiate the event handler
    window.addEventListener(event, handler, passive);

    // this will clean up the event every time the component is re-rendered
    return function cleanup() {
      window.removeEventListener(event, handler);
    };
  });
};

const useService = (props: IWatch) => {
  const [ready, setReady] = useState(false);
  const [englishTextBlocks, setEnglishTextBlocks] = useState<IEnglishTextBlocks>({textBlocks: [], translate: ''});
  const [playerService, setPlayerService] = useState<IPlayerFactoryResult>();
  const [showTranslate, setShowTranslate] = useState<Boolean>(false);

  useEffect(() => {
    axios.get(`/video/${props.videoId}`).then((response: {data: IVideoData}) => {
      setReady(true);
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

      const ps = playerServiceFactory(data);
      setPlayerService(ps);
      ps.play();
    });

    return () => {
      playerService?.destroy();
    }
  }, []);

  useEvent('keydown', (event: any) => {
    switch( event.keyCode ) {
      case 37: //left
      case 81: //q
        onLeft();
        break;
      case 39: //right
      case 69: //e
        onRight();
        break;
      case 83: //s
        triggerTranslate();
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
  });

  useInterval(async () => {
    const newEnglishTextBlocks = await playerService?.getCurrentText();
    if (!newEnglishTextBlocks) {
      return;
    }
    if (isEqual(englishTextBlocks, newEnglishTextBlocks)) {
      return;
    }
    setEnglishTextBlocks(newEnglishTextBlocks);
  }, 15);

  const playPause = () => playerService?.playPause();

  const onLeft = () => {
    playerService?.seekToLeftText();
  };

  const onRight = () => {
    playerService?.seekToRightText();
  };

  const triggerTranslate = () => {
    setShowTranslate(!showTranslate);
  };

  return {ready, englishTextBlocks, showTranslate, onLeft, onRight, triggerTranslate};
};

export default (props: IWatch) => {
  const {ready, englishTextBlocks, showTranslate, onLeft, onRight, triggerTranslate} = useService(props);

  return <div>
    <Link to={'/'}>
      &lt; Назад
    </Link>
    <br />
    <Loader isLoading={!ready}>
      <div>
        <div id='yt-player' className='lt-watch-yt-container'>
        </div>
        <div className='lt-watch-text-container'>

          <Button variant="outlined" size="small" className='lt-watch-text-left' onClick={onLeft}>
            <i className="material-icons lt-watch-text-icons">
              keyboard_arrow_left
            </i>
          </Button>

          <div className='lt-watch-text-content'>
            {englishTextBlocks.textBlocks.map((block, index) =>
              (block.isWord ?
                  <Word key={index} word={block.text} /> :
                  <span key={index}>{block.text}</span>
              )
            )}
          </div>

          <Button variant="outlined" size="small" className='lt-watch-text-right' onClick={onRight}>
            <i className="material-icons lt-watch-text-icons">
              keyboard_arrow_right
            </i>
          </Button>

        </div>
        <div className='lt-watch-text-container'>
          <Button variant="outlined" size="small" className='lt-watch-button-translate' onClick={triggerTranslate}>
              перевод
          </Button>

          {showTranslate ?
            <div className='lt-watch-text-content'>
              {englishTextBlocks.translate}
            </div>:''
          }

          <Button variant="outlined" size="small" className='lt-watch-button-hidden'></Button>
        </div>
      </div>
    </Loader>
  </div>;
}
