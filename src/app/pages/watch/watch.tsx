import * as React from 'react';
import Popup from "reactjs-popup";
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as service from './service';
import { connect } from 'react-redux';
import { IPage } from './interfaces';
import Button from '@material-ui/core/Button';
import './styles.css';

const connected: React.ComponentType<any> = connect(service.getState)(
  (props: IPage) => {
    useEffect(() => service.init(props.videoId), []);

    return <div>
      <Link to={'/'}>
        &lt; Назад
      </Link>

      <br />
      {JSON.stringify(props.data)}

      {props.data.ready ?
        <div>
          <div id='yt-player' className='lt-watch-yt-container'>
          </div>
          <div className='lt-watch-text-container'>

            <Button variant="outlined" size="small" className='lt-watch-text-left' onClick={service.onLeft}>
              <i className="material-icons">
                keyboard_arrow_left
              </i>
            </Button>

            <div className='lt-watch-text-content'>
              {props.data.englishTextBlocks.map((block) =>
                (block.isWord ?
                  <span className='lt-watch-text-word'>{block.text}</span> :
                  <span>{block.text}</span>
                )
              )}
            </div>

            <Popup
              trigger={<span>test</span>}
              position="top center"
              on="hover"
            >
              <div>Just test with work translation </div>
            </Popup>

            <Button variant="outlined" size="small" className='lt-watch-text-right' onClick={service.onRight}>
              <i className="material-icons">
                keyboard_arrow_right
              </i>
            </Button>

          </div>
        </div>
        : ''}
    </div>;
  }
);

export default connected;


