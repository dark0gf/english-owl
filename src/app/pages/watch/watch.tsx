import * as React from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as service from './service';
import { connect } from 'react-redux';
import { IPage } from './service';
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
          <div className='lt-watch-yt-container'>
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/XqZsoesa55w?autoplay=0&autohide=2&cc_load_policy=0&iv_load_policy=3&showinfo=0&modestbranding=1&rel=0&enablejsapi=1&start=20&end=40"
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <div className='lt-watch-text-container'>

            <Button variant="outlined" size="small" className='lt-watch-text-left'>
              <i className="material-icons">
                keyboard_arrow_left
              </i>
            </Button>

            <div className='lt-watch-text-content'>
              text will be here
              <br />
              second line
              <br />
              third line
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


