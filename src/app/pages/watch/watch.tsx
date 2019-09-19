import * as React from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as service from './service';
import { connect } from 'react-redux';
import { IPage } from './interfaces';
import Button from '@material-ui/core/Button';
import './style.css';
// import Button from '@material-ui/core/Button';

const connected: React.ComponentType<any> = connect(service.getState)(
  (props: IPage) => {
    useEffect(() => service.init(), []);

    return <div>
      <Link to={'/'}>
        &lt; Назад
      </Link>

      {props.data.ready ?
        <div>
          <div id='yt-player' className='lt-watch-yt-container'>
          </div>
          <div className='lt-watch-text-container'>

            <Button variant="outlined" size="small" className='lt-watch-text-left'>
              <i className="material-icons">
                keyboard_arrow_left
              </i>
            </Button>

            <div className='lt-watch-text-content'>
              {props.data.englishText}
            </div>


            <Button variant="outlined" size="small" className='lt-watch-text-right'>
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


