import * as React from 'react';
import Popup from "reactjs-popup";
import { CircularProgress } from '@material-ui/core';
import axiosLib, { CancelTokenSource } from 'axios';
import axios from 'app/shared/services/axios';
import { useState } from 'react';

const engPosToRussian: any = {
  'noun': 'сущ.',
  'adjective': 'прил.',
  'pronoun': 'мест.',
  'numeral': 'числ.',
  'verb': 'гл.',
  'adverb': 'нар.',
  'preposition': 'пред.',
  'determiner': 'опред.'
};

const useService = (props: {word: string}) => {
  const [translation, setTranslation] = useState<any>();
  const [axiosSource, setAxiosSource] = useState<CancelTokenSource | null>(null);

  const translateWord = async () => {
    const wordTrimmed = props.word.trim().toLowerCase();
    setTranslation(null);
    let tr: any;
    try {
      if (axiosSource) {
        axiosSource.cancel('Canceled.');
      }
      const ast = axiosLib.CancelToken.source();
      setAxiosSource(ast);
      tr = (await axios.get(`/translate/word/${wordTrimmed}`, {cancelToken: ast.token})).data;
      setAxiosSource(null);
    } catch (e) {
      return;
    }

    console.log(tr);
    setTranslation(tr);

    const popupContainer = document.querySelector('.lt-watch-text-content .popup-content') as HTMLElement;
    if (popupContainer) {
      const h = popupContainer.offsetHeight;
      var topValue = parseFloat(popupContainer.style.top || '');
      popupContainer.style.top = topValue - h + 48 + 'px';
    }
  };


  return {translateWord, translation};
};

export default (props: {word: string}) => {
  const {translateWord, translation} = useService(props);

  return <Popup
    trigger={<span className='lt-watch-text-word'>{props.word}</span>}
    position="top center"
    on="hover"
    onOpen={translateWord}
    contentStyle={{width: '300px'}}
  >
    {translation ?
      <div className='lt-watch-translate-container'>
        <div className='lt-watch-translate-word'><b>{props.word}</b></div>
        {translation.map((item: any, index: number) => {
          return <div key={index}>
            {engPosToRussian[item.pos] ?
              <span className='lt-watch-translate-pos'>{engPosToRussian[item.pos]}</span> :
              ''
            }
            {item.tr.map((translation: any) => translation.text).join(', ')}
          </div>
        })}
      </div>:
      <CircularProgress size={'2rem'} />
    }
  </Popup>
}
