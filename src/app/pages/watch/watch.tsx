import * as React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import * as service from './services/service';
import { connect } from 'react-redux';
import { IPage } from './services/interfaces';
import Button from '@material-ui/core/Button';
import Loader from 'app/shared/loader/loader';
import Word from './word';
import './styles.css';

const connected: React.ComponentType<any> = connect(service.getState)((props: IPage) => {
  useEffect(() => service.init(props.videoId), []);

  const [foo, setFoo] = useState({value: '', refresh: 0});

  return <div>
    <Link to={'/'}>
      &lt; Назад
    </Link>
    <br />
    <button onClick={() => setFoo({value: 'from parent', refresh: foo.refresh + 1})}>change foo</button>

    <br />
    <Loader isLoading={!props.data.ready}>
      <div>
        <div id='yt-player' className='lt-watch-yt-container'>
        </div>
        <div className='lt-watch-text-container'>

          <Button variant="outlined" size="small" className='lt-watch-text-left' onClick={service.onLeft}>
            <i className="material-icons lt-watch-text-icons">
              keyboard_arrow_left
            </i>
          </Button>

          <div className='lt-watch-text-content'>
            {props.data.englishTextBlocks.map((block, index) =>
              (block.isWord ?
                <Word key={index} word={block.text} translate={props.data.wordTranslate} /> :
                <span key={index}>{block.text}</span>
              )
            )}
          </div>

          <Button variant="outlined" size="small" className='lt-watch-text-right' onClick={service.onRight}>
            <i className="material-icons lt-watch-text-icons">
              keyboard_arrow_right
            </i>
          </Button>

        </div>
      </div>
    </Loader>
  </div>;
});

export default connected;


