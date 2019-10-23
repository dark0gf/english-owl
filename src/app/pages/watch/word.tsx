import * as React from 'react';
import Popup from "reactjs-popup";
import { CircularProgress } from '@material-ui/core';
import { translateWord } from './services/service';

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

export default (props: {word: string, translate: any}) => {
  return <Popup
    trigger={<span className='lt-watch-text-word'>{props.word}</span>}
    position="top center"
    on="hover"
    onOpen={() => translateWord(props.word)}
    contentStyle={{width: '300px'}}
  >
    {props.translate ?
      <div className='lt-watch-translate-container'>
        <div className='lt-watch-translate-word'><b>{props.word}</b></div>
        {props.translate.map((item: any, index: number) => {
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
